"use strict";

let defres = require("./util").defres;
let attr = require("./util").attr;

exports.server = defres("compute", "/servers", "server", {
    create: ["post", "", null],
    attachInterface: ["post", "/:id/os-interface", "interfaceAttachment"],
    detachInterface: ["del", "/:id/os-interface/:port_id", null],
    listInterface: ["get", "/:id/os-interface", "interfaceAttachments"]
});
exports.serverDetail = defres("compute", "/servers/detail", "server");

exports.volumesBoot = defres("compute", "/os-volumes_boot", null, {only: ["create"]});

exports.volumeAttachment = defres("compute", "/servers/:server_id/os-volume_attachments",
                                  "volumeAttachment", {only: ["create", "del", "list"]});

let serverAction = defres("compute", "/servers/:id/action", null, {only: ["create"]});

exports.flavor = defres("compute", "/flavors", "flavor");
exports.flavorDetail = defres("compute", "/flavors/detail", "flavor", {only: ["list"]});
exports.flavorExtra = defres('compute', '/flavors/:flavor_id/os-extra_specs', ['extra_specs', 'extra_specs']);

exports.server.vncConsole = (token, region, id, type) =>
    serverAction.create(token, region, id, {"os-getVNCConsole": {type: type || "novnc"}}).then(attr("console"));

exports.server.resetState = (token, region, id, state) =>
    serverAction.create(token, region, id, {"os-resetState": {state: state || "active"}});

exports.serverAction = serverAction;

exports.serverMetadata = defres("compute", "/servers/:server_id/metadata", "meta");

exports.quotaSet = defres("compute", "/os-quota-sets", "quota_set", {
    only: ["show", "update"],
    detail: ["get", "/:id/detail"]
});

exports.quotaClassSet = defres("compute", "/os-quota-class-sets", "quota_class_set", {
    only: ["show", "update"]
});

exports.limit = defres("compute", "/limits", "limit", {only: ["list"]});

exports.tenantUsage = defres("compute", "/os-simple-tenant-usage", "tenant_usage", {only: ["show"]});

exports.host = defres("compute", "/os-hosts", "host", {only: ["list"]});

exports.aggregate = defres("compute", "/os-aggregates", "aggregate", {
	action: ['post', '/:aggregate_id/action']
});
exports.hypervisor = defres("compute", "/os-hypervisors", "hypervisor", {
    listDetail: ["get", "/detail", "hypervisors"],
    uptime: ["get", "/:id/uptime"],
    statistics: ["get", "/statistics", "hypervisor_statistics"]
});
exports.agent = defres("compute", "/os-agents", "agent");

exports.keypair = defres("compute", "/os-keypairs", "keypair");

exports.service = defres('compute', '/os-services', null, {
	disable: ['put', '/disable'],
	enable: ['put', '/enable']
});

exports.availabilityZone = defres("compute", "/os-availability-zone/detail", [null, "availabilityZoneInfo"], {only: ["list"]});
