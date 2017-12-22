# openstack-client

openstack client for nodejs

a thin wrapper over the Openstack REST API

also availalble in [clojure](https://github.com/zweifisch/clostack) and [elixir](https://github.com/zweifisch/openstack.ex)

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

normally following methods are defined for a resource

```js
let {keystone: {user}} = client
user.list(token, region)
user.create(token, region, {name: 'bob'})
user.show(token, region, id)
user.update(token, region, {email: 'bob@bob.com'})
user.del(token, region, id)
```

sometimes, additional methods are defined, like [this](https://github.com/zweifisch/openstack.js/blob/8d0d1a9861ba2b3dfe68790381f007306c2817c9/lib/keystone.js#L12)

server creation is an exception that you have to pass the `server` key, might be changed in future versions

```js
nova.server.create(token, region, {server: {name: 'vm-101'}})
```

read the code and consult the Openstack REST API for more details

- [keystone](https://developer.openstack.org/api-ref/identity/v3)
- [nova](https://developer.openstack.org/api-ref/compute)
- [neutron](https://developer.openstack.org/api-ref/network/v2)

