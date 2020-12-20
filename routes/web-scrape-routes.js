const express = require('express');
const router = express.Router();
const scrapers = require("../controllers/web-scrape-controller");
const authService = require("../services/uuid-auth-service.js");
//search by query parameters
router.get("/webscrapers", authService, scrapers.getWebData);


module.exports = router;
