"use strict";

let defres = require("./util").defres;

exports.volume = defres("volumev2", "/volumes", "volume");
exports.volumedetail = defres("volumev2", "/volumes/detail", "volume");
let volumeAction = defres("volumev2", "/volumes/:id/action", null, {only: ["create"]});

// status: "available",
// attach_status: "detached",
// migration_status: "migrating"
exports.volume.resetState = (token, region, id, status) =>
    volumeAction.create(token, region, id, {"os-reset_status": status});

exports.volumeAction = volumeAction;
