const express = require('express');
const router = express.Router();
const stockListItems = require("../controllers/stock-list-item-controller.js");


router.post("/stocklistitems", stockListItems.create);

//Retrieve all stockListItems
router.get("/stocklistitems/list/:listId", stockListItems.findByListId);
//Retrieve all stockListItems
router.get("/stocklistitems", stockListItems.findAll);

//Retrieve a single stocklist with stocklistId
router.get("/stocklistitems/:itemId", stockListItems.findOne);

//Update a stocklist with stocklistId
router.put("/stocklistitems/:itemId", stockListItems.update);

//Delete a stocklist with langId
router.delete("/stocklistitems/:itemId", stockListItems.delete);

//Create a new stocklist
router.delete("/stocklistitems", stockListItems.deleteAll);


module.exports = router;
