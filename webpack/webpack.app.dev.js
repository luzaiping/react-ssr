const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const merge = require('webpack-merge')
const { commonConfig, baseDirName } = require('./webpack.common')

module.exports =  merge.smartStrategy(
  {
    'module.rules': 'append'
  }
)(commonConfig, {
  devtool: 'cheap-module-eval-source-map',
  entry: { app: './app/index.js' },
  output: {
    path: path.resolve(baseDirName, 'dist'),
    filename: '[name].[hash].js',
    publicPath: '/'
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        include: path.resolve(baseDirName, 'app'),
        exclude: path.resolve(baseDirName, 'node_modules'),
        use: ExtractTextPlugin.extract(
          {
            fallback: 'style-loader',
            use: [
              {
                loader: 'css-loader',
                options: {
                  modules: true,
                  importLoaders: 1,
                  localIdentName: '[name]__[local]___[hash:base64:5]'
                }
              },
              {
                loader: 'postcss-loader'
              }
            ]
          }
        )
      }
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': { CLIENT: true }
    }),
    new HtmlWebpackPlugin({
      title: 'SSR Demo',
      filename: 'template.html',
      template: path.resolve(__dirname, 'template.html')
    }),
    new ExtractTextPlugin({
      filename: 'app.[hash].css'
    })
  ]
})
