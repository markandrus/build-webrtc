'use strict';

var config = require('./config');
var execSync = require('child_process').execSync;

var NINJA = config.NINJA;

/**
 * Run ninja.
 * @param {string} cwd - the directory to run ninja in
 * @param {object} [execOptions] - exec options
 * @returns {Buffer|String} - the stdout from the command
 */
function ninja(cwd, execOptions) {
  execOptions = Object.assign({
    stdio: 'inherit'
  }, execOptions);

  var cmd = NINJA + ' -C ' + cwd;

  return execSync(cmd, execOptions);
}

module.exports = ninja;
