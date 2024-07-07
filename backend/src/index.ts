import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import morgan from "morgan";
import { Request, Response } from "express";
import axios from "axios";
import { Stream } from "stream"; 
import { JSDOM } from "jsdom";
import satoriFunc from "./satori";
import { getUserLabels } from "./utils/mbd/getUserLabels";


const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan("dev"));

app.get("*", async (req: Request, res: Response) => {

  const frame_data = {
  untrustedData: {
    fid: 2,
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



const options = {
  method: 'POST',
  headers: {Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5mb3JtYXRpb24iOnsiaWQiOiI5YzNlOGIxYS0yZTI2LTRkNzUtOGQ0Yi1iMWRmNTUyOGJiYWEiLCJlbWFpbCI6ImZhYmlhbmZlcm5vQGdtYWlsLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJwaW5fcG9saWN5Ijp7InJlZ2lvbnMiOlt7ImlkIjoiRlJBMSIsImRlc2lyZWRSZXBsaWNhdGlvbkNvdW50IjoxfSx7ImlkIjoiTllDMSIsImRlc2lyZWRSZXBsaWNhdGlvbkNvdW50IjoxfV0sInZlcnNpb24iOjF9LCJtZmFfZW5hYmxlZCI6ZmFsc2UsInN0YXR1cyI6IkFDVElWRSJ9LCJhdXRoZW50aWNhdGlvblR5cGUiOiJzY29wZWRLZXkiLCJzY29wZWRLZXlLZXkiOiIxMGQ1OWM0ZTUxZDJmNDUyYWZiOCIsInNjb3BlZEtleVNlY3JldCI6IjQ2MzM2OTA1ZTNmYzQ0ZDI4N2M4YTIwYmFhYWU0NjBmZjZjMjIzOTI5OWI5MjA1MWEzMGY4ZWQ4YWQ4Njg0NWUiLCJpYXQiOjE3MTEwMTc2OTZ9._IUzsF1TY5FktV8Z0yN7Xc0UjcM9Mjh1r1DnqdHW3pU', 'Content-Type': 'application/json'},
  body: '{"frame_id":"relayer","custom_id":"user_123","data":{"untrustedData":{"fid":2,"url":"https://fcpolls.com/polls/1","messageHash":"0xd2b1ddc6c88e865a33cb1a565e0058d757042974","timestamp":1706243218,"network":1,"buttonIndex":2,"inputText":"hello world","castId":{"fid":226,"hash":"0xa48dd46161d8e57725f5e26e34ec19c13ff7f3b9"}},"trustedData":{"messageBytes":"d2b1ddc6c88e865a33cb1a565e0058d757042974..."}}}'
};

fetch('https://api.pinata.cloud/farcaster/frames/interactions', options)
  .then(response => response.json())
  .then(response => console.log(response))
  .catch(err => console.error(err));


  // const data = await getUserLabels('389273')
  // console.log("data :",data)

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
        const mainUrl = metaElement!.getAttribute("content") as string;
        // console.log("url : " , mainUrl)

 
// const addContent = `
//   <div style="width: 100%; height: 100%; background-color: #f0f0f0; display: flex; align-items: center; justify-content: center;">
//     <p style="font-size: 24px; color: #333;">This is an example HTML content.</p>
//   </div>
// `;
// const addContent = `
// <img src="https://via.placeholder.com/400x100.png?text=Placeholder+Image" alt="Park" style="width: 100%; height: 100%;">
// `
//     const imageUrl = await compositeAndEncodeBase64({ mainImageUrl, addContent });

    const satoriImg = await satoriFunc(mainUrl,"https://via.placeholder.com/400x100.png?text=Placeholder+Image");



        if (metaElement) {
          metaElement.setAttribute(
            "content",
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