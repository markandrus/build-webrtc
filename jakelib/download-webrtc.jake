/* global complete:false, desc:false, file:false, task:false */
'use strict';

var download = require('download');
var log = require('./log');

file('webrtc.tar.gz', function() {
  log('Downloading a previously-published version of WebRTC');
  download('webrtc.tar.gz', '.', { extract: true }).then(function() {
    complete();
  }, complete());
}, { async: true });

desc('Download (a published version of) WebRTC');
task('download-webrtc', ['webrtc.tar.gz']);
