// include and initialize the rollbar library with your access token
var Rollbar = require('rollbar')
var rollbar = new Rollbar({
  accessToken: '93caeab6b0b34dbdb87369bee04b0c96',
  captureUncaught: true,
  captureUnhandledRejections: true,
})


module.exports = rollbar;