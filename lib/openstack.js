"use strict";

let url = require("url");
let rp = require("request-promise");
let util = require("./util");

let authenticate = (endpoint, user, scope)=> {
    let parsed = url.parse(endpoint);
    parsed.pathname = "/v3/auth/tokens";
    endpoint = url.format(parsed);
    let body = {
        auth: {}
    };
    if ("string" === typeof user)
        body.auth.identity = {
            methods: ["token"],
            token: {id: user}
        };
    else
        body.auth.identity = {
            methods: ["password"],
            password: {user: user}
        };
    if (scope) {
        body.auth.scope = scope;
    }
    return rp({
        method: "POST",
        url: endpoint,
        body: body,
        json: true,
        transform: (body, resp)=> {
            body.token.token = resp.headers['x-subject-token'];
            return body.token;
        }
    });
};

exports.authenticate = (opts)=> {
    let user = null;
    let scope = null;

    if (opts.name && opts.password) {
        user = {
            name: opts.name,
            password: opts.password
        };
        if (opts.userDomainName)
            user.domain = {name: opts.userDomainName};
        if (opts.userDomainId) 
            user.domain = {id: opts.userDomainId};
    } else if (opts.token) {
        user = opts.token;
    } else {
        throw new Error(`Missing user name or password or token`);
    }

    if (opts.projectId)
        scope = {project: {id: opts.projectId}};
    else if (opts.projectName && opts.projectDomainName)
        scope = {project: {name: opts.projectName,
                           domain: {name: opts.projectDomainName}}};
    else if (opts.projectName && opts.projectDomainId)
        scope = {project: {name: opts.projectName,
                           domain: {id: opts.projectDomainId}}};
    else if (opts.domainId)
        scope = {domain: {id: opts.domainId}};
    else if (opts.domainName)
        scope = {domain: {name: opts.domainName}};

    return authenticate(opts.endpoint, user, scope);
};
