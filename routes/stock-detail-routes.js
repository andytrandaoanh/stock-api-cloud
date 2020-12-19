const express = require('express');
const router = express.Router();
const stockDetail = require("../controllers/stock-detail-controller.js");


router.post("/stockdetails", stockDetail.create);

//search by query parameters
router.get("/stockdetails/search", stockDetail.searchByQuery);

//Retrieve a single term with stockId
router.get("/stockdetails/:stockId", stockDetail.findOne);

//Retrieve all stockdetails
router.get("/stockdetails", stockDetail.findAll);

//Update a term with stockId
router.put("/stockdetails/:stockId", stockDetail.update);

//Delete a term with langId
router.delete("/stockdetails/:stockId", stockDetail.delete);

//Create a new term
router.delete("/stockdetails", stockDetail.deleteAll);


module.exports = router;
