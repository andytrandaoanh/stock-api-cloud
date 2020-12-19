const sqlConnection = require("./db.js");


exports.getStockListItems = (listId, callback) =>{
    sqlConnection.query(`select * from stock_list_items where list_id = ${listId} order by ticker;`, (error, result) => {
        if (error) {          
          callback(error, null);
          return;
        }
    
        if (result.length) {
          //console.log("dates: ", res);
             callback(null, result);
          return;
        }
    })    

};

