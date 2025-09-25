## Tagstore

### API docs
[https://ai.contentfabric.io/tagstore/docs](https://ai.contentfabric.io/tagstore/docs)

### Examples

- Obtain an auth token for the example tenant and set as `FABRIC_AUTH` environment variable
- Run script

##### Via qfab_cli/auth
- `export FABRIC_AUTH=$(qfab_cli content token create iq__5UkLrg9mLp2EgVQokPbtuqrmeFL --config elv-config.json | jq -r '.bearer')`

#### Redbull

##### Python

`python tagstore/examples/redbull/example.py`

##### Javascript

`node tagstore/examples/redbull/example.js`
