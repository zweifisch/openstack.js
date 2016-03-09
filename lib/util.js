"use strict";

let rp = require("request-promise");
let co = require("co");

let merge = function (base, more) {
    ret = {};
    for (let key of Object.keys(base)){
        ret[key] = base[key];
    }
    for (let key of Object.keys(more)){
        ret[key] = more[key];
    }
    return ret;
};

let request = (method)=> co.wrap(function* (opts) {
    let url = yield opts.url;
    let token = yield opts.token;
    let headers = {"X-Auth-Token": token.token};
    return rp({
        method: method,
        url: url,
        headers: opts.headers ? merge(headers, opts.headers) : headers,
        body: opts.body,
        qs: opts.params,
        useQuerystring: true,
        json: true});
});

exports.get = request("GET");
exports.del = request("DELETE");
exports.post = request("POST");
exports.put = request("PUT");
exports.patch = request("PATCH");
exports.head = request("HEAD");

exports.attr = (attr)=> (obj)=> obj && attr in obj ? obj[attr] : obj;

exports.endpoint = co.wrap(function* (token, service, _interface, region) {
    if (!token)
        throw new Error(`Invalid Token`);
    token = yield token;
    if (!token.catalog)
        throw new Error(`Catalog not found in token`);
    let _service = token.catalog.find((x)=> x.type === service);
    if (!_service)
        throw new Error(`Service '${service}' not found in catalog`);

    let endpoint = _service.endpoints.find((ep)=> ep.interface === _interface && (region ? ep.region === region : true));
    if (!endpoint)
        throw new Error(`Endpoint not found for '${service}' on interface '${_interface}' in region '${region}'`);
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
        del: ["del", "/:id"]
    };
    let _actions = {};
    if (opts) {
        (opts.only || Object.keys(actions)).forEach((action)=> _actions[action] = actions[action]);
        for (let action of Object.keys(opts))
            if (action !== "only" && action !== "headers") _actions[action] = opts[action];
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
        if (!Array.isArray(_actions[action])) {
            throw new Error(`Unknow action '${action}'`);
        }
        let method = _actions[action][0];
        let _path = path + _actions[action][1];
        let _singular = _actions[action].length > 2 ? _actions[action][2] : singular;
        let headers = _actions[action].length > 3 ? _actions[action][3] : opts && opts.headers;
        let matched = _path.match(/:[^/]+/g);
        let params = matched ? matched.map((x)=>x.substr(1)) : [];
        if (method !== "get")
            params.push("body");
        params.push("params");
        ret[action] = eval(`((util)=>
function (token, region, ${params.join(", ")}) {
    var path = \`${_path.replace(/:([^/]+)/g, (_, param)=> `\${${param}}`)}\`;
    ${method !== "get" && _singular ? `if (body) body = {${_singular}: body};` : ""}
    var result = util.${method}({
        url: util.endpoint(token, "${service}", "public", region).then((url)=> url+path),
        token: token,
        params: params,
        headers: ${headers ? JSON.stringify(headers) : null},
    ${method !== "get" ? "    body: body" : ""}});
    return ${(action === "list" ? plural : _singular) ? `result.then(util.attr("${action === "list" ? plural : _singular}"))` : "result"};
})`)(exports);
    }
    return ret;
};
