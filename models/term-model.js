const sql = require("./db.js");

// constructor
const Term = function(term) {  
  this.term_id = term.termId;
  this.main_term = term.mainTerm;
  this.main_lang_id = term.mainLangId;
  this.co_term = term.coTerm;
  this.co_lang_id = term.coLangId;
  this.tags = term.tags;
  this.status = term.status;
 };

Term.create = (newTerm, result) => {
  sql.query("INSERT INTO terms SET ?", newTerm, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created term: ", { term_id: res.insertId, ...newTerm });
    result(null, { term_id: res.insertId, ...newTerm });
  });
};

Term.findById = (termId, result) => {
  sql.query(`SELECT * FROM term_view WHERE term_id = ${termId}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found term: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found Term with the id
    result({ kind: "not_found" }, null);
  });
};

Term.getAll = result => {
  strSQL = `select * from term_view order by term_id desc limit 100;`;
  
  sql.query(strSQL, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("terms: ", res);
    result(null, res);
  });
};

Term.updateById = (id, term, result) => {
  sql.query(
    "UPDATE terms SET main_term = ?, main_lang_id = ?, co_term = ?, co_lang_id = ?, tags = ?, status = ? WHERE term_id = ?",
    [term.main_term, term.main_lang_id, term.co_term, term.co_lang_id, term.tags, term.status, id],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found Term with the id
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated term: ", { term_id: term.term_id, ...term });
      result(null, { term_id: term.term_id, ...term });
    }
  );
};

Term.remove = (id, result) => {
  sql.query("DELETE FROM terms WHERE term_id = ?", id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // not found Term with the id
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted term with id: ", id);
    result(null, res);
  });
};

Term.removeAll = result => {
  sql.query("DELETE FROM terms", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log(`deleted ${res.affectedRows} terms`);
    result(null, res);
  });
};


Term.searchByQueryParams = (searchParams, result) => {

  let strSQL = '';


  if ('main_term' in searchParams)  strSQL = `select * from terms where main_term like '%${searchParams.main_term}%'` 

  if ('co_term' in searchParams)  {

    strSQL ? 
    strSQL += ` OR co_term like '%${searchParams.co_term}%'` : 
    strSQL = `select * from terms where co_term like '%${searchParams.co_term}%'` 

  } 

  if ('tags' in searchParams)  {

    strSQL ? 
    strSQL += ` OR tags like '%${searchParams.tags}%'` : 
    strSQL = `select * from terms where tags like '%${searchParams.tags}%'` 

  } 


    
  if (strSQL) {

    console.log('strSQL: ', strSQL)
    sql.query(strSQL, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }

      if (res.length) {
        console.log("found terms: ", res);
        result(null, res);
        return;
      }

      // not found Term with the id
      result({ kind: "not_found" }, null);
    });

  }
  else result({ kind: "invalid_param" }, null);

};


Term.listOrderByQueryParams = (searchParams, result) => {

  let strSQL = '';

  

  if ('main_lang' in searchParams)  strSQL = `select * from term_view where main_lang like '${searchParams.main_lang}' order by main_term` 

    
  if (strSQL) {

    console.log('strSQL: ', strSQL)
    sql.query(strSQL, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }

      if (res.length) {
        console.log("found terms: ", res);
        result(null, res);
        return;
      }

      // not found Term with the id
      result({ kind: "not_found" }, null);
    });

  }
  else result({ kind: "invalid_param" }, null);

};

Term.getAllCombinedTerms = (langId, result) => {
  
  
  switch(langId) {
    case 'vi':
      strSQL = `select * from combined_vietnamese_terms_view;`;
      break;
    case 'en':
      strSQL =  `select * from combined_english_terms_view;`;
      break;
    default:
      strSQL = `select * from combined_vietnamese_terms_view;`;
  } 


  sql.query(strSQL, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("terms: ", res);
    result(null, res);
  });
};



module.exports = Term;
