/* global task:false */
'use strict';

var config = require('./config');
var ninja = require('./ninja');
var log = require('./log');

var WEBRTC_CHECKOUT_SRC = config.WEBRTC_CHECKOUT_SRC;
var WEBRTC_OUT = config.WEBRTC_OUT;

task('build-webrtc', ['checkout-webrtc'], function() {
  log('Running ninja');
  ninja(WEBRTC_OUT, { cwd: WEBRTC_CHECKOUT_SRC });
});
