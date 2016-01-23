"use strict";

let defres = require("./util").defres;

exports.search = defres("search", "/v1/search", null, {only: ["create"]});
