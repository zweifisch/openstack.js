"use strict";

let defres = require("./util").defres;

exports.server = defres("compute", "/servers", "server");
exports.serverdetail = defres("compute", "/servers/detail", "server");
