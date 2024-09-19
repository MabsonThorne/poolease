const express = require('express');
const path = require('path');
const app = express();

// 提供静态文件
app.use(express.static(__dirname));

// 当用户访问根路径时，发送 index.html 文件
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

const port = process.env.PORT || 5002;  // 修改端口为 5002
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
