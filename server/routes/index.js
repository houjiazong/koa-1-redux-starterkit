const Router = require("koa-router")
const Handlebars = require("handlebars");

module.exports = function(app) {
  var router = new Router()

  // register json helper
  Handlebars.registerHelper('json', (obj) => JSON.stringify(obj) )

  router

    .get("/", function *(next) {
      console.log(this.req.path);
      yield this.render("index", {
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