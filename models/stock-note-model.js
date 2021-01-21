const sql = require("./db.js");

// constructor
const StockNote = function(stockNote) {  
  this.ticker_id = stockNote.tickerId;
  this.note = stockNote.note;
};

StockNote.create = (newStockNote, result) => {
  sql.query("INSERT INTO stock_notes SET ?", newStockNote, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created stockNote: ", { id: res.insertId, ...newStockNote });
    result(null, { id: res.insertId, ...newStockNote });
  });
};

StockNote.findById = (stockNoteId, result) => {
  sql.query(`SELECT * FROM stock_notes WHERE id = ${stockNoteId}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found stockNote: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found StockNote with the id
    result({ kind: "not_found" }, null);
  });
};

StockNote.getAll = result => {
  sql.query("SELECT * FROM stock_notes order by id desc;", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("stock_notes: ", res);
    result(null, res);
  });
};

StockNote.updateById = (id, stockNote, result) => {
  sql.query(
    "UPDATE stock_notes SET note = ?WHERE id = ?",
    [stockNote.note, id],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found StockNote with the id
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated stockNote: ", { id: id, ...stockNote });
      result(null, { id: id, ...stockNote });
    }
  );
};


StockNote.remove = (id, result) => {
  sql.query("DELETE FROM stock_notes WHERE id = ?", id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // not found StockNote with the id
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted stockNote with id: ", id);
    result(null, res);
  });
};

StockNote.removeAll = result => {
  sql.query("DELETE FROM stock_notes", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log(`deleted ${res.affectedRows} stock_notes`);
    result(null, res);
  });
};



StockNote.searchByQueryParams = (searchParams, result) => {

  let strSQL = '';


  if ('tickerid' in searchParams)  strSQL = `select * from stock_notes where ticker_id = ${searchParams.tickerid} order by id desc` 

    
  if (strSQL) {

    //console.log('strSQL: ', strSQL)
    sql.query(strSQL, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }

      if (res.length) {
        //console.log("found terms: ", res);
        result(null, res);
        return;
      }

      // not found Term with the id
      result({ kind: "not_found" }, null);
    });

  }
  else result({ kind: "invalid_param" }, null);

};



module.exports = StockNote;
