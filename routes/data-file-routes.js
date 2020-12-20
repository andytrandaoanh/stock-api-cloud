const express = require('express');
const router = express.Router();
const datafiles = require("../controllers/data-file-controller.js");
const authService = require("../services/uuid-auth-service.js");

router.get("/datafiles", authService, datafiles.findAll);

//Retrieve a single term with termId
router.get("/datafiles/:fileId", authService, datafiles.findOne);

//Update a term with termId
router.put("/datafiles/:fileId", authService, datafiles.update);

module.exports = router;
