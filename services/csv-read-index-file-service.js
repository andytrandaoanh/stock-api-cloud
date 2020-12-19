
const fs = require('fs');
const path = require('path');
const csv = require('fast-csv');


const processRow = (row) => {
   let newRow = {
    ticker: row['<Ticker>'],
    dateseq: parseInt(row['<DTYYYYMMDD>']),
    open_px: parseFloat(row['<Open>']),
    high_px: parseFloat(row['<High>']),
    low_px: parseFloat(row['<Low>']),
    close_px: parseFloat(row['<Close>']),
    volume: parseInt(row['<Volume>'])
   } 

   return newRow
    
}

const readCSV = (fileName, callback) => {

    const filePath  = path.resolve(__dirname, '../public/indexuploads/', fileName);
    //console.log('reading file', filePath);
    const dataList = [];
    fs.createReadStream(filePath)
    .pipe(csv.parse({ headers: true }))
    .on('error', error => callback(error, null))
    .on('data', row =>dataList.push(processRow(row)))
    .on('end', rowCount => {
        console.log(`Parsed ${rowCount} rows`);
        //console.log('first row', dataList[0])
        callback(null, dataList)
    });
    
};

module.exports = readCSV;