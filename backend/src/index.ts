import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import morgan from "morgan";
import { Request, Response } from "express";
import axios from "axios";
import { Stream } from "stream"; 
import { JSDOM } from "jsdom";


const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan("dev"));

app.get("*", async (req: Request, res: Response) => {
  console.log(req.body)
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
      response.data.on("end", () => {
        const buffer = Buffer.concat(chunks);
        const htmlContent = buffer.toString("utf8");

        // Use jsdom to parse the HTML response
        const dom = new JSDOM(htmlContent);
        const metaElement = dom.window.document.querySelector(
          'meta[name="fc:frame:image"]'
        );

        if (metaElement) {
          metaElement.setAttribute(
            "content",
            "https://www.fabianferno.com/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fportrait.a4345096.png&w=640&q=75"
          ); // Modify the content as needed
        }
        console.log(metaElement?.getAttribute("content"));

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