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

module.exports.clone = clone;
module.exports.checkout = checkout;
