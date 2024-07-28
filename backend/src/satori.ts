// @ts-ignore
import satori from "satori";
import { Resvg } from "@resvg/resvg-js";

const html = async (...args: string[]) => {
  const { html } = await import("satori-html");
  // @ts-ignore
  return html(...args);
};

export default async function satoriFunc(
  frameImg: string,
  addImg: string,
  desc: string,
  title: string
) {
  const template = await html(`
     <div style="font-family: Roboto; display: flex; flex-direction: column; font-size: 24px; color: #000000; width:100%; height:100%; justify-content:center; align-items: center">
     <img src=${frameImg} alt="Park" style="width: 80%; height:100%; margin-top: -50px">
     <div style="display: flex; align-items: center; justify-content:center; gap:10px; margin-top:-30px; background-color: white; width: 100%">
        <img src=${
          // addImg
          "https://warpads.vercel.app/logo/logo.png"
        } alt="Park" style="width: 50px; height: 50px; border-radius : 50% ;margin-top:5px">
        <div style="display :flex ;flex-direction: column;">
         <p style="font-size: 10px; align-self: center; max-width: 180px; display: flex; white-space: pre-wrap; word-wrap: break-word;">
              ${title}: ${desc}
          </p>
        </div>
        
        </div>
     </div>
   `);

  //             <p style="font-size: 10px; align-self: center; max-width: 180px; display: flex; white-space: pre-wrap; word-wrap: break-word;">
  //     ${title}
  // </p>

  const inter = fetch(
    "https://og-playground.vercel.app/inter-latin-ext-400-normal.woff"
  ).then((res) => res.arrayBuffer());
  const svg = await satori(template, {
    width: 400,
    height: 300,
    fonts: [
      {
        name: "Roboto",
        data: await inter,
        weight: 400,
        style: "normal",
      },
    ],
  });

  const resvg = new Resvg(svg, {
    background: "rgba(238, 235, 230, .9)",
  });

  const pngData = resvg.render();
  const pngBuffer = pngData.asPng();

  const base64Png = pngBuffer.toString("base64");
  const dataURI = `data:image/jpeg;base64,${base64Png}`;

  return dataURI;
}
