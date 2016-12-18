/* global directory:false, task:false */
'use strict';

var config = require('./config');
var execSync = require('child_process').execSync;
var ninja = require('./ninja');
var log = require('./log');
var path = require('path');

var OUT_LIB = config.OUT_LIB;
var PLATFORM = config.PLATFORM;
var PYTHON = config.PYTHON;
var WEBRTC_CHECKOUT_SRC = config.WEBRTC_CHECKOUT_SRC;
var WEBRTC_OUT = config.WEBRTC_OUT;

directory(OUT_LIB);

task('build-webrtc', ['checkout-webrtc', 'gen-ninja-cfg', OUT_LIB], function() {
  log('Running ninja');
  ninja(WEBRTC_OUT, { cwd: WEBRTC_CHECKOUT_SRC });

  log('Merging libs');
  execSync([
    PYTHON,
    path.join(WEBRTC_CHECKOUT_SRC, 'webrtc', 'build', 'merge_libs.py'),
    WEBRTC_OUT,
    path.join(OUT_LIB, PLATFORM === 'win32' ? 'libwebrtc.lib' : 'libwebrtc.a')
  ].join(' '), {
    stdio: 'inherit'
  });
});
