"use strict";

let defres = require("./util").defres;

exports.stack = defres("orchestration", "/stacks", "stack", {
    create: ["post", "", null],
    action: ["post", "/:name/:id/actions", null],
    template: ["get", "/:id/template", null],
    del: ["del", "/:name/:id", null]
});
exports.event = defres("orchestration", "/stacks/:stack_name/events", "event", {only: ["list"]});
