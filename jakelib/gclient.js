'use strict';

var execSync = require('child_process').execSync;

var GCLIENT = require('./config').GCLIENT;

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

function sync(gclientOptions, execOptions) {
  gclientOptions = Object.assign({
    withBranchHeads: true
    noHooks: false
  }, gclientOptions);

  execOptions = Object.assign({
    stdio: 'inherit'
  }, execOptions);

  var cmd = GCLIENT + ' sync';

  if (gclientOptions.withBranchHeads) {
    cmd += ' --with_branch_heads';
  }

  if (gclientOptions.noHooks) {
    cmd += ' --nohooks';
  }

  return execSync(cmd, execOptions);
}

module.exports.config = config;
module.exports.sync = sync;
