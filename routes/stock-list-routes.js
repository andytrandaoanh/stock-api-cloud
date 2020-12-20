const express = require('express');
const router = express.Router();
const stockLists = require("../controllers/stock-list-controller.js");
const authService = require("../services/uuid-auth-service.js");

router.post("/stocklists", authService, stockLists.create);

//Retrieve all stocklists
router.get("/stocklists", authService, stockLists.findAll);

//Retrieve a single stocklist with stocklistId
router.get("/stocklists/:listId", authService, stockLists.findOne);

//Update a stocklist with stocklistId
router.put("/stocklists/:listId", authService, stockLists.update);

//Delete a stocklist with langId
router.delete("/stocklists/:listId", authService, stockLists.delete);

//Create a new stocklist
router.delete("/stocklists", authService, stockLists.deleteAll);


module.exports = router;
