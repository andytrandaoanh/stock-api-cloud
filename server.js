require('dotenv').config();
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const uploadRoute = require('./routes/stock-upload-route');
const dataFileRoute = require('./routes/data-file-routes');
const fileProcessRoute = require('./routes/file-process-route');
const transactionRoute = require('./routes/transaction-routes');
const stockListRoute = require('./routes/stock-list-routes');
const stockListItemRoute = require('./routes/stock-list-item-routes');
const maxTransDatesRoute = require('./routes/max-trans-dates-route');
const indexUploadRoute = require('./routes/index-upload-route');
const indexFileRoute = require('./routes/index-file-routes');
const indexFileProcessRoute = require('./routes/index-file-process-route');
const indexTransMaxRoute = require('./routes/index-trans-max-route');
const indexTransactionRoute = require('./routes/index-transaction-routes');
const webScraperRoute = require('./routes/web-scrape-routes');
const dashboardRoute = require('./routes/dashboard-routes');
const stockNoteRoute = require('./routes/stock-note-routes');
const stockDetailRoute = require('./routes/stock-detail-routes');


const app = express();

app.use(cors());

app.use(bodyParser.json());

// parse requests of content-type: application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));


// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to Stock API." });
});

app.use('/api', uploadRoute);
app.use('/api', dataFileRoute);
app.use('/api', fileProcessRoute);
app.use('/api', transactionRoute);
app.use('/api', stockListRoute);
app.use('/api', stockListItemRoute);
app.use('/api', maxTransDatesRoute);
app.use('/api', indexUploadRoute);
app.use('/api', indexFileRoute);
app.use('/api', indexFileProcessRoute);
app.use('/api', indexTransMaxRoute);
app.use('/api', indexTransactionRoute);
app.use('/api', webScraperRoute);
app.use('/api', dashboardRoute);
app.use('/api', stockNoteRoute);
app.use('/api', stockDetailRoute);


//console.log("Dotenv loaded port:", process.env.PORT);
// set port, listen for requests
app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}...`);
});
