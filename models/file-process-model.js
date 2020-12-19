const sqlConnection = require("./db.js");


// Create and Save a new Photo
exports.insertDB = (jsonObj, request, response) => {
  console.log('total records:', jsonObj.length);
  const total = jsonObj.length;
  const step = 1000;
  const stepTotal = Math.floor(total/step);
  console.log('number of steps: ', stepTotal);
  for (k=0; k< (stepTotal + 1); k++) {
    console.log('processing: ', k, '/', stepTotal);
    let insertData = [];
    for (i=k*step; i<(k+1)*step; i++){     
      if (i<total) {
        let rowData = [
        jsonObj[i]['<Ticker>'], 
        parseInt(jsonObj[i]['<DTYYYYMMDD>']),
        parseFloat(jsonObj[i]['<Open>']),
        parseFloat(jsonObj[i]['<High>']),
        parseFloat(jsonObj[i]['<Low>']),
        parseFloat(jsonObj[i]['<Close>']),
        parseInt(jsonObj[i]['<Volume>'])
        ]
        insertData.push(rowData);
      }
      
    }
    let strSQL = `INSERT INTO transactions 
    (ticker, dateseq, open_px, high_px, low_px, close_px, volume )  VALUES ?  `;
    
    // execute the insert statment
    sqlConnection.query(strSQL, [insertData], (err, result) => {
      if (err) {
        console.log(insertData);
        return console.error(err.message);
      }
      // get inserted rows
      //console.log('processing: ', k*step)
      //console.log('Row inserted:' + result.affectedRows);
    });
  }
}