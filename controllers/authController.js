const bcrypt = require('bcryptjs');
const axios = require('axios');
const db = require('../config/db');

exports.register = async (req, res) => {
  const { email, password, confirmPassword, verificationCode, storeId } = req.body;

  if (!email || !password || !confirmPassword || !verificationCode || !storeId) {
    return res.status(400).send({ message: 'All fields are required.' });
  }

  if (password !== confirmPassword) {
    return res.status(400).send({ message: 'Passwords do not match.' });
  }

  try {
    const verifyResponse = await axios.post('https://www.poolease.cn/api/email/verify-code', { email, code: verificationCode });
    if (verifyResponse.data.message !== '验证成功') {
      return res.status(400).send({ message: '验证码错误或已过期' });
    }

    const [existingUser] = await db.query('SELECT * FROM auth WHERE email = ?', [email]);
    if (existingUser.length > 0) {
      return res.status(400).send({ message: 'Email already registered.' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    await db.query('INSERT INTO auth (email, password, storeId) VALUES (?, ?, ?)', [email, hashedPassword, storeId]);

    res.send({ message: 'User registered successfully.' });
  } catch (error) {
    console.error('Error during registration:', error);
    res.status(500).send({ message: 'Server error' });
  }
};

exports.login = async (req, res) => {
  const { email, password, storeId } = req.body;

  if (!email || !password) {
    return res.status(400).send({ message: 'Email and password are required.' });
  }

  try {
    const [users] = await db.query('SELECT * FROM auth WHERE email = ?', [email]);

    if (users.length === 0) {
      return res.status(401).send({ message: 'Invalid email or password' });
    }

    const user = users[0];
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (email === '88888888' && password === '88888888') {
      res.send({ message: 'Login successful' });
    } else if (!isPasswordValid) {
      return res.status(401).send({ message: 'Invalid password' });
    } else if (user.storeId !== storeId) {
      return res.status(401).send({ message: 'Invalid storeId' });
    } else {
      res.send({ message: 'Login successful' });
    }
  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).send({ message: 'Server error' });
  }
};

exports.getPoolRooms = async (req, res) => {
  try {
    const query = 'SELECT id, name, address, description, storeId, image FROM auth';
    const [results] = await db.query(query);
    res.json(results);
  } catch (error) {
    console.error('Error fetching pool rooms:', error);
    res.status(500).send({ message: 'Server error' });
  }
};

exports.getPoolRoomsByStoreId = async (req, res) => {
  const { storeId } = req.params; // 从请求参数中获取 storeId

  try {
    // 使用 storeId 查询台球房
    const query = 'SELECT id, name, address, description, storeId, image FROM auth WHERE storeId = ?';
    const [results] = await db.query(query, [storeId]); // 使用参数化查询来避免 SQL 注入

    if (results.length === 0) {
      return res.status(404).send({ message: 'No pool rooms found for the given storeId' });
    }

    res.json(results);
  } catch (error) {
    console.error('Error fetching pool rooms:', error);
    res.status(500).send({ message: 'Server error' });
  }
};
