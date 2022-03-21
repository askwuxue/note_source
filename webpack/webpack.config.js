const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
  mode: "development",
  // entry: {
  //   main: [path.join(__dirname, "./src/index.js"), path.join(__dirname, "./src/style.scss")],
  // },
  entry: path.join(__dirname, "./src/index.js"),
  output: {
    filename: "[name].js",
    path: path.join(__dirname, "./dist"),
    library: {
      name: "PageIntro",
      type: "umd",
    },
  },
  devServer: {
    static: path.resolve(__dirname, "public"), // 静态文件目录
    compress: true, //是否启动压缩 gzip
    port: 8080, // 端口号
    open: true, // 是否自动打开浏览器
  },
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"],
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: "[name].css",
    }),
  ],
};
