const sql = require("./db.js");

// constructor
const StockListItem = function(stockListItem) {    
  this.ticker = stockListItem.ticker;
  this.list_id = stockListItem.listId;
 };

StockListItem.create = (newStockListItem, result) => {
  sql.query("INSERT INTO stock_list_items SET ?", newStockListItem, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created stockListItem: ", { item_id: res.insertId, ...newStockListItem });
    result(null, { item_id: res.insertId, ...newStockListItem });
  });
};

StockListItem.findById = (listId, result) => {
  sql.query(`SELECT * FROM stock_list_items WHERE item_id = ${listId}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found stockListItem: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found stockListItem with the id
    result({ kind: "not_found" }, null);
  });
};

StockListItem.getAll = result => {
  strSQL = `select * from stock_list_items order by item_id desc limit 100;`;
  
  sql.query(strSQL, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("stockListItems: ", res);
    result(null, res);
  });
};


StockListItem.getByListId = (listId, result) => {
  strSQL = `select * from stock_item_view where list_id = ${listId};`;
  
  sql.query(strSQL, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("stockListItems: ", res);
    result(null, res);
  });
};


StockListItem.updateById = (id, stockListItem, result) => {
  sql.query(
    "UPDATE stock_list_items SET list_name = ?, status = ? WHERE item_id = ?",
    [stockListItem.list_name, stockListItem.status, id],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found stockListItem with the id
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated stockListItem: ", { item_id: stockListItem.item_id, ...stockListItem });
      result(null, { item_id: stockListItem.item_id, ...stockListItem });
    }
  );
};

StockListItem.remove = (id, result) => {
  sql.query("DELETE FROM stock_list_items WHERE item_id = ?", id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // not found stockListItem with the id
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted stockListItem with id: ", id);
    result(null, res);
  });
};

StockListItem.removeAll = result => {
  sql.query("DELETE FROM stock_list_items", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log(`deleted ${res.affectedRows} stockListItems`);
    result(null, res);
  });
};




module.exports =  StockListItem;
