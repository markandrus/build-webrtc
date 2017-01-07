'use strict';

var config = require('./config');
var execFileSync = require('child_process').execFileSync;

var GN = config.GN;

/**
 * Run gn.
 * @param {string} cwd - the directory to run gn in
 * @param {object} [execOptions] - exec options
 * @returns {Buffer|String} - the stdout from the command
 */
function gn(cwd, execOptions) {
  execOptions = Object.assign({
    stdio: 'inherit'
  }, execOptions);

  var args = ['gen', cwd, '--args=is_debug=' + (config.CONFIGURATION !== 'Release') + ' rtc_include_tests=false'];

  return execFileSync(GN, args, execOptions);
}

module.exports = gn;
