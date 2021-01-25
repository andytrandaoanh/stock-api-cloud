const Plunge = require("../models/plunge-model.js");

// Create and Save a new Plunge
exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  // Create a Plunge
  const newPlunge = new Plunge({
    dateseq: req.body.dateseq,
    loss: req.body.loss ? req.body.loss : 0.0,
    last: req.body.last ? req.body.last : 0.0,
    duration: req.body.duration ? req.body.duration : 0,

  });

  // Save Plunge in the database
  Plunge.create(newPlunge, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the plunge."
      });
    else res.send(data);
  });
};



// Retrieve all Plunges from the database.
exports.findAll = (req, res) => {
  Plunge.getAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving plunges."
      });
    else res.send(data);
  });
};


// Find a single Plunge with a id
exports.findOne = (req, res) => {  
  Plunge.findById(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found plunge with id ${req.params.id}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving plunge with id " + req.params.id
        });
      }
    } else res.send(data);
  });
};

// Update a Plunge identified by the id in the request
exports.update = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  Plunge.updateById(
    req.params.id,
    new Plunge(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found plunge with id ${req.params.id}.`
          });
        } else {
          res.status(500).send({
            message: "Error updating plunge with id " + req.params.id
          });
        }
      } else res.send(data);
    }
  );
};



// Delete a Plunge with the specified id in the request
exports.delete = (req, res) => {
  Plunge.remove(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found plunge with id ${req.params.id}.`
        });
      } else {
        res.status(500).send({
          message: "Could not delete plunge with id " + req.params.id
        });
      }
    } else res.send({ message: `plunge was deleted successfully!` });
  });
};

// Delete all Plunges from the database.
exports.deleteAll = (req, res) => {
  Plunge.removeAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all plunges."
      });
    else res.send({ message: `All plunges were deleted successfully!` });
  });
};

// Search for terms whose title or description contain some string
exports.searchByQuery = (req, res) => {  
  
  Plunge.searchByQueryParams(req.query, (err, data) => {
  if (err) { 

    if (err.kind === "not_found") {
      res.status(404).send({
          message: `Not found plunge with params`,
      });
    }

    else if (err.kind === "invalid_param") { 

        res.status(500).send({
          message: `Params supplied are invalid`,
        });
    }

    else {

        res.status(500).send({
          message: "Error retrieving plunge params",
        });

    }  


  }

  else res.send(data);

  });
  
};
