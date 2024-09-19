const express = require('express');
const router = express.Router();
const merchantAuthController = require('../controllers/merchantAuthController');

// 商家微信登录
router.post('/wechatLogin', merchantAuthController.wechatLogin);

module.exports = router;
