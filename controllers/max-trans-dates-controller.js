const maxTransDates = require("../models/max-trans-dates-model");

exports.checkDataExist = (req, res) => {
    maxTransDates.checkMaxTransDataExist((error, data) =>{

        
      if (error) {
        console.log(error);
        res.status(500).send({
          message: "Error retrieving max transaction data"
        });
      }

      console.log(data);

      if (data.status === 1) {
        res.status(200).send({status: 0, message: "data exists nothing inserted"});  
      }

      else {

        maxTransDates.insertDataLine((error, data) =>{
          if (error) {
            console.log(error);
            res.status(500).send({
              message: "Error inserting max transaction data"
            });
          }

          else {
            console.log(data)
            res.status(200).send({status: 1, message: "data not exists successfully inserted"});  
          }

  


        })

      }
      
      



    });

}