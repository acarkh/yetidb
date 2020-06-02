const { isObject, setObject, getObject, deleteObject } = require("../util");
let fs, YAML;

module.exports = class {
  constructor(options) {
    if (!isObject(options)) throw new TypeError("\"options\" parameter must be Object.");
    if (!options.hasOwnProperty("databaseName")) throw new TypeError("\"options\" parameter must have \"databaseName\" prototype.");
    if (typeof options.databaseName !== "string") throw new TypeError("\"databaseName\" prototype in \"options\" parameter must be String.");

    if (options.hasOwnProperty("ignoreWarns") && (typeof options.ignoreWarns !== "boolean")) throw new TypeError("\"ignoreWarns\" prototype in \"options\" parameter must be Boolean.");
    if (options.hasOwnProperty("autoFile") && (typeof options.autoFile !== "boolean")) throw new TypeError("\"autoFile\" prototype in \"options\" parameter must be Boolean.");
    if (options.hasOwnProperty("deletingBlankData") && (typeof options.deletingBlankData !== "boolean")) throw new TypeError("\"deletingBlankData\" prototype in \"options\" parameter must be Boolean.");

    this.databaseName = options.databaseName;
    this.ignoreWarns = ((typeof options.ignoreWarns != "undefined") ? options.ignoreWarns : false);
    this.autoFile = ((typeof options.autoFile != "undefined") ? options.autoFile : true);
    this.deletingBlankData = ((typeof options.deletingBlankData != "undefined") ? options.deletingBlankData : false);

    try {
      fs = require("graceful-fs");
    } catch (error) {
      if (!this.ignoreWarns) console.warn("\"graceful-fs\" better than \"fs\". You can install this.");
      fs = require("fs");
    }

    try {
      YAML = require("yaml");
    } catch (error) {
      throw new TypeError("You must install \"yaml\".")
    }

    if (this.autoFile == true) {
      if (fs.existsSync(`./databases/${this.databaseName}.yml`) == false) {
        if (fs.existsSync("./databases") == false) {
          fs.mkdirSync("./databases");
        }

        fs.writeFileSync(`./databases/${this.databaseName}.yml`, "");
      }
    }
  }

  set(key, value) {
    let data = fs.readFileSync(`./databases/${this.databaseName}.yml`, "utf8");
    data = ((YAML.parse(data) == null) ? {} : YAML.parse(data));
    data = setObject(data, key, value);

    fs.writeFileSync(`./databases/${this.databaseName}.yml`, YAML.stringify(data));

    return data;
  }

  get(key) {
    let data = fs.readFileSync(`./databases/${this.databaseName}.yml`, "utf8");
    data = getObject(YAML.parse(data), key);

    return data;
  }

  has(key) {
    let data = fs.readFileSync(`./databases/${this.databaseName}.yml`, "utf8");
    data = getObject(YAML.parse(data), key);

    return (typeof data != "undefined");
  }

  delete(key) {
    let data = fs.readFileSync(`./databases/${this.databaseName}.yml`, "utf8");
    data = deleteObject(YAML.parse(data), key);

    if (this.deletingBlankData == true) {
      for (let i = 0; i < key.split(".").length; i++) {
        let newGet = getObject(data, key.split(".").slice(0, -(i + 1)).join("."));

        if ((isObject(newGet) == true) && (Object.keys(newGet).length == 0)) {
          data = deleteObject(data, key.split(".").slice(0, -(i + 1)).join("."));
        }
      }
    }

    fs.writeFileSync(`./databases/${this.databaseName}.yml`, YAML.stringify(data));

    return true;
  }

  all() {
    let data = fs.readFileSync(`./databases/${this.databaseName}.yml`, "utf8");

    return YAML.parse(data);
  }
}