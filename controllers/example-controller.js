const Example = require("../models/example-model.js");

//Create and Save a new Example
exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  //Create a Example
  const example = new Example({
    term_id: req.body.termId,
    eg_body: req.body.egBody,
    eg_source: req.body.egSource,
    lang_id : req.body.langId,
    status: req.body.status

  });

  // Save Example in the database
  Example.create(example, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Example."
      });
    else res.send(data);
  });
};



// Retrieve all Examples from the database.
exports.findAll = (req, res) => {
  Example.getAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving examples."
      });
    else res.send(data);
  });
};


// Find a single Example with a exampleId
exports.findOne = (req, res) => {  
  Example.findById(req.params.exampleId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Example with id ${req.params.exampleId}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving Example with id " + req.params.exampleId
        });
      }
    } else res.send(data);
  });
};

// Update a Example identified by the exampleId in the request
exports.update = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  Example.updateById(
    req.params.exampleId,
    new Example(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Example with id ${req.params.exampleId}.`
          });
        } else {
          res.status(500).send({
            message: "Error updating Example with id " + req.params.exampleId
          });
        }
      } else res.send(data);
    }
  );
};



// Delete a Example with the specified exampleId in the request
exports.delete = (req, res) => {
  Example.remove(req.params.exampleId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Example with id ${req.params.exampleId}.`
        });
      } else {
        res.status(500).send({
          message: "Could not delete Example with id " + req.params.exampleId
        });
      }
    } else res.send({ message: `Example was deleted successfully!` });
  });
};

// Delete all Examples from the database.
exports.deleteAll = (req, res) => {
  Example.removeAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all examples."
      });
    else res.send({ message: `All Examples were deleted successfully!` });
  });
};

// Find all examples with a termId
exports.findByTerm = (req, res) => {  
  Example.findByTermId(req.params.termId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Examples with Term id ${req.params.termId}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving Examples with Term id " + req.params.termId
        });
      }
    } else res.send(data);
  });
};
