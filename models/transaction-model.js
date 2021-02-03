const sqlConnection = require("./db.js");


exports.getTransactions = (stockList, dateList, callback) =>{
    //console.log('stockList', stockList);
    //console.log('dateList', dateList);
    //create sql
    //select ticker, dateseq, close_px from transactions where dateseq in (20201118, 20201119) and ticker in ('GMD', 'VRE')
    let strTicker = '';
    let strDate = '';

    stockList.forEach((stock) => {
      strTicker ? strTicker += `, '${stock}'` : strTicker += `'${stock}'`;
    })

    dateList.forEach((item) => {
      strDate ? strDate += `, ${item}` : strDate += `${item}`;
    })
    
    //console.log('strTicker', strTicker)
    //console.log('strDate', strDate)

    const strSQL = `select * from transactions 
    where dateseq in (${strDate}) and ticker in (${strTicker}) order by ticker, dateseq`;
    //console.log('strSQL:', strSQL)
    sqlConnection.query(strSQL, (error, result) => {
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



exports.getTransactionDates = (callback) =>{
    sqlConnection.query(`select distinct dateseq from transactions order by dateseq desc limit 12`, (error, result) => {
        if (error) {          
          callback(error, null);
          return;
        }
    
        if (result.length) {
          //console.log("date sequences: ", result);
             callback(null, result);
          return;
        }
    })    

};



// Create and Save a new Photo
exports.bulkInsertWithNoCheck = (dataFileId, dataList, callback) => {
  console.log('data file id:', dataFileId);  
  console.log('total records:', dataList.length);  
  console.log('first row:', dataList[0]);

  
  const total = dataList.length;
  const step = 1000;
  const stepTotal = Math.floor(total/step);
  let bulkInsertOK = true;

  console.log(`Inserting data into database in ${stepTotal} steps`);
  for (k=0; k< (stepTotal + 1); k++) {
    console.log('processing: ', k, '/', stepTotal);
    let insertData = [];
    for (i=k*step; i<(k+1)*step; i++){     
      if (i<total) {
        insertData.push(
          [
            dataList[i].ticker, 
            dataList[i].dateseq,
            dataList[i].open_px,
            dataList[i].high_px,
            dataList[i].low_px,
            dataList[i].close_px,
            dataList[i].volume
        ]);
      }
      
    }

    let strSQL = `INSERT INTO transactions 
    (ticker, dateseq, open_px, high_px, low_px, close_px, volume )  VALUES ?  `;
    
    // execute the insert statment
    sqlConnection.query(strSQL, [insertData], (err, result) => {
      if (err) {
        //console.log('error when inserting', insertData);
        bulkInsertOK = false;
        callback(err, null);
        return console.error(err.message);
      } 
      
      console.log('insert result', result)

    });
  }
  
  if (bulkInsertOK) {
    sqlConnection.query("UPDATE datafiles SET status = 1 WHERE file_id = ?",  [dataFileId],  (err, result) => {

      if (err) {    
        console.log('Error setting status of datafile to 1');
        callback(err, null);
        return;

        }
        else {
          console.log('Bulk inserting completed successfully!');

          const returnData = {affectedRows: insertData.length}
          callback(null, returnData);
          return;
        } 
        
      }
      
    );
  
  
  }

  //callback(null)
  //return;
};

//import only incremental data greater to a certain date

exports.diffInsertWithCheck = (dataFileId, dataList, callback) => {
  console.log('differential inserting...');  
  console.log('data file id:', dataFileId);  
  console.log('total records:', dataList.length);  
  let bulkInsertOK = true;



    let strGetMax = `select max_dateseq from max_trans_dates where DATE(created_at) = DATE(CURRENT_TIMESTAMP)`;
    sqlConnection.query(strGetMax, (error, result) => {
      if (error) {
        console.log('error getting max date', error.message);
        return;
      }
      
      const maxDatasequence = parseInt(result[0].max_dateseq);
      console.log('max dateseq data:', maxDatasequence);
      let count = 0;
      let insertData = [];
      dataList.forEach((item, index) => {
        if (item.dateseq > maxDatasequence) {
          //console.log(item);
          insertData.push(
            [
              item.ticker, 
              item.dateseq,
              item.open_px,
              item.high_px,
              item.low_px,
              item.close_px,
              item.volume
          ]);
          count++;
        }              
      });

      console.log('Total items to add incrementally', count);
      //console.log(insertData);
      let strSQL = `INSERT INTO transactions 
      (ticker, dateseq, open_px, high_px, low_px, close_px, volume )  VALUES ?  `;
      
      // execute the insert statment
      sqlConnection.query(strSQL, [insertData], (err, result) => {
        if (err) {
          //console.log('error when inserting', insertData);
          bulkInsertOK = false;
          callback(err);
          return console.error(err.message);
        }   
  
      });
      
      if (bulkInsertOK) {
        sqlConnection.query("UPDATE datafiles SET status = 1 WHERE file_id = ?",  [dataFileId],  (err, result) => {
    
          if (err) {    
            console.log('Error setting status of datafile to 1');
            callback(err);
            return;
            }
            else {
              console.log('Bulk inserting completed successfully!');
              console.log('insert result', result)
              const returnData = {affectedRows: insertData.length}
              callback(null, returnData);
              //return;
            } 
            
          }
          
        );      
      }

    });      
    


  
};




exports.searchByQueryParams = (searchParams, result) => {

  let strSQL = '';


  if ('ticker' in searchParams)  strSQL = 
  `select * from transactions where ticker = '${searchParams.ticker}'` 

  if ('mindate' in searchParams)  strSQL += ` AND dateseq > ${searchParams.mindate}` 

  else strSQL += ` AND dateseq > 20200000`

  strSQL += ' order by dateseq';
    
  if (strSQL) {

    //console.log('strSQL: ', strSQL)
    sqlConnection.query(strSQL, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }

      if (res.length) {
        //console.log("found transactions: ", res);
        
        let returnData = [];
        res.forEach(item => {
          //let strDate = item.dateseq.toString();
          let strDate = item.dateseq.toString();
          let strFullDate = strDate.substring(0,4) + '-' + strDate.substring(4,6) + '-' + strDate.substring(6);
          returnData.push(
            {
              date : strFullDate,
              open: item.open_px,
              high: item.high_px,
              low: item.low_px,
              close: item.close_px,
              volume: item.volume

            }


          )
        });

        result(null, returnData);
        return;
      }

      // not found Term with the id
      result({ kind: "not_found" }, null);
    });

  }
  else result({ kind: "invalid_param" }, null);

};




exports.createTransaction = (Tran, result) => {
  const newTran =  {  
    ticker: Tran.ticker,
    dateseq: Tran.dateseq,
    open_px: Tran.open,
    close_px: Tran.close,
    high_px: Tran.high,
    low_px: Tran.low,
    volume: Tran.volume
    
  };

  sqlConnection.query("INSERT INTO transactions SET ?", newTran, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created transaction: ", { id: res.insertId, ...newTran });
    result(null, { id: res.insertId, ...newTran });
  });
};



exports.getTopVolumeAverageTransactions = (callback) =>{
  //purpose: to get a list of transactions 
  //for past 5 days
  //where volume average exceeds certain threshold

  const volumeThreshold = 500000;
  let dateRange = '';


  sqlConnection.query(`select distinct dateseq from transactions order by dateseq desc limit 5`, (error, result) => {
    if (error) {          
      callback(error, null);
      return;
    }

    if (result.length) {
      //console.log("date result:", result);
        result.forEach(item => {

          dateRange ? dateRange += ', ' + item.dateseq.toString() : dateRange = item.dateseq.toString();
        })

        strSQL = 'select * from transactions where dateseq in (' + dateRange + ') order by ticker, dateseq';
        sqlConnection.query(strSQL, (error, result) =>{

          if (error) {          
            console.log(error);
            callback(error, null);
            return;
          }
          else {
            //console.log(strSQL);
            callback(null, result);    
          }
        

        })
               
    }
})  

}



exports.getAll = callback => {
  sqlConnection.query("select * from transactions order by id desc limit 10;", (err, res) => {
    if (err) {
      console.log("error: ", err);
      callback(null, err);
      return;
    }

    //console.log("stocks: ", res);
    callback(null, res);
  });
};

exports.updateById = (id, transaction, callback) => {
  sqlConnection.query(
    "UPDATE transactions SET ticker = ?, dateseq = ?, open_px = ?,  close_px = ?, high_px = ?, low_px = ?, volume = ?  WHERE id = ?",
    [transaction.ticker, transaction.dateseq, transaction.open_px, transaction.close_px, transaction.high_px, transaction.low_px , transaction.volume , id],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        callback(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found Stock with the id
        callback({ kind: "not_found" }, null);
        return;
      }

      console.log("updated stock: ", { id: id, ...transaction });
      callback(null, { id: id, ...transaction });
    }
  );
};
