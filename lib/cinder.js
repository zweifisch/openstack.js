"use strict";

let defres = require("./util").defres;

exports.volume = defres("volumev2", "/volumes", "volume");
exports.volumeDetail = defres("volumev2", "/volumes/detail", "volume");
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

exports.quotaSet = defres("volumev2", "/os-quota-sets", "quota_set", {only: ["show", "update"]});

exports.service = defres("volumev2", "/os-services", null, {
	enable: ['put', '/:id/enable'],
	disable: ['put', '/:id/disable']
})

exports.snapshot = defres("volumev2", "/snapshots", "snapshot");

exports.volumeType = defres("volumev2", "/types", "volume_type", {
	setExtraSpec: ['post', '/:id/extra_specs', 'extra_specs'],
	delExtraSpec: ['del', '/:id/extra_specs/:key']
});

exports.qos = defres("volumev2", "/qos-specs", "qos_spec", {
});
