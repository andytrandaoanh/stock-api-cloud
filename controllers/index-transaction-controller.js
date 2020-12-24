const transactions = require("../models/index-transaction-model");



exports.getValueList = (req, res) => {

    transactions.getTransactionDates((error, data) =>{

        if (error) {
          console.log(error);
          res.status(500).send({
            message: "Error retrieving dates"
          });
        }
        else {
        
          let dates = [];
          data.forEach((element) => {
              dates.push(element.dateseq);
          });
          
          const dateList = dates.reverse();
  
          console.log('date list:', dateList);
          const listId = req.params.listId;
  
          let stockList = ['VNINDEX', 'HNX-INDEX', 'UPCOM-INDEX', 'VN30INDEX'];

          console.log('list items',stockList);  
  
          transactions.getTransactions(stockList, dateList, (error, data)=>{
              if (error) {
              console.log(stockError);
              res.status(500).send({
                  message: "Error retrieving transactions"
              });
              }
              else {
              let columns =    [
                  {
                  Header: 'Symbol',
                  accessor: 'ticker'
                  }
              ] 
          
              dateList.forEach(dateItem=>{
              let newString = String(dateItem);
              let yearPart = newString.substring(2,4); 
              let monthPart = newString.substring(4,6); 
              let dayPart = newString.substring(6); 
              //console.log(dayPart, monthPart, yearPart)
  
              let newColumn = {
                  Header: `${dayPart}/${monthPart}/${yearPart}`,
                  accessor: `value_${dateItem}`
              }
              columns.push(newColumn);
              })
  
      
              stockData = [];
              stockList.forEach(symbol=>{
              stockData.push({
                  ticker: symbol
              })
              })
          
              //console.log(stockData[0].ticker);
              
              data.forEach(item=>{
              //console.log(item);
              for (i=0; i<stockData.length; i++) {
                  //console.log(stockData[i]);
                  if (stockData[i].ticker === item.ticker){
                  stockData[i][`value_${item.dateseq}`] = item.close_px;
                  //console.log('click')
  
                  }
              }
              })
              
              sendData = {
                  columns: columns,
                  data: stockData
              };
              res.status(200).send(sendData);  
              }
          });
  
          }
      
    })

};
  


exports.getVolumeList = (req, res) => {

    transactions.getTransactionDates((error, data) =>{
  
      if (error) {
        console.log(error);
        res.status(500).send({
          message: "Error retrieving dates"
        });
      }
      else {
      
        let dates = [];
        data.forEach((element) => {
            dates.push(element.dateseq);
        });
        
        const dateList = dates.reverse();
  
        
        let stockList = ['VNINDEX', 'HNX-INDEX', 'UPCOM-INDEX','VN30INDEX'];

        transactions.getTransactions(stockList, dateList, (error, data)=>{
            if (error) {
            console.log(stockError);
            res.status(500).send({
                message: "Error retrieving transactions"
            });
            }
            else {
            let columns =    [
                {
                Header: 'Symbol',
                accessor: 'ticker'
                }
            ] 
        
            dateList.forEach(dateItem=>{
            let newString = String(dateItem);
            let yearPart = newString.substring(2,4); 
            let monthPart = newString.substring(4,6); 
            let dayPart = newString.substring(6); 
            //console.log(dayPart, monthPart, yearPart)

            let newColumn = {
                Header: `${dayPart}/${monthPart}/${yearPart}`,
                accessor: `volume_${dateItem}`
            }
            columns.push(newColumn);
            })


            stockData = [];
            stockList.forEach(symbol=>{
            stockData.push({
                ticker: symbol
            })
            })
        
            //console.log(stockData[0].ticker);
            
            data.forEach(item=>{
            //console.log(item);
            for (i=0; i<stockData.length; i++) {
                //console.log(stockData[i]);
                if (stockData[i].ticker === item.ticker){
                stockData[i][`volume_${item.dateseq}`] = item.volume;
                //console.log('click')

                }
            }
            })
            
            sendData = {
                columns: columns,
                data: stockData
            };
            res.status(200).send(sendData);  
            }
        });


        }

    });
  
};
  
  
  

  

// Search for index transactions by ticker and midate
exports.searchByQuery = (req, res) => {  
  
    transactions.searchByQueryParams(req.query, (err, data) => {
    if (err) { 
  
      if (err.kind === "not_found") {
        res.status(404).send({
            message: `Not found transactions with params`,
        });
      }
  
      else if (err.kind === "invalid_param") { 
  
          res.status(500).send({
            message: `Params supplied are invalid`,
          });
      }
  
      else {
  
          res.status(500).send({
            message: "Error retrieving Term params",
          });
  
      }  
  
  
    }
  
    else res.send(data);
  
    });
    
  };
  
  
// Create and Save a new stock transaction
exports.createNewTransaction = (req, res) => {

  

    // Validate request
    if (!req.body) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
    }
    else {
  
    //create a new index transaction
    transactions.createTransaction(req.body, (err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the Photo."
        });
      else res.status(200).send(data);
    });
  
    }
  
  };
  
  
  
  // Search for index transactions by ticker and midate
exports.getLimitTransactions = (req, res) => {  
  
  transactions.getLimitTransactions(req.query, (err, data) => {
  if (err) { 

    if (err.kind === "not_found") {
      res.status(404).send({
          message: `Not found transactions with params`,
      });
    }

    else if (err.kind === "invalid_param") { 

        res.status(500).send({
          message: `Params supplied are invalid`,
        });
    }

    else {

        res.status(500).send({
          message: "Error retrieving transaction params",
        });

    }  


  }

  else res.send(data);

  });
  
};

exports.updateTransaction = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  transactions.updateById(
    req.params.id,
    req.body,
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found file with id ${req.params.id}.`
          });
        } else {
          res.status(500).send({
            message: "Error updating index transaction with id " + req.params.id
          });
        }
      } else res.send(data);
    }
  );
};


// Delete a Example with the specified exampleId in the request
exports.deleteTransaction = (req, res) => {
  transactions.remove(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found index transaction with id ${req.params.id}.`
        });
      } else {
        res.status(500).send({
          message: "Could not delete index transaction with id " + req.params.id
        });
      }
    } else res.send({ message: `Index transaction was deleted successfully!` });
  });
};