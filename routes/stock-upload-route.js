const express = require('express');
const router = express.Router();
const uploadController = require('../controllers/stock-upload-controller');


router.get('/upload/', function(req, res) {
  res.json({ message: 'welcome to our stock files upload api!' });  
});


router.post('/upload', uploadController.multipleUpload);

module.exports = router;
