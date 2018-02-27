/**
 * node 服务端，本地开发使用，用于运行 ssr middleware
 */

const express = require('express')
const webpack = require('webpack')
const devMiddleware = require('webpack-dev-middleware')
const favicon = require('serve-favicon')
const path = require('path')
const fs = require('fs')
const render = require('./dist/ssr.js')

const isProduction = process.env.NODE_ENV === 'production'
let template

const app = express()

app.use(favicon(path.join(__dirname, 'dist', 'favicon.ico'))) // 处理 /favicon.ico 请求

// 生产环境，直接请求已经编译好的client bundle.js文件，对应目录是 dist 文件夹
if (isProduction) {
  app.use(express.static('dist'))
} else {
  // 开发环境 使用 webpack-dev-middleware 在内存中运行 bundler.js 文件
  const webpackConfig = require('./webpack/webpack.app.dev.js')
  const compiler = webpack(webpackConfig)
  app.use(devMiddleware(compiler, {
    publicPath: webpackConfig.output.publicPath,
    serverSideRender: true
  }))
}

// app.get('/api/*', apiMiddleware)
app.use('/ssr/**', ssrMiddleware) // 所有 ssr 开头的请求交由 ssrMiddleware 处理
app.use(loaderMiddleware) // 其他请求统一交由 loaderMiddleware 处理，经过处理后将请求转由 ssrMiddleware 处理

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
  let { query = {}, params } = req

  try {
    template = template || getTemplate()

    render(template, { query: { route: query.r }})
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

  } catch (err) {
    res.send(err)
    return
  }

  function getTemplate() {
    let templateName = (params && params[0]) || 'template'
    let templateDir = isProduction ? 'dist' : 'webpack'
    let file = path.join(__dirname, templateDir, `${templateName}.html`)

    // 模板内容不存在，则读取对应模板文件
    let templateContent = fs.readFileSync(file, 'utf8')
    return isProduction ? templateContent : dynamicTemplate()

    // 如果使用 html-webpack-plugin 生成模板文件，并且使用 webpack-dev-middleware (或 webpack-dev-server)
    // 则需要手动将构建好的 css 和 js 添加到 template 里，而且 js assets 的添加顺序要遵循依赖关系，否则会导致脚本执行有误
    function dynamicTemplate() {
      let statsJson = res.locals.webpackStats.toJson()

      let sortChunks =  require('html-webpack-plugin/lib/chunksorter.js').dependency
      const sortedChunks = sortChunks(statsJson.chunks) // 已经排好关联关系的 chunks

      let assets = [] // 用于存放所有 assets

      for (let chunk of sortedChunks) {
        assets = assets.concat(chunk.files || [])
      }

      let linkContent = assets.filter(path => path.endsWith('.css')).map(path => `<link rel="stylesheet" href="${path}" />`).join('\n')
      let scriptContent = assets.filter(path => path.endsWith('.js')).map(path => `<script src="${path}"></script>`).join('\n')

      return appendHtml()

      // 丑到爆的实现方式
      function appendHtml() {
        let headIndex = templateContent.indexOf('</head>')
        let bodyIndex = templateContent.indexOf('</body>')

        let headContent = templateContent.substring(0, headIndex)
        let bodyContent = templateContent.substring(headIndex + 7, bodyIndex)
        let endContent = templateContent.substring(bodyIndex)

        let html = `${headContent}${linkContent}${bodyContent}${scriptContent}${endContent}`

        let { title } = require('./config')

        return html.replace('<%= htmlWebpackPlugin.options.title %>', title)
      }
    }

  }

}

