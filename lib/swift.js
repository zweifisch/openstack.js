"use strict";

let defres = require("./util").defres;

exports.bucket = defres("object-store", "", null, {
    list: ["get", "", null, {}, (body, resp)=> [resp.headers, body]],
    show: ["get", "/:id", null, {}, (body, resp)=> [resp.headers, body]],
    create: ["put", "/:id"]
});
