const path = require('path')
const nodeExternals = require('webpack-node-externals')

module.exports = {
  name: 'ssr',
  entry: './app/client.js',
  output: {
    path: path.join(__dirname, '..', 'build'),
    filename: 'client.js'
    /* ,
    libraryTarget: 'commonjs2',
    publicPath: '/build/', */
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        include: path.join(__dirname, '..', 'app'),
        exclude: path.join(__dirname, '..', 'node_modules'),
      },
    ],
  },
}