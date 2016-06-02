/* global desc:false, task:false */
'use strict';

var config = require('./config');
var webrtc = require('./webrtc');

var WEBRTC_CHECKOUT_SRC = config.WEBRTC_CHECKOUT_SRC;

desc('Show the WebRTC commit');
task('show-webrtc-commit', function() {
  console.log(webrtc.commit(WEBRTC_CHECKOUT_SRC, { abbrev: false }));
});
