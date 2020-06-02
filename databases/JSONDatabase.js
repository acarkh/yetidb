const { isObject, setObject, getObject, deleteObject } = require("../util");
let fs;

module.exports = class {
  constructor(options) {
    if (!isObject(options)) throw new TypeError("\"options\" parameter must be Object.");
    if (!options.hasOwnProperty("databaseName")) throw new TypeError("\"options\" parameter must have \"databaseName\" prototype.");
    if (typeof options.databaseName !== "string") throw new TypeError("\"databaseName\" prototype in \"options\" parameter must be String.");

    if (options.hasOwnProperty("ignoreWarns") && (typeof options.ignoreWarns !== "boolean")) throw new TypeError("\"ignoreWarns\" prototype in \"options\" parameter must be Boolean.");
    if (options.hasOwnProperty("autoFile") && (typeof options.autoFile !== "boolean")) throw new TypeError("\"autoFile\" prototype in \"options\" parameter must be Boolean.");
    if (options.hasOwnProperty("readableSaving") && (typeof options.readableSaving !== "boolean")) throw new TypeError("\"readableSaving\" prototype in \"options\" parameter must be Boolean.");
    if (options.hasOwnProperty("deletingBlankData") && (typeof options.deletingBlankData !== "boolean")) throw new TypeError("\"deletingBlankData\" prototype in \"options\" parameter must be Boolean.");

    this.databaseName = options.databaseName;
    this.ignoreWarns = ((typeof options.ignoreWarns != "undefined") ? options.ignoreWarns : false);
    this.autoFile = ((typeof options.autoFile != "undefined") ? options.autoFile : true);
    this.readableSaving = ((typeof options.readableSaving != "undefined") ? options.readableSaving : false);
    this.deletingBlankData = ((typeof options.deletingBlankData != "undefined") ? options.deletingBlankData : false);

    try {
      fs = require("graceful-fs");
    } catch (error) {
      if (!this.ignoreWarns) console.warn("\"graceful-fs\" better than \"fs\". You can install this.");
      fs = require("fs");
    }

    if (this.autoFile == true) {
      if (fs.existsSync(`./databases/${this.databaseName}.json`) == false) {
        if (fs.existsSync("./databases") == false) {
          fs.mkdirSync("./databases");
        }

        fs.writeFileSync(`./databases/${this.databaseName}.json`, "{}");
      }
    }
  }

  set(key, value) {
    let data = fs.readFileSync(`./databases/${this.databaseName}.json`, "utf8");
    data = setObject(JSON.parse(data), key, value);

    if (this.readableSaving == true) {
      fs.writeFileSync(`./databases/${this.databaseName}.json`, JSON.stringify(data, null, 2));
    } else {
      fs.writeFileSync(`./databases/${this.databaseName}.json`, JSON.stringify(data));
    }

    return data;
  }

  get(key) {
    let data = fs.readFileSync(`./databases/${this.databaseName}.json`, "utf8");
    data = getObject(JSON.parse(data), key);

    return data;
  }

  has(key) {
    let data = fs.readFileSync(`./databases/${this.databaseName}.json`, "utf8");
    data = getObject(JSON.parse(data), key);

    return (typeof data != "undefined");
  }

  delete(key) {
    let data = fs.readFileSync(`./databases/${this.databaseName}.json`, "utf8");
    data = deleteObject(JSON.parse(data), key);

    if (this.deletingBlankData == true) {
      for (let i = 0; i < key.split(".").length; i++) {
        let newGet = getObject(data, key.split(".").slice(0, -(i + 1)).join("."));

        if ((isObject(newGet) == true) && (Object.keys(newGet).length == 0)) {
          data = deleteObject(data, key.split(".").slice(0, -(i + 1)).join("."));
        }
      }
    }

    if (this.readableSaving == true) {
      fs.writeFileSync(`./databases/${this.databaseName}.json`, JSON.stringify(data, null, 2));
    } else {
      fs.writeFileSync(`./databases/${this.databaseName}.json`, JSON.stringify(data));
    }

    return true;
  }

  all() {
    let data = fs.readFileSync(`./databases/${this.databaseName}.json`, "utf8");

    return JSON.parse(data);
  }
}