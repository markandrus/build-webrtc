'use strict';

var config = require('./config');
var git = require('./git');

var DEPOT_TOOLS = config.DEPOT_TOOLS;
var DEPOT_TOOLS_REPO = config.DEPOT_TOOLS_REPO;

file(DEPOT_TOOLS, function() {
  git.clone(DEPOT_TOOLS_REPO);
});

desc('Checkout depot_tools');
task('checkout-depot_tools', [DEPOT_TOOLS]);
