const path = require('path')
const nodeExternals = require('webpack-node-externals')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const merge = require('webpack-merge')
const { commonConfig, baseDirName } = require('./webpack.common')

module.exports = merge.smartStrategy(
  {
    'module.rules': 'append'
  }
)(commonConfig, {
  entry: './ssr/index.js',
  output: {
    path: path.resolve(baseDirName, 'dist'),
    filename: 'ssr.js',
    libraryTarget: 'commonjs2'
  },
  target: 'node',
  externals: nodeExternals(),
  module: {
    rules: [
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
    ]
  },
  plugins: [
    new CopyWebpackPlugin([
      { from: path.join(baseDirName, 'template'), to: path.join(baseDirName, 'dist') }
    ])
  ]
})
