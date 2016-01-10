"use strict";

exports.authenticate = require("./lib/openstack").authenticate;
exports.compute = require("./lib/compute");
exports.identity = require("./lib/identity");
