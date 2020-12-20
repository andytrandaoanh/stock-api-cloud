const express = require('express');
const router = express.Router();
const authService = require("../services/uuid-auth-service.js");
const stockFileProcess = require("../controllers/file-process-controller.js");
const indexFileProcess = require("../controllers/index-file-process-controller.js");


router.post("/indexfileprocess", authService, indexFileProcess.run);

router.post("/process", authService,  stockFileProcess.run);



module.exports = router;
