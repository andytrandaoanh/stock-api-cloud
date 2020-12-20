const express = require('express');
const router = express.Router();
const dashboardStock = require("../controllers/dashboard-stock-controller");
const authService = require("../services/uuid-auth-service.js");

//search by query parameters
router.get("/dashboard/topmovers", authService, dashboardStock.getTopMovers);


module.exports = router;
