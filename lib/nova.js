"use strict";

let defres = require("./util").defres;
let attr = require("./util").attr;

exports.server = defres("compute", "/servers", "server", {
    attachInterface: ["post", "/:id/os-interface", "interfaceAttachment"],
    detachInterface: ["del", "/:id/os-interface/:port_id", null],
    listInterface: ["get", "/:id/os-interface", "interfaceAttachments"]
});
exports.serverDetail = defres("compute", "/servers/detail", "server");

exports.volumesBoot = defres("compute", "/os-volumes_boot", "server", {only: ["create"]});

exports.volumeAttachment = defres("compute", "/servers/:server_id/os-volume_attachments",
                                  "volumeAttachment", {only: ["create", "del", "list"]});

let serverAction = defres("compute", "/servers/:id/action", null, {only: ["create"]});

exports.flavor = defres("compute", "/flavors", "flavor");
exports.flavorDetail = defres("compute", "/flavors/detail", "flavor", {only: ["list"]});

exports.server.vncConsole = (token, region, id, type) =>
    serverAction.create(token, region, id, {"os-getVNCConsole": {type: type || "novnc"}}).then(attr("console"));

exports.server.resetState = (token, region, id, state) =>
    serverAction.create(token, region, id, {"os-resetState": {state: state || "active"}});

exports.serverAction = serverAction;

exports.serverMetadata = defres("compute", "/servers/:server_id/metadata", "meta");

exports.quotaSet = defres("compute", "/os-quota-sets", "quota_set", {only: ["show", "update"]});

exports.limit = defres("compute", "/limits", "limit", {only: ["list"]});

exports.host = defres("compute", "/os-hosts", "host", {only: ["list"]});

exports.aggregate = defres("compute", "/os-aggregates", "aggregate");
exports.hypervisor = defres("compute", "/os-hypervisors", "hypervisor", {
    listDetail: ["get", "/detail", "hypervisors"],
    uptime: ["get", "/:id/uptime"],
    statistics: ["get", "/statistics", "hypervisor_statistics"]
});
exports.agent = defres("compute", "/os-agents", "agent");

exports.keypair = defres("compute", "/os-keypairs", "keypair");
