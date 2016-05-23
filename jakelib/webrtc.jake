'use strict';

var config = require('./config');
var execSync = require('child_process').execSync;
var path = require('path');

var DEPOT_TOOLS = config.DEPOT_TOOLS;
var GCLIENT = config.GCLIENT;
var WEBRTC = config.WEBRTC;
var WEBRTC_GIT_REF = config.WEBRTC_GIT_REF;
var WEBRTC_REPO = config.WEBRTC_REPO;

file('.gclient', [DEPOT_TOOLS], function() {
  gclient.config(WEBRTC_REPO + '@' + WEBRTC_GIT_REF, { name: 'webrtc' });
});

file(WEBRTC, ['.gclient'], function() {
  gclient.sync();
});

desc('Checkout WebRTC');
task('checkout-webrtc', [WEBRTC], function() {
  gclient.sync({ noHooks: true });
  git.checkout(ref, { cwd: WEBRTC });
  gclient.sync();
});
