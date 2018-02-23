const webpack = require('webpack')
const merge = require('webpack-merge')
const UglifyJSPlugin  = require('uglifyjs-webpack-plugin')

const devConfig = require('./webpack.app.dev')

let config = merge.smartStrategy(
  {
    'devtool': 'replace'
  }
)(devConfig, {
  devtool: false,
  output: {
    filename: '[name].[chunkhash].js'
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': { NODE_ENV: JSON.stringify('production'), CLIENT: true }
    }),
    new UglifyJSPlugin()
  ]
})

module.exports = config

