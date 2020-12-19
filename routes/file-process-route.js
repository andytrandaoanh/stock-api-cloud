const express = require('express');
const router = express.Router();
const fileProcess = require("../controllers/file-process-controller.js");


router.post("/process", fileProcess.run);


module.exports = router;
