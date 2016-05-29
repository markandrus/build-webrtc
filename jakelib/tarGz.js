'use strict';

var fs = require('fs-extra');
var tar = require('tar-fs');
var zlib = require('zlib');

/**
 * Tar and gzip a directory of files.
 * @param {string} dir - the directory to tar
 * @param {string} dest - the destination file
 * @param {object} [tarOptions] - tar options
 * @returns {Promise} - resolves once all files have been tared and gzipped
 */
function tarGz(dir, dest, tarOptions) {
  return new Promise(function(resolve) {
    var gzip = zlib.createGzip();
    tarOptions = Object.assign({
      map: function(header) {
        console.log('    ' + header.name);
        return header;
      }
    }, tarOptions);
    tar.pack(dir, tarOptions)
      .pipe(gzip)
      .pipe(fs.createWriteStream(dest))
      .once('end', function() {
        console.log();
        resolve();
      });
  });
}

module.exports = tarGz;
