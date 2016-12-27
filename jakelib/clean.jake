/* global task:false */
'use strict';

var config = require('./config');
var jake = require('jake');

task('clean', function() {
  jake.rmRf(config.WEBRTC_OUT);
  jake.rmRf(config.OUT_INCLUDE);
  jake.rmRf(config.OUT_LIB);
  jake.rmRf(config.OUT_COMMIT);
});
