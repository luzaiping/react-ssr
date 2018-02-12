/**
 * node 服务端，本地开发使用，用于运行 ssr middleware
 */

const express = require('express')
const webpack = require('webpack')
const devMiddleware = require('webpack-dev-middleware')
const favicon = require('serve-favicon')
const path = require('path')
const fs = require('fs')

const render = require('./dist/ssr.js').render

const isProduction = process.env.NODE_ENV === 'production'

const app = express()

app.use(favicon(path.join(__dirname, 'dist', 'favicon.ico'))) // 处理 /favicon.ico 请求

// 生产环境，直接请求已经编译好的client bundle.js文件，对应目录是 dist 文件夹
if (isProduction) {
  app.use(express.static('dist'))
} else {
  // 开发环境 使用 webpack-dev-middleware 在内存中运行 bundler.js 文件
  const webpackConfig = require('./webpack/webpack.client.dev.js')
  const compiler = webpack(webpackConfig)
  app.use(devMiddleware(compiler, {
    noInfo: true,
    publicPath: webpackConfig.output.publicPath
  }))
}

// app.get('/api/*', apiMiddleware)
app.use('/ssr/**', ssrMiddleware) // 所有 ssr 请求交由 ssrMiddleware 处理
app.use(loaderMiddleware)

const port = 4000
app.listen(port)
console.log(`Listening on port ${port}`)

function loaderMiddleware(req, res) {
  let file = path.join(__dirname, 'dist', 'loader.html')
  fs.readFile(file, 'utf8', (err, data) => {
    res.send(err || data)
  })
}

/**
 * 
 * @param {Request} req 
 * @param {Response} res 
 */
function ssrMiddleware(req = {}, res) {
  let { query } = req

  console.log('path ======', req.path)
  console.log('query ======', query)

  let templateName = req.path.substring(req.path.indexOf('/ssr') + 4) || 'template'
  let file = path.join(__dirname, 'dist', `${templateName}.html`)
  
  fs.readFile(file, 'utf8', (err, data) => {
    if (err) res.send(err)

    render(query.r, data)
      .then( (result = {} ) => {
        let { code, html, redirectLocation = {} } = result
        if (code) {
          res.redirect(`${redirectLocation.pathname}${redirectLocation.search}`)
        } else {
          res.status(200).send(html)
        }
      })
      .catch( (code, message) => {
        res.status(code).send(message)
      })
  })

}

/* function apiMiddleware(req, res) {

  const data = ['FJ', 'XM', 'SM']
  
  let { query = {} } = req
  
  let { index = 0 } = query
  
  setTimeout(() => {
    res.status(200).json(data.slice(index))
  }, 500)

} */
