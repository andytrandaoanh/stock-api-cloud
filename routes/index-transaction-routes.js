const express = require('express');
const router = express.Router();
const transactions = require("../controllers/index-transaction-controller.js");
const authService = require("../services/uuid-auth-service.js");



//search by query parameters
router.get("/indexes/search", authService, transactions.searchByQuery);

//get disctint tickers
router.get("/indexes/tickerlist", authService,  transactions.getTickerList);


router.get("/indexes/value", authService,  transactions.getValueList);

router.get("/indexes/volume", authService,  transactions.getVolumeList);

//add a new index transaction
router.get("/indexes", authService,  transactions.getLimitTransactions);

//add a new index transaction
router.post("/indexes", authService,  transactions.createNewTransaction);

//modify existing index transaction
router.put("/indexes/:id", authService,  transactions.updateTransaction);

//Delete a transaction on id
router.delete("/indexes/:id", authService,  transactions.deleteTransaction);


module.exports = router;
