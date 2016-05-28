/* global desc:false, directory:false, file:false, task:false */
'use strict';

require('./environment');

var config = require('./config');
var gclient = require('./gclient');
var git = require('./git');
var log = require('./log');

var DEPOT_TOOLS = config.DEPOT_TOOLS;
var _GCLIENT = config._GCLIENT;
var WEBRTC = config.WEBRTC;
var WEBRTC_GIT_REF = config.WEBRTC_GIT_REF;
var WEBRTC_REPO = config.WEBRTC_REPO;
var WEBRTC_SRC = config.WEBRTC_SRC;

directory(WEBRTC);

file(_GCLIENT, [DEPOT_TOOLS, WEBRTC], function() {
  log('The file "' + _GCLIENT + '" was not found; running "gclient config"');
  gclient.config(WEBRTC_REPO + '@' + WEBRTC_GIT_REF, {}, { cwd: WEBRTC });
});

file(WEBRTC_SRC, [_GCLIENT], function() {
  log('The directory "' + WEBRTC_SRC + '" was not found; running "gclient sync"');
  gclient.sync({ nohooks: true }, { cwd: WEBRTC });
});

desc('Checkout WebRTC');
task('checkout-webrtc', [WEBRTC_SRC], function() {
  log('Running "gclient sync" to ensure you have the most recent git refs');
  gclient.sync({ noHooks: true }, { cwd: WEBRTC });

  log('Checking out git ref "' + WEBRTC_GIT_REF + '"');
  git.checkout(WEBRTC_GIT_REF, { cwd: WEBRTC_SRC });

  log('Running "gclient runhooks"');
  gclient.runHooks({ cwd: WEBRTC });
});
