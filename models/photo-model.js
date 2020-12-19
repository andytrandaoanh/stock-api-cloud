const sql = require("./db.js");

// constructor
const Photo = function(photo) {  
  this.photo_id = photo.photo_id;
  this.file_name = photo.file_name;
  this.photo_title = photo.photo_title;
  this.description = photo.description;
  this.uploaded = photo.uploaded;
  this.edited = photo.edited;
  this.disabled = photo.disabled;
};

Photo.create = (newPhoto, result) => {
  sql.query("INSERT INTO photos SET ?", newPhoto, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created photo: ", { id: res.insertId, ...newPhoto });
    result(null, { id: res.insertId, ...newPhoto });
  });
};

Photo.findById = (photoId, result) => {
  sql.query(`SELECT * FROM photos WHERE photo_id = ${photoId}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found photo: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found Photo with the id
    result({ kind: "not_found" }, null);
  });
};

Photo.getAll = result => {
  sql.query("SELECT * FROM photos", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("photos: ", res);
    result(null, res);
  });
};

Photo.updateById = (id, photo, result) => {
  sql.query(
    "UPDATE photos SET edited = NOW(), photo_title = ?, description= ?, disabled = ? WHERE photo_id = ?",
    [photo.photo_title, photo.description, photo.disabled, photo.photo_id],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found Photo with the id
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated photo: ", { photo_id: photo.photo_id, ...photo });
      result(null, { photo_id: photo.photo_id, ...photo });
    }
  );
};


Photo.remove = (id, result) => {
  sql.query("DELETE FROM photos WHERE id = ?", id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // not found Photo with the id
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted photo with id: ", id);
    result(null, res);
  });
};

Photo.removeAll = result => {
  sql.query("DELETE FROM photos", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log(`deleted ${res.affectedRows} photos`);
    result(null, res);
  });
};

module.exports = Photo;
