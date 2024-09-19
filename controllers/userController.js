const axios = require('axios');
const db = require('../config/db');
const multer = require('multer');
const path = require('path');

// 设置 multer 存储引擎
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({ storage: storage });

// 微信登录接口
exports.wxLogin = async (req, res) => {
  const { code, userInfo } = req.body;
  if (!code) {
    return res.status(400).send({ success: false, message: '缺少 code 参数' });
  }

  try {
    const wxResponse = await axios.get(`https://api.weixin.qq.com/sns/jscode2session`, {
      params: {
        appid: 'wx0e58e1e52489f605',
        secret: '931f15505ba9ead11cdbf34857e13d94',
        js_code: code,
        grant_type: 'authorization_code'
      }
    });

    const { openid, session_key, errcode, errmsg } = wxResponse.data;

    if (errcode) {
      return res.status(400).send({ success: false, message: `微信登录失败: ${errmsg}` });
    }

    // 检查用户是否已经存在
    const [rows] = await db.query('SELECT * FROM users WHERE openid = ?', [openid]);
    let user;
    if (rows.length > 0) {
      // 用户已存在，更新 session_key
      await db.query('UPDATE users SET session_key = ? WHERE openid = ?', [session_key, openid]);
      user = rows[0];
      user.session_key = session_key;
    } else {
      // 用户不存在，进行注册
      const [result] = await db.query('INSERT INTO users (openid, session_key) VALUES (?, ?)', [openid, session_key]);
      user = { id: result.insertId, openid, session_key };
    }

    // 如果数据库中没有头像和昵称，使用微信用户信息更新数据库
    if (!user.avatar_url && userInfo.avatarUrl) {
      await db.query('UPDATE users SET avatar_url = ?, nick_name = ? WHERE openid = ?', [userInfo.avatarUrl, userInfo.nickName, openid]);
      user.avatar_url = userInfo.avatarUrl;
      user.nick_name = userInfo.nickName;
    }

    // 返回用户信息，包括数据库中的头像和昵称
    res.send({
      success: true,
      message: '登录成功',
      token: openid,
      user: {
        openid: user.openid,
        avatarUrl: user.avatar_url,  // 从数据库中获取
        nickName: user.nick_name     // 从数据库中获取
      }
    });
  } catch (error) {
    console.error('微信登录失败:', error);
    res.status(500).send({ success: false, message: '微信登录失败' });
  }
};

// 更新用户昵称
exports.updateNickName = async (req, res) => {
  const { openid } = req.params;
  const { nick_name } = req.body;

  if (!nick_name) {
    return res.status(400).send({ success: false, message: '缺少 nick_name 参数' });
  }

  try {
    const [result] = await db.query('UPDATE users SET nick_name = ? WHERE openid = ?', [nick_name, openid]);
    if (result.affectedRows > 0) {
      res.send({ success: true, message: '昵称更新成功' });
    } else {
      res.status(404).send({ success: false, message: '用户未找到' });
    }
  } catch (error) {
    console.error('昵称更新失败:', error);
    res.status(500).send({ success: false, message: '昵称更新失败' });
  }
};

// 更新用户头像
exports.updateAvatar = [
  upload.single('avatar'), // 使用 multer 处理单个文件上传，字段名为 'avatar'
  async (req, res) => {
    const { openid } = req.params;

    if (!req.file) {
      return res.status(400).send({ success: false, message: '缺少 avatar 文件' });
    }

    const avatarUrl = `/uploads/${req.file.filename}`;

    try {
      const [result] = await db.query('UPDATE users SET avatar_url = ? WHERE openid = ?', [avatarUrl, openid]);
      if (result.affectedRows > 0) {
        res.send({ success: true, message: '头像更新成功', avatarUrl });
      } else {
        res.status(404).send({ success: false, message: '用户未找到' });
      }
    } catch (error) {
      console.error('头像更新失败:', error);
      res.status(500).send({ success: false, message: '头像更新失败' });
    }
  }
];
