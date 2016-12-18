'use strict';

var config = require('./config');

task('clean', function() {
  jake.rmRf(config.WEBRTC_OUT);
  jake.rmRf(config.OUT_INCLUDE);
  jake.rmRf(config.OUT_LIB);
  jake.rmRf(config.OUT_COMMIT);
});
