const fs = require("fs");
const config = require("../../config");
const Router = require("koa-router")
const Handlebars = require("handlebars");

module.exports = function(app) {
  var router = new Router()

  // register json helper
  Handlebars.registerHelper('json', (obj) => JSON.stringify(obj) )

  const react = function *( next ) {
    this.req.url = "/index.html"
    yield next
  }

  router
    .get("/",  react)

  app.use(router.routes())
  app.use(router.allowedMethods())

  return router
}