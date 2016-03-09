"use strict";

let defres = require("./util").defres;

exports.image = defres("image", "/v2/images", [null, "images"], {
    update: ["patch", "/:id", null, {
        "Content-Type": "application/openstack-images-v2.1-json-patch"}],
    reactive: ["post", "/:id/actions/reactive", null],
    deactive: ["post", "/:id/actions/deactive", null]
});
