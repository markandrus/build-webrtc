'use strict';

var config = require('./config');
var execSync = require('child_process').execSync;

var NINJA = config.NINJA;

function ninja(cwd, execOptions) {
  execOptions = Object.assign({
    stdio: 'inherit'
  }, execOptions);

  var cmd = NINJA + ' -C ' + cwd;

  return execSync(cmd, execOptions);
}

module.exports = ninja;
