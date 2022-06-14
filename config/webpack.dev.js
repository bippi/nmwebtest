const merge = require("webpack-merge");
const path = require("path");
const webpack = require("webpack");
const common = require("./webpack.common.js");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const BrowserSyncPlugin = require('browser-sync-webpack-plugin')

const mapStyle = process.env.MAP_STYLE === "true";

module.exports = merge(common, {
  mode: "development",
  devtool: "inline-source-map",

  module: {
    rules: [
      {
        test: /\.less$/,
        use: [
          MiniCssExtractPlugin.loader,
          { loader: "css-loader", options:{modules: true, localIdentName:'[nmweb]__[local]___[hash:base64:5]'} },
          { loader: "less-loader" }
        ]
      }
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: "../../public/css/[name].css",
    }),
   
    new BrowserSyncPlugin({
      host: 'localhost',
      port: 3001,
      proxy: 'http://localhost:3000/'
  })
  ]
});
