import { Request, Response, route } from "./httpSupport";

async function GET(req: Request): Promise<Response> {
  return new Response("Only POST Implemented");
}

async function POST(req: Request): Promise<Response> {
  const body = await req.json();
  let result;
  console.log(body);
  try {
    const response = await fetch(
      "https://api.mbd.xyz/v1/farcaster/casts/labels/for-text",
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "X-Api-Key": `mbd-028f111dcf6a58416b90eca26ce47723f02df2efa0c88ee87722b33c85c6034a`,
        },
        body: JSON.stringify({
          text_inputs: [JSON.stringify(body)],
          label_category: "topics",
        }),
      }
    );
    result = await response.json();
  } catch (error) {
    console.error("Error fetching chat completion:", error);
    result = { error };
  }
  console.log("NIGGGAA");
  console.log(JSON.stringify(result.body));
  const labels = result.body[0];

  console.log(labels);
  console.log("Sorted Labels");
  labels.sort((a: any, b: any) => b.score - a.score);
  console.log(labels);
  console.log("Top 5 Labels");
  console.log(labels.slice(0, 5));
  return new Response(JSON.stringify(labels.slice(0, 5)));
}

export default async function main(request: string) {
  return await route({ GET, POST }, request);
}
