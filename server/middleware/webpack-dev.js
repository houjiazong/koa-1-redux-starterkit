const applyExpressMiddleware = require("../lib/applyExpressMiddleware");
const WebpackDevMiddleware = require("webpack-dev-middleware");
const debug = require("debug");
const config = require("../../config");

const paths = config.paths
const log = debug('app:server:webpack-dev')

module.exports = function (compiler, publicPath) {
  log('Enable webpack dev middleware.')

  const middleware = WebpackDevMiddleware(compiler, {
    publicPath: publicPath,
    contentBase: paths.client(),
    hot: true,
    quiet: config.compiler_quiet,
    noInfo: config.compiler_quiet,
    lazy: false,
    stats: config.compiler_stats
  })

  return function* (next) {
    var ctx = this;

    var nextStep = yield applyExpressMiddleware(middleware, ctx.req,  {
      end: (content) => (ctx.body = content),
      setHeader: function () {
        ctx.set.apply(ctx, arguments)
      }
    });

    if (nextStep && next) {
      yield* next;
    }
  }
}
