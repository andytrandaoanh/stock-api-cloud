const express = require('express');
const router = express.Router();
const plunge = require("../controllers/plunge-controller.js");
const authService = require("../services/uuid-auth-service.js");

router.post("/plunges", authService, plunge.create);

//search by query parameters
router.get("/plunges/search", authService, plunge.searchByQuery);

//Retrieve a single plunge with id
router.get("/plunges/:id", authService, plunge.findOne);

//Retrieve all plunges
router.get("/plunges", authService, plunge.findAll);

//Update a plunge with id
router.put("/plunges/:id", authService, plunge.update);

//Delete a plunge with id
router.delete("/plunges/:id", authService, plunge.delete);

//Create a new plunge
router.delete("/plunges", authService, plunge.deleteAll);


module.exports = router;
