"use strict";

let util = require("./util");


let url = (token, region, path)=> util.endpoint(token, "compute", "public", region).then((url)=> `${url}${path}`);

exports.serverList = (token, region, params)=> util.get({
    url: url(token, region, "/servers"),
    token: token,
    params: params});
exports.serverCreate = (token, region, body)=> util.post({
    url: url(token, region, "/servers"),
    token: token,
    body: body});
exports.serverDel = (token, region, id)=> util.del({
    url: url(token, region, `/servers/${id}`),
    token: token});
