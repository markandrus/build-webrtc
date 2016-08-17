/* global complete:false, desc:false, fail:false, task:false */
'use strict';

var config = require('./config');
var log = require('./log');
var path = require('path');
var upload = require('./upload');
var webrtc = require('./webrtc');

var AWS_ACCESS_KEY_ID = config.AWS_ACCESS_KEY_ID;
var AWS_SECRET_ACCESS_KEY = config.AWS_SECRET_ACCESS_KEY;
var OUT = config.OUT;
var S3_BUCKET = config.S3_BUCKET;
var S3_REMOTE_PATH = config.S3_REMOTE_PATH;
var WEBRTC_CHECKOUT_SRC = config.WEBRTC_CHECKOUT_SRC;

desc('Publish WebRTC');
task('publish-webrtc', [], function() {
  var tarGzName = webrtc.tarGzName(WEBRTC_CHECKOUT_SRC);
  log('Uploading package WebRTC build to S3');
  upload(
    AWS_ACCESS_KEY_ID,
    AWS_SECRET_ACCESS_KEY,
    S3_BUCKET,
    path.join(OUT, tarGzName),
    S3_REMOTE_PATH + '/' + tarGzName
  ).then(complete, fail);
}, { async: true });
