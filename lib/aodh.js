"use strict";

let defres = require("./util").defres;

exports.alarm = defres("alarming", "/v2/alarms", null, {
    showHistory: ["get", "/:id/history", null]
});
