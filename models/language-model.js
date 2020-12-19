const sql = require("./db.js");

// constructor
const Language = function(language) {  
  this.lang_id = language.lang_id;
  this.short_name = language.short_name;
  this.full_name = language.full_name;
 };

Language.create = (newLanguage, result) => {
  sql.query("INSERT INTO languages SET ?", newLanguage, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created language: ", { lang_id: res.insertId, ...newLanguage });
    result(null, { lang_id: res.insertId, ...newLanguage });
  });
};

Language.findById = (languageId, result) => {
  sql.query(`SELECT * FROM languages WHERE lang_id = ${languageId}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found language: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found Language with the id
    result({ kind: "not_found" }, null);
  });
};

Language.getAll = result => {
  strSQL = `select * from languages`;
  
  sql.query(strSQL, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("languages: ", res);
    result(null, res);
  });
};

Language.updateById = (id, language, result) => {
  sql.query(
    "UPDATE languages SET short_name = ?, full_name = ? WHERE lang_id = ?",
    [language.short_name, language.full_name, id],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found Language with the id
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated language: ", { lang_id: language.lang_id, ...language });
      result(null, { lang_id: language.lang_id, ...language });
    }
  );
};

Language.remove = (id, result) => {
  sql.query("DELETE FROM languages WHERE lang_id = ?", id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // not found Language with the id
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted language with id: ", id);
    result(null, res);
  });
};

Language.removeAll = result => {
  sql.query("DELETE FROM languages", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log(`deleted ${res.affectedRows} languages`);
    result(null, res);
  });
};



module.exports = Language;
