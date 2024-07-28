// Importing necessary libraries and types
import "@phala/pink-env";
import {
  decodeAbiParameters,
  encodeAbiParameters,
  parseAbiParameters,
} from "viem";

// Defining a type alias for hexadecimal strings starting with '0x'
type HexString = `0x${string}`;

// Defining the ABI parameters for encoding the reply
const encodeReplyAbiParams = "uint claimId, uint amount, uint8 errorCode";

// Defining the ABI parameters for decoding the request
const decodeRequestAbiParams =
  "uint claimId, address claimer, string frameUrl, uint farcasterId";

// Function to encode the reply using ABI parameters and reply data
function encodeReply(abiParams: string, reply: any): HexString {
  return encodeAbiParameters(parseAbiParameters(abiParams), reply);
}

// Function to decode the request using ABI parameters and request data
function decodeRequest(abiParams: string, request: HexString): any {
  return decodeAbiParameters(parseAbiParameters(abiParams), request);
}

function stringToHex(str: string): string {
  var hex = "";
  for (var i = 0; i < str.length; i++) {
    hex += str.charCodeAt(i).toString(16);
  }
  return "0x" + hex;
}

// Main function that handles the request and generates a response
export default function main(request: HexString, secrets: string): HexString {
  // Initialize variables for claimId, claimer, frameUrl, and farcasterId
  let claimId, claimer, frameUrl, farcasterId;

  try {
    // Decode the request using the ABI parameters and request data
    [claimId, claimer, frameUrl, farcasterId] = decodeRequest(
      decodeRequestAbiParams,
      request
    );
  } catch (error) {
    // Handle any errors that occur during decoding or processing
    console.info("Malformed request received");
    return encodeReply(encodeReplyAbiParams, [BigInt(claimId), 0n, 1n]);
  }

  try {
    // Batch HTTP request to fetch data from Airstack and rewards service
    let response = pink.batchHttpRequest(
      [
        {
          url: "https://api.airstack.xyz/graphql",
          method: "POST",
          headers: {
            Authorization: secrets,
            "Content-Type": "application/json",
            "User-Agent": "phat-contract",
          },
          body: stringToHex(
            JSON.stringify({
              query: `
              query MyQuery {
                Socials(
                  input: {filter: {dappName: {_eq: farcaster}, identity: {_eq: "${claimer}"}}, blockchain: ethereum}
                ) {
                  Social {
                    userId
                  }
                }
              }
            `,
            })
          ),
          returnTextBody: true,
        },
        {
          url: `https://harsh-branch-incalculable.functions.on-fleek.app?frameId=relayer`,
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "User-Agent": "phat-contract",
          },
          body: stringToHex(
            JSON.stringify({
              farcasterId: farcasterId.toString(),
              frameUrl: frameUrl,
            })
          ),
          returnTextBody: true,
        },
      ],
      10000 // Timeout of 10 seconds
    );

    // Check the response status codes and handle errors
    if (response[1].statusCode !== 200) {
      // If the rewards query fails, encode a reply with error code 5
      return encodeReply(encodeReplyAbiParams, [BigInt(claimId), 0n, 5n]);
    }
    if (response[0].statusCode !== 200) {
      // If the Airstack query fails, encode a reply with error code 4
      return encodeReply(encodeReplyAbiParams, [BigInt(claimId), 0n, 4n]);
    } else {
      // Parse the Airstack response to get the fetched farcaster ID
      const fetchedFarcasterId = JSON.parse(response[0].body as string).data
        .Socials.Social[0].userId;

      // Check if the fetched farcaster ID matches the requested farcaster ID
      if (fetchedFarcasterId !== farcasterId.toString()) {
        // If they don't match, encode a reply with error code 2
        return encodeReply(encodeReplyAbiParams, [BigInt(claimId), 0n, 2n]);
      }

      // Parse the rewards response to get the fetched revenue amount
      const fetchedRevenue = JSON.parse(response[1].body as string).amount;

      // Check if the fetched revenue is zero
      if (fetchedRevenue == 0) {
        // If the revenue is zero, encode a reply with error code 3
        return encodeReply(encodeReplyAbiParams, [BigInt(claimId), 0n, 3n]);
      }

      // Encode a successful reply with the claim ID, fetched revenue, and no error
      return encodeReply(encodeReplyAbiParams, [
        BigInt(claimId),
        BigInt(fetchedRevenue),
        0n,
      ]);
    }
  } catch (error) {
    return encodeReply(encodeReplyAbiParams, [BigInt(claimId), 0n, 1n]);
  }
}
