const express = require('express');
const router = express.Router();
const stockNote = require("../controllers/stock-note-controller.js");
const authService = require("../services/uuid-auth-service.js");

router.post("/stocknotes", authService, stockNote.create);


//search by query parameters
router.get("/stocknotes/search", authService, stockNote.searchByQuery);

//Retrieve a single term with noteId
router.get("/stocknotes/:noteId", authService, stockNote.findOne);

//Retrieve all stocknotes
router.get("/stocknotes", authService, stockNote.findAll);


//Update a term with noteId
router.put("/stocknotes/:noteId", authService, stockNote.update);

//Delete a term with langId
router.delete("/stocknotes/:noteId", authService, stockNote.delete);

//Create a new term
router.delete("/stocknotes", authService, stockNote.deleteAll);


module.exports = router;
