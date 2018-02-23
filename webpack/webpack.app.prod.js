const path = require('path')
const webpack = require('webpack')
const UglifyJSPlugin  = require('uglifyjs-webpack-plugin')
const { baseDirName, assetsPath, commonLoaders, resolve } = require('./webpack.common')

module.exports = {
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
      'process.env': {NODE_ENV: JSON.stringify('production')}
    }),
    new UglifyJSPlugin({  // 支持 tree shaking，使得没用到的代码不会被包含到bundle里
      // sourceMap: true
    })
  ],
  resolve
}
