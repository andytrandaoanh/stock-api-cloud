const express = require('express');
const router = express.Router();
const datafiles = require("../controllers/index-file-controller.js");


router.get("/indexfiles", datafiles.findAll);

//Retrieve a single term with termId
router.get("/indexfiles/:fileId", datafiles.findOne);

//Update a term with termId
router.put("/indexfiles/:fileId", datafiles.update);

module.exports = router;
