const sql = require("./db.js");

// constructor
const Stock = function(stock) {  
  this.ticker = stock.ticker;
  this.industry = stock.industry;
  this.exchange = stock.exchange;
  this.company = stock.company;

};

Stock.create = (newStock, result) => {
  sql.query("INSERT INTO stocks SET ?", newStock, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created stock: ", { id: res.insertId, ...newStock });
    result(null, { id: res.insertId, ...newStock });
  });
};

Stock.findById = (stockId, result) => {
  sql.query(`SELECT * FROM stocks WHERE id = ${stockId}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found stock: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found Stock with the id
    result({ kind: "not_found" }, null);
  });
};

Stock.getAll = result => {
  sql.query("SELECT * FROM stocks", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    //console.log("stocks: ", res);
    result(null, res);
  });
};

Stock.updateById = (id, stock, result) => {
  sql.query(
    "UPDATE stocks SET ticker = ?, industry = ?, exchange = ?,  company = ?  WHERE id = ?",
    [stock.ticker, stock.industry, stock.exchange, stock.company , id],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found Stock with the id
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated stock: ", { id: id, ...stock });
      result(null, { id: id, ...stock });
    }
  );
};


Stock.remove = (id, result) => {
  sql.query("DELETE FROM stocks WHERE id = ?", id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // not found Stock with the id
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted stock with id: ", id);
    result(null, res);
  });
};

Stock.removeAll = result => {
  sql.query("DELETE FROM stocks", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log(`deleted ${res.affectedRows} stocks`);
    result(null, res);
  });
};



Stock.searchByQueryParams = (searchParams, result) => {

  let strSQL = '';


  if ('ticker' in searchParams)  strSQL = `select * from stocks where ticker like '${searchParams.ticker}' order by id` 

    
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



module.exports = Stock;
