// routes/fileUploadRoutes.js
const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const fileUploadController = require('../controllers/fileUploadController');

const upload = multer({ dest: path.join(__dirname, '../uploads') });

router.post('/uploadUpdate', upload.single('file'), fileUploadController.uploadUpdate);

module.exports = router;
