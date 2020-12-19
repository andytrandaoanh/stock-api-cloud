const StockListItem = require("../models/stock-list-item-v2-model.js");

//Create and Save a new stockListItem
exports.create = (req, res) => {
  // Validate request
  if (!req.body) {

    //console.log(req.body);
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  //Create a stockListItem
  const stockListItem = new StockListItem(req.body);

  // Save stockListItem in the database
  StockListItem.create(stockListItem, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the stockListItem."
      });
    else res.send(data);
  });
};



// Retrieve all stockListItems from the database.
exports.findAll = (req, res) => {
  StockListItem.getAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving stockListItems."
      });
    else res.send(data);
  });
};


// Retrieve all stockListItems from the database.
exports.findByListId = (req, res) => {
  StockListItem.getByListId(req.params.listId, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving stockListItems."
      });
    else res.send(data);
  });
};






// Find a single stockListItem with a stockListItemId
exports.findOne = (req, res) => {  
  StockListItem.findById(req.params.itemId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found stockListItem with id ${req.params.itemId}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving stockListItem with id " + req.params.itemId
        });
      }
    } else res.send(data);
  });
};

// Update a stockListItem identified by the stockListItemId in the request
exports.update = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  StockListItem.updateById(
    req.params.itemId,
    new StockListItem(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found stockListItem with id ${req.params.itemId}.`
          });
        } else {
          res.status(500).send({
            message: "Error updating stockListItem with id " + req.params.itemId
          });
        }
      } else res.send(data);
    }
  );
};



// Delete a stockListItem with the specified stockListItemId in the request
exports.delete = (req, res) => {
  StockListItem.remove(req.params.itemId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found stockListItem with id ${req.params.itemId}.`
        });
      } else {
        res.status(500).send({
          message: "Could not delete stockListItem with id " + req.params.itemId
        });
      }
    } else res.send({ message: `stockListItem was deleted successfully!` });
  });
};

// Delete all stockListItems from the database.
exports.deleteAll = (req, res) => {
  StockListItem.removeAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all stockListItems."
      });
    else res.send({ message: `All stockListItems were deleted successfully!` });
  });
};

