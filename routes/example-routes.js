const express = require('express');
const router = express.Router();
const examples = require("../controllers/example-controller.js");
const authService = require("../services/uuid-auth-service.js");

router.post("/examples", authService, examples.create);

//Retrieve examples by termID
router.get("/examples/term/:termId", authService,  examples.findByTerm);

//Retrieve a single Example with exampleId
router.get("/examples/:exampleId",  authService, examples.findOne);

//Retrieve all Examples
router.get("/examples", authService,  examples.findAll);

//Update a Example with exampleId
router.put("/examples/:exampleId", authService,  examples.update);

//Delete a Example with exampleId
router.delete("/examples/:exampleId", authService,  examples.delete);

//Create a new Example
router.delete("/examples", authService,  examples.deleteAll);


module.exports = router;

