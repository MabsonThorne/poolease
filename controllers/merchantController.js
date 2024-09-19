// controllers/merchantController.js
const db = require('../config/db');
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

const upload = multer({ storage: storage });

exports.updateInfo = [
  upload.single('image'), // 使用 multer 处理单个名为 'image' 的文件上传
  async (req, res) => {
    const { openid, name, address, description } = req.body; // 从请求体中获取数据
    const image = req.file ? req.file.path : null;

    if (!openid) {
      return res.status(400).send({ message: '商家OpenID是必须的.' });
    }

    try {
      const updateData = {};
      if (name) updateData.name = name;
      if (address) updateData.address = address; 
      if (image) updateData.image = image;
      if (description) updateData.description = description;

      const updateFields = Object.keys(updateData).map(key => `${key} = ?`).join(', ');
      const updateValues = Object.values(updateData);

      if (updateFields.length === 0) {
        return res.status(400).send({ message: '没有要更新的信息.' });
      }

      const query = `UPDATE auth SET ${updateFields} WHERE user_id = ?`;
      await db.query(query, [...updateValues, openid]);

      res.send({ message: '商家信息更新成功', imagePath: image });
    } catch (error) {
      console.error('更新商家信息错误:', error);
      res.status(500).send({ message: '服务器错误' });
    }
  }
];
