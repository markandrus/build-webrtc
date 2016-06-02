/* global desc:false, task:false */
'use strict';

desc('Copy WebRTC libraries and headers');
task('copy-webrtc', ['build-webrtc', 'copy-webrtc-headers']);
