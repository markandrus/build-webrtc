'use strict';

var config = require('./config');
var execFileSync = require('child_process').execFileSync;

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

  var args = ['-C', cwd];

  return execFileSync(NINJA, args, execOptions);
}

module.exports = ninja;
