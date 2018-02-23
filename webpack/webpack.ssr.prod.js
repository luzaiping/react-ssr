const webpack = require('webpack')
const merge = require('webpack-merge')
const UglifyJSPlugin  = require('uglifyjs-webpack-plugin')

const devConfig = require('./webpack.ssr.dev')
const copyConfig = Object.assign({}, devConfig)
delete copyConfig.externals

module.exports = merge.smartStrategy(
  {
    'plugins': 'append'
  }
)(copyConfig, {
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {NODE_ENV: JSON.stringify('production')}
    }),
    new UglifyJSPlugin()
  ]
})
