const express = require('express');
const router = express.Router();
const transactions = require("../controllers/index-transaction-controller.js");
const authService = require("../services/uuid-auth-service.js");

//search by query parameters
router.get("/indexes/search", authService, transactions.searchByQuery);

router.get("/indexes/value", authService,  transactions.getValueList);

router.get("/indexes/volume", authService,  transactions.getVolumeList);

//add a new index transaction
router.post("/indexes", authService,  transactions.createNewTransaction);

module.exports = router;
