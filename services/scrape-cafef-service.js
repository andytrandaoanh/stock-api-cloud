const cheerio = require('cheerio');
const axios = require('axios');


function processContent(content, ticker){

  //console.log(content);
  const Ticker = ticker.toUpperCase();

  const $ = cheerio.load(content)

  const tables = $('table');

 //console.log(tables[0]);

  //table index = 1 is hodling the data
  const rows = $(tables[1]).find('tr');

  const output = [];

 
  rows.each((index, row)=>{

    if (index > 1) {
      let cells = $(row).find('td')
      let date = cells[0].children[0].data;
      let dateParts = date.split('/');
      
      let fullDate = dateParts[2] + dateParts[1] + dateParts[0];
      let open = 0;
      let close = 0;
      let volume = 0;
      let high = 0;
      let low = 0;
      
      
      if (Ticker === 'HNX-INDEX') {
        
        let thirdCell = cells[2].children[0].children[0].data;

        let cellParts = thirdCell.split('(');
        //console.log('cellParts', cellParts);
  
        let change = parseFloat(cellParts[0]);
  
        //console.log('change', change);
  
   
        let close1 = cells[1].children[0].data;
        close = parseFloat(close1);
  
        let volume1 = cells[4].children[0].data;
        let volume2 = cells[6].children[0].data;
  
        let volume11 = volume1.replace(/,/g, '');
        let volume21 = volume2.replace(/,/g, '');
  
        volume = parseInt(volume11) + parseInt(volume21);
        
        let highS = cells[8].children[0].data;
        high = parseFloat(highS).toFixed(2)

        let lowS = cells[9].children[0].data;
        
        low = parseFloat(lowS).toFixed(2)
        

        open = (close - change).toFixed(2);
  
  
      }

      else {

      
      //console.log(fullDate);

        let close1 = cells[1].children[0].data;

        let volume1 = cells[4].children[0].data;
        let volume2 = cells[6].children[0].data;

        let volume11 = volume1.replace(/,/g, '');
        let volume21 = volume2.replace(/,/g, '');

        volume = parseInt(volume11) + parseInt(volume21);
        
        let open1 = cells[8].children[0].data;
        let high1 = cells[9].children[0].data;
        let low1 = cells[10].children[0].data;

        let openS = open1.replace(/,/g, '');
        let closeS = close1.replace(/,/g, '');
        let highS = high1.replace(/,/g, '');
        let lowS = low1.replace(/,/g, '');

        low = parseFloat(lowS).toFixed(2)
        high = parseFloat(highS).toFixed(2)
        open = parseFloat(openS).toFixed(2)
        close = parseFloat(closeS).toFixed(2)
        
      }

      //console.log(low);
      output.push({
        ticker : Ticker,
        date: fullDate,
        open: open,
        high: high,
        low: low,
        close: close,
        volume: volume

      })

      
    } //row index > 1 to ignore first row
    
  });

  return output;

}




exports.getDataByQueryParams = (ticker, date, callback) =>
{

  let strDate = date.toString();
  //let strFullDate = strDate.substring(6) + '-' + strDate.substring(4,6) + '-' + strDate.substring(0,4) ;
  let strFullDate = date;
   console.log('ticker', ticker, 'date', strFullDate);

   //callback(null, {status: 'ok'});

 
    const url = `https://s.cafef.vn/Lich-su-giao-dich-${ticker}-1.chn`;

    console.log('url', url);

    axios.get(url).then((response) => {
      // Load the web page source code into a cheerio instance
    
    
    let dataOuput =  processContent(response.data, ticker);
    
    console.log(dataOuput);
    
    let bFound = false;
    
    dataOuput.forEach(tran =>{
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

