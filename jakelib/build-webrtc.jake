'use strict';

var colors = require('colors/safe');
var config = require('./config');
var ninja = require('./ninja');

var WEBRTC_SRC = config.WEBRTC_SRC;
var WEBRTC_OUT = config.WEBRTC_OUT;

task('build-webrtc', ['checkout-webrtc'], function() {
  console.log(colors.green.underline('\nRunning ninja\n'));
  ninja(WEBRTC_OUT, { cwd: WEBRTC_SRC });
});
