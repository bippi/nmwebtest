const merge = require("webpack-merge");
const path = require("path");
const webpack = require("webpack");
var OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const common = require("./webpack.common.js");
console.log('production build', process.env.NODE_ENV);

const TerserPlugin = require('terser-webpack-plugin');

const MiniCssExtractPlugin = require("mini-css-extract-plugin");



const mapStyle = process.env.MAP_STYLE === "false";
module.exports = merge(common, {
  mode: "production",
 
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
    new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
    new MiniCssExtractPlugin({
    filename: "../../public/css/[name].css",
    minify: true,
    }
    ),
   
    new OptimizeCssAssetsPlugin({
     // assetNameRegExp: /\.optimize\.css$/g,
      cssProcessor: require('cssnano'),
      cssProcessorPluginOptions: {
        preset: ['default', { discardComments: { removeAll: true } }],
      },
      canPrint: true
    })
  ],
});

