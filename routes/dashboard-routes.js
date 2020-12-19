const express = require('express');
const router = express.Router();
const dashboardStock = require("../controllers/dashboard-stock-controller");


//search by query parameters
router.get("/dashboard/topmovers", dashboardStock.getTopMovers);


module.exports = router;
