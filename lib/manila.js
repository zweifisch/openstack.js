"use strict";

let defres = require("./util").defres;

exports.share = defres("sharev2", "/shares", "share");
exports.shareDetail = defres("sharev2", "/shares/detail", "share");

exports.limit = defres("sharev2", "/limits", "limit", {only: ["list"]});

exports.shareType = defres("sharev2", "/types", "share_type");

exports.shareNetwork = defres("sharev2", "/share-networks", "share_network");
exports.shareNetworkDetail = defres("sharev2", "/share-networks/detail", "share_network");

exports.shareServer = defres("sharev2", "/share-servers", "share_server");

let shareAction = defres("sharev2", "/shares/:id/action", null, {only: ["create"]});

exports.share.extend = (token, region, id, size) =>
    shareAction.create(token, region, id, {"os-extend": {new_size: size}});

exports.share.shrink = (token, region, id, size) =>
    shareAction.create(token, region, id, {"os-shrink": {new_size: size}});

exports.shareAction = shareAction;
