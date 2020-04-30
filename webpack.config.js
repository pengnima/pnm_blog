let path = require("path");
let HtmlWebpackPlugin = require("html-webpack-plugin"); //处理html文件
let MiniCssExtractPlugin = require("mini-css-extract-plugin");
let TerserJSPlugin = require("terser-webpack-plugin");
let OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
let { CleanWebpackPlugin } = require("clean-webpack-plugin");
let CopyWebpackPlugin = require("copy-webpack-plugin");
module.exports = {
  optimization: {
    //最小化
    minimizer: [
      new TerserJSPlugin({}), //压缩JS
      new OptimizeCSSAssetsPlugin({}), //压缩CSS
    ],
  },
  mode: "production",
  entry: {
    index: [
      "./src/js/special/css1.js",
      "./src/js/eventFunc.js",
      "./src/js/abilityFunc.js",
      "./src/js/main.js",
      "./src/js/login.js",
      "./src/js/particle.js",
      "./src/js/search.js",
      "./src/js/togglePopular.js",
    ],
    register: "./src/js/special/css2.js",
  },
  output: {
    filename: "./js/[name].js",
    path: path.join(__dirname, "./dist"),
    // publicPath: "../",
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: "./index.html",
      filename: "index.html",
      chunks: ["index"],
    }),
    new HtmlWebpackPlugin({
      template: "./register.html",
      filename: "register.html",
      chunks: ["register"],
    }),
    new MiniCssExtractPlugin({
      filename: "./css/[name].css",
    }),
    new CopyWebpackPlugin([
      {
        from: "./json",
        to: "./json",
      },
      {
        from: "./src/js/Bmob-2.2.4.min.js",
        to: "./js",
      },
    ]),
  ],
  module: {
    rules: [
      { test: /\.css$/, use: [MiniCssExtractPlugin.loader, "css-loader"] },
      {
        test: /\.(png|jpg|gif)$/i,
        use: [
          {
            loader: "url-loader",
            options: {
              esModule: false, //声明图片不进行ES模块化
              limit: 200 * 1024, //url-loader的限制，即 200k 以内的文件都用 base64 字符串
              outputPath: "./img/", //指明图片都存放在img目录下
            },
          },
        ],
      },
    ],
  },
};
