/* global desc:false, task:false */
'use strict';

var execFileSync = require('child_process').execFileSync;

desc('Lint the build scripts');
task('lint', function() {
  execFileSync('npm', ['run', 'lint'], { stdio: 'inherit' });
});
