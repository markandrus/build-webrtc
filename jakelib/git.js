'use strict';

var execSync = require('child_process').execSync;

function clone(repo, execOptions) {
  execOptions = Object.assign({
    stdio: 'inherit'
  }, execOptions);

  return execSync('git clone ' + repo, execOptions);
}

function checkout(ref, execOptions) {
  execOptions = Object.assign({
    stdio: 'inherit'
  }, execOptions);

  return execSync('git checkout ' + ref, execOptions);
}

function branch(gitOptions, execOptions) {
  gitOptions = Object.assign({}, gitOptions);

  execOptions = Object.assign({
    stdio: 'inherit'
  }, execOptions);

  var cmd = 'git branch';

  if (gitOptions.contains) {
    cmd += ' --contains ' + gitOptions.contains;
  }

  return execSync(cmd, execOptions);
}

function showRef(ref, gitOptions, execOptions) {
  gitOptions = Object.assign({
    abbrev: false,
    hash: false
  }, gitOptions);

  execOptions = Object.assign({
    stdio: 'inherit'
  }, execOptions);

  var cmd = 'git show-ref ' + ref;

  if (gitOptions.abbrev) {
    cmd += ' --abbrev';
  }

  if (gitOptions.hash) {
    cmd += ' --hash';
  }

  if (gitOptions.head) {
    cmd += ' --head';
  }

  return execSync(cmd, execOptions);
}

module.exports.clone = clone;
module.exports.checkout = checkout;
module.exports.branch = branch;
module.exports.showRef = showRef;
