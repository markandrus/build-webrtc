/* global desc:false, task:false */
'use strict';

var config = require('./config');
var webrtc = require('./webrtc');

var WEBRTC_SRC = config.WEBRTC_SRC;

desc('Show the WebRTC branch head (if any)');
task('show-webrtc-branch-head', function() {
  var branchHead = webrtc.branchHead(WEBRTC_SRC);
  if (branchHead) {
    console.log(branchHead);
  }
});
