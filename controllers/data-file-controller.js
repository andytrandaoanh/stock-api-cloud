const Datafile = require("../models/data-file-model.js");



// Retrieve all Datafiles from the database.
exports.findAll = (req, res) => {
  Datafile.getAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving datafiles."
      });
    else res.send(data);
  });
};

exports.findOne = (req, res) => {  
  Datafile.findById(req.params.fileId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found file with id ${req.params.fileId}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving file with id " + req.params.fileId
        });
      }
    } else res.send(data);
  });
};

exports.update = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  Datafile.updateById(
    req.params.fileId,
    req.body,
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Photo with id ${req.params.fileId}.`
          });
        } else {
          res.status(500).send({
            message: "Error updating Photo with id " + req.params.fileId
          });
        }
      } else res.send(data);
    }
  );
};
