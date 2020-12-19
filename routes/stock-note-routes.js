const express = require('express');
const router = express.Router();
const stockNote = require("../controllers/stock-note-controller.js");


router.post("/stocknotes", stockNote.create);


//search by query parameters
router.get("/stocknotes/search", stockNote.searchByQuery);

//Retrieve a single term with noteId
router.get("/stocknotes/:noteId", stockNote.findOne);

//Retrieve all stocknotes
router.get("/stocknotes", stockNote.findAll);


//Update a term with noteId
router.put("/stocknotes/:noteId", stockNote.update);

//Delete a term with langId
router.delete("/stocknotes/:noteId", stockNote.delete);

//Create a new term
router.delete("/stocknotes", stockNote.deleteAll);


module.exports = router;
