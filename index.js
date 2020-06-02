const { isValidValue } = require("./util");

/**
 * @typedef {Object} Options
 * @property {String} databaseName Name of the database
 * @property {Boolean} [autoFile=true] If file doesn't exits, create new one. (only for "json" and "yaml" database)
 * @property {Boolean} [ignoreWarns=false] Ignore warns?
 * @property {Boolean} [readableSaving=false] Save data in readable format to database? (only for "json" database)
 * @property {Boolean} [deletingBlankData=false] Delete object when delete all child datas/object in object?
*/

class Database {
  /**
   * @param {"json"|"level"|"yaml"} type Type of the database
   * @param {Options} options Options of the database
  */
  constructor(type, options) {
    if (type == "json") {
      let JSONDatabase = require("./databases/JSONDatabase");

      this.database = new JSONDatabase(options);
    } else if (type == "level") {
      let LevelDatabase = require("./databases/LevelDatabase");

      this.database = new LevelDatabase(options);
    } else if (type == "yaml") {
      let YAMLDatabase = require("./databases/YAMLDatabase");

      this.database = new YAMLDatabase(options);
    }
  }

  /**
   * Sets data in created database.
   * @param {String} key
   * @param {Number|String|Boolean|Object|Array} value
   * @returns {any}
   * @example
   * db.set("test.okey", 12); // {"test": {"okey": 12}}
  */
  set(key, value) {
    if (typeof key == "undefined") throw new TypeError("\"key\" parameter must be available.");
    if (typeof key != "string") throw new TypeError("\"key\" parameter must be String.");
    if (typeof value == "undefined") throw new TypeError("\"value\" parameter must be available.");
    if (!isValidValue(value)) throw new TypeError("\"value\" parameter must be String or Number or Boolean or Object or Array.");

    this.database.set(key, value);

    return this.database.get(key);
  }

  /**
   * Deletes data from created database.
   * @param {String} key
   * @returns {true}
   * @example
   * db.set("test.okey", 12);
   * db.delete("test.okey"); // true
  */
  delete(key) {
    if (typeof key == "undefined") throw new TypeError("\"key\" parameter must be available.");
    if (typeof key != "string") throw new TypeError("\"key\" parameter must be String.");

    this.database.delete(key);

    return true;
  }

  /**
   * All data in created database.
   * @returns {Object}
   * @example
   * db.set("test.okey", 12);
   * db.all(); // {"test": {"okey": 12}}
  */
  all() {
    return this.database.all();
  }

  /**
   * Gets data from created database.
   * @param {String} key
   * @returns {any}
   * @example
   * db.set("test.okey", 12);
   * db.get("test"); // {"okey": 12}
  */
  get(key) {
    if (typeof key == "undefined") throw new TypeError("\"key\" parameter must be available.");
    if (typeof key != "string") throw new TypeError("\"key\" parameter must be String.");

    return this.database.get(key);
  }

  /**
   * Checks if data in created database.
   * @param {String} key
   * @returns {Boolean}
   * @example
   * db.set("test.okey", 12);
   * db.has("test"); // true
  */
  has(key) {
    if (typeof key == "undefined") throw new TypeError("\"key\" parameter must be available.");
    if (typeof key != "string") throw new TypeError("\"key\" parameter must be String.");

    return this.database.has(key);
  }

  /**
   * Gets data from created database. Clone of {@link Database#get get} funtion.
   * @param {String} key
   * @returns {any}
  */
  fetch(key) {
    return this.get(key);
  }

  /**
   * Pushs element to data in created database.
   * @param {String} key
   * @param {any} value
   * @returns {Array}
   * @example
   * db.set("test.hello", []);
   * db.push("test.hello", 12); // [12]
   * db.get("test.hello"); // [12]
  */
  push(key, value) {
    if (typeof key == "undefined") throw new TypeError("\"key\" parameter must be available.");
    if (typeof key != "string") throw new TypeError("\"key\" parameter must be String.");
    if (typeof value == "undefined") throw new TypeError("\"value\" parameter must be available.");
    if (!isValidValue(value)) throw new TypeError("\"value\" parameter must be String or Number or Boolean or Object or Array.");

    if ((this.database.has(key) == false) && (this.database.ignoreWarns == false)) console.warn("This data isn't available. Created new array to this data.");
    if (this.database.has(key) == false) this.database.set(key, []);

    let data = this.database.get(key);

    if (!Array.isArray(data)) throw new TypeError("This data isn't Array so couldn't pushed value to this data.");

    data.push(value);
    this.database.set(key, data)

    return data;
  }

  /**
   * Deletes element from data in created database by index.
   * @param {String} key
   * @param {Number} index
   * @returns {Array}
   * @example
   * db.get("test"); // [12, 21, 32]
   * db.delByIndex("test", 1); // [12, 32]
   * db.get("test"); // [12, 32]
  */
  delByIndex(key, index) {
    if (typeof key == "undefined") throw new TypeError("\"key\" parameter must be available.");
    if (typeof key != "string") throw new TypeError("\"key\" parameter must be String.");
    if (typeof index == "undefined") throw new TypeError("\"index\" parameter must be available.");
    if (typeof index != "number") throw new TypeError("\"index\" parameter must be Number.");

    if ((this.database.has(key) == false) && (this.database.ignoreWarns == false)) console.warn("This data isn't available. Created new array to this data.");
    if (this.database.has(key) == false) this.database.set(key, []);

    let data = this.database.get(key);
    let newData = [];

    if (!Array.isArray(data)) throw new TypeError("This data isn't Array so couldn't delete element from this data.");

    for (let i = 0; i < data.length; i++) {
      if (i != index) newData.push(data[i]);
    }

    return this.database.set(key, newData);
  }

  /**
   * Deletes element from data in created database by value.
   * @param {String} key
   * @param {Number|String|Boolean|Object|Array} value
   * @returns {Array}
   * @example
   * db.get("test"); // [12, 21, 32]
   * db.delByValue("test", 21); // [12, 32]
   * db.get("test"); // [12, 32]
  */
  delByValue(key, value) {
    if (typeof key == "undefined") throw new TypeError("\"key\" parameter must be available.");
    if (typeof key != "string") throw new TypeError("\"key\" parameter must be String.");
    if (typeof value == "undefined") throw new TypeError("\"value\" parameter must be available.");
    if (!isValidValue(value)) throw new TypeError("\"value\" parameter must be String or Number or Boolean or Object or Array.");

    if ((this.database.has(key) == false) && (this.database.ignoreWarns == false)) console.warn("This data isn't available. Created new array to this data.");
    if (this.database.has(key) == false) this.database.set(key, []);

    let data = this.database.get(key);
    let newData = [];

    if (!Array.isArray(data)) throw new TypeError("This data isn't Array so couldn't delete element from this data.");

    for (let i = 0; i < data.length; i++) {
      let element = data[i];

      if (element != value) newData.push(element);
    }

    this.database.set(key, newData);

    return newData;
  }

  /**
   * Sets element from data in created database by index.
   * @param {String} key
   * @param {Number} index
   * @param {Number|String|Boolean|Object|Array} value
   * @returns {Array}
   * @example
   * db.get("test"); // [12, 21, 32]
   * db.setByIndex("test", 2, "test lol"); // [12, 21, "test lol"]
   * db.get("test"); // [12, 21, "test lol"]
  */
  setByIndex(key, index, value) {
    if (typeof key == "undefined") throw new TypeError("\"key\" parameter must be available.");
    if (typeof key != "string") throw new TypeError("\"key\" parameter must be String.");
    if (typeof index == "undefined") throw new TypeError("\"index\" parameter must be available.");
    if (typeof index != "number") throw new TypeError("\"index\" parameter must be Number.");
    if (typeof value == "undefined") throw new TypeError("\"value\" parameter must be available.");
    if (!isValidValue(value)) throw new TypeError("\"value\" parameter must be String or Number or Boolean or Object or Array.");

    if ((this.database.has(key) == false) && (this.database.ignoreWarns == false)) console.warn("This data isn't available. Created new array to this data.");
    if (this.database.has(key) == false) this.database.set(key, []);

    let data = this.database.get(key);
    let newData = [];

    if (!Array.isArray(data)) throw new TypeError("This data isn't Array so couldn't delete element from this data.");

    for (let i = 0; i < data.length; i++) {
      let element = data[i];

      if (i == index) {
        newData.push(value);
      } else {
        newData.push(element);
      }
    }

    this.database.set(key, newData)

    return newData;
  }

  /**
   * Updates data in created database.
   * @param {String} key
   * @param {Function} func
   * @returns {any}
   * @example
   * db.get("test"); // 12
   * db.update("test", (x => x / 2)); // 6
   * db.get("test"); // 6
  */
  update(key, func) {
    if (typeof key == "undefined") throw new TypeError("\"key\" parameter must be available.");
    if (typeof key != "string") throw new TypeError("\"key\" parameter must be String.");
    if (typeof func == "undefined") throw new TypeError("\"func\" parameter must be available.");
    if (typeof func != "function") throw new TypeError("\"func\" parameter must be Function.");

    if ((this.database.has(key) == false) && (this.database.ignoreWarns == false)) {
      console.warn("This data isn't available. The data to be updated is received as \"undefined\".");
    }

    let data = this.database.get(key);
    this.database.set(key, func(data));
    data = this.database.get(key);

    return data;
  }

  /**
   * Adds a value to data in created database.
   * @param {String} key
   * @param {Number} value
   * @returns {Number}
   * @example
   * db.set("test", 12);
   * db.add("test", 12); // 24
   * db.get("test"); // 24
  */
  add(key, value) {
    if (typeof key == "undefined") throw new TypeError("\"key\" parameter must be available.");
    if (typeof key != "string") throw new TypeError("\"key\" parameter must be String.");
    if (typeof value == "undefined") throw new TypeError("\"value\" parameter must be available.");
    if (typeof value != "number") throw new TypeError("\"value\" parameter must be Number.");

    if ((this.database.has(key) == false) && (this.database.ignoreWarns == false)) console.warn("This data isn't available. The data to be added is received as 0.");
    if (this.database.has(key) == false) this.database.set(key, 0);

    let data = this.database.get(key);
    this.database.set(key, (data + value));
    data = this.database.get(key);

    return data;
  }

  /**
   * Subtracts a value to data in created database.
   * @param {String} key
   * @param {Number} value
   * @returns {Number}
   * @example
   * db.set("test", 12);
   * db.subtract("test", 12); // 0
   * db.get("test"); // 0
  */
  subtract(key, value) {
    if (typeof key == "undefined") throw new TypeError("\"key\" parameter must be available.");
    if (typeof key != "string") throw new TypeError("\"key\" parameter must be String.");
    if (typeof value == "undefined") throw new TypeError("\"value\" parameter must be available.");
    if (typeof value != "number") throw new TypeError("\"value\" parameter must be Number.");

    if ((this.database.has(key) == false) && (this.database.ignoreWarns == false)) console.warn("This data isn't available. The data to be subtracted is received as 0.");
    if (this.database.has(key) == false) this.database.set(key, 0);

    let data = this.database.get(key);
    this.database.set(key, (data - value));
    data = this.database.get(key);

    return data;
  }

  /**
   * Subtracts a value to data in created database. Clone of {@link Database#subtract subtract} function.
   * @param {String} key
   * @param {Number} value
   * @returns {Number}
  */
  subs(key, value) {
    return this.subtract(key, value);
  }

  /**
   * Subtracts a value to data in created database. Clone of {@link Database#subtract subtract} function.
   * @param {String} key
   * @param {Number} value
   * @returns {Number}
  */
  substract(key, value) {
    return this.subtract(key, value);
  }
}

module.exports = Database;
