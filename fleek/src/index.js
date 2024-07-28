import { JSDOM } from "jsdom";
import satoriFunc from "./satori.js";

export const main = async (params) => {
  const { method, path, headers, query } = params;
  const frame_data = {
    untrustedData: {
      fid: 389273,
      url: "https://fcpolls.com/polls/1",
      messageHash: "0xd2b1ddc6c88e865a33cb1a565e0058d757042974",
      timestamp: 1706243218,
      network: 1,
      buttonIndex: 2,
      inputText: "hello world", // "" if requested and no input, undefined if input not requested
      castId: {
        fid: 226,
        hash: "0xa48dd46161d8e57725f5e26e34ec19c13ff7f3b9",
      },
    },
    trustedData: {
      messageBytes: "d2b1ddc6c88e865a33cb1a565e0058d757042974...",
    },
  };

  const fetchOptions = {
    method: "POST",
    headers: {
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5mb3JtYXRpb24iOnsiaWQiOiI5YzNlOGIxYS0yZTI2LTRkNzUtOGQ0Yi1iMWRmNTUyOGJiYWEiLCJlbWFpbCI6ImZhYmlhbmZlcm5vQGdtYWlsLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJwaW5fcG9saWN5Ijp7InJlZ2lvbnMiOlt7ImlkIjoiRlJBMSIsImRlc2lyZWRSZXBsaWNhdGlvbkNvdW50IjoxfSx7ImlkIjoiTllDMSIsImRlc2lyZWRSZXBsaWNhdGlvbkNvdW50IjoxfV0sInZlcnNpb24iOjF9LCJtZmFfZW5hYmxlZCI6ZmFsc2UsInN0YXR1cyI6IkFDVElWRSJ9LCJhdXRoZW50aWNhdGlvblR5cGUiOiJzY29wZWRLZXkiLCJzY29wZWRLZXlLZXkiOiIxMGQ1OWM0ZTUxZDJmNDUyYWZiOCIsInNjb3BlZEtleVNlY3JldCI6IjQ2MzM2OTA1ZTNmYzQ0ZDI4N2M4YTIwYmFhYWU0NjBmZjZjMjIzOTI5OWI5MjA1MWEzMGY4ZWQ4YWQ4Njg0NWUiLCJpYXQiOjE3MTEwMTc2OTZ9._IUzsF1TY5FktV8Z0yN7Xc0UjcM9Mjh1r1DnqdHW3pU",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      frame_id: "relayer",
      custom_id: "user_123",
      data: frame_data,
    }),
  };

  try {
    await fetch(
      "https://api.pinata.cloud/farcaster/frames/interactions",
      fetchOptions
    )
      .then((response) => response.json())
      .catch((err) => console.error(err));

    const targetLabels = await getUserLabels(
      frame_data.untrustedData.fid.toString()
    );

    const response = await fetch(
      "https://api.studio.thegraph.com/query/30735/warp-ads/v0.0.6",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          query: `
          query MyQuery {
            ads {
              id
              labels
              metadata
            }
          }
        `,
        }),
      }
    );

    const data = await response.json();
    const ads = data.data.ads;

    const filteredAds = ads.filter((ad) =>
      ad.labels.some((label) => targetLabels.includes(label))
    );

    let randomAdDisplay = {
      id: "",
      labels: [],
      metadata: "",
    };

    if (filteredAds.length > 0) {
      const randomAd =
        filteredAds[Math.floor(Math.random() * filteredAds.length)];
      randomAdDisplay = randomAd;
    }

    const targetUrl = query.url + path;
    const { "set-cookie": _, ...filteredHeaders } = headers;

    const targetResponse = await fetch(targetUrl, {
      method: method,
      headers: { ...filteredHeaders, host: new URL(targetUrl).host },
    });

    const htmlContent = await targetResponse.text();
    const dom = new JSDOM(htmlContent);
    const metaElement = dom.window.document.querySelector(
      'meta[name="fc:frame:image"]'
    );

    if (metaElement) {
      const mainUrl = metaElement.getAttribute("content");
      const logo =
        "data:image/png;base64,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";
      const metadataObject = JSON.parse(randomAdDisplay.metadata);
      const description = metadataObject.description;
      const title = metadataObject.title;
      const satoriImg = await satoriFunc(mainUrl, logo, description, title);

      metaElement.setAttribute("content", satoriImg);

      const modifiedHtml = dom.serialize();

      return {
        statusCode: targetResponse.status,
        headers: { "Content-Type": "text/html", charset: "utf-8" },
        body: modifiedHtml,
      };
    }

    return {
      statusCode: targetResponse.status,
      headers: targetResponse.headers,
      body: htmlContent,
    };
  } catch (error) {
    console.error("Error relaying request:", error);
    return {
      statusCode: 500,
      body: "Failed to relay request",
    };
  }
};
