'use strict';

var fs = require('fs');
var os = require('os');

var GYP_DEFINES = [
  'target_arch=' + os.arch(),
  'host_arch=' + os.arch(),
  'build_with_chromium=0',
  'use_openssl=0',
  'use_gtk=0',
  'use_x11=0',
  'include_examples=0',
  'include_tests=0',
  'fastbuild=1',
  'remove_webcore_debug_symbols=1'
];

switch (os.platform()) {
  case 'darwin':
    GYP_DEFINES.push('clang=1');
    break;

  case 'linux':
    GYP_DEFINES.push('clang=1');
    if (!process.env.JAVA_HOME) {
      process.env.JAVA_HOME = fs.existsSync('/usr/lib/jvm/java')
        ? '/usr/lib/jvm/java'
        : '/usr/lib/jvm/default-java';
    }
    break;

  case 'win32':
    process.env.DEPOT_TOOLS_WIN_TOOLCHAIN = 0;
    process.env.GYP_MSVS_VERSION = process.env.GYP_MSVS_VERSION || 2013;
    break;
}

GYP_DEFINES = GYP_DEFINES.join(' ');
process.env.GYP_DEFINES = process.env.GYP_DEFINES
  ? process.env.GYP_DEFINES + ' ' + GYP_DEFINES
  : GYP_DEFINES;
