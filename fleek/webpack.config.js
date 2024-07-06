const path = require("path");

module.exports = {
  entry: "./src/index.js",
  mode: "none",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "bundle.js",
    iife: false,
  },
  resolve: {
    fallback: {
      buffer: require.resolve("buffer/"),
      util: require.resolve("util/"),
      http: require.resolve("stream-http"),
      url: require.resolve("url/"),
      vm: require.resolve("vm-browserify"),
      os: require.resolve("os-browserify/browser"),
      zlib: require.resolve("browserify-zlib"),
      stream: require.resolve("stream-browserify"),
      https: require.resolve("https-browserify"),
      crypto: require.resolve("crypto-browserify"),
      path: require.resolve("path-browserify"),
      assert: require.resolve("assert/"),
      fs: false,
      child_process: false,
      tls: false,
      net: false,
    },
  },
  module: {
    rules: [
      {
        test: /\.node$/,
        loader: "node-loader",
      },
      // Add other rules for handling specific file types or modules
    ],
  },
};
