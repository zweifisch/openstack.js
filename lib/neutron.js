"use strict";

let defres = require("./util").defres;
let attr = require("./util").attr;

exports.network = defres("network", "/v2.0/networks", "network");
exports.port = defres("network", "/v2.0/ports", "port");
exports.subnet = defres("network", "/v2.0/subnets", "subnet");
// exports.subnetpool = defres("network", "/v2.0/subnetpools", "subnetpool");
// exports.addressScope = defres("network", "/v2.0/address-scopes", "address_scope");
exports.quota = defres("network", "/v2.0/quotas", "quota", {only: ["show"]});
// exports.extension = defres("network", "/v2.0/extensions", "extension", {only: ["show"]});
exports.router = defres("network", "/v2.0/routers", "router");
exports.router_interface = defres("network", "/v2.0/routers/:id/add_router_interface", null, {
    only: ["create"], create: ["put", ""]});
exports.floatingip = defres("network", "/v2.0/floatingips", "floatingip");
exports.securityGroup = defres("network", "/v2.0/security-groups", "security_group");
exports.securityGroupRule = defres("network", "/v2.0/security-group-rules", "security_group_rule");
// exports.endpointGroup = defres("network", "/v2.0/endpoint-groups", "endpoint_group");

exports.vpnservice = defres("network", "/v2.0/vpnservices", "vpnservice");
exports.ipsecpolicy = defres("network", "/v2.0/ipsecpolicies", ["ipsecpolicy", "ipsecpolicies"]);
exports.ikepolicy = defres("network", "/v2.0/ikepolicies", ["ikepolicy", "ikepolicies"]);
exports.ipsecSiteConnection = defres("network", "/v2.0/ipsec-site-connections", "ipsec_site_connection");

exports.lbaas = {
    loadbalancer: defres("network", "/v2.0/lbaas/loadbalancers", "loadbalancer", {
        stats: ["get", "/:id/stats"],
        statuses: ["get", "/:id/statuses"]
    }),
    listener: defres("network", "/v2.0/lbaas/listeners", "listener"),
    pool: defres("network", "/v2.0/lbaas/pools", "pool"),
    healthmonitor: defres("network", "/v2.0/lbaas/healthmonitors", "healthmonitor"),
    member: defres("network", "/v2.0/lbaas/members", "member")
};

exports.lb = {
    vip: defres("network", "/v2.0/lb/vips", "vip"),
    pool: defres("network", "/v2.0/lb/pools", "pool", {
        stats: ["get", "/:id/stats", "stats"]
    }),
    listener: defres("network", "/v2.0/lb/listeners", "listener"),
    member: defres("network", "/v2.0/lb/members", "member"),
    healthMonitor: defres("network", "/v2.0/lb/health_monitors", "health_monitor"),
    poolHealthMonitor: defres("network", "/v2.0/lb/pools/:pool_id/health_monitors", null, {
        only: ["del"],
        assoc: ["post", ""]
    })
};

exports.fw = {
    rule: defres("network", "/v2.0/fw/rule", "rule"),
    policy: defres("network", "/v2.0/fw/policies", ["policy", "policies"]),
    policyRule: defres("network", "/v2.0/fw/firewall_policies", "rule", {
        insert: ["put", "/:id/insert_rule"],
        remove: ["put", "/:id/remove_rule"],
        only: []
    }),
    firewall: defres("network", "/v2.0/fw/firewalls", "firewall")
};

exports.qos = {
    policy: defres("network", "/v2.0/qos/policies", ["policy", "policies"]),
    bandwithLimitRule: defres("network", "/v2.0/qos/policies/:policy_id/bandwidth_limit_rules", "bandwidth_limit_rule"),
    ruleType: defres("network", "/v2.0/qos/rule-types", "rule_type")
};
