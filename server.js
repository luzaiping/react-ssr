const express = require('express')
const webpack = require('webpack')
const devMiddleware = require('webpack-dev-middleware')

const webpackConfig = require('./webpack/webpack.client.dev.js')

const isoMiddleware = require('./dist/ssr.js').isoMiddleware // 请求通过webpack编译好的 dist 文件，服务启动前应该先编译好这个文件

const isProduction = process.env.NODE_ENV === 'production'

const app = express()

// 生产环境，直接请求已经编译好的client bundle.js文件，对应目录是 dist 文件夹
if (isProduction) {
  app.use(express.static('dist'))
} else {
  // 开发环境 使用 webpack-dev-middleware 在内存中运行 bundler.js 文件
  const compiler = webpack(webpackConfig)
  app.use(devMiddleware(compiler, {
    noInfo: true,
    publicPath: webpackConfig.output.publicPath
  }))
}
// app.get('/', isoMiddleware) // 根目录的请求由 render.default 处理
app.use(isoMiddleware) // 所有请求交由 isoMiddleware 处理

const port = 4000
app.listen(port)
console.log(`Listening on port ${port}`)
