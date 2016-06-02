/* global desc:false, directory:false, file:false, task:false */
'use strict';

require('./environment');

var config = require('./config');
var gclient = require('./gclient');
var git = require('./git');
var log = require('./log');

var DEPOT_TOOLS_CHECKOUT = config.DEPOT_TOOLS_CHECKOUT;
var WEBRTC_CHECKOUT = config.WEBRTC_CHECKOUT;
var WEBRTC_CHECKOUT_GCLIENT = config.WEBRTC_CHECKOUT_GCLIENT;
var WEBRTC_REF = config.WEBRTC_REF;
var WEBRTC_REPO = config.WEBRTC_REPO;
var WEBRTC_CHECKOUT_SRC = config.WEBRTC_CHECKOUT_SRC;

directory(WEBRTC_CHECKOUT);

file(WEBRTC_CHECKOUT_GCLIENT, [DEPOT_TOOLS_CHECKOUT, WEBRTC_CHECKOUT], function() {
  log('Running "gclient config"');
  gclient.config(WEBRTC_REPO + '@' + WEBRTC_REF, {}, { cwd: WEBRTC_CHECKOUT });
});

file(WEBRTC_CHECKOUT_SRC, [WEBRTC_CHECKOUT_GCLIENT], function() {
  log('Running "gclient sync"');
  gclient.sync({ nohooks: true }, { cwd: WEBRTC_CHECKOUT });
});

desc('Checkout WebRTC');
task('checkout-webrtc', [WEBRTC_CHECKOUT_SRC], function() {
  log('Running "gclient sync" to ensure you have the most recent git refs');
  gclient.sync({ noHooks: true }, { cwd: WEBRTC_CHECKOUT });

  log('Checking out git ref "' + WEBRTC_REF + '"');
  git.checkout(WEBRTC_REF, { cwd: WEBRTC_CHECKOUT_SRC });

  log('Running "gclient runhooks"');
  gclient.runHooks({ cwd: WEBRTC_CHECKOUT });
});
