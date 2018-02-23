const path = require('path')
const webpack = require('webpack')
const merge = require('webpack-merge')
const { commonConfig, baseDirName } = require('./webpack.common')

module.exports =  merge.smartStrategy(
  {
    'module.rules': 'append'
  }
)(commonConfig, {
  devtool: 'cheap-module-eval-source-map',
  entry: { bundle: './app/index.js' },
  output: {
    path: path.resolve(baseDirName, 'dist'),
    filename: 'bundle.js',
    publicPath: '/'
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        include: path.resolve(baseDirName, 'app'),
        exclude: path.resolve(baseDirName, 'node_modules'),
        use: [
          { 
            loader: 'style-loader'
          },
          {
            loader: 'css-loader',
            options: {
              modules: true,
              importLoaders: 1, // configure how many loaders before css-loader should be applied to @imported resources. so PostCSS to git @import statements first
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
    new webpack.DefinePlugin({
      'process.env': { CLIENT: true }
    })
  ]
})
