'use strict';

var config = require('./config');
var execSync = require('child_process').execSync;

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

  var cmd = GN + ' gen ' + cwd + ' --args=\'is_debug=' + (config.CONFIGURATION !== 'Release') + ' rtc_include_tests=false\'';

  return execSync(cmd, execOptions);
}

module.exports = gn;
