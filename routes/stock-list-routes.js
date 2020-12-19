const express = require('express');
const router = express.Router();
const stocklists = require("../controllers/stock-list-controller.js");


router.post("/stocklists", stocklists.create);

//Retrieve all stocklists
router.get("/stocklists", stocklists.findAll);

//Retrieve a single stocklist with stocklistId
router.get("/stocklists/:listId", stocklists.findOne);

//Update a stocklist with stocklistId
router.put("/stocklists/:listId", stocklists.update);

//Delete a stocklist with langId
router.delete("/stocklists/:listId", stocklists.delete);

//Create a new stocklist
router.delete("/stocklists", stocklists.deleteAll);


module.exports = router;
