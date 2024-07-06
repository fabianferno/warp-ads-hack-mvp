
 // @ts-ignore
 import satori from 'satori'
 import { Resvg } from '@resvg/resvg-js'

 const html = async (...args: string[]) => {
   const { html } = await import('satori-html');
   // @ts-ignore
   return html(...args);
 }

 export default async function satoriFunc( frameImg : string , addImg: string) {
   const template = await html(`
     <div style="font-family: Roboto; display: flex; flex-direction: column; font-size: 24px; color: #000000; width:100%; height:100%;">
        <img src=${frameImg} alt="Park" style="width: 100%; height: 80%;">
        <img src=${addImg} alt="Park" style="width: 100%; height: 20%;">
     </div>
   `)


   const inter = fetch(
  'https://og-playground.vercel.app/inter-latin-ext-400-normal.woff'
).then((res) => res.arrayBuffer());
   const svg = await satori(template , {
       width: 400,
       height: 300,
       fonts: [
         {
           name: 'Roboto',
           data: await inter,
           weight: 400,
           style: 'normal',
         },
       ],
     },
   )

   const resvg = new Resvg(svg, {
     background: "rgba(238, 235, 230, .9)",
   });

   const pngData = resvg.render()
   const pngBuffer = pngData.asPng()


   const base64Png = pngBuffer.toString('base64');
    const dataURI = `data:image/jpeg;base64,${base64Png}`;

  return dataURI;
 }