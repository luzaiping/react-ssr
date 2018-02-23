const webpack = require('webpack')
const merge = require('webpack-merge')
const UglifyJSPlugin  = require('uglifyjs-webpack-plugin')

const devConfig = require('./webpack.app.dev')

module.exports = merge.smartStrategy(
  {
    'devtool': 'replace',
    'plugins': 'replace'
  }
)(devConfig, {
  devtool: false,
  plugins: [
    new webpack.DefinePlugin({
      'process.env': { NODE_ENV: JSON.stringify('production'), CLIENT: true }
    }),
    new UglifyJSPlugin()
  ]
})
