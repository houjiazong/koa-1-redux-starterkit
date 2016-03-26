const debug = require("debug");
const path = require("path");

const log = debug("app:config:base");

const config = {
  env : process.env.NODE_ENV || 'development',

  // ----------------------------------
  // Project Structure
  // ----------------------------------
  path_base  : path.resolve(__dirname, '..'),
  dir_client : 'src',
  dir_dist   : 'dist',
  dir_server : 'server',
  dir_test   : 'tests',
  dir_views  : 'views',
  app_entry  : 'app',

  // ----------------------------------
  // Server Configuration
  // ----------------------------------
  server_host : 'localhost',
  server_port : process.env.PORT || 8080,

  // ----------------------------------
  // Compiler Configuration
  // ----------------------------------
  compiler_devtool         : 'source-map',
  compiler_hash_type       : 'hash',
  compiler_fail_on_warning : false,
  compiler_quiet           : false,
  compiler_public_path     : '',
  compiler_stats           : {
    chunks : false,
    chunkModules : false,
    colors : true
  },
  compiler_vendor : [
    'history',
    'react',
    'react-redux',
    'react-router',
    'react-router-redux',
    'redux'
  ]
}

config.paths = (() => {
  const resolve = path.resolve

  const base = resolve.bind(resolve, config.path_base)

  return {
    base   : base,
    client : base.bind(resolve, config.dir_client),
    dist   : base.bind(resolve, config.dir_dist),
    views  : base.bind(resolve, config.dir_views)
  }

})();

config.app_entry_path = config.paths.client( config.app_entry )

config.globals = {
  'process.env'  : {
    'NODE_ENV' : JSON.stringify(config.env)
  },
  'NODE_ENV'     : config.env,
  '__DEV__'      : config.env === 'development',
  '__PROD__'     : config.env === 'production',
  '__TEST__'     : config.env === 'test',
  '__DEBUG__'    : config.env === 'development',
  '__DEBUG_NEW_WINDOW__' : false,
  '__BASENAME__' : JSON.stringify(process.env.BASENAME || '')
}

module.exports = config