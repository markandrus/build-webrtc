'use strict';

var find = require('find');
var fse = require('fs-extra');
var path = require('path');

/**
 * Copy file.
 * @param {string} src - the source file
 * @param {string} dst - the destination file
 * @returns {Promise} - resolves once copy succeeds
 */
function file(src, dst) {
  return new Promise(function(resolve, reject) {
    fse.copy(src, dst, function(error) {
      return error ? reject(error) : resolve();
    });
  });
}

/**
 * Copy files from one directory to another (relative path is preserved).
 * @param {RegExp} pattern - a pattern for matching files
 * @param {string} inDir - the directory to search in
 * @param {string} outDir - the directory to copy matching files to
 * @returns {Promise} - resolves once all copies succeed
 */
function files(pattern, inDir, outDir) {
  return new Promise(function(resolve, reject) {
    var copies = [];
    find.eachfile(pattern, inDir, function(src) {
      var rel = path.relative(inDir, src);
      var dst = path.join(outDir, rel);
      console.log('    ' + rel);
      copies.push(file(src, dst));
    }).end(function() {
      Promise.all(copies).then(function() {
        console.log();
        resolve();
      }, reject);
    });
  });
}

exports.file = file;
exports.files = files;
