

## usage

    let client = require("openstack");
    let token = client.authenticate({endpoint: "http://keystone/v3",
                                     user:"admin",
                                     password: "password",
                                     userDomainName:"Default",
                                     projectName:"admin",
                                     projectDomainName:"Default"});
    client.compute.server.list(token, "RegionOne");
