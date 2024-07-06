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
    oracleAttestor: "0xd6c50fbb74fa656e08a1787272e1c902b72c73c5",
  },
};

module.exports = {
  networks,
};
