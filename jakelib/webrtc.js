'use strict';

var git = require('./git');
var os = require('os');

/**
 * Get the branch-head of a WebRTC checkout, if any.
 * @param {string} cwd - the WebRTC src directory
 * @returns {?Number} - the branch-head, if any
 */
function branchHead(cwd) {
  var branch = git.branch(
      { contains: 'HEAD' },
      { cwd: cwd, stdio: 'pipe' })
    .toString();
  var match = branch.match(/branch-heads\/([0-9]+)/);
  return match ? Number.parseInt(match[1], 10) : null;
}

/**
 * Get the commit of a WebRTC checkout.
 * @param {string} cwd - the WebRTC src directory
 * @returns {string} - the commit
 */
function commit(cwd) {
  return git.showRef(
      'HEAD',
      { abbrev: true, hash: true, head: true },
      { cwd: cwd, stdio: 'pipe' })
    .toString()
    .split('\n')[0];
}

/**
 * Get the tar.gz name to use when tar-ing and gzip-ing WebRTC.
 * @param {string} cwd - the WebRTC src directory
 * @returns {string} - the tar.gz name
 */
function tarGzName(cwd) {
  var bh = branchHead(cwd);
  var c = commit(cwd);
  var tarGz = 'webrtc';
  if (bh) {
    tarGz += '-' + bh;
  }
  return tarGz + '+' + [
    c,
    os.platform(),
    os.arch(),
    'tar.gz'
  ].join('.');
}

exports.branchHead = branchHead;
exports.commit = commit;
exports.tarGzName = tarGzName;
