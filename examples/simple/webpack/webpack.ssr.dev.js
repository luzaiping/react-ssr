const path = require('path')
const fs = require('fs')
const nodeExternals = require('webpack-node-externals')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const merge = require('webpack-merge')
const commonConfig = require('../webpack/webpack.common')
let baseDirName = path.resolve(__dirname, '../')

function generateLoaderFile() {
  const getLoaderHtml = require('../../../src/loader')
  const config = require('../config')
  const html = getLoaderHtml(config)
  let file = path.resolve(baseDirName, 'dist', 'loader.html')
  fs.writeFileSync(file, html, 'utf8')
  console.log('========= generate loader html successfully ===========')
}

generateLoaderFile()

module.exports = merge.smartStrategy(
  {
    'module.rules': 'append'
  }
)(commonConfig, {
  entry: path.resolve(baseDirName, 'entry', 'ssr.js'), // 供 j2v8 或 nodejs 调用，无需分成多个entry
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
      { from: path.join(baseDirName, 'assets'), to: path.join(baseDirName, 'dist') }
    ])
  ]
})
