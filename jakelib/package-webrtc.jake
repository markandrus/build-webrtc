/* global complete:false, desc:false, task:false */
'use strict';

var config = require('./config');
var log = require('./log');
var tarGz = require('./tarGz');
var webrtc = require('./webrtc');

var OUT = config.OUT;
var WEBRTC_CHECKOUT_SRC = config.WEBRTC_CHECKOUT_SRC;

desc('Package WebRTC');
task('package-webrtc', [
  'copy-webrtc-headers',
  'copy-webrtc-libs',
  'write-webrtc-commit'
], function() {
  log('Computing the tar.gz filename');
  var tarGzName = webrtc.tarGzName(WEBRTC_CHECKOUT_SRC, OUT);
  console.log('    ' + tarGzName);

  log('Tar-ing and gzip-ing the artifacts');
  tarGz(OUT, tarGzName, {
    entries: ['include', 'lib', 'WEBRTC_COMMIT']
  }).then(complete, complete);
}, { async: true });
