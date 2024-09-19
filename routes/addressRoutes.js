// routes/addressRoutes.js
const express = require('express');
const router = express.Router();
const addressController = require('../controllers/addressController');

// 获取某个地级市的所有地址
router.get('/addresses/:cityName', addressController.getAddressesByCity);

// 创建一个新的地址
router.post('/addresses', addressController.createAddress);

// 更新一个地址
router.put('/addresses/:id', addressController.updateAddress);

// 删除一个地址
router.delete('/addresses/:id', addressController.deleteAddress);

module.exports = router;
