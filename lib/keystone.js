"use strict";

let defres = require("./util").defres;

exports.user = defres("identity", "/users", "user");
exports.project = defres("identity", "/projects", "project");
exports.domain = defres("identity", "/domains", "domain");
exports.region = defres("identity", "/regions", "region");
exports.credential = defres("identity", "/credentials", "credential");
exports.role = defres("identity", "/roles", "role");
exports.roleAssignment = defres("identity", "/role_assignments", "role_assignment");

exports.userProject = defres("identity", "/users/:id/projects", "project", {only: ["list"]});
