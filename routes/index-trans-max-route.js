const express = require('express');
const router = express.Router();
const maxTransDates = require("../controllers/index-trans-max-controller.js");

//retrieve max transactions dates from the system table

router.get("/indextransmax", maxTransDates.checkDataExist);


module.exports = router;