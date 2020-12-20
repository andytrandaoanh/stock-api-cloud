const express = require('express');
const router = express.Router();
const authService = require("../services/uuid-auth-service.js");
const indexMaxTransDates = require("../controllers/index-trans-max-controller.js");
const stockMaxTransDates = require("../controllers/max-trans-dates-controller.js");


router.get("/maxtransdates", authService, stockMaxTransDates.checkDataExist);
router.get("/indextransmax", authService, indexMaxTransDates.checkDataExist);

module.exports = router;


