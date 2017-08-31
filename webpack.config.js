const path = require("path");
//const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const extractPlugin = new ExtractTextPlugin({
  filename: 'main.css'
});

module.exports = {
    entry: './src/js/testMain.js',
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: "bundle.js",
      publicPath: "/dist"
    },
    module: {
      rules: [
        {
          test: /\.css$/,
          use: [
            // loader modules are loaded in a reversed order by webpack
            // <-- The last to load
            "style-loader",
            "css-loader"
            // <-- The first to load
          ]
        },
        {
          test: /\.js$/,
          use: [
            {
              loader: "babel-loader",
              options: {
                presets: ['es2015']
              }
            }
          ]
        },
        {
          test: /\.scss$/,
          use: extractPlugin.extract({
            use: ['css-loader', 'sass-loader']
          })
        }
      ]
    },
    plugins:[
      // new webpack.optimize.UglifyJsPlugin({
      //   // ...
      // }),
      extractPlugin
    ]
}