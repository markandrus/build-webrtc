'use strict';

var environment = require('./environment');
var colors = require('colors/safe');
var config = require('./config');
var gclient = require('./gclient');
var git = require('./git');

var DEPOT_TOOLS = config.DEPOT_TOOLS;
var _GCLIENT = config._GCLIENT;
var GCLIENT = config.GCLIENT;
var WEBRTC = config.WEBRTC;
var WEBRTC_GIT_REF = config.WEBRTC_GIT_REF;
var WEBRTC_REPO = config.WEBRTC_REPO;
var WEBRTC_SRC = config.WEBRTC_SRC;

directory(WEBRTC);

file(_GCLIENT, [DEPOT_TOOLS, WEBRTC], function() {
  console.log(colors.green.underline('\nThe file "' + _GCLIENT + '" was not found; running "gclient config"\n'));
  gclient.config(WEBRTC_REPO + '@' + WEBRTC_GIT_REF, {}, { cwd: WEBRTC });
});

file(WEBRTC_SRC, [_GCLIENT], function() {
  console.log(colors.green.underline('\nThe directory "' + WEBRTC_SRC + '" was not found; running "gclient sync"\n'));
  gclient.sync({ nohooks: true }, { cwd: WEBRTC });
});

desc('Checkout WebRTC');
task('checkout-webrtc', [WEBRTC_SRC], function() {
  console.log(colors.green.underline('\nRunning "gclient sync" to ensure you have the most recent git refs\n'));
  gclient.sync({ noHooks: true }, { cwd: WEBRTC });

  console.log(colors.green.underline('\nChecking out git ref "' + WEBRTC_GIT_REF + '"\n'));
  git.checkout(WEBRTC_GIT_REF, { cwd: WEBRTC_SRC });

  console.log(colors.green.underline('\nRunning "gclient runhooks"\n'));
  gclient.runHooks({ cwd: WEBRTC });
});
