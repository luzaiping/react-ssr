const path = require('path')
const webpack = require('webpack')
const { baseDirName, assetsPath, commonLoaders, resolve } = require('./webpack.common')

module.exports = {
  entry: './app/client.js',
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
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              modules: true,
              // importLoaders: 1,
              localIdentName: '[name]__[local]___[hash:base64:5]'
            }
          }
        ]
      }
    ])
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {NODE_ENV: JSON.stringify('production')}
    })
  ],
  resolve
}
