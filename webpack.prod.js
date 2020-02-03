const path = require("path");
const common = require("./webpack.common");
const merge = require("webpack-merge");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const autoprefixer = require('autoprefixer');
var HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = merge(common, {
  mode: "production",
  output: {
    filename: "[name].bundle.js",
    path: path.resolve(__dirname, "dist")
  },
  plugins: [
    new MiniCssExtractPlugin({ filename: "[name].css" }),
    new HtmlWebpackPlugin({
      template: "./src/index.html",
    }),
    new CopyWebpackPlugin([
      {
        from: "./src/components/downloads/gif.worker.js",
        to: "./",
      },
    ])
  ],
  module: {
    rules: [
      {
        test: /\.sass$/,
        use: [
          MiniCssExtractPlugin.loader,
          { loader: "css-loader", options: {} },
          {
            loader: "postcss-loader",
            options: {
              ident: 'postcss',
              plugins: [
                autoprefixer(),
              ]
            }
          },
          { loader: "sass-loader", options: {} }
        ]
      }
    ]
  },
});