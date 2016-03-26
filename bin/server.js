const config = require("../config");
const server = require("../server/main");
const debug = require("debug");


const log = debug('app:bin:server')
const port = config.server_port
const host = config.server_host

server.listen(port)
log(`Server is now running at http://${host}:${port}.`)
