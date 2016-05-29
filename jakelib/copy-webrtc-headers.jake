/* global complete:false, desc:false, directory:false, task:false */
'use strict';

var config = require('./config');
var copy = require('./copy');
var log = require('./log');

var WEBRTC_SRC = config.WEBRTC_SRC;

directory('include');

desc('Copy WebRTC .h and .hpp files to include/');
task('copy-webrtc-headers', ['include'], function() {
  log('Copying WebRTC .h and .hpp files to include/');
  copy.files(/\.h(pp)?$/, WEBRTC_SRC, 'include').then(complete, complete);
}, { async: true });
