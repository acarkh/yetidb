# amidb

A database handler that supports JSON, [LevelDB](https://npmjs.com/package/level), [YAML](https://npmjs.com/package/yaml) and more...

## Links

+ [NPM page](https.//npmjs.com/package/amidb)
+ [GitHub page](https://github.com/acarkh/amidb)

## Stats and badges

![npm downloads](https://img.shields.io/npm/dt/amidb) ![open issues](https://img.shields.io/github/issues-raw/acarkh/amidb)

## Example

```js
const db = require("amidb");
/* or */
const amidb = require("amidb");
const db = amidb("json", {
  "databaseName": "database",
  "autoFile": true
});

db.set("a.b.c", 12);
db.get("a"); // {"b": {"c": 12}}
```
