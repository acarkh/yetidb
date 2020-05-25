# yetidb

A database handler

## Links

~~for documentation~~

## Stats and badges

![npm](https://img.shields.io/npm/dt/yetidb)

## Example

```js
const yeti = require("yetidb");
const db = new minimize("json", {
  "databaseName": "database",
  "autoFile": true
});

db.set("a.b.c", 12);
db.get("a"); // {"b": {"c": 12}}
```
