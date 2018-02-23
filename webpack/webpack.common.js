const path = require('path')
let baseDirName = path.resolve(__dirname, '../')

const commonConfig = {
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        loader: 'eslint-loader',
        exclude: /node_modules/,
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
        exclude: /node_modules/
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8192,
              name: 'images/[hash].[ext]'
            }
          }
        ]
      },
      {
        test: /\.(woff|woff2|[ot]tf|eot|svg)(\?t=[0-9]+(#\w+)?)?$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 51200,
              name: 'fonts/[hash].[ext]'
            }
          }
        ]
      }
    ]
  },
  resolve: {
    extensions: ['.js', '.jsx'],
    alias: {
      app: path.resolve(baseDirName, 'app'),
      constants: path.resolve(baseDirName, 'app/constants'),
      utils: path.resolve(baseDirName, 'app/utils'),
      css: path.resolve(baseDirName, 'styles/css'),
      fonts: path.resolve(baseDirName, 'styles/fonts')
    }
  }
}

module.exports = {
  commonConfig,
  baseDirName
}
