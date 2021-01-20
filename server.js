require('dotenv').config();
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const fileUploadRoutes = require('./routes/file-upload-routes');
const fileProcessRoutes = require('./routes/file-process-routes');
const maxDateRoutes = require('./routes/max-date-routes');
const dataFileRoute = require('./routes/data-file-routes');
const transactionRoute = require('./routes/transaction-routes');
const stockListRoute = require('./routes/stock-list-routes');
const stockListItemRoute = require('./routes/stock-list-item-routes');
const indexFileRoute = require('./routes/index-file-routes');
const indexTransactionRoute = require('./routes/index-transaction-routes');
const webScraperRoute = require('./routes/web-scrape-routes');
const dashboardRoute = require('./routes/dashboard-routes');
const stockNoteRoute = require('./routes/stock-note-routes');
const stockDetailRoute = require('./routes/stock-detail-routes');
const sysConfigRoute = require('./routes/sysconfig-routes');
const plungeRoute = require('./routes/plunge-routes');


const app = express();

app.use(cors());

app.use(bodyParser.json());

// parse requests of content-type: application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));


// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to Stock API." });
});

app.use('/api', sysConfigRoute);
app.use('/api', fileUploadRoutes);
app.use('/api', fileProcessRoutes);
app.use('/api', maxDateRoutes);
app.use('/api', dataFileRoute);
app.use('/api', transactionRoute);
app.use('/api', stockListRoute);
app.use('/api', stockListItemRoute);
app.use('/api', indexFileRoute);
app.use('/api', indexTransactionRoute);
app.use('/api', webScraperRoute);
app.use('/api', dashboardRoute);
app.use('/api', stockNoteRoute);
app.use('/api', stockDetailRoute);
app.use('/api', plungeRoute);


//console.log("Dotenv loaded port:", process.env.PORT);
// set port, listen for requests
app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}...`);
});
