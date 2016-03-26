const applyExpressMiddleware = require("../lib/applyExpressMiddleware");
const WebpackHotMiddleware = require("webpack-hot-middleware");
const debug = require("debug");

const log = debug('app:server:webpack-hmr')

module.exports = function (compiler, opts) {
  log('Enable Webpack Hot Module Replacement (HMR).')

  const middleware = WebpackHotMiddleware(compiler, opts)

  return function* (next) {
    var hasNext = yield applyExpressMiddleware(middleware, this.req, this.res)

    if (hasNext && next && typeof next === "function") {
      next()
    }
  }
}
