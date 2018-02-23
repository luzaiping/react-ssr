const path = require('path')
const webpack = require('webpack')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const UglifyJSPlugin  = require('uglifyjs-webpack-plugin')
const { baseDirName, assetsPath, commonLoaders, resolve } = require('./webpack.common')

module.exports = {
  entry: ['babel-polyfill', './server/ssr.js'],
  output: {
    path: assetsPath,
    filename: 'ssr.js',
    libraryTarget: 'commonjs2'
  },
  target: 'node',
  module: {
    rules: commonLoaders.concat([
      {
        test: /\.css$/,
        include: path.resolve(baseDirName, 'app'),
        exclude: path.resolve(baseDirName, 'node_modules'),
        use: [
          {
            loader: 'css-loader/locals',
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
    ])
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {NODE_ENV: JSON.stringify('production')}
    }),
    new CopyWebpackPlugin([
      {from: path.join(baseDirName, 'template'), to: path.join(baseDirName, 'dist')}
    ]),
    new UglifyJSPlugin()
  ],
  resolve
}
