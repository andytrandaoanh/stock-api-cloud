const stockNote = require("../models/stock-note-model.js");

// Create and Save a new stockNote
exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  // Create a stockNote
  const newNote = new stockNote({
    tickerId: req.body.tickerId,
    note: req.body.note
  });

  // Save stockNote in the database
  stockNote.create(newNote, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the stock note."
      });
    else res.send(data);
  });
};



// Retrieve all stockNotes from the database.
exports.findAll = (req, res) => {
  stockNote.getAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving photos."
      });
    else res.send(data);
  });
};


// Find a single stockNote with a noteId
exports.findOne = (req, res) => {  
  stockNote.findById(req.params.noteId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found stock note with id ${req.params.noteId}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving stock note with id " + req.params.noteId
        });
      }
    } else res.send(data);
  });
};

// Update a stockNote identified by the noteId in the request
exports.update = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  stockNote.updateById(
    req.params.noteId,
    new stockNote(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found stock note with id ${req.params.noteId}.`
          });
        } else {
          res.status(500).send({
            message: "Error updating stock note with id " + req.params.noteId
          });
        }
      } else res.send(data);
    }
  );
};



// Delete a stockNote with the specified noteId in the request
exports.delete = (req, res) => {
  stockNote.remove(req.params.noteId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found stock note with id ${req.params.noteId}.`
        });
      } else {
        res.status(500).send({
          message: "Could not delete stock note with id " + req.params.noteId
        });
      }
    } else res.send({ message: `stock note was deleted successfully!` });
  });
};

// Delete all stockNotes from the database.
exports.deleteAll = (req, res) => {
  stockNote.removeAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all stock notes."
      });
    else res.send({ message: `All stock notes were deleted successfully!` });
  });
};

// Search for terms whose title or description contain some string
exports.searchByQuery = (req, res) => {  
  
  stockNote.searchByQueryParams(req.query, (err, data) => {
  if (err) { 

    if (err.kind === "not_found") {
      res.status(404).send({
          message: `Not found stock note with params`,
      });
    }

    else if (err.kind === "invalid_param") { 

        res.status(500).send({
          message: `Params supplied are invalid`,
        });
    }

    else {

        res.status(500).send({
          message: "Error retrieving stock note params",
        });

    }  


  }

  else res.send(data);

  });
  
};
