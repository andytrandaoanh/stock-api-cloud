const transactions = require("../models/transaction-model");
const configs = require("../models/sysconfig-model.js");

function getDateString(dateItem){
    let newString = String(dateItem);
    let yearPart = newString.substring(0,4); 
    let monthPart = newString.substring(4,6); 
    let dayPart = newString.substring(6); 

    return `${dayPart}-${monthPart}-${yearPart}`

}


exports.getTopMovers = (req, res) => {
    let settings = {};



    configs.getAll((err, data) => {
        if (err)
          res.status(500).send({
            message:
              err.message || "Some error occurred while retrieving configs."
          });
        //console.log('config data', data)
        data.forEach(item => {
            settings[item.syskey] = item.value;   
        })
        
        const volumeThreshold = settings.DASHBOARD_VOLUME_THRESHOLD ? parseInt(settings.DASHBOARD_VOLUME_THRESHOLD) : 2000000;
        const priceThreshold = settings.DASHBOARD_PRICE_THRESHOLD ? parseFloat(settings.DASHBOARD_PRICE_THRESHOLD) : 3.00;
        const averageRange = settings.DASHBOARD_AVERAGE_RANGE ? parseInt(settings.DASHBOARD_AVERAGE_RANGE) : 5;
        
        transactions.getTopVolumeAverageTransactions((error, data) =>{
            
    
            if (error) {
              console.log(error);
              res.status(500).send({
                message: "Error retrieving dates"
              });
            }
            else {
            //first, create an array of all tickers
    
     
            let currentTicker = '';
            let tickerTrans = [];
            let resultTrans = [];
    
            data.forEach(row => {
    
                if (currentTicker !== row.ticker) {
                    //update flag
                    currentTicker = row.ticker;
                    //add a new object to array
                    tickerTrans.push({
                        ticker: row.ticker,
                        totalVolume: row.volume,
                        lastVolume: row.volume,
                        currentVolume: row.volume,
                        volumeCount: 1,
                        currentClose: row.close_px,
                        lastClose: row.close_px,
                        currentDate: row.dateseq,
                        lastDate: row.dateseq,
    
                    })
                }
                else {
                    // find and update 
                    tickerTrans.forEach((item, index) =>{
                        if (item.ticker === row.ticker && item.ticker.length <= 3 ) {
                            const {currentVolume, currentClose, currentDate} = item;
                            //console.log('item', item, 'row', row);
                            tickerTrans[index].totalVolume += row.volume;
                            tickerTrans[index].lastVolume = currentVolume;
                            tickerTrans[index].currentVolume = row.volume;
                            tickerTrans[index].volumeCount += 1;
                            tickerTrans[index].currentClose = row.close_px;
                            tickerTrans[index].lastClose = currentClose;
                            tickerTrans[index].currentDate = row.dateseq;
                            tickerTrans[index].lastDate = currentDate;
    
    
                        }
                    })
    
                }
    
            })
    
    
            //now go through the array and check if averages pass the threshold
            tickerTrans.forEach(item=>{
                if (item.volumeCount === averageRange) {
                    averageVol =  Math.floor(item.totalVolume/item.volumeCount);
                    if(averageVol > volumeThreshold && item.currentClose > priceThreshold) {
    
                        var closeChange = (item.currentClose - item.lastClose)/item.lastClose;
                        var volumeChange = (item.currentVolume - item.lastVolume)/item.lastVolume;
    
                        resultTrans.push({
                            ticker: item.ticker,
                            volume: item.currentVolume,
                            volumeChange: volumeChange,
                            close: item.currentClose,
                            closeChange: closeChange,
                            date: getDateString(item.currentDate)
                            
                        })
                    }
                }
                
    
            })
    
             console.log("Identified ", resultTrans.length, " stocks whose volume average matches ", volumeThreshold)
             res.status(200).send(resultTrans);
            }
        })

      });


 

}
