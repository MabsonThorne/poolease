// routes/merchantInfoRoutes.js
const express = require('express');
const router = express.Router();
const merchantController = require('../controllers/merchantController');

router.post('/info', merchantController.updateInfo);

module.exports = router;
