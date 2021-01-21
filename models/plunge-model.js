const sql = require("./db.js");

// constructor
const Plunge = function(plunge) {  
  this.dateseq = plunge.dateseq;
  this.loss = plunge.loss;
  this.duration = plunge.duration;

};

Plunge.create = (newPlunge, result) => {
  sql.query("INSERT INTO plunges SET ?", newPlunge, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created plunge: ", { id: res.insertId, ...newPlunge });
    result(null, { id: res.insertId, ...newPlunge });
  });
};

Plunge.findById = (id, result) => {
  sql.query(`SELECT * FROM plunges WHERE id = ${id}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found plunge: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found Plunge with the id
    result({ kind: "not_found" }, null);
  });
};

Plunge.getAll = result => {
  sql.query("SELECT * FROM plunges", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    //console.log("plunges: ", res);
    result(null, res);
  });
};

Plunge.updateById = (id, plunge, result) => {
  sql.query(
    "UPDATE plunges SET dateseq = ?, loss=?, duration=? WHERE id = ?",
    [plunge.dateseq, plunge.loss, plunge.duration,  id],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found Plunge with the id
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated plunge: ", { id: id, ...plunge });
      result(null, { id: id, ...plunge });
    }
  );
};


Plunge.remove = (id, result) => {
  sql.query("DELETE FROM plunges WHERE id = ?", id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // not found Plunge with the id
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted plunge with id: ", id);
    result(null, res);
  });
};

Plunge.removeAll = result => {
  sql.query("DELETE FROM plunges", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log(`deleted ${res.affectedRows} plunges`);
    result(null, res);
  });
};



Plunge.searchByQueryParams = (searchParams, result) => {

  let strSQL = '';


  if ('dayspassed' in searchParams)  strSQL = `select max(dateseq) as maxdate from plunges` 

    
  if (strSQL) {

    //console.log('strSQL: ', strSQL)
    sql.query(strSQL, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }

      if (res.length) {
        console.log("found max date: ", res[0]);
        let newString = String(res[0]['maxdate']);
        let yearPart = newString.substring(0,4); 
        let monthPart = parseInt(newString.substring(4,6)) - 1 ; 
        let dayPart = newString.substring(6); 
        //console.log('day part', dayPart);
        let maxDate = new Date(yearPart, monthPart, dayPart);
        let currentDate = new Date();
        //console.log('max date', maxDate, 'current date' , currentDate);
        let timedif = Math.floor((currentDate.getTime() - maxDate.getTime()) / (1000 * 3600 * 24));
        //console.log(timedif);
        let data = {
          daysPassed : timedif,
          yearSince: yearPart,
          monthSince: monthPart + 1,
          daySince: dayPart
        }



        result(null, data);
        return;
      }

      // not found Term with the id
      result({ kind: "not_found" }, null);
    });

  }
  else result({ kind: "invalid_param" }, null);

};



module.exports = Plunge;
