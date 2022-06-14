const path = require("path");
const webpack = require("webpack");
module.exports = {
  entry: {
    'app': path.resolve(__dirname, "../src/js", "App.js")
  },
  output: {
    filename: "[name].js",
    path: path.resolve(__dirname, "../public/js"),
    publicPath: "/"
  },
  devServer: {
    port: 3042,
    historyApiFallback: true,
    overlay: true,
    open: true
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: [/node_modules/],
        use: [{ loader: "babel-loader" }]
      },
      {
        test: /.*\.(gif|png|jp(e*)g|svg)$/i,
        use: [
          {
            loader: "url-loader",
            options: {
              limit: 21000,
              name: "images/[name]_[hash:7].[ext]"
            }
          }
        ]
      }
    ]
  },

  resolve: {
    extensions: [".js", ".jsx"],
    modules: ['node_modules', 'src/js'],
  }
};
