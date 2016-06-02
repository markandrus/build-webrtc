/* global desc:false, task:false */
'use strict';

var config = require('./config');
var fs = require('fs');
var webrtc = require('./webrtc');

var OUT_COMMIT = config.OUT_COMMIT;
var WEBRTC_CHECKOUT_SRC = config.WEBRTC_CHECKOUT_SRC;

desc('Write the WebRTC commit to ' + OUT_COMMIT);
task('write-webrtc-commit', function() {
  fs.writeFileSync(OUT_COMMIT, webrtc.commit(WEBRTC_CHECKOUT_SRC, { abbrev: false }));
});
