"use strict";

exports.authenticate = require("./lib/openstack").authenticate;

exports.nova = require("./lib/nova");
exports.neutron = require("./lib/neutron");
exports.keystone = require("./lib/keystone");
exports.gnocchi = require("./lib/gnocchi");
exports.cinder = require("./lib/cinder");
exports.heat = require("./lib/heat");
exports.searchlight = require("./lib/searchlight");

exports.defres = require("./lib/util").defres;
