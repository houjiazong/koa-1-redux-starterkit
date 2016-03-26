const fs = require("fs");
const debug = require("debug");
const config = require("./_base");

const log = debug("app:config");
log('Create configuration.')

const overrideFilename = `_${config.env}`
var hasOverridesFile

try {
    // ./_development.js for example
    // returns error if not exists
    fs.lstatSync(`${__dirname}/${overrideFilename}.js`)
    hasOverridesFile = true
}catch (e) {}

var overrides
if (hasOverridesFile) {
    log(`Apply environment overrides for NODE_ENV "${config.env}".`)
    overrides = require(`./${overrideFilename}`)(config)
} else {
    debug(`No configuration overrides found for NODE_ENV "${config.env}"`)
}

module.exports = Object.assign({}, config, overrides)

