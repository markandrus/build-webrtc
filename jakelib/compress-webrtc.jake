'use strict';

var colors = require('colors/safe');
var config = require('./config');
var find = require('find');
var fs = require('fs');
var fse = require('fs-extra');
var git = require('./git');
var os = require('os');
var path = require('path');
var tar = require('tar-fs');
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
  console.log(colors.green.underline('\nRecreating directory "' + OUT + '"\n'));
  removeSync(OUT);
  mkdirpSync(OUT);

  console.log(colors.green.underline('\nCopying libs to "' + OUT_WEBRTC_LIB + '"\n'));
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
  console.log(colors.green.underline('\nCopying headers to "' + OUT_WEBRTC_INCLUDE + '"\n'));
  var headers = find.eachfile(/\.h(pp)?$/, WEBRTC_SRC, function(file) {
    var rel = path.relative(WEBRTC_SRC, file);
    var dest = path.join(OUT_WEBRTC_INCLUDE, rel);
    console.log('    ' + rel);
    copySync(file, dest);
  }).end(function() {
    console.log(colors.green.underline('\nComputing the tar.gz filename\n'));
    var branch = git.branch({ contains: 'HEAD' }, { cwd: WEBRTC_SRC, stdio: 'pipe' }).toString();
    var match = branch.match(/branch-heads\/([0-9]+)/);
    var branchHead = match ? match[1] : null;
    var commit = git.showRef('HEAD', { abbrev: true, hash: true, head: true }, { cwd: WEBRTC_SRC, stdio: 'pipe' }).toString().split('\n')[0];

    var tarGz = 'webrtc';
    if (branchHead) {
      tarGz += '-' + branchHead;
    }
    tarGz += '+' + [
      commit,
      os.platform(),
      os.arch(),
      'tar.gz'
    ].join('.');
    console.log('    ' + tarGz);

    console.log(colors.green.underline('\nTar-ing and gzip-ing the build artifacts\n'));
    var gzip = zlib.createGzip();
    tar.pack(OUT).pipe(gzip).pipe(fs.createWriteStream(tarGz)).on('end', complete);
  });
});
