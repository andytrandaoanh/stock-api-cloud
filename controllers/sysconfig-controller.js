const Config = require("../models/sysconfig-model.js");

// Create and Save a new Config
exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  // Create a Config
  const config = new Config({
    syskey: req.body.syskey,
    value: req.body.value,
    status : req.body.status,

  });

  // Save Config in the database
  Config.create(config, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Config."
      });
    else res.send(data);
  });
};



// Retrieve all Configs from the database.
exports.findAll = (req, res) => {
  Config.getAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving configs."
      });
    else res.send(data);
  });
};


// Find a single Config with a id
exports.findOne = (req, res) => {  
  Config.findById(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Config with id ${req.params.id}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving Config with id " + req.params.id
        });
      }
    } else res.send(data);
  });
};

// Update a Config identified by the id in the request
exports.update = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  Config.updateById(
    req.params.id,
    new Config(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Config with id ${req.params.id}.`
          });
        } else {
          res.status(500).send({
            message: "Error updating Config with id " + req.params.id
          });
        }
      } else res.send(data);
    }
  );
};



// Delete a Config with the specified id in the request
exports.delete = (req, res) => {
  Config.remove(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Config with id ${req.params.id}.`
        });
      } else {
        res.status(500).send({
          message: "Could not delete Config with id " + req.params.id
        });
      }
    } else res.send({ message: `Config was deleted successfully!` });
  });
};

// Delete all Configs from the database.
exports.deleteAll = (req, res) => {
  Config.removeAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all configs."
      });
    else res.send({ message: `All Configs were deleted successfully!` });
  });
};
