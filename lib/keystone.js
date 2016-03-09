"use strict";

let defres = require("./util").defres;

exports.user = defres("identity", "/users", "user");
exports.project = defres("identity", "/projects", "project", {
    grantRole: ["put", "/:id/users/:user_id/roles/:role_id", null],
    revokeRole: ["del", "/:id/users/:user_id/roles/:role_id", null],
    grantGroupRole: ["put", "/:id/groups/:user_id/roles/:role_id", null],
    revokeGroupRole: ["del", "/:id/groups/:user_id/roles/:role_id", null]
});
exports.domain = defres("identity", "/domains", "domain", {
    grantRole: ["put", "/:id/users/:user_id/roles/:role_id", null],
    revokeRole: ["del", "/:id/users/:user_id/roles/:role_id", null],
    grantGroupRole: ["put", "/:id/groups/:user_id/roles/:role_id", null],
    revokeGroupRole: ["del", "/:id/groups/:user_id/roles/:role_id", null]
});
exports.region = defres("identity", "/regions", "region");
exports.credential = defres("identity", "/credentials", "credential");
exports.role = defres("identity", "/roles", "role");
exports.roleAssignment = defres("identity", "/role_assignments", "role_assignment");

exports.userProject = defres("identity", "/users/:id/projects", "project", {only: ["list"]});

exports.group = defres("identity", "/groups", "group");
exports.groupUser = defres("identity", "/groups/:group_id/users", "user", {
    add: ["put", "/:user_id"], belong: ["head", "/:user_id"], only: ["list", "del"]});
