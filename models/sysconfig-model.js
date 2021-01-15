const sql = require("./db.js");

// constructor
const Config = function(config) {    
  this.syskey = config.syskey;
  this.value = config.value;
  this.status = config.status ? config.status : 0;

};

Config.create = (newConfig, result) => {
  sql.query("INSERT INTO sysconfigs SET ?", newConfig, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created config: ", { id: res.insertId, ...newConfig });
    result(null, { id: res.insertId, ...newConfig });
  });
};

Config.findById = (id, result) => {
  sql.query(`SELECT * FROM sysconfigs WHERE id = ${id}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found config: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found Config with the id
    result({ kind: "not_found" }, null);
  });
};

Config.getAll = result => {
  sql.query("SELECT * FROM sysconfigs", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("sysconfigs: ", res);
    result(null, res);
  });
};

Config.updateById = (id, config, result) => {
  sql.query(
    "UPDATE sysconfigs SET syskey = ?, value= ?, status = ? WHERE id = ?",
    [config.syskey, config.value, config.status, id],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found Config with the id
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated config: ", { id: config.id, ...config });
      result(null, { id: config.id, ...config });
    }
  );
};


Config.remove = (id, result) => {
  sql.query("DELETE FROM sysconfigs WHERE id = ?", id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // not found Config with the id
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted config with id: ", id);
    result(null, res);
  });
};

Config.removeAll = result => {
  sql.query("DELETE FROM sysconfigs", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log(`deleted ${res.affectedRows} sysconfigs`);
    result(null, res);
  });
};

module.exports = Config;
