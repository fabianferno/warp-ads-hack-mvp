import "@phala/pink-env";
import {
  decodeAbiParameters,
  encodeAbiParameters,
  parseAbiParameters,
} from "viem";

type HexString = `0x${string}`;
const encodeReplyAbiParams = "uint claimId, uint amount, uint8 errorCode";
const decodeRequestAbiParams =
  "uint claimId, address claimer, string frameUrl, uint farcasterId";

function encodeReply(abiParams: string, reply: any): HexString {
  return encodeAbiParameters(parseAbiParameters(abiParams), reply);
}

function decodeRequest(abiParams: string, request: HexString): any {
  return decodeAbiParameters(parseAbiParameters(abiParams), request);
}

function fetchRewardsQuery(farcasterId: string, frameUrl: string): any {
  return {
    url: `https://mocki.io/v1/b26c3766-4f0f-4246-9888-fc670752bf4f?farcasterId=${farcasterId}&frameUrl=${frameUrl}`,
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    returnTextBody: true,
  };
}

function fetchAirstackQuery(airstackApiKey: string, claimer: string): any {
  return {
    url: "https://api.airstack.xyz/graphql",
    method: "POST",
    headers: {
      Authorization: airstackApiKey,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
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
    }),
    returnTextBody: true,
  };
}

export default function main(request: HexString, secrets: string): HexString {
  let claimId, claimer, frameUrl, farcasterId;

  try {
    [claimId, claimer, frameUrl, farcasterId] = decodeRequest(
      decodeRequestAbiParams,
      request
    );

    let response = pink.batchHttpRequest(
      [
        fetchAirstackQuery(secrets, claimer),
        fetchRewardsQuery(farcasterId.toString(), frameUrl),
      ],
      10000
    );
    if (response[1].statusCode !== 200) {
      return encodeReply(encodeReplyAbiParams, [BigInt(claimId), 0n, 5n]);
    }
    if (response[0].statusCode !== 200) {
      return encodeReply(encodeReplyAbiParams, [BigInt(claimId), 0n, 4n]);
    } else {
      const fetchedFarcasterId = JSON.parse(response[0].body as string).data
        .Socials.Social[0].userId;
      if (fetchedFarcasterId !== farcasterId.toString()) {
        return encodeReply(encodeReplyAbiParams, [BigInt(claimId), 0n, 2n]);
      }
      const fetchedRevenue = JSON.parse(response[1].body as string).amount;
      if (fetchedRevenue == 0) {
        return encodeReply(encodeReplyAbiParams, [BigInt(claimId), 0n, 3n]);
      }
      return encodeReply(encodeReplyAbiParams, [
        BigInt(claimId),
        fetchedRevenue,
        0n,
      ]);
    }
  } catch (error) {
    console.info("Malformed request received");
    return encodeReply(encodeReplyAbiParams, [BigInt(claimId), 0n, 1n]);
  }
}
