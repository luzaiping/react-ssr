const ssrMiddleware = require('./ssr.js').ssrMiddleware
const apiMiddleware = require('./api.js').apiMiddleware

module.exports = {
  ssrMiddleware,
  apiMiddleware
}
