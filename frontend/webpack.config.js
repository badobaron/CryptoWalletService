module.exports = {
  entry: "./app/app.js",
  output: {
    path: "/home/tyler/workspace/CryptoWalletService/frontend/dist/js/",
    filename: "bundle.js",
    sourceMapFilename: "bundle.js.map",
  },

  watch: true,

  module: {
    rules: [{
      test: /\.js$/,
      enforce: "pre",
      exclude: /node_modules/,
      loader: "eslint-loader",
      options: {
        configFile: "./config/eslint.json"
      }
    }],
    loaders: [
      { test: /\.css$/, loader: "style!css" },
      { test: /\.html$/, loader: "mustache-loader" },
      { test: /\.json$/, loader: "json-loader" }]
  },

  resolve: {
    extensions: [".js"]
  }
};