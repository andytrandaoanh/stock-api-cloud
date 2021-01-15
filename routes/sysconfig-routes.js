const express = require('express');
const router = express.Router();
const sysConfig = require("../controllers/sysconfig-controller.js");
const authService = require("../services/uuid-auth-service.js");

router.post("/sysconfigs", authService, sysConfig.create);

//Retrieve a single config with id
router.get("/sysconfigs/:id", authService, sysConfig.findOne);

//Retrieve all /sysconfigs
router.get("/sysconfigs", authService, sysConfig.findAll);

//Update a config with id
router.put("/sysconfigs/:id", authService, sysConfig.update);

//Delete a config with id
router.delete("/sysconfigs/:id", authService, sysConfig.delete);

//Create a new config
router.delete("/sysconfigs", authService, sysConfig.deleteAll);


module.exports = router;
