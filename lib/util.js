"use strict";

let rp = require("request-promise");
let co = require("co");

let request = (method)=> co.wrap(function* (opts) {
    let url = yield opts.url;
    let token = yield opts.token;
    return rp({method: method,
        url: url,
        headers: {"X-Auth-Token": token.token},
        body: opts.body,
        qs: opts.params,
        json: true});
});

exports.get = request("GET");
exports.del = request("DELETE");
exports.post = request("POST");
exports.put = request("PUT");
exports.patch = request("PATCH");

exports.attr = (attr)=> (obj)=> obj[attr];

exports.endpoint = co.wrap(function* (token, service, _interface, region) {
    if (!token)
        throw new Error(`invalid token`);
    token = yield token;
    if (!token.catalog)
        throw new Error(`catalog not found in token`);
    let _service = token.catalog.find((x)=> x.type === service);
    if (!_service)
        throw new Error(`service '${service}' not found in catalog`);

    let endpoint = _service.endpoints.find((ep)=> ep.interface === _interface && (region ? ep.region === region : true));
    if (!endpoint)
        throw new Error(`endpoint not found for '${service}' on interface '${_interface}' in region '${region}'`);
    if (service === "identity") {
        return endpoint.url.replace("v2.0", "v3");
    }
    return endpoint.url;
});


exports.defres = function (service, path, singular, opts) {
    let actions = {
        list: ["get", ""],
        show: ["get", "/:id"],
        create: ["post", ""],
        update: ["put", "/:id"],
        del: ["delete", "/:id"]
    };
    let _actions = {};
    if (opts) {
        (opts.only || Object.keys(actions)).forEach((action)=> _actions[action] = actions[action]);
        for (let action of Object.keys(opts))
            if (action !== "only") _actions[action] = opts[action];
    } else {
        _actions = actions;
    }
    let plural = null;
    if ("string" === typeof singular) {
        plural = `${singular}s`;
    } else if (Array.isArray(singular)) {
        plural = singular[1];
        singular = singular[0];
    } else if (singular) {
        throw new Error("unexpected singular type");
    }
    let ret = {};
    for (let action of Object.keys(_actions)) {
        let method = _actions[action][0];
        let _path = path + _actions[action][1];
        let matched = _path.match(/:[^/]+/g);
        let params = matched ? matched.map((x)=>x.substr(1)) : [];
        if (method !== "get")
            params.push("body");
        params.push("params");
        ret[action] = eval(`((util)=>
function (token, region, ${params.join(", ")}) {
    var path = \`${_path.replace(/:([^/]+)/g, (_, param)=> `\${${param}}`)}\`;
    ${method !== "get" && singular ? `if (body) body = {${singular}: body};` : ""}
    var result = util.${method}({
        url: util.endpoint(token, "${service}", "public", region).then((url)=> url+path),
        token: token,
        params: params,
    ${method !== "get" ? "    body: body" : ""}});
    return ${plural ? `result.then(util.attr("${plural}"))` : "result"};
})`)(exports);
    }
    return ret;
};
