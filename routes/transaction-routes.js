const express = require('express');
const router = express.Router();
const transactions = require("../controllers/transaction-controller.js");

//search by query parameters
router.get("/transactions/search", transactions.searchByQuery);

router.get("/transactions/pricelist/:listId", transactions.getPriceList);

router.get("/transactions/volumelist/:listId", transactions.getVolumeList);

router.post("/transactions", transactions.createNewTransaction);

module.exports = router;
