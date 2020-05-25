const { isObject, setObject, getObject, deleteObject, toDataFromString } = require("../util");
let deasync, levelup, leveldown;

module.exports = class {
  constructor(options) {
    if (!isObject(options)) throw new TypeError("\"options\" parameter must be Object.");
    if (!options.hasOwnProperty("databaseName")) throw new TypeError("\"options\" parameter must have \"databaseName\" prototype.");
    if (typeof options.databaseName !== "string") throw new TypeError("\"databaseName\" prototype in \"options\" parameter must be String.");

    if (options.hasOwnProperty("ignoreWarns") && (typeof options.ignoreWarns !== "boolean")) throw new TypeError("\"ignoreWarns\" prototype in \"options\" parameter must be Boolean.");
    if (options.hasOwnProperty("deletingBlankData") && (typeof options.deletingBlankData !== "boolean")) throw new TypeError("\"deletingBlankData\" prototype in \"options\" parameter must be Boolean.");

    this.databaseName = options.databaseName;
    this.ignoreWarns = ((typeof options.ignoreWarns != "undefined") ? options.ignoreWarns : false);
    this.deletingBlankData = ((typeof options.deletingBlankData != "undefined") ? options.deletingBlankData : false);

    try {
      levelup = require("levelup");
      leveldown = require("leveldown");
      require("level");
      deasync = require("deasync");
    } catch (error) {
      throw new Error("You must install \"level\", \"leveldown\", \"levelup\", \"deasync\" modules.")
    }

    this.database = levelup(leveldown(`${process.cwd()}/databases/${this.databaseName}`));
  }

  set(key, value) {
    let data = this.all();
    data = setObject(data, key, value);

    deasync(function (obj, cb) {
      obj.database.put(obj.key, JSON.stringify({
        "type": typeof obj.data[obj.key],
        "data": obj.data[obj.key]
      }), function (error) {
        if (error) return;
      })

      cb(null, data);
    })({
      "database": this.database,
      "key": key.split(".")[0],
      data
    });

    return data;
  }

  get(key) {
    let data = getObject(this.all(), key);

    return data;
  }

  has(key) {
    let data = getObject(this.all(), key);

    return (typeof data != "undefined");
  }

  delete(key) {
    if (!key.includes(".")) {
      this.database.del(key);
    } else {
      let data = deleteObject(this.all()[key.split(".")[0]], key.split(".").slice(1).join("."));
      this.set(key.split(".")[0], data);
    }

    return true;
  }

  all() {
    let data = deasync(function (obj, cb) {
      let all = {};

      obj.database.createReadStream().on("data", function (data) {
        let val = JSON.parse(data.value.toString());
        all[data.key.toString()] = toDataFromString(val.data, val.type);
      }).on("end", function () {
        cb(null, all);
      })
    })({
      "database": this.database
    });

    return data;
  }
}