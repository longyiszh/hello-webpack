const path = require("path");
const webpack = require('webpack');

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
        }
      ]
    },
    plugins:[
      new webpack.optimize.UglifyJsPlugin({
        // ...
      })
    ]
}