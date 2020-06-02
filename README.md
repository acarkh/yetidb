# yetidb

A database handler. Supports JSON, [LevelDB](https://npmjs.com/package/level) and [YAML](https://npmjs.com/package/yaml).

## Links

+ ~~Documentation~~ \[soon\]
+ [NPM page](https.//npmjs.com/package/yetidb)
+ [GitHub page](https://github.com/imacar/yetidb)

## Stats and badges

![npm downloads](https://img.shields.io/npm/dt/yetidb) ![open issues](https://img.shields.io/github/issues-raw/imacar/yetidb)

## Example

```js
const yetidb = require("yetidb");
const db = new yetidb("json", {
  "databaseName": "database",
  "autoFile": true
});

db.set("a.b.c", 12);
db.get("a"); // {"b": {"c": 12}}
```
