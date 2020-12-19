const express = require('express');
const router = express.Router();
const fileProcess = require("../controllers/index-file-process-controller.js");


router.post("/indexfileprocess", fileProcess.run);


module.exports = router;
