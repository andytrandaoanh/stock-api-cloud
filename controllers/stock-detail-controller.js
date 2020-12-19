const stockDetail = require("../models/stock-detail-model.js");

// Create and Save a new stockDetail
exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  // Create a stockDetail
  const newNote = new stockDetail({
    ticker: req.body.ticker,
    industry: req.body.industry,
    exchange: req.body.exchange,
    company: req.body.company

  });

  // Save stockDetail in the database
  stockDetail.create(newNote, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the stock note."
      });
    else res.send(data);
  });
};



// Retrieve all stockDetails from the database.
exports.findAll = (req, res) => {
  stockDetail.getAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving photos."
      });
    else res.send(data);
  });
};


// Find a single stockDetail with a stockId
exports.findOne = (req, res) => {  
  stockDetail.findById(req.params.stockId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found stock note with id ${req.params.stockId}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving stock note with id " + req.params.stockId
        });
      }
    } else res.send(data);
  });
};

// Update a stockDetail identified by the stockId in the request
exports.update = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  stockDetail.updateById(
    req.params.stockId,
    new stockDetail(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found stock note with id ${req.params.stockId}.`
          });
        } else {
          res.status(500).send({
            message: "Error updating stock note with id " + req.params.stockId
          });
        }
      } else res.send(data);
    }
  );
};



// Delete a stockDetail with the specified stockId in the request
exports.delete = (req, res) => {
  stockDetail.remove(req.params.stockId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found stock note with id ${req.params.stockId}.`
        });
      } else {
        res.status(500).send({
          message: "Could not delete stock note with id " + req.params.stockId
        });
      }
    } else res.send({ message: `stock note was deleted successfully!` });
  });
};

// Delete all stockDetails from the database.
exports.deleteAll = (req, res) => {
  stockDetail.removeAll((err, data) => {
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
  
  stockDetail.searchByQueryParams(req.query, (err, data) => {
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
          message: "Error retrieving stock detail params",
        });

    }  


  }

  else res.send(data);

  });
  
};
