const express = require('express');
const router = express.Router();
const datafiles = require("../controllers/data-file-controller.js");


router.get("/datafiles", datafiles.findAll);

//Retrieve a single term with termId
router.get("/datafiles/:fileId", datafiles.findOne);

//Update a term with termId
router.put("/datafiles/:fileId", datafiles.update);

module.exports = router;
