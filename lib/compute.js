"use strict";

let defres = require("./util").defres;

exports.server = defres("server", "compute", "/servers");
exports.serverdetail = defres("server", "compute", "/servers/detail");
