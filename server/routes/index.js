const fs = require("fs");
const config = require("../../config");
const Router = require("koa-router")
const Handlebars = require("handlebars");

module.exports = function(app) {
  var router = new Router()

  // register json helper
  Handlebars.registerHelper('json', (obj) => JSON.stringify(obj) )

  const react = function( next ) {
    this.redirect("/index.html");
  }

  router
    .get("/", react, function *(next) {
      yield this.render("../dist/index", {
        data: {
          user: "..."
        }
      });

    })

    .post("/", function *(next) {
      this.body = "Post's requests work too!"
    })

  app.use(router.routes())
  app.use(router.allowedMethods())

  return router
}