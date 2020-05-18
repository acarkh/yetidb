# minimizedb

A database handler

## Links

[for documentation](https://minimizedb.js.org/)

## Stats and badges

![npm](https://img.shields.io/npm/dt/minimizedb)

## Example

```js
const minimize = require("minimizedb");
const db = new minimize("json", {
  "databaseName": "database",
  "autoFile": true
});

db.set("a.b.c", 12);
db.get("a"); // {"b": {"c": 12}}
```
