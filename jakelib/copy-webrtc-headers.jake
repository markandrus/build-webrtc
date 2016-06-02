/* global complete:false, desc:false, directory:false, task:false */
'use strict';

var config = require('./config');
var copy = require('./copy');
var log = require('./log');

var OUT_INCLUDE = config.OUT_INCLUDE;
var WEBRTC_CHECKOUT_SRC = config.WEBRTC_CHECKOUT_SRC;

directory(OUT_INCLUDE);

desc('Copy WebRTC .h and .hpp files');
task('copy-webrtc-headers', [OUT_INCLUDE], function() {
  log('Copying WebRTC .h and .hpp files to ' + OUT_INCLUDE);
  copy.files(/\.h(pp)?$/, WEBRTC_CHECKOUT_SRC, OUT_INCLUDE).then(complete, complete);
}, { async: true });
