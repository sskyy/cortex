'use strict';

var profile = require('./profile');
var node_path = require('path');

// ./resources/locales/zh_CN/
var root = node_path.join(
    __dirname, 
    '..', '..', 'lib', 
    'resource', 'locales', 
    profile.option('language')
    
) + node_path.sep;

// @param {string} relative module name
exports.require = function(module) {
    return require(root + module);
};