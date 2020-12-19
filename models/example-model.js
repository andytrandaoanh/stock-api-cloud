const sql = require("./db.js");

// constructor
const Example = function(example) {  
  this.term_id = example.term_id;
  this.eg_body = example.eg_body;
  this.lang_id = example.lang_id;
  this.eg_source = example.eg_source;
  this.status = example.status;
};

Example.create = (newExample, result) => {
  sql.query("INSERT INTO examples SET ?", newExample, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created example: ", { id: res.insertId, ...newExample });
    result(null, { id: res.insertId, ...newExample });
  });
};

Example.findById = (exampleId, result) => {
  sql.query(`SELECT * FROM examples WHERE eg_id = ${exampleId}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found example: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found Example with the id
    result({ kind: "not_found" }, null);
  });
};

Example.getAll = result => {
  sql.query("SELECT * FROM examples", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("examples: ", res);
    result(null, res);
  });
};

Example.updateById = (id, example, result) => {
  sql.query(
    "UPDATE examples SET eg_body = ?, lang_id = ?, status = ?, eg_source = ? WHERE eg_id = ?",
    [example.eg_body, example.lang_id, example.status, example.eg_source, id],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found Example with the id
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated example: ", { eg_id: id, ...example });
      result(null, { eg_id: id, ...example });
    }
  );
};

Example.remove = (id, result) => {
  sql.query("DELETE FROM examples WHERE eg_id = ?", id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // not found Example with the id
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted example with id: ", id);
    result(null, res);
  });
};

Example.removeAll = result => {
  sql.query("DELETE FROM examples", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log(`deleted ${res.affectedRows} examples`);
    result(null, res);
  });
};

Example.findByTermId = (termId, result) => {
  sql.query(`SELECT * FROM examples WHERE term_id = ${termId}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found examples: ", res);
      result(null, res);
      return;
    }

    // not found Example with the Term id
    result({ kind: "not_found" }, null);
  });
};

module.exports = Example;
