# yetidb

A database handler

## Links

~~for documentation~~

## Stats and badges

![npm](https://img.shields.io/npm/dt/yetidb)

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
