require("@chainlink/env-enc").config();

const PRIVATE_KEY = process.env.PRIVATE_KEY;

const accounts = [];
if (PRIVATE_KEY) {
  accounts.push(PRIVATE_KEY);
}

const networks = {
  baseSepolia: {
    url:
      "https://base-sepolia.g.alchemy.com/v2/" +
      process.env.ALCHEMY_API_KEY_SEPOLIA,
    gasPrice: undefined,
    nonce: undefined,
    accounts,
    verifyApiKey: process.env.BASESCAN_API_KEY || "UNSET",
    chainId: 84532,
    confirmations: 3,
    nativeCurrencySymbol: "ETH",
    oracleAttestor: "0x738ad0358a6b9d419e7f95d8d46619e81b8afea1",
    consumerAddress: "0x1eba83975bb26c3f13fb4aced748550a29f0bb1b",
  },
};

module.exports = {
  networks,
};
