const webpack = require('webpack')
const merge = require('webpack-merge')
const UglifyJSPlugin  = require('uglifyjs-webpack-plugin')

const devConfig = require('./webpack.app.dev')

let config = merge.smartStrategy(
  {
    devtool: 'replace',
    entry: 'replace'
  }
)(devConfig, {
  devtool: false,
  entry: { 
    app: '../index.js',
    vendors: ['react', 'react-dom', 'react-redux', 'react-router', 'react-router-redux', 'redux', 'redux-thunk']
  },
  output: {
    filename: '[name].[chunkhash].js'
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': { NODE_ENV: JSON.stringify('production'), CLIENT: true }
    }),
    new webpack.optimize.CommonsChunkPlugin({
      names: [ 'vendors' ]
    }),
    new UglifyJSPlugin()
  ]
})

module.exports = config

