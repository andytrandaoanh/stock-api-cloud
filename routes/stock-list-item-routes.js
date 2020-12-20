const express = require('express');
const router = express.Router();
const stockListItems = require("../controllers/stock-list-item-controller.js");
const authService = require("../services/uuid-auth-service.js");

router.post("/stocklistitems", authService, stockListItems.create);

//Retrieve all stockListItems
router.get("/stocklistitems/list/:listId", authService, stockListItems.findByListId);
//Retrieve all stockListItems
router.get("/stocklistitems", authService, stockListItems.findAll);

//Retrieve a single stocklist with stocklistId
router.get("/stocklistitems/:itemId", authService, stockListItems.findOne);

//Update a stocklist with stocklistId
router.put("/stocklistitems/:itemId", authService, stockListItems.update);

//Delete a stocklist with langId
router.delete("/stocklistitems/:itemId", authService, stockListItems.delete);

//Create a new stocklist
router.delete("/stocklistitems", authService, stockListItems.deleteAll);


module.exports = router;
