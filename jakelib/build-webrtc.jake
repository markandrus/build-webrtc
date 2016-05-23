'use strict';

var colors = require('colors/safe');
var config = require('./config');
var ninja = require('./ninja');

var CONFIGURATION = config.CONFIGURATION;
var WEBRTC_SRC = config.WEBRTC_SRC;

task('build-webrtc', ['checkout-webrtc'], function() {
  console.log(colors.green.underline('\nRunning ninja\n'));
  ninja('out/' + CONFIGURATION, { cwd: WEBRTC_SRC });
});
