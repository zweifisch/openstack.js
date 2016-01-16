"use strict";

let defres = require("./util").defres;

exports.metric = defres("metric", "/v1/metric", null);
exports.measure = defres("metric", "/v1/metric/:metric_id/measures", null);
exports.archivePolicy = defres("metric", "/v1/archive_policy", null);
exports.archivePolicyRule = defres( "metric", "/v1/archive_policy_rule", null);
exports.resource = defres("metric", "/v1/resource/:type", null,
                          {history: ["get", "/:id/history"]});

exports.resourceMetricMeasure = defres(
    "metric", "/v1/resource/:resource_type/:resource_id/metric/:metric_type/measures", null);

exports.aggregationResourceMetric = defres(
    "metric",  "/v1/aggregation/resource/:resource_type/metric/:metric_type", null);

exports.capability = defres("metric", "/v1/capabilities", null, {only: ["list"]});
