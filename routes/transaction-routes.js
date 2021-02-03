const express = require('express');
const router = express.Router();
const transactions = require("../controllers/transaction-controller.js");
const authService = require("../services/uuid-auth-service.js");

//search by query parameters
router.get("/transactions/search", authService, transactions.searchByQuery);

router.get("/transactions/pricelist/:listId", authService, transactions.getPriceList);

router.get("/transactions/volumelist/:listId", authService, transactions.getVolumeList);

router.post("/transactions", authService, transactions.createNewTransaction);

router.get("/transactions", authService, transactions.findAll);

router.put("/transactions/:id", authService, transactions.update);

module.exports = router;
