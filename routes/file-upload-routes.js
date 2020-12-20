const express = require('express');
const router = express.Router();
const authService = require("../services/uuid-auth-service.js");
const stockUploadController = require('../controllers/stock-upload-controller');
const indexUploadController = require('../controllers/index-upload-controller');


router.post('/upload', authService, stockUploadController.multipleUpload);
router.post('/indexupload', authService,  indexUploadController.multipleUpload);

module.exports = router;
