const path = require('path')
const precss = require('precss')
const postcssModulesValue = require('postcss-modules-values')
const postcssUtilities = require('postcss-utilities')
const autoprefixer = require('autoprefixer')

let baseDirName = path.resolve(__dirname, '../')

module.exports = {
  baseDirName,
  assetsPath: path.resolve(baseDirName, 'dist'),
  commonLoaders: [
    {
      test: /\.(js|jsx)$/,
      loader: 'eslint-loader',
      include: [
        path.join(baseDirName, 'app'),
        path.join(baseDirName, 'server')
      ],
      exclude: [
        /node_modules/
      ],
      query: {
        emitWarning: true
      },
      enforce: 'pre'
    },
    {
      test: /\.(js|jsx)$/,
      use: {
        loader: 'babel-loader'
      },
      exclude: path.resolve(baseDirName, 'node_modules')
    }
  ],
  resolve: {
    extensions: ['.js', '.jsx'],
    alias: {
      app: path.resolve(baseDirName, 'app'),
      constants: path.resolve(baseDirName, 'app/constants'),
      utils: path.resolve(baseDirName, 'app/utils')
    }
  }
}
