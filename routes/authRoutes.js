const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

router.post('/login', authController.login);
router.post('/register', authController.register);

// 获取台球室信息的路由
router.get('/poolRooms', authController.getPoolRooms);
router.get('/poolrooms/:storeId', authController.getPoolRoomsByStoreId);
module.exports = router;
