const express = require('express');
const router = express.Router();
const maxTransDates = require("../controllers/max-trans-dates-controller.js");

//retrieve max transactions dates from the system table

router.get("/maxtransdates", maxTransDates.checkDataExist);


module.exports = router;