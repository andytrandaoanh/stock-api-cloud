
const util = require("util");
const path = require("path");
const multer = require("multer");

var storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, './public/uploads');
  },
  filename: (req, file, callback) => {
    const match = ["application/vnd.ms-excel", "text/csv"];

    if (match.indexOf(file.mimetype) === -1) {
      var message = `${file.originalname} is invalid. Only accept csv or excel csv.`;
      return callback(message, null);
    }

    //var filename = `${Date.now()}-stock-${file.originalname}`;
    var filename = Date.now() + path.extname(file.originalname);    
    callback(null, filename);
  }
});

var uploadFiles = multer({ storage: storage }).array("files", 3);
var uploadFileService = util.promisify(uploadFiles);
module.exports = uploadFileService;
