/* global complete:false, desc:false, jake:false, task:false */
'use strict';

var config = require('./config');
var find = require('find');
var fs = require('fs');
var fse = require('fs-extra');
var log = require('./log');
var os = require('os');
var path = require('path');
var tar = require('tar-fs');
var webrtc = require('./webrtc');
var zlib = require('zlib');

var copySync = fse.copySync;
var mkdirpSync = fse.mkdirpSync;
var removeSync = fse.removeSync;

var WEBRTC_SRC = config.WEBRTC_SRC;
var WEBRTC_OUT = config.WEBRTC_OUT;
var OUT = path.resolve('out');
var OUT_WEBRTC_LIB = path.join(OUT, 'webrtc', 'lib');
var OUT_WEBRTC_INCLUDE = path.join(OUT, 'webrtc', 'include');

desc('Compress WebRTC');
task('compress-webrtc', ['build-webrtc'], function() {
  log('Recreating directory "' + OUT + '"');
  removeSync(OUT);
  mkdirpSync(OUT);

  log('Copying libs to "' + OUT_WEBRTC_LIB + '"');
  var libs = new jake.FileList();
  libs.include(path.join(WEBRTC_OUT, '**',
    os.platform() === 'win32' ? '*.lib' : '*.a'));
  libs.toArray().forEach(function(file) {
    var rel = path.relative(WEBRTC_OUT, file);
    var basename = path.basename(file);
    var dest = path.join(OUT_WEBRTC_LIB, basename);
    console.log('    ' + rel);
    copySync(file, dest);
  });

  // NOTE(mroberts): I'm using the find module here because Jake's FileList
  // chokes for some reason.
  log('Copying headers to "' + OUT_WEBRTC_INCLUDE + '"');
  find.eachfile(/\.h(pp)?$/, WEBRTC_SRC, function(file) {
    var rel = path.relative(WEBRTC_SRC, file);
    var dest = path.join(OUT_WEBRTC_INCLUDE, rel);
    console.log('    ' + rel);
    copySync(file, dest);
  }).end(function() {
    log('Computing the tar.gz filename');
    var tarGz = webrtc.tarGzName(WEBRTC_SRC);
    console.log('    ' + tarGz);

    log('Tar-ing and gzip-ing the build artifacts');
    var gzip = zlib.createGzip();
    tar.pack(OUT).pipe(gzip).pipe(fs.createWriteStream(tarGz)).on('end', complete);
  });
});
