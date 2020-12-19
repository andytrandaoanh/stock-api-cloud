const sqlConnection = require("./db.js");



// Save data file information
exports.insertDB = (inputFiles, request, response) => {

    //console.log(inputFiles);
  let insertData = [];
  
  for (let i = 0; i < inputFiles.length; i++) {
    insertData.push([
      inputFiles[i].filename,
      inputFiles[i].originalname,
      inputFiles[i].mimetype
    ])
  } 

  console.log(insertData);

  let strSQL = `INSERT INTO index_files
   (file_name, original_name, mime_type)  VALUES ?  `;
  
  // execute the insert statment
  sqlConnection.query(strSQL, [insertData], (err, result) => {
    if (err) {
      console.log(insertData);
      return console.error(err.message);
      response.status(500).send(
        {
          message: err.message || "Some error occurred while save datafile information."
  
        });
    }

    else {
     	
      console.log("result: ", result);
      response.status(200).send();
      //result(null, { message: "sucessfully save file inforatmion" });
    }

  });


};


exports.getAll = result => {
  strSQL = `select * from index_files order by file_id desc`;
  
  sqlConnection.query(strSQL, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("files: ", res);
    result(null, res);
  });
};



exports.findById = (fileId, result) => {
  sqlConnection.query(`SELECT * FROM index_files WHERE file_id = ${fileId}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      //console.log("found file: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found Term with the id
    result({ kind: "not_found" }, null);
  });
};


exports.updateById = (id, reqbody, result) => {
  console.log(reqbody.status);
  sqlConnection.query(
    "UPDATE index_files SET status = ? WHERE file_id = ?",
    [reqbody.status, id],
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

      console.log("updated file: ", { file_id: id });
      result(null, { file_id: id });
    }
  );
};
