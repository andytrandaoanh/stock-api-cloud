const sql = require("./db.js");

// constructor
const Stocklist = function(stocklist) {    
  this.list_name = stocklist.listName;
  this.status = stocklist.status;
 };

Stocklist.create = (newstocklist, result) => {
  sql.query("INSERT INTO stock_lists SET ?", newstocklist, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created stocklist: ", { list_id: res.insertId, ...newstocklist });
    result(null, { list_id: res.insertId, ...newstocklist });
  });
};

Stocklist.findById = (listId, result) => {
  sql.query(`SELECT * FROM stock_lists WHERE list_id = ${listId}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      //console.log("found stocklist: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found stocklist with the id
    result({ kind: "not_found" }, null);
  });
};

Stocklist.getAll = result => {
  strSQL = `select * from stock_lists order by list_id;`;
  
  sql.query(strSQL, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    //console.log("stocklists: ", res);
    result(null, res);
  });
};

Stocklist.updateById = (id, stocklist, result) => {
  sql.query(
    "UPDATE stock_lists SET list_name = ?, status = ? WHERE list_id = ?",
    [stocklist.list_name, stocklist.status, id],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found stocklist with the id
        result({ kind: "not_found" }, null);
        return;
      }

      //console.log("updated stocklist: ", { list_id: stocklist.list_id, ...stocklist });
      result(null, { list_id: stocklist.list_id, ...stocklist });
    }
  );
};

Stocklist.remove = (id, result) => {
  sql.query("DELETE FROM stock_lists WHERE list_id = ?", id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // not found stocklist with the id
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted stocklist with id: ", id);
    result(null, res);
  });
};

Stocklist.removeAll = result => {
  sql.query("DELETE FROM stock_lists", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log(`deleted ${res.affectedRows} stocklists`);
    result(null, res);
  });
};




module.exports = Stocklist;
