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

exports.volume.extend = (token, region, id, new_size) =>
    volumeAction.create(token, region, id, {"os-extend": {new_size: new_size}});

exports.volume.updateReadonlyFlag = (token, region, id, readonly) =>
    volumeAction.create(token, region, id, {"os-update_readonly_flag": {readonly: readonly}});

exports.volumeAction = volumeAction;

exports.quotaSet = defres("volumev2", "/os-quota-sets", "quota_set", {only: ["show"]});

exports.snapshot = defres("volumev2", "/snapshots", "snapshot");

exports.volumeType = defres("volumev2", "/types", "volume_type");
