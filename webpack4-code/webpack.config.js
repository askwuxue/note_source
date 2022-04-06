const path = require("path");
// --legacy-peer-deps
const HtmlWebpackPlugin = require("html-webpack-plugin");
module.exports = {
  mode: "development",
  devtool: "none",
  entry: "./src/index.js",
  output: {
    filename: "build.js",
    path: path.resolve("dist"),
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: "index.html",
      template: "./src/index.html",
    }),
  ],
};
