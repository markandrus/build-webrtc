/* global desc:false, task:false */
'use strict';

desc('Copy WebRTC libraries and headers');
task('copy-webrtc', ['copy-webrtc-headers', 'copy-webrtc-libraries']);
