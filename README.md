# openstack-client

openstack client for nodejs

## usage

```js
let client = require("openstack-client");
let token = client.authenticate({
    endpoint: "http://keystone/v3",
    name:"admin",
    password: "password",
    userDomainName:"Default",
    projectName:"admin",
    projectDomainName:"Default"
});
client.nova.server.list(token, "RegionOne").then(function(servers) {
    console.dir(servers);
});
```
