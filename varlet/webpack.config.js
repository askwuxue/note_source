const path = require("path");
const VueLoaderPlugin = require("vue-loader/lib/plugin");
module.exports = {
  entry: "./src/index.js",
  output: {
    filename: "main.js",
    path: path.resolve(__dirname, "dist"),
  },
  module: {
    rules: [
      {
        test: /.vue/i,
        use: ["vue-loader"],
      },
      {
        //通过vue-loader来识别以vue结尾的文件
        test: /.css$/,
        //css的处理方式不同，有嵌入在页面style标签里的，有从外部文件引入的，我们这里用use来声明
        use: [
          "style-loader", //接受潜在页面内部的style标签的文件。
          "css-loader",
        ],
      },
    ],
  },
  plugins: [new VueLoaderPlugin()],
};
