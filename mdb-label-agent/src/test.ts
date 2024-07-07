import main from "./index";
import "dotenv/config";

async function execute(inputObj: any) {
  const inputJson = JSON.stringify(inputObj);
  console.log("INPUT:", inputJson);
  return await main(inputJson);
}

// Sample body input for a POST request
const sampleInput = {
  title: "Build on NEAR",
  description:
    "We are announcing a grant of 10k for all builders who build on NEAR",
};

async function test() {
  const postResult = await execute({
    method: "POST",
    path: "/ipfs/QmVHbLYhhYA5z6yKpQr4JWr3D54EhbSsh7e7BFAAyrkkMf",
    queries: {},
    secret: { mbdApiKey: process.env.MBD_API_KEY },
    headers: {},
    body: JSON.stringify(sampleInput),
  });
  console.log("POST RESULT:", JSON.parse(postResult));

  const labels = JSON.parse(postResult);
  console.log("Sorted Labels");
  console.log(JSON.parse(labels.body));

  const testArgsString = JSON.stringify({
    method: "POST",
    path: "/ipfs/QmVHbLYhhYA5z6yKpQr4JWr3D54EhbSsh7e7BFAAyrkkMf",
    queries: {},
    secret: { mbdApiKey: "MBD_API_KEY" },
    headers: {},
    body: JSON.stringify(sampleInput),
  });
  console.log(
    `\nTo test in the SideVM playground go to https://phat.phala.network/contracts/view/0xf0a398600f02ea9b47a86c59aed61387e450e2a99cb8b921cd1d46f734e45409\n\nConnect you polkadot.js account and select 'run_js' with the parameters:\n- engine: SidevmQuickJSWithPolyfill\n- js_code: Source code text of dist/index.ts\n- args: ${testArgsString}`
  );
  console.log(
    "Watch video here for to see the visual steps of testing in Sidevm playground: https://www.youtube.com/watch?v=fNqNeLfFFME"
  );
  console.log(
    `\nMake sure to replace queries and secret with your values compatible with your AI Agent Contract.`
  );
}

test()
  .then(() => {})
  .catch((err) => console.error(err))
  .finally(() => process.exit());
