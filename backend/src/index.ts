import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import morgan from "morgan";
import { Request, Response } from "express";
import axios from "axios";
import { Stream } from "stream"; 
import { JSDOM } from "jsdom";
import { compositeAndEncodeBase64 } from "./sharp";
import satoriFunc from "./satori";


const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan("dev"));

app.get("*", async (req: Request, res: Response) => {

  const targetUrl = "https://frames-gray.vercel.app" + req.path;

  try {
    const { "set-cookie": _, ...filteredHeaders } = req.headers;

    let response = await axios({
      method: req.method,
      url: targetUrl,
      data: req.body,
      headers: { ...filteredHeaders, host: new URL(targetUrl).host },
      responseType: "stream",
    });



    try {
      // Collect the stream data into a buffer
      const chunks: any[] = [];
      response.data.on("data", (chunk: any) => chunks.push(chunk));
      response.data.on("end", async() => {
        const buffer = Buffer.concat(chunks);
        const htmlContent = buffer.toString("utf8");

        // Use jsdom to parse the HTML response
        const dom = new JSDOM(htmlContent);
        const metaElement = dom.window.document.querySelector(
          'meta[name="fc:frame:image"]'
        );
        const mainUrl = metaElement?.getAttribute("content");
        console.log("url : " , mainUrl)

    const mainImageUrl ="https://www.fabianferno.com/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fportrait.a4345096.png&w=640&q=75"
    const coloredBarColor = 'blue';
// const addContent = `
//   <div style="width: 100%; height: 100%; background-color: #f0f0f0; display: flex; align-items: center; justify-content: center;">
//     <p style="font-size: 24px; color: #333;">This is an example HTML content.</p>
//   </div>
// `;
// const addContent = `
// <img src="https://via.placeholder.com/400x100.png?text=Placeholder+Image" alt="Park" style="width: 100%; height: 100%;">
// `
//     const imageUrl = await compositeAndEncodeBase64({ mainImageUrl, addContent });

    const satoriImg = await satoriFunc(mainImageUrl,"https://via.placeholder.com/400x100.png?text=Placeholder+Image");
    console.log(satoriImg)


        if (metaElement) {
          metaElement.setAttribute(
            "content",
            // "https://www.fabianferno.com/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fportrait.a4345096.png&w=640&q=75"
            satoriImg
          ); 
        }

        // Serialize the modified HTML back to a string
        const modifiedHtml = dom.serialize();

        // Send the modified HTML to the client
        res.writeHead(response.status, {
          "Content-Type": "text/html",
          charset: "utf-8",
        });
        res.end(modifiedHtml);
      });
    } catch (error) {
      console.error("Error parsing HTML:", error);
      // Relay the original response if parsing fails
    //   res.writeHead(response.status, response.headers);
      res.end(response.data);
    }
  } catch (error: any) {
    if (axios.isAxiosError(error) && error.response) {
      // Forward the response from the target server to the client
    //   res.writeHead(error.response.status, error.response.headers);
      if (error.response.data) {
        (error.response.data as Stream).pipe(res);
      } else {
        res.end();
      }
    } else {
      console.error("Error relaying request:", error);
      res.status(500).send("Failed to relay request");
    }
  }
});

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});