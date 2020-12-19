const cheerio = require('cheerio');
const axios = require('axios');


exports.getDataByQueryParams = (ticker, date, callback) =>
{

  let strDate = date.toString();
  let strFullDate = strDate.substring(6) + '-' + strDate.substring(4,6) + '-' + strDate.substring(0,4) ;

   console.log('ticker', ticker, 'date', strFullDate);

   //callback(null, {status: 'ok'});

    const url = `http://www.cophieu68.vn/historyprice.php?id=${ticker}`;



    axios.get(url).then((response) => {
      // Load the web page source code into a cheerio instance
      const $ = cheerio.load(response.data)
    
      let tbs = $('table');
    
      let trans = [];
      $(tbs[1]).find('tr').each((i, row)=>{
        if (i > 0) {
          
          let tds = $(row).find('td');
        
          //let col = tds[0].children[0].data
          //console.log('col 1', col);
    
          let date = tds[1].children[0].data
          //console.log(dt);
    
        
          let close = $(tds[5]).find('span').text()
          //console.log(sp)
    
          let tempVolume = tds[6].children[0].data.toString().replace(",", "");
          let volume = tempVolume.replace(",", "");
          //console.log(vol);
    
    
          let open = $(tds[7]).find('span').text()
    
          let high = $(tds[8]).find('span').text()
    
          let low = $(tds[9]).find('span').text()
    
          //console.log(low)
    
          //console.log('date', dt, 'close', close)
          trans.push({
            date, open, close, high, low, volume
          })
        
        }
    
    
      })
    
    //console.log(trans);
    let bFound = false;

    trans.forEach(tran =>{
      if (tran.date === strFullDate) {
        bFound = true;
        callback(null, {ticker: ticker, ...tran});
        return;

      }

    })
    
    if (bFound === false) {
      callback({ kind: "not_found" }, null)
    }

    
  
  })

}

