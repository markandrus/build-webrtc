/* global task:false */
'use strict';

var config = require('./config');
var ninja = require('./ninja');
var log = require('./log');

var WEBRTC_SRC = config.WEBRTC_SRC;
var WEBRTC_OUT = config.WEBRTC_OUT;

task('build-webrtc', ['checkout-webrtc'], function() {
  log('Running ninja');
  ninja(WEBRTC_OUT, { cwd: WEBRTC_SRC });
});
