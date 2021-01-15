const Datafile = require("../models/index-file-model.js");
const Transaction = require("../models/index-transaction-model.js");
const readCSV = require("../services/csv-read-index-file-service.js");


// read file and process

exports.run = (req, res) => {
    //console.log('Start processing...',req.body)
    //res.status(200).send({message: 'ok'});
    
    Datafile.findById(req.body.fileId, (err, data) => {
        if (err) {
          if (err.kind === "not_found") {
            res.status(404).send({
              message: `Not found file with id ${req.body.fileId}.`
            });
          } else {
            res.status(500).send({
              message: "Error retrieving file with id " + req.body.fileId
            });
          }
        } else {
            if (data.status) {
                res.status(406).send({
                    message: data.original_name + " already processed. Further processing is cancelled."
                  });

            } else {
              console.log ('Processing data file ',data.file_id, `(${data.original_name})` );

              const originalName = data.original_name;

              readCSV(data.file_name, (error, dataList) =>{
                if(error) {
                  res.status(500).send({
                    message: "Error reading csv file with id " + data.file_id
                  });
                }
                else {
                  //Rem either of the following for first time process (first line)
                  //or subsequent processsing (diffInsertWithCheck)
                  //Transaction.bulkInsertWithNoCheck(data.file_id, dataList, (error, data) =>{
                  Transaction.diffInsertWithCheck(data.file_id, dataList, (error, data) =>{
                    if (error) {
                      res.status(500).send({
                        message: "Error while inserting data"
                      });
    
  
                    }
                    else {


                      res.status(200).send({ 
                        message: `Data inserting completed successfully!`,
                        ...data,
                        fileName: originalName                        
                      });                      
                    
                    }
                  });
                  
                }
              });              
            }
        } 
      }); //gets file info
};