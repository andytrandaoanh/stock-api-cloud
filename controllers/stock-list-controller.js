const Stocklist = require("../models/stock-list-model.js");

//Create and Save a new stocklist
exports.create = (req, res) => {
  // Validate request
  if (!req.body) {

    console.log(req.body);
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  //Create a stocklist
  const stocklist = new Stocklist(req.body);

  // Save stocklist in the database
  Stocklist.create(stocklist, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the stocklist."
      });
    else res.send(data);
  });
};



// Retrieve all stocklists from the database.
exports.findAll = (req, res) => {
  Stocklist.getAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving stocklists."
      });
    else res.send(data);
  });
};


// Find a single stocklist with a stocklistId
exports.findOne = (req, res) => {  
  Stocklist.findById(req.params.listId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found stocklist with id ${req.params.listId}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving stocklist with id " + req.params.listId
        });
      }
    } else res.send(data);
  });
};

// Update a stocklist identified by the stocklistId in the request
exports.update = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  Stocklist.updateById(
    req.params.listId,
    new Stocklist(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found stocklist with id ${req.params.listId}.`
          });
        } else {
          res.status(500).send({
            message: "Error updating stocklist with id " + req.params.listId
          });
        }
      } else res.send(data);
    }
  );
};



// Delete a stocklist with the specified stocklistId in the request
exports.delete = (req, res) => {
  Stocklist.remove(req.params.listId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found stocklist with id ${req.params.listId}.`
        });
      } else {
        res.status(500).send({
          message: "Could not delete stocklist with id " + req.params.listId
        });
      }
    } else res.send({ message: `stocklist was deleted successfully!` });
  });
};

// Delete all stocklists from the database.
exports.deleteAll = (req, res) => {
  Stocklist.removeAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all stocklists."
      });
    else res.send({ message: `All stocklists were deleted successfully!` });
  });
};

