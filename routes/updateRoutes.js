// routes/updateRoutes.js
const express = require('express');
const router = express.Router();
const updateController = require('../controllers/updateController');

router.get('/check-update', (req, res) => {
  const updateInfo = {
    version: '1.0.1', // 最新版本号
    downloadUrl: 'http://106.52.158.123:3002/updates/update.zip' // 更新文件的下载地址
  };
  res.json(updateInfo);
});

router.post('/sendUpdate', updateController.sendUpdate);

module.exports = router;
