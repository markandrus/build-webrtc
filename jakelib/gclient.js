'use strict';

var execSync = require('child_process').execSync;

var GCLIENT = require('./config').GCLIENT;

/**
 * Run gclient config.
 * @param {string} url - the URL to use
 * @param {object} [gclientOptions] - gclient options
 * @param {object} [execOptions] - exec options
 * @returns {Buffer|String} - the stdout from the command
 */
function config(url, gclientOptions, execOptions) {
  gclientOptions = Object.assign({
    name: 'src'
  }, gclientOptions);

  execOptions = Object.assign({
    stdio: 'inherit'
  }, execOptions);

  var cmd = GCLIENT + ' config ' + url;

  if (gclientOptions.name) {
    cmd += ' --name=' + gclientOptions.name;
  }

  return execSync(cmd, execOptions);
}

/**
 * Run gclient sync.
 * @param {object} [gclientOptions] - gclient options
 * @param {object} [execOptions] - exec options
 * @returns {Buffer|String} - the stdout from the command
 */
function sync(gclientOptions, execOptions) {
  gclientOptions = Object.assign({
    force: true,
    withBranchHeads: true,
    noHooks: false
  }, gclientOptions);

  execOptions = Object.assign({
    stdio: 'inherit'
  }, execOptions);

  var cmd = GCLIENT + ' sync';

  if (gclientOptions.force) {
    cmd += ' --force';
  }

  if (gclientOptions.withBranchHeads) {
    cmd += ' --with_branch_heads';
  }

  if (gclientOptions.noHooks) {
    cmd += ' --nohooks';
  }

  return execSync(cmd, execOptions);
}

/**
 * Run gclient runhooks.
 * @param {object} [execOptions] - exec options
 * @returns {Buffer|String} - the stdout from the command
 */
function runHooks(execOptions) {
  execOptions = Object.assign({
    stdio: 'inherit'
  }, execOptions);

  var cmd = GCLIENT + ' runhooks';

  return execSync(cmd, execOptions);
}

module.exports.config = config;
module.exports.sync = sync;
module.exports.runHooks = runHooks;
