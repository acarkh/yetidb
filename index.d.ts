type Options = {
  autoFile?: boolean | true;
  ignoreWarns?: boolean | false;
  readableSaving?: boolean | false;
  deletingBlankData?: boolean | false;
  databaseName: string
}

declare class Database {
  constructor(type: "json" | "level" | "yaml", options: Options);
  /**
   * Sets data in created database.
   * @example
   * db.set("test.okey", 12); // {"test": {"okey": 12}}
  */
  public set(key: string, value: any): any;

  /**
   * Deletes data from created database.
   * @example
   * db.set("test.okey", 12);
   * db.delete("test.okey"); // true
  */
  public delete(key: string): Boolean;

  /**
   * All data in created database.
   * @example
   * db.set("test.okey", 12);
   * db.all(); // {"test": {"okey": 12}}
  */
  public all(): Object;

  /**
   * Gets data from created database.
   * @example
   * db.set("test.okey", 12);
   * db.get("test"); // {"okey": 12}
  */
  public get(key: string): any;

  /**
   * Checks if data in created database.
   * @example
   * db.set("test.okey", 12);
   * db.has("test"); // true
  */
  public has(ket: string): Boolean;

  /**
   * Gets data from created database. Clone of get funtion.
  */
  public fetch(key: string): any;

  /**
   * Pushs element to data in created database.
   * @example
   * db.set("test.hello", []);
   * db.push("test.hello", 12); // [12]
   * db.get("test.hello"); // [12]
  */
  public push(key: string, value: any): Array<any>;

  /**
   * Deletes element from data in created database by index.
   * @example
   * db.get("test"); // [12, 21, 32]
   * db.delByIndex("test", 1); // [12, 32]
   * db.get("test"); // [12, 32]
  */
  public delByIndex(key: string, index: number): Array<any>;

  /**
   * Deletes element from data in created database by value.
   * @example
   * db.get("test"); // [12, 21, 32]
   * db.delByValue("test", 21); // [12, 32]
   * db.get("test"); // [12, 32]
  */
  public delByValue(key: string, value: any): Array<any>;

  /**
   * Sets element from data in created database by index.
   * @example
   * db.get("test"); // [12, 21, 32]
   * db.setByIndex("test", 2, "test lol"); // [12, 21, "test lol"]
   * db.get("test"); // [12, 21, "test lol"]
  */
  public setByIndex(key: string, index: number, value: any): Array<any>;

  /**
   * Updates data in created database.
   * @example
   * db.get("test"); // 12
   * db.update("test", (x => x / 2)); // 6
   * db.get("test"); // 6
  */
  public update(key: string, func: Function): any;

  /**
   * Adds a value to data in created database.
   * @example
   * db.set("test", 12);
   * db.add("test", 12); // 24
   * db.get("test"); // 24
  */
  public add(key: string, value: number): Number;

  /**
   * Subtracts a value to data in created database.
   * @example
   * db.set("test", 12);
   * db.subtract("test", 12); // 0
   * db.get("test"); // 0
  */
  public subtract(key: string, value: number): Number;

  /**
   * Subtracts a value to data in created database. Clone of subtract function.
  */
  public substract(key: string, value: number): Number;

  /**
   * Subtracts a value to data in created database. Clone of subtract function.
  */
  public subs(key: string, value: number): Number;
}

export = Database;