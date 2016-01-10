"use strict";

let url = require("url");
let rp = require("request-promise");
let util = require("./util");

let authenticate = (endpoint, user, scope)=> {
    let parsed = url.parse(endpoint);
    parsed.pathname = "/v3/auth/tokens";
    endpoint = url.format(parsed);
    let body = {
            auth: {
                identity: {
                    methods: ["password"],
                    password: {user: user}
                }
            }
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

    if (opts.name && opts.password) {
        let user = {
            name: opts.name,
            password: opts.password
        };
        if (opts.userDomainName)
            user.domain = {name: opts.userDomainName};
        if (opts.userDomainId) 
            user.domain = {id: opts.userDomainId};
        let scope = null;
        if (opts.projectId)
            scope = {project: {id: opts.projectId}};
        if (opts.projectName && opts.projectDomainName)
            scope = {project: {name: opts.projectName,
                               domain: {name: opts.projectDomainName}}};
        if (opts.projectName && opts.projectDomainId)
            scope = {project: {name: opts.projectName,
                               domain: {id: opts.projectDomainId}}};
        return authenticate(opts.endpoint, user, scope);
    }
    throw new Error(`Missing user name or password`);
};
