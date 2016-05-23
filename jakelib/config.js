'use strict';

var fs = require('fs');
var path = require('path');

// Default Configuration
var DEFAULTS = fs.existsSync('../config.json')
  ? require('../config')
  : require('../config.default');

var DEFAULT_DEPOT_TOOLS = DEFAULTS.depot_tools.path;
var DEFAULT_DEPOT_TOOLS_REPO = DEFAULTS.depot_tools.repo;
var DEFAULT_WEBRTC = DEFAULTS.webrtc.path;
var DEFAULT_WEBRTC_GIT_REF = DEFAULTS.webrtc.ref;
var DEFAULT_WEBRTC_REPO = DEFAULTS.webrtc.repo;

// Configuration
var DEPOT_TOOLS = process.env.DEPOT_TOOLS || DEFAULT_DEPOT_TOOLS;
var DEPOT_TOOLS_REPO = process.env.DEPOT_TOOLS_REPO || DEFAULT_DEPOT_TOOLS_REPO;
var GCLIENT = path.join(DEPOT_TOOLS, 'gclient');
var WEBRTC = process.env.WEBRTC || DEFAULT_WEBRTC;
var WEBRTC_GIT_REF = process.env.WEBRTC_GIT_REF || DEFAULT_WEBRTC_GIT_REF;
var WEBRTC_REPO = process.env.WEBRTC_REPO || DEFAULT_WEBRTC_REPO;

exports.DEPOT_TOOLS = DEPOT_TOOLS;
exports.DEPOT_TOOLS_REPO = DEPOT_TOOLS_REPO;
exports.GCLIENT = GCLIENT;
exports.WEBRTC = WEBRTC;
exports.WEBRTC_GIT_REF = WEBRTC_GIT_REF;
exports.WEBRTC_REPO = WEBRTC_REPO;
