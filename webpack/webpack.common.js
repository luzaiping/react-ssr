const path = require('path')

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
      include: [path.resolve(baseDirName, 'app'), path.resolve(baseDirName, 'server')],
      exclude: path.resolve(baseDirName, 'node_modules')
    }
  ],
  resolve: {
    extensions: ['.js', '.jsx']
  }
}
