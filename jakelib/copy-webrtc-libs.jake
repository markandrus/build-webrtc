/* global complete:false, desc:false, directory:false, task:false */
'use strict';

var config = require('./config');
var copy = require('./copy');
var log = require('./log');

var WEBRTC_OUT = config.WEBRTC_OUT;

directory('lib');

desc('Copy WebRTC .a and .o or .lib files to lib/');
task('copy-webrtc-libs', ['lib'], function() {
  log('Copying WebRTC .a and .o or .lib files to lib/');
  copy.files(/\.(a|o|lib)$/, WEBRTC_OUT, 'lib').then(complete, complete);
}, { async: true });
