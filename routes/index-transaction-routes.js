const express = require('express');
const router = express.Router();
const transactions = require("../controllers/index-transaction-controller.js");

//search by query parameters
router.get("/indexes/search", transactions.searchByQuery);

router.get("/indexes/value", transactions.getValueList);

router.get("/indexes/volume", transactions.getVolumeList);

//add a new index transaction
router.post("/indexes", transactions.createNewTransaction);

module.exports = router;
