const serve = require("koa-static");
const config = require("../config")
const Koa = require("koa")
const bodyParser = require("koa-bodyparser");
const logger = require("koa-logger");
const views = require("koa-views");
const debug = require("debug")

const globals = config.globals
const paths = config.paths
const __DEV__ = globals.__DEV__

const log = debug("app:server")
const app = new Koa()

app.use(views(paths.views(), {
  map: {
    'hbs': 'handlebars'
  },
  extension: 'hbs'
}))
app.use(bodyParser())
app.use(logger())



if ( __DEV__ || __TEST__ ) {

  log("Configurating webpack")

  const webpack = require("webpack")
  const webpackConfig = require("../webpack.config")
  const compiler = webpack(webpackConfig)

  const publicPath = webpackConfig.output.publicPath

  const webpackDevMiddleware = require("./middleware/webpack-dev")
  const webpackHMRMiddleware = require("./middleware/webpack-hmr")

  //app.use(webpackDevMiddleware(compiler, publicPath))
  //app.use(webpackHMRMiddleware(compiler))

  app.use(serve(paths.client('static')))

} else {
  log("Server is running on production, but doesn't do any production functionality")
  app.use(serve(paths.dist()))
}

log("Create routes")
require("./routes/index")(app);

module.exports = app;