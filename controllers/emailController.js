// controllers/emailController.js
const { exec } = require('child_process');
const crypto = require('crypto');

let codes = {}; // 存储验证码和有效期的临时对象

// 生成6位数字验证码
function generateCode() {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

// 生成验证码并发送邮件
exports.sendVerificationCode = (req, res) => {
  const { email } = req.body;
  const code = generateCode(); // 生成6位数字验证码
  const expiry = Date.now() + 5 * 60 * 1000; // 有效期5分钟

  const message = `From: poolease@poolease.cn\nTo: ${email}\nSubject: 【易台POOLEASE】您的验证码\n\n您的验证码是：${code}，有效期为5分钟。`;
  const sendmailCommand = `echo "${message}" | sendmail -t`;

  exec(sendmailCommand, (error, stdout, stderr) => {
    if (error) {
      return res.status(500).send({ message: '邮件发送失败', error });
    }

    codes[email] = { code, expiry }; // 保存验证码和有效期
    res.send({ message: '验证码已发送' });
  });
};

// 验证验证码
exports.verifyCode = (req, res) => {
  const { email, code } = req.body;

  if (codes[email] && codes[email].code === code) {
    if (Date.now() > codes[email].expiry) {
      delete codes[email]; // 验证码过期
      return res.status(400).send({ message: '验证码已过期' });
    }
    delete codes[email]; // 验证成功后删除验证码
    res.send({ message: '验证成功' });
  } else {
    res.status(400).send({ message: '验证码错误或已过期' });
  }
};
