// routes/merchantSceneImageRoutes.js
const express = require('express');
const router = express.Router();
const merchantSceneImageController = require('../controllers/merchantSceneImageController');
const multer = require('multer');
const path = require('path');

// 设置 multer 存储引擎
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // 设置上传的目录
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`); // 生成唯一文件名
  }
});

// 使用 multer 配置
const upload = multer({ storage: storage });

// 上传图片
router.post('/upload', upload.single('image'), merchantSceneImageController.uploadImage);

// 获取商家所有图片
router.get('/:storeId', merchantSceneImageController.getImages);

// 删除指定图片
router.delete('/:id', merchantSceneImageController.deleteImage);

module.exports = router;
