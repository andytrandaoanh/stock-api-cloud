const express = require('express');
const router = express.Router();
const datafiles = require("../controllers/index-file-controller.js");
const authService = require("../services/uuid-auth-service.js");

router.get("/indexfiles", authService, datafiles.findAll);

//Retrieve a single term with termId
router.get("/indexfiles/:fileId", authService,  datafiles.findOne);

//Update a term with termId
router.put("/indexfiles/:fileId", authService,  datafiles.update);

module.exports = router;
