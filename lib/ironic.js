"use strict";

let defres = require("./util").defres;

exports.chassis = defres("baremetal", "/v1/chassis", [null, "chassis"], {
    update: ["patch", "/:id"],
    headers: {"X-OpenStack-Ironic-API-Version": "1.9"}
});

exports.chassisNode = defres("baremetal", "/v1/chassis/:id/nodes", "node", {only: ["list"]});

exports.driver = defres("baremetal", "/v1/drivers", [null, "drivers"]);
exports.node = defres("baremetal", "/v1/nodes", [null, "nodes"], {
    headers: {"X-OpenStack-Ironic-API-Version": "1.9"},
    setPower: ["put", "/:id/states/power", null],
    setProvision: ["put", "/:id/states/provision", null],
    validate: ["get", "/:id/validate", null],
    update: ["patch", "/:id"],
    enableMaintenance: ["put", "/:id/maintenance", null],
    disableMaintenance: ["del", "/:id/maintenance", null]
});
exports.port = defres("baremetal", "/v1/ports", [null, "port"]);

exports.nodePort = defres("baremetal", "/v1/nodes/:id/ports", "port", {only: ["list"]});
