'use strict';

/**
 * Upload a file to S3.
 * @param {string} accessKeyId - AWS Access Key ID
 * @param {string} secretAccessKey - AWS Secret Access Key
 * @param {string} bucket - S3 Bucket
 * @param {string} src - the source file
 * @param {string} dst - the destination file
 * @returns {Promise} - resolves once the upload completes
 */
function upload(accessKeyId, secretAccessKey, bucket, src, dst) {
  var s3 = require('s3');
  return new Promise(function(resolve, reject) {
    var client = s3.createClient({
      s3Options: {
        accessKeyId: accessKeyId,
        secretAccessKey: secretAccessKey
      }
    });

    var uploader = client.uploadFile({
      localFile: src,
      s3Params: {
        Bucket: bucket,
        key: dst
      }
    });

    uploader.once('error', reject);
    uploader.once('end', resolve);
  });
}

module.exports = upload;
