// routes/cityRoutes.js

const express = require('express');
const router = express.Router();
const { getCities } = require('../controllers/cityController'); // 导入控制器中的 getCities 函数

// 定义路由：GET /api/cities
router.get('/cities', getCities);

module.exports = router;
