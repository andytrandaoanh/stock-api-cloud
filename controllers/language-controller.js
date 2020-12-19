const Language = require("../models/language-model.js");

//Create and Save a new Language
exports.create = (req, res) => {
  // Validate request
  if (!req.body) {

    console.log(req.body);
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  //Create a Language
  const language = new Language({
    lang_id: req.body.langId,
    short_name: req.body.shortName,
    full_name : req.body.fullName
  });

  // Save Language in the database
  Language.create(language, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Language."
      });
    else res.send(data);
  });
};



// Retrieve all Languages from the database.
exports.findAll = (req, res) => {
  Language.getAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving languages."
      });
    else res.send(data);
  });
};


// Find a single Language with a languageId
exports.findOne = (req, res) => {  
  Language.findById(req.params.langId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Language with id ${req.params.langId}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving Language with id " + req.params.LangId
        });
      }
    } else res.send(data);
  });
};

// Update a Language identified by the langId in the request
exports.update = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  Language.updateById(
    req.params.langId,
    new Language(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Language with id ${req.params.langId}.`
          });
        } else {
          res.status(500).send({
            message: "Error updating Language with id " + req.params.langId
          });
        }
      } else res.send(data);
    }
  );
};



// Delete a Language with the specified languageId in the request
exports.delete = (req, res) => {
  Language.remove(req.params.langId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Language with id ${req.params.langId}.`
        });
      } else {
        res.status(500).send({
          message: "Could not delete Language with id " + req.params.langId
        });
      }
    } else res.send({ message: `Language was deleted successfully!` });
  });
};

// Delete all Languages from the database.
exports.deleteAll = (req, res) => {
  Language.removeAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all languages."
      });
    else res.send({ message: `All Languages were deleted successfully!` });
  });
};

