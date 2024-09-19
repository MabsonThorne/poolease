const bcrypt = require('bcryptjs');
const db = require('../config/db');

exports.wechatLogin = async (req, res) => {
  const { openid, email, password } = req.body;

  if (!openid) {
    return res.status(400).send({ message: 'openid is required.' });
  }

  try {
    // 检查该 openid 是否已经绑定
    const [users] = await db.query('SELECT * FROM auth WHERE user_id = ?', [openid]);

    if (users.length > 0) {
      // 如果 openid 已经绑定，直接登录
      return res.send({ message: 'Login successful', user: users[0] });
    }

    // 如果 openid 未绑定且没有提供 email 和 password，则返回错误
    if (!email || !password) {
      return res.status(401).send({ message: 'No account linked with this WeChat openid. Please login with email and password first.' });
    }

    // 验证邮箱和密码
    const [emailUsers] = await db.query('SELECT * FROM auth WHERE email = ?', [email]);

    if (emailUsers.length === 0) {
      return res.status(401).send({ message: 'Invalid email or password' });
    }

    const user = emailUsers[0];
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).send({ message: 'Invalid email or password' });
    }

    // 如果密码正确且 user_id（即 openid）为空，则绑定该 openid
    if (!user.user_id || user.user_id === '0') {
      await db.query('UPDATE auth SET user_id = ? WHERE email = ?', [openid, email]);
      return res.send({ message: 'Login successful and openid bound', user });
    } else {
      return res.status(400).send({ message: 'This email is already bound to another openid' });
    }
  } catch (error) {
    console.error('Error during WeChat login:', error);
    res.status(500).send({ message: 'Server error' });
  }
};
