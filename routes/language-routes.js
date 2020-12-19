const express = require('express');
const router = express.Router();
const languages = require("../controllers/language-controller.js");


router.post("/languages", languages.create);

//Retrieve all Languages
router.get("/languages", languages.findAll);

//Retrieve a single language with termId
router.get("/languages/:langId", languages.findOne);

//Update a language with langId
router.put("/languagues/:langId", languages.update);

//Delete a language with langId
router.delete("/languages/:langId", languages.delete);

//Create a new language
router.delete("/languages", languages.deleteAll);


module.exports = router;
