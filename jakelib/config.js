'use strict';

var fs = require('fs');
var os = require('os');
var path = require('path');

// Default Configuration
var DEFAULTS = fs.existsSync('../config.json')
  ? require('../config')
  : require('../config.default');

var DEFAULT_CONFIGURATION = DEFAULTS.configuration;
var DEFAULT_DEPOT_TOOLS_CHECKOUT = DEFAULTS.depot_tools.checkout;
var DEFAULT_DEPOT_TOOLS_REPO = DEFAULTS.depot_tools.repo;
var DEFAULT_OUT = DEFAULTS.out;
var DEFAULT_S3_BUCKET = DEFAULTS.s3.bucket;
var DEFAULT_S3_REMOTE_PATH = DEFAULTS.s3.remote_path;
var DEFAULT_WEBRTC_CHECKOUT = DEFAULTS.webrtc.checkout;
var DEFAULT_WEBRTC_REF = DEFAULTS.webrtc.ref;
var DEFAULT_WEBRTC_REPO = DEFAULTS.webrtc.repo;

// Configuration
var AWS_ACCESS_KEY_ID = process.env.AWS_ACCESS_KEY_ID;
var AWS_SECRET_ACCESS_KEY = process.env.AWS_SECRET_ACCESS_KEY;

var CONFIGURATION = process.env.CONFIGURATION || DEFAULT_CONFIGURATION;

var DEPOT_TOOLS_CHECKOUT = resolve(process.env.DEPOT_TOOLS_CHECKOUT || DEFAULT_DEPOT_TOOLS_CHECKOUT);
var DEPOT_TOOLS_REPO = process.env.DEPOT_TOOLS_REPO || DEFAULT_DEPOT_TOOLS_REPO;
var GCLIENT = path.join(DEPOT_TOOLS_CHECKOUT, 'gclient');
var NINJA = path.join(DEPOT_TOOLS_CHECKOUT, 'ninja');

var OUT = resolve(process.env.OUT || DEFAULT_OUT);
var OUT_COMMIT = path.join(OUT, 'WEBRTC_COMMIT');
var OUT_INCLUDE = path.join(OUT, 'include');
var OUT_LIB = path.join(OUT, 'lib');

var S3_BUCKET = process.env.S3_HOST || DEFAULT_S3_BUCKET;
var S3_REMOTE_PATH = process.env.S3_REMOTE_PATH || DEFAULT_S3_REMOTE_PATH;

var WEBRTC_CHECKOUT = resolve(process.env.WEBRTC_CHECKOUT || DEFAULT_WEBRTC_CHECKOUT);
var WEBRTC_CHECKOUT_GCLIENT = path.join(WEBRTC_CHECKOUT, '.gclient');
var WEBRTC_CHECKOUT_SRC = path.join(WEBRTC_CHECKOUT, 'src');
var WEBRTC_OUT = computeWebRTCOut(WEBRTC_CHECKOUT_SRC, CONFIGURATION);

var WEBRTC_REF = process.env.WEBRTC_REF || DEFAULT_WEBRTC_REF;
var WEBRTC_REPO = process.env.WEBRTC_REPO || DEFAULT_WEBRTC_REPO;

/**
 * Compute the WebRTC out directory (on Windows, this is actually suffixed with
 * the architecture).
 * @param {string} src - the WebRTC src directory
 * @param {string} configuration - one of "Release" or "Debug"
 * @returns {string} - the WebRTC out directory
 */
function computeWebRTCOut(src, configuration) {
  var out = path.join(src, 'out', configuration);
  if (os.platform() === 'win32' && os.arch() === 'x64') {
    out += '_x64';
  }
  return out;
}

// NOTE(mroberts): Jake on Windows doesn't handle Windows drive letters; this
// little workaround requires that we resolve paths on the same drive.
/**
 * Resolve a filepath (on Windows this actually chops off the drive letter).
 * @param {string} filepath - any filepath
 * @returns {string} - the resolved filepath
 */
function resolve(filepath) {
  return os.platform() === 'win32'
    ? path.resolve(filepath).replace(/[A-Z]:/, '')
    : path.resolve(filepath);
}

exports.AWS_ACCESS_KEY_ID = AWS_ACCESS_KEY_ID;
exports.AWS_SECRET_ACCESS_KEY = AWS_SECRET_ACCESS_KEY;
exports.CONFIGURATION = CONFIGURATION;
exports.DEPOT_TOOLS_CHECKOUT = DEPOT_TOOLS_CHECKOUT;
exports.DEPOT_TOOLS_REPO = DEPOT_TOOLS_REPO;
exports.GCLIENT = GCLIENT;
exports.NINJA = NINJA;
exports.OUT = OUT;
exports.OUT_COMMIT = OUT_COMMIT;
exports.OUT_INCLUDE = OUT_INCLUDE;
exports.OUT_LIB = OUT_LIB;
exports.S3_BUCKET = S3_BUCKET;
exports.S3_REMOTE_PATH = S3_REMOTE_PATH;
exports.WEBRTC_CHECKOUT = WEBRTC_CHECKOUT;
exports.WEBRTC_CHECKOUT_GCLIENT = WEBRTC_CHECKOUT_GCLIENT;
exports.WEBRTC_CHECKOUT_SRC = WEBRTC_CHECKOUT_SRC;
exports.WEBRTC_OUT = WEBRTC_OUT;
exports.WEBRTC_REF = WEBRTC_REF;
exports.WEBRTC_REPO = WEBRTC_REPO;
