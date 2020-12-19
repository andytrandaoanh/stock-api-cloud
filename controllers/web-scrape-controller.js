
const cophieu68Service = require("../services/scrape-cophieu68-service");
const cafeFService = require("../services/scrape-cafef-service");

exports.getWebData = (req, res) => {  
  
  //console.log(req.query);

  switch(req.query.site) {
    case 'cophieu68':
      cophieu68Service.getDataByQueryParams(req.query.ticker, req.query.date, (err, data) => {
        if (err) { 

            if (err.kind === 'not_found') {

              res.status(404).send({
                message: `Not found transactions with params`,
              });

          
            }
            
            else
            {

              res.status(500).send({
                message: "Error scraping data",
              });
      
            }

          }  
      
        else res.send(data);
      
        });

      break;
      case 'cafef':
        cafeFService.getDataByQueryParams(req.query.ticker, req.query.date, (err, data) => {
          if (err) { 
  
              if (err.kind === 'not_found') {
  
                res.status(404).send({
                  message: `Not found transactions with params`,
                });
  
            
              }
              
              else
              {
  
                res.status(500).send({
                  message: "Error scraping data",
                });
        
              }
  
            }  
        
          else res.send(data);
        
          });
  
        break;

        

    default:
      // code block
  } 





  
};
