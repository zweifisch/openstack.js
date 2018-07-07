"use strict";

let rp = require("request-promise");
let co = require("co");

let merge = function (base, more) {
    let ret = {};
    for (let key of Object.keys(base)){
        ret[key] = base[key];
    }
    for (let key of Object.keys(more)){
        ret[key] = more[key];
    }
    return ret;
};

let request = (method)=> co.wrap(function* (opts) {
    let headers = {"X-Auth-Token": opts.token.token};
    let request = {
        method: method,
        url: opts.url,
        headers: opts.headers ? merge(headers, opts.headers) : headers,
        qs: opts.params,
        useQuerystring: true,
        json: true,
        transform: opts.transform
    };
    if (opts.body !== null) {
        request.body = opts.body;
    }
    return rp(request);
});

exports.get = request("GET");
exports.del = request("DELETE");
exports.post = request("POST");
exports.put = request("PUT");
exports.patch = request("PATCH");
exports.head = request("HEAD");

exports.attr = (attr)=> (obj)=> obj && attr in obj ? obj[attr] : obj;

let getEndpoint = (token, service, _interface, region)=> {
    if (!token.catalog)
        throw new Error(`Catalog not found in token`);
    let _service = token.catalog.find((x)=> x.type === service);
    if (!_service)
        throw new Error(`Service '${service}' not found in catalog`);

    _interface = _interface || token.interface || 'public'

    let endpoint = _service.endpoints.find((ep)=> ep.interface === _interface && (region ? ep.region === region : true));
    if (!endpoint)
        throw new Error(`Endpoint not found for '${service}' on interface '${_interface}' in region '${region}'`);
    if (service === "identity") {
        return endpoint.url.replace("v2.0", "v3");
    }
    return endpoint.url;
};

exports.endpoint = function (token, service, _interface, region) {
    if (!token)
        throw new Error(`Invalid Token`);
    if ("function" === typeof token.then) {
        return token.then(tk => getEndpoint(tk, service, _interface, region));
    }
    return getEndpoint(token, service, _interface, region);
};

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
        let _headers = _actions[action].length > 3 ? _actions[action][3] : opts && opts.headers;
        let _transform = _actions[action].length > 4 ? _actions[action][4] : null;
        let matched = _path.match(/:[^/]+/g);
        let params = matched ? matched.map((x)=>x.substr(1)) : [];
        if (method !== "get")
            params.push("body");
        params.push("params");
        params.push("headers");
        let fnName = `openstack_${service.replace(/-/g, "_")}_${path.replace(/[:/.-]/g, "_")}_${action}`;
        let js = `function ${fnName} (token, region, ${params.join(", ")}) {
    var run = function (token) {
        var path = \`${_path.replace(/:([^/]+)/g, (_, param)=> `\${${param}}`)}\`;
        ${method !== "get" && _singular ? `if (body) body = {${_singular}: body};` : ""}
        var result = util.${method}({
            url: util.endpoint(token, "${service}", null, region) + path,
            token: token,
            params: params,
            headers: Object.assign(${_headers ? JSON.stringify(_headers) : null} || headers || {}, token.language ? {'Accept-Language': token.language} : {}),
            transform: ${_transform},
        ${method !== "get" ? "    body: body" : ""}});
        return ${(action === "list" ? plural : _singular) ? `result.then(util.attr("${action === "list" ? plural : _singular}"))` : "result"};
    }
    if ("function" === typeof token.then) {
        return token.then(run);
    }
    return run(token);
}`;
        try {
            ret[action] = eval(`((util)=>${js})`)(exports);
        } catch (e) {
            e.message = `${e.message}\n${js}`
            throw e;
        }
    }
    return ret;
};
