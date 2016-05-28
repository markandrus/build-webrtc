/* global desc:false, task:false */
'use strict';

var config = require('./config');
var webrtc = require('./webrtc');

var WEBRTC_SRC = config.WEBRTC_SRC;

desc('Show the tar.gz name to use when packaging WebRTC');
task('show-webrtc-tar.gz-name', function() {
  console.log(webrtc.tarGzName(WEBRTC_SRC));
});
