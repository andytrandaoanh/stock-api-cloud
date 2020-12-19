const express = require('express');
const router = express.Router();
const scrapers = require("../controllers/web-scrape-controller");

//search by query parameters
router.get("/webscrapers", scrapers.getWebData);


module.exports = router;
