'use strict';

var fs = require('fs');
var path = require('path');

// Default Configuration
var DEFAULTS = fs.existsSync('../config.json')
  ? require('../config')
  : require('../config.default');

var DEFAULT_CONFIGURATION = DEFAULTS.configuration;
var DEFAULT_DEPOT_TOOLS = DEFAULTS.depot_tools.path;
var DEFAULT_DEPOT_TOOLS_REPO = DEFAULTS.depot_tools.repo;
var DEFAULT_WEBRTC = DEFAULTS.webrtc.path;
var DEFAULT_WEBRTC_GIT_REF = DEFAULTS.webrtc.ref;
var DEFAULT_WEBRTC_REPO = DEFAULTS.webrtc.repo;

// Configuration
var CONFIGURATION = process.env.CONFIGURATION || DEFAULT_CONFIGURATION;
var DEPOT_TOOLS = path.resolve(process.env.DEPOT_TOOLS || DEFAULT_DEPOT_TOOLS);
var DEPOT_TOOLS_REPO = process.env.DEPOT_TOOLS_REPO || DEFAULT_DEPOT_TOOLS_REPO;
var GCLIENT = path.join(DEPOT_TOOLS, 'gclient');
var NINJA = path.join(DEPOT_TOOLS, 'ninja');
var WEBRTC = path.resolve(process.env.WEBRTC || DEFAULT_WEBRTC);
var WEBRTC_GIT_REF = process.env.WEBRTC_GIT_REF || DEFAULT_WEBRTC_GIT_REF;
var WEBRTC_REPO = process.env.WEBRTC_REPO || DEFAULT_WEBRTC_REPO;
var WEBRTC_SRC = path.join(WEBRTC, 'src');
var _GCLIENT = path.join(WEBRTC, '.gclient');

exports.CONFIGURATION = CONFIGURATION;
exports.DEPOT_TOOLS = DEPOT_TOOLS;
exports.DEPOT_TOOLS_REPO = DEPOT_TOOLS_REPO;
exports.GCLIENT = GCLIENT;
exports.NINJA = NINJA;
exports.WEBRTC = WEBRTC;
exports.WEBRTC_GIT_REF = WEBRTC_GIT_REF;
exports.WEBRTC_REPO = WEBRTC_REPO;
exports.WEBRTC_SRC = WEBRTC_SRC;
exports._GCLIENT = _GCLIENT;
