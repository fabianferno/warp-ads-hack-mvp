import axios from "axios";
import { JSDOM } from "jsdom";
import satoriFunc from "./satori.js";

export const main = async (params) => {
  const { method, path, headers, query, body } = params;

  const targetUrl = "https://frames-gray.vercel.app" + path;

  try {
    const { "set-cookie": _, ...filteredHeaders } = headers;

    let response = await axios({
      method: method,
      url: targetUrl,
      data: body,
      headers: { ...filteredHeaders, host: new URL(targetUrl).host },
      responseType: "stream",
    });

    return response;

    try {
      // Collect the stream data into a buffer
      const chunks = [];
      response.data.on("data", (chunk) => chunks.push(chunk));
      response.data.on("end", async () => {
        const buffer = Buffer.concat(chunks);
        const htmlContent = buffer.toString("utf8");

        // Use jsdom to parse the HTML response
        const dom = new JSDOM(htmlContent);
        const metaElement = dom.window.document.querySelector(
          'meta[name="fc:frame:image"]'
        );
        const mainUrl = metaElement.getAttribute("content");
        console.log("url : ", mainUrl);
        const satoriImg = await satoriFunc(
          mainUrl,
          "https://via.placeholder.com/400x100.png?text=Placeholder+Image"
        );

        if (metaElement) {
          metaElement.setAttribute("content", satoriImg);
        }

        // Serialize the modified HTML back to a string
        const modifiedHtml = dom.serialize();

        // Send the modified HTML to the client
        return {
          statusCode: 200,
          body: modifiedHtml,
          headers: {
            "Content-Type": "text/html",
            charset: "utf-8",
          },
        };
      });
    } catch (error) {
      console.error("Error parsing HTML:", error);
      // Relay the original response if parsing fails
      //   res.writeHead(response.status, response.headers);
      res.end(response.data);
    }
  } catch (error) {
    console.log(error);
  }

  return `${method} request to ${path} query : ${JSON.stringify(
    query
  )} body : ${JSON.stringify(body)} headers : ${JSON.stringify(headers)}`;
};
