/* global complete:false, desc:false, task:false */
'use strict';

var config = require('./config');
var log = require('./log');
var tarGz = require('./tarGz');
var webrtc = require('./webrtc');

var WEBRTC_SRC = config.WEBRTC_SRC;

desc('Package WebRTC');
task('package-webrtc', ['copy-webrtc-headers', 'copy-webrtc-libs'], function() {
  log('Computing the tar.gz filename');
  var tarGzName = 'test-' + webrtc.tarGzName(WEBRTC_SRC);
  console.log('    ' + tarGzName);

  log('Tar-ing and gzip-ing the artifacts');
  tarGz('.', tarGzName, { entries: ['include', 'lib'] }).then(complete, complete);
}, { async: true });
