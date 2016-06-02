/* global complete:false, desc:false, directory:false, fail:false, task:false */
'use strict';

var config = require('./config');
var copy = require('./copy');
var log = require('./log');

var OUT_LIB = config.OUT_LIB;
var WEBRTC_OUT = config.WEBRTC_OUT;

directory(OUT_LIB);

desc('Copy WebRTC .a and .o or .lib files');
task('copy-webrtc-libraries', [OUT_LIB], function() {
  log('Copying WebRTC .a and .o or .lib files to ' + OUT_LIB);
  copy.files(/\.(a|o|lib)$/, WEBRTC_OUT, OUT_LIB).then(complete, fail);
}, { async: true });
