'use strict';

var config = require('./config');
var os = require('os');
var fs = require('fs');

var ARCH = config.ARCH;
var PLATFORM = config.PLATFORM;

var GYP_DEFINES = [
  'target_arch=' + ARCH,
  'host_arch=' + os.arch(),
  'build_with_chromium=0',
  'use_openssl=0',
  'use_gtk=0',
  'use_x11=0',
  'include_examples=0',
  'include_tests=1',  // Needed for FakeAudioCaptureModule
  'fastbuild=1',
  'remove_webcore_debug_symbols=1'
];

switch (PLATFORM) {
  case 'darwin':
    GYP_DEFINES.push('clang=1');
    break;

  case 'linux':
    // GYP_DEFINES.push('clang=1');
    if (!process.env.JAVA_HOME) {
      process.env.JAVA_HOME = fs.existsSync('/usr/lib/jvm/java')
        ? '/usr/lib/jvm/java'
        : '/usr/lib/jvm/default-java';
    }
    process.env.PATH = process.env.PATH + ':' + config.DEPOT_TOOLS_CHECKOUT;
    break;

  case 'win32':
    process.env.DEPOT_TOOLS_WIN_TOOLCHAIN = 0;
    process.env.GYP_MSVS_VERSION = process.env.GYP_MSVS_VERSION || 2013;
    process.env.PATH = process.env.PATH + ';' + config.DEPOT_TOOLS_CHECKOUT;
    break;

  default:
    break;
}

GYP_DEFINES = GYP_DEFINES.join(' ');
process.env.GYP_DEFINES = process.env.GYP_DEFINES
  ? process.env.GYP_DEFINES + ' ' + GYP_DEFINES
  : GYP_DEFINES;
