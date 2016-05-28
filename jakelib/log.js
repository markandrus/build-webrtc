'use strict';

var colors = require('colors/safe');

/**
 * Log a string.
 * @param {string} str - the string to log
 * @returns {undefined}
 */
function log(str) {
  console.log(colors.green.underline('\n' + str + '\n'));
}

module.exports = log;
