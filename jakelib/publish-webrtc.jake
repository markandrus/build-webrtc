/* global complete:false, desc:false, task:false */
'use strict';

var config = require('./config');
var log = require('./log');
var upload = require('./upload');
var webrtc = require('./webrtc');

var ACCESS_KEY_ID = config.ACCESS_KEY_ID;
var SECRET_ACCESS_KEY = config.SECRET_ACCESS_KEY;
var BUCKET = config.BUCKET;

desc('Publish WebRTC');
task('publish-webrtc', ['package-webrtc'], function() {
  var tarGzName = webrtc.tarGzName();
  log('Uploading package WebRTC build to S3');
  upload(ACCESS_KEY_ID, SECRET_ACCESS_KEY, BUCKET, tarGzName, 'builds/' + tarGzName)
    .then(complete, complete);
}, { async: true });
