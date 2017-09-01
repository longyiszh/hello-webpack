const path = require("path");
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

const extractPlugin = new ExtractTextPlugin({
  filename: 'main.css'
});

module.exports = {
    entry: './src/testMain.js',
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: "bundle.js"
      // publicPath: "/dist"
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
        // {
        //   test: /\.scss$/,
        //   use: extractPlugin.extract({
        //     use: ['css-loader', 'sass-loader']
        //   })
        // },
        {
          test: /\.(scss)$/,
          use: [
            {
            loader: 'style-loader', // inject CSS to page
            },
            {
              loader: 'css-loader', // translates CSS into CommonJS modules
            },
            {
              loader: 'postcss-loader', // Run post css actions
              options: {
                plugins: function () { // post css plugins, can be exported to postcss.config.js
                  return [
                    require('precss'),
                    require('autoprefixer')
                  ];
                }
              }
            },
            {
              loader: 'sass-loader' // compiles SASS to CSS
            }
          ]
        },
        {
          test: /\.html$/,
          use: ['html-loader']
        },
        {
          test: /\.(jpg|png)$/,
          use: [
            {
              loader: 'file-loader',
              options: {
                name: '[name].[ext]',
                outputPath: 'Pic/'
                // publicPath: 'Pic/'
              }
            }
          ]
        },
        {
          test: /\.(eot|svg|ttf|woff|woff2)$/,
          loader: 'file-loader',
          options: {
            name: '[name].[ext]',
            outputPath: 'fonts/'
          }
        }
      ]
    },
    plugins:[
      // new webpack.optimize.UglifyJsPlugin({
      //   // ...
      // }),
      extractPlugin,
      new webpack.ProvidePlugin({
        $: 'jquery',
        jQuery: 'jquery',
        'window.jQuery': 'jquery'
      }),
      new CleanWebpackPlugin(['dist']),

      // 管理多个html页。这里除了index.html，还有mapFO4.html和mapWitcher3.html
      // 第一种方法：给每个html页都用一个HtmlWebpackPlugin
      new HtmlWebpackPlugin({
        filename: 'index.html',
        template: "src/index.html"
        // chunks: [] // to tell what bundles to inject.
        // name configured at entry point using a javascript object {}
      }),
      new HtmlWebpackPlugin({
        filename: 'mapFO4.html',
        template: "src/mapFO4.html"
      }),
      new HtmlWebpackPlugin({
        filename: 'mapWitcher3.html',
        template: "src/mapWitcher3.html"
      })
      // 第二种方法： 除了index用HtmlWebpackPlugin管之外，其他都用file-loader管。
      // 在上面的rules里面再加一个 /\.html$/ , 类似 (jpg|png) 那一条的写法
      // 目录不写，默认是根
      // 记得写 exclude: path.resolve(__dirname, 'src/index.html')
    ]
}