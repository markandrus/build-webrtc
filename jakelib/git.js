'use strict';

var execSync = require('child_process').execSync;

/**
 * Run git clone.
 * @param {string} repo - the URL of the repo to clone
 * @param {object} [execOptions] - exec options
 * @returns {Buffer|String} - the stdout from the command
 */
function clone(repo, execOptions) {
  execOptions = Object.assign({
    stdio: 'inherit'
  }, execOptions);

  return execSync('git clone ' + repo, execOptions);
}

/**
 * Run git checkout.
 * @param {string} ref - the git ref to checkout
 * @param {object} [execOptions] - exec options
 * @returns {Buffer|String} - the stdout from the command
 */
function checkout(ref, execOptions) {
  execOptions = Object.assign({
    stdio: 'inherit'
  }, execOptions);

  return execSync('git checkout ' + ref, execOptions);
}

/**
 * Run git branch.
 * @param {object} [gitOptions] - git options
 * @param {object} [execOptions] - exec options
 * @returns {Buffer|String} - the stdout from the command
 */
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

/**
 * Run git show-ref.
 * @param {string} ref - the git ref to show
 * @param {object} [gitOptions] - git options
 * @param {object} [execOptions] - exec options
 * @returns {Buffer|String} - the stdout from the command
 */
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
