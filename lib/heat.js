"use strict";

let defres = require("./util").defres;

exports.stack = defres("orchestration", "/stacks", "stack");
exports.event = defres("orchestration", "/stacks/:stack_name/events", "event", {only: ["list"]});
