const express = require('express')
const webpack = require('webpack')
const devMiddleware = require('webpack-dev-middleware')

const webpackConfig = require('./webpack/webpack.client.js')
const render = require('./dist/ssr.js') // 请求通过webpack编译好的 dist 文件，服务启动前应该先编译好这个文件

const isProduction = process.env.NODE_ENV === 'production'

const app = express()

// 生产环境，直接请求已经编译好的client文件，对应目录是 dist 文件夹
if (isProduction) {
  app.use(express.static('dist'))
} else {
  // 开发环境 使用 webpack-dev-middleware 内存形式运行 bundler.js 文件
  const compiler = webpack(webpackConfig)
  app.use(devMiddleware(compiler, {
    noInfo: true,
    publicPath: webpackConfig.output.publicPath
  }))
}

app.get('/', render.default) // 根目录的请求由 render.default 处理

const port = 4000
app.listen(port)
console.log(`Listening on port ${port}`)
