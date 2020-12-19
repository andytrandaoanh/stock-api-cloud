const transactions = require("../models/transaction-model");

function getDateString(dateItem){
    let newString = String(dateItem);
    let yearPart = newString.substring(0,4); 
    let monthPart = newString.substring(4,6); 
    let dayPart = newString.substring(6); 

    return `${dayPart}-${monthPart}-${yearPart}`

}


exports.getTopMovers = (req, res) => {

    transactions.getTopVolumeAverageTransactions((error, data) =>{

        if (error) {
          console.log(error);
          res.status(500).send({
            message: "Error retrieving dates"
          });
        }
        else {
        //first, create an array of all tickers

        const threshHold = 2000000;
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
            if (item.volumeCount === 5) {
                averageVol =  Math.floor(item.totalVolume/item.volumeCount);
                if(averageVol > threshHold) {

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

         console.log("Identified ", resultTrans.length, " stocks whose volume average matches ", threshHold)
         res.status(200).send(resultTrans);
        }
    })

}
