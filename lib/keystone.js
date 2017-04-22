"use strict";

let _defres = require("./util").defres;

let defres = function(path, singular, opts) {
    opts = opts || {};
    if (!opts.only || opts.only.indexOf("update") !== -1)
        opts.update = opts.update || ["patch", "/:id"];
    return _defres("identity", path, singular, opts);
};

exports.user = defres("/users", "user", {
    updatePassword: ["post", "/:id/password"]
});
exports.project = defres("/projects", "project", {
    grantRole: ["put", "/:id/users/:user_id/roles/:role_id", null],
    revokeRole: ["del", "/:id/users/:user_id/roles/:role_id", null],
    grantGroupRole: ["put", "/:id/groups/:user_id/roles/:role_id", null],
    revokeGroupRole: ["del", "/:id/groups/:user_id/roles/:role_id", null]
});
exports.domain = defres("/domains", "domain", {
    grantRole: ["put", "/:id/users/:user_id/roles/:role_id", null],
    revokeRole: ["del", "/:id/users/:user_id/roles/:role_id", null],
    grantGroupRole: ["put", "/:id/groups/:user_id/roles/:role_id", null],
    revokeGroupRole: ["del", "/:id/groups/:user_id/roles/:role_id", null]
});
exports.region = defres("/regions", "region");
exports.credential = defres("/credentials", "credential");
exports.role = defres("/roles", "role");
exports.roleAssignment = defres("/role_assignments", "role_assignment");

exports.userProject = defres("/users/:id/projects", "project", {only: ["list"]});
exports.userGroup = defres("/users/:id/groups", "group", {only: ["list"]});

exports.group = defres("/groups", "group");
exports.groupUser = defres("/groups/:group_id/users", "user", {
    add: ["put", "/:user_id"], belong: ["head", "/:user_id"], only: ["list", "del"]});

exports.trust = defres("/OS-TRUST/trusts", "trust");

exports.inherit = {
    project: {
        user: defres("/OS-INHERIT/projects/:project_id/users/:user_id/roles/:role_id/inherited_to_projects", null, {
            only: [],
            assign: ["put", ""],
            revoke: ["del", ""],
            check: ["head", ""]
        })
    }
};
