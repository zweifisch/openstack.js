"use strict";

let defres = require("./util").defres;
let attr = require("./util").attr;

exports.server = defres("compute", "/servers", "server");
exports.serverdetail = defres("compute", "/servers/detail", "server");

exports.volumeAttachment = defres("compute", "/servers/:server_id/os-volume_attachments",
                                  "volumeAttachment", {only: ["create", "del", "list"]});

let serverAction = defres("compute", "/servers/:id/action", null, {only: ["create"]});

exports.flavor = defres("compute", "/flavors", "flavor");
exports.flavordetail = defres("compute", "/flavors/detail", "flavor", {only: ["list"]});

exports.server.vncConsole = (token, region, id, type) =>
    serverAction.create(token, region, id, {"os-getVNCConsole": {type: type || "novnc"}}).then(attr("console"));

exports.server.resetState = (token, region, id, state) =>
    serverAction.create(token, region, id, {"os-resetState": {state: state || "active"}});

exports.serverAction = serverAction;

exports.quotaSet = defres("compute", "/os-quota-sets", "quota_set", {only: ["show"]});

exports.limit = defres("compute", "/limits", "limit", {only: ["list"]});

exports.host = defres("compute", "/os-hosts", "host", {only: ["list"]});

exports.aggregate = defres("compute", "/os-aggregates", "aggregate");
exports.hypervisor = defres("compute", "/os-hypervisors", "hypervisor");
exports.agent = defres("compute", "/os-agents", "agent");

exports.keypair = defres("compute", "/os-keypairs", "keypair");
