// these will override the base config
module.exports = (config) => ({
    compiler_public_path: `http://${config.server_host}:${config.server_port}/`,
    proxy: {
      enabled: false,
      options: {
        // koa-proxy options
        host: 'http://localhost:8000',
        match: /^\/api\/.*/
      }
    }
})