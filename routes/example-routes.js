const express = require('express');
const router = express.Router();
const examples = require("../controllers/example-controller.js");


router.post("/examples", examples.create);

//Retrieve examples by termID
router.get("/examples/term/:termId", examples.findByTerm);

//Retrieve a single Example with exampleId
router.get("/examples/:exampleId", examples.findOne);

//Retrieve all Examples
router.get("/examples", examples.findAll);

//Update a Example with exampleId
router.put("/examples/:exampleId", examples.update);

//Delete a Example with exampleId
router.delete("/examples/:exampleId", examples.delete);

//Create a new Example
router.delete("/examples", examples.deleteAll);


module.exports = router;

