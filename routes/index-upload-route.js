const express = require('express');
const router = express.Router();
const uploadController = require('../controllers/index-upload-controller');


router.get('/indexupload/', function(req, res) {
  res.json({ message: 'welcome to our index files upload api!' });  
});


router.post('/indexupload', uploadController.multipleUpload);

module.exports = router;
