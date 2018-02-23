const path = require('path')
const webpack = require('webpack')
const { baseDirName, assetsPath, commonLoaders, resolve } = require('./webpack.common')

module.exports = {
  devtool: 'cheap-module-eval-source-map',
  entry: ['babel-polyfill', './app/index.js'],
  output: {
    path: assetsPath,
    filename: 'bundle.js',
    publicPath: '/'
  },
  module: {
    rules: commonLoaders.concat([
      {
        test: /\.css$/,
        include: path.resolve(baseDirName, 'app'),
        exclude: path.resolve(baseDirName, 'node_modules'),
        use: [
          { 
            loader: 'style-loader'
          },
          {
            loader: 'css-loader',
            options: {
              modules: true,
              importLoaders: 1, // configure how many loaders before css-loader should be applied to @imported resources. so PostCSS to git @import statements first
              localIdentName: '[name]__[local]___[hash:base64:5]'
            }
          },
          {
            loader: 'postcss-loader'
          }
        ]
      }
    ])
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': { CLIENT: true }
    })
  ],
  resolve
}
