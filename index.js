"use strict";

exports.authenticate = require("./lib/openstack").authenticate;
exports.nova = require("./lib/nova");
exports.keystone = require("./lib/keystone");
exports.gnocchi = require("./lib/gnocchi");
