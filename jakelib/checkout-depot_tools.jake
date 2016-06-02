/* global desc:false, file:false, task:false */
'use strict';

var config = require('./config');
var git = require('./git');
var log = require('./log');

var DEPOT_TOOLS_CHECKOUT = config.DEPOT_TOOLS_CHECKOUT;
var DEPOT_TOOLS_REPO = config.DEPOT_TOOLS_REPO;

file(DEPOT_TOOLS_CHECKOUT, function() {
  log('Cloning depot_tools');
  git.clone(DEPOT_TOOLS_REPO);
});

desc('Checkout depot_tools');
task('checkout-depot_tools', [DEPOT_TOOLS_CHECKOUT]);
