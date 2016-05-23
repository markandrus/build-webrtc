'use strict';

var config = require('./config');
var execSync = require('child_process').execSync;
var gclient = require('./gclient');
var git = require('./git');
var path = require('path');

var DEPOT_TOOLS = config.DEPOT_TOOLS;
var _GCLIENT = config._GCLIENT;
var GCLIENT = config.GCLIENT;
var WEBRTC = config.WEBRTC;
var WEBRTC_GIT_REF = config.WEBRTC_GIT_REF;
var WEBRTC_REPO = config.WEBRTC_REPO;
var WEBRTC_SRC = config.WEBRTC_SRC;

directory(WEBRTC);

file(_GCLIENT, [DEPOT_TOOLS, WEBRTC], function() {
  gclient.config(WEBRTC_REPO + '@' + WEBRTC_GIT_REF, {}, { cwd: WEBRTC });
});

file(WEBRTC_SRC, [_GCLIENT], function() {
  gclient.sync({ nohooks: true }, { cwd: WEBRTC });
});

desc('Checkout WebRTC');
task('checkout-webrtc', [WEBRTC_SRC], function() {
  gclient.sync({ noHooks: true }, { cwd: WEBRTC });
  git.checkout(WEBRTC_GIT_REF, { cwd: WEBRTC_SRC });
  gclient.sync({}, { cwd: WEBRTC });
});
