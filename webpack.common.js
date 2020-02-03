const path = require("path");
var HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  entry: {
    main: "./src/index.js",
  },
  plugins: [
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
        test: /\.html$/,
        use: ["html-loader"]
      },
      {
        test: /\.(svg|png|jpg|gif)$/,
        use: {
          loader: "file-loader",
          options: {
            name: "[name].[hash].[ext]",
            outputPath: "assets/img/"
          }
        }
      },
      {
        test: /\.(ttf)$/,
        use: {
          loader: "file-loader",
          options: {
            name: "[name].[hash].[ext]",
            outputPath: "assets/fonts/"
          }
        }
      }
    ]
  }
};