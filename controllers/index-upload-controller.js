const uploadService = require("../services/index-upload-service");
const dataFileModel = require("../models/index-file-model");


const multipleUpload = async (req, res) => {
  try {
    await uploadService(req, res);
    dataFileModel.insertDB(req.files, req, res);
    //console.log(req.files);

    if (req.files.length <= 0) {
      return res.send(`You must select at least 1 file.`);
    }

    return res.send(`Files has been uploaded.`);
  } catch (error) {
    console.log(error);

    if (error.code === "LIMIT_UNEXPECTED_FILE") {
      return res.send("Too many files to upload.");
    }
    return res.send(`Error when trying upload many files: ${error}`);
  }
};

module.exports = {
  multipleUpload: multipleUpload
};
