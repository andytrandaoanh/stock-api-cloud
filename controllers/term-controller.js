const Term = require("../models/term-model.js");

//Create and Save a new Term
exports.create = (req, res) => {
  // Validate request
  if (!req.body) {

    console.log(req.body);
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  //Create a Term
  const term = new Term(req.body);

  // Save Term in the database
  Term.create(term, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Term."
      });
    else res.send(data);
  });
};



// Retrieve all Terms from the database.
exports.findAll = (req, res) => {
  Term.getAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving terms."
      });
    else res.send(data);
  });
};


// Find a single Term with a termId
exports.findOne = (req, res) => {  
  Term.findById(req.params.termId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Term with id ${req.params.termId}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving Term with id " + req.params.TermId
        });
      }
    } else res.send(data);
  });
};

// Update a Term identified by the termId in the request
exports.update = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  Term.updateById(
    req.params.termId,
    new Term(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Term with id ${req.params.termId}.`
          });
        } else {
          res.status(500).send({
            message: "Error updating Term with id " + req.params.termId
          });
        }
      } else res.send(data);
    }
  );
};



// Delete a Term with the specified termId in the request
exports.delete = (req, res) => {
  Term.remove(req.params.termId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Term with id ${req.params.termId}.`
        });
      } else {
        res.status(500).send({
          message: "Could not delete Term with id " + req.params.termId
        });
      }
    } else res.send({ message: `Term was deleted successfully!` });
  });
};

// Delete all Terms from the database.
exports.deleteAll = (req, res) => {
  Term.removeAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all terms."
      });
    else res.send({ message: `All Terms were deleted successfully!` });
  });
};


// Search for terms whose title or description contain some string
exports.searchByQuery = (req, res) => {  
  
  Term.searchByQueryParams(req.query, (err, data) => {
  if (err) { 

    if (err.kind === "not_found") {
      res.status(404).send({
          message: `Not found Term with params`,
      });
    }

    else if (err.kind === "invalid_param") { 

        res.status(500).send({
          message: `Params supplied are invalid`,
        });
    }

    else {

        res.status(500).send({
          message: "Error retrieving Term params",
        });

    }  


  }

  else res.send(data);

  });
  
};

exports.listByQuery = (req, res) => {  
  
  
  Term.listOrderByQueryParams(req.query, (err, data) => {
  if (err) { 

    if (err.kind === "not_found") {
      res.status(404).send({
          message: `Not found Term with params`,
      });
    }

    else if (err.kind === "invalid_param") { 

        res.status(500).send({
          message: `Params supplied are invalid`,
        });
    }

    else {

        res.status(500).send({
          message: "Error retrieving Term params",
        });

    }  


  }

  else res.send(data);

  });
  
};

// Retrieve all Terms from the combined views
exports.listCombinedTerms = (req, res) => {
  Term.getAllCombinedTerms(req.params.langId, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving combined terms."
      });
    else res.send(data);
  });
};
