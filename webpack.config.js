const path = require('path')
const nodeExternals = require('webpack-node-externals')

module.exports = {
  name: 'ssr',
  entry: './app/ssr.js',
  output: {
    path: path.join(__dirname, '.', 'build'),
    filename: 'dist.js',
    libraryTarget: 'commonjs2',
    publicPath: '/build/',
  },
  target: 'node',
  externals: nodeExternals(),  
  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        include: path.join(__dirname, '.', 'app'),
        exclude: path.join(__dirname, '.', 'node_modules'),
      },
    ],
  },
}