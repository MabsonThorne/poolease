const bcrypt = require('bcryptjs');

const password = '88888888'; // 需要生成哈希值的密码

bcrypt.hash(password, 10, (err, hash) => {
  if (err) {
    console.error('Error generating hash:', err);
    process.exit(1);
  }
  console.log('Generated hash:', hash);
});
