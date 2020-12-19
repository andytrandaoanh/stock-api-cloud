const sqlConnection = require("./db.js");


exports.checkMaxTransDataExist = (result) => {

  let strSQL = 'select 1 as status from max_index_trans where date(created_at) = DATE(CURRENT_TIMESTAMP)  LIMIT 1';

    console.log('strSQL: ', strSQL)
    sqlConnection.query(strSQL, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }

      if (res.length) {
        result(null, res[0]);;
        return;
      }
      else {
        result(null, 0);;
        return;

      }

    });



};


exports.insertDataLine = (result) => {

  let strSQL = 'INSERT INTO max_index_trans (max_dateseq) SELECT MAX(dateseq) FROM transactions';

    console.log('strSQL: ', strSQL)
    sqlConnection.query(strSQL, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
      
      console.log("inserted maxtrans: ", { id: res.insertId});
      result(null, { id: res.insertId});
      
    });



};
