// routes/uploadRoutes.js

const express = require('express');
const multer = require('multer');
const path = require('path');
const mysql = require('mysql2/promise');

const router = express.Router();

// 配置上传目录和文件命名规则
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage: storage });

// 数据库连接配置
const dbConfig = {
  host: 'localhost',
  user: 'poolease',
  password: 'Lenkso0210',
  database: 'poolease',
};

// 图片上传处理路由
router.post('/upload', upload.single('image'), async (req, res) => {
  try {
    const connection = await mysql.createConnection(dbConfig);
    const imageUrl = `/uploads/${req.file.filename}`;
    const userId = req.body.user_id;

    // 将图片路径存储到数据库中
    await connection.execute(
      'UPDATE auth SET image = ? WHERE id = ?',
      [imageUrl, userId]
    );

    await connection.end();

    res.status(200).json({ status: 'success', imageUrl: imageUrl });
  } catch (error) {
    console.error('Error during image upload:', error);
    res.status(500).json({ status: 'error', message: 'Failed to upload image' });
  }
});

// 获取图片
router.get('/uploads/:filename', (req, res) => {
  const filename = req.params.filename;
  const filepath = path.join(__dirname, '../uploads', filename);
  res.sendFile(filepath);
});

module.exports = router;
