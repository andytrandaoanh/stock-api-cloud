const express = require('express');
const router = express.Router();
const stockDetail = require("../controllers/stock-detail-controller.js");
const authService = require("../services/uuid-auth-service.js");

router.post("/stockdetails", authService, stockDetail.create);

//search by query parameters
router.get("/stockdetails/search", authService, stockDetail.searchByQuery);

//Retrieve a single term with stockId
router.get("/stockdetails/:stockId", authService, stockDetail.findOne);

//Retrieve all stockdetails
router.get("/stockdetails", authService, stockDetail.findAll);

//Update a term with stockId
router.put("/stockdetails/:stockId", authService, stockDetail.update);

//Delete a term with langId
router.delete("/stockdetails/:stockId", authService, stockDetail.delete);

//Create a new term
router.delete("/stockdetails", authService, stockDetail.deleteAll);


module.exports = router;
