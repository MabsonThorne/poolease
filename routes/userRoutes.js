const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// 用户登录
router.post('/wxLogin', userController.wxLogin);

// 更新用户昵称
router.put('/:openid/nick_name', userController.updateNickName);

// 更新用户头像
router.post('/:openid/avatar', userController.updateAvatar);

module.exports = router;
