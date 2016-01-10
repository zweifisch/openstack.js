"use strict";

let util = require("./util");


let url = (token, path)=> `${util.endpoint(token, "identity", "public")}${path}`;

exports.user = {
    list: (token, params)=> get(url(token, "/users"), token, params),
    create: (token, body)=> post(url(token, "/users"), token, body),
    del: (token, id)=> del(url(token, "/users/#{id}"), token)
};
