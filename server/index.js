const express = require('express')
const webpack = require('webpack')
const webpackConfig = require('../webpack/webpack.client.js')
const devMiddleware = require('webpack-dev-middleware')

const render = require('../build/server.js') // 请求通过webpack编译好的 dist 文件，服务启动前应该先编译好这个文件

const app = express()

const compiler = webpack(webpackConfig)
app.use(devMiddleware(compiler, {
    noInfo: true,
    publicPath: webpackConfig.output.publicPath
}))

app.get('/', render.default) // 根目录的请求由 render.default 处理。 render.default 请求 renderToString，将 App 的内容转成 html markup 并 response

const port = 4000
app.listen(port)
console.log(`Listening on port ${port}`)