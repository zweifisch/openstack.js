"use strict";

exports.authenticate = require("./lib/openstack").authenticate;
exports.rescope = require("./lib/openstack").rescope;

exports.nova = require("./lib/nova");
exports.glance = require("./lib/glance");
exports.neutron = require("./lib/neutron");
exports.keystone = require("./lib/keystone");
exports.gnocchi = require("./lib/gnocchi");
exports.cinder = require("./lib/cinder");
exports.heat = require("./lib/heat");
exports.manila = require("./lib/manila");
exports.ironic = require("./lib/ironic");
exports.searchlight = require("./lib/searchlight");
exports.ceilometer = require("./lib/ceilometer");

exports.defres = require("./lib/util").defres;
exports.endpoint = require("./lib/util").endpoint;
