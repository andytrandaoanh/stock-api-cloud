const express = require('express');
const router = express.Router();
const terms = require("../controllers/term-controller.js");


router.post("/terms", terms.create);

//get combination of orignal and translated terms
router.get("/terms/combined/:langId", terms.listCombinedTerms);

//order by list 
router.get("/terms/list", terms.listByQuery);

//search by query parameters
router.get("/terms/search", terms.searchByQuery);

//Retrieve all terms
router.get("/terms", terms.findAll);

//Retrieve a single term with termId
router.get("/terms/:termId", terms.findOne);

//Update a term with termId
router.put("/terms/:termId", terms.update);

//Delete a term with langId
router.delete("/terms/:termId", terms.delete);

//Create a new term
router.delete("/terms", terms.deleteAll);


module.exports = router;
