/* global desc:false, task:false */
'use strict';

var execSync = require('child_process').execSync;

desc('Lint the build scripts');
task('lint', function() {
  execSync('npm run lint', { stdio: 'inherit' });
});
