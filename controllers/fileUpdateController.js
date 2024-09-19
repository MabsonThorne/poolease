// controllers/fileUploadController.js

const path = require('path');
const fs = require('fs');

exports.uploadUpdate = (req, res) => {
  if (!req.file) {
    return res.status(400).send({ status: 'error', message: 'No file uploaded' });
  }

  const filePath = path.join(__dirname, '../uploads', req.file.filename);
  const version = req.body.version;

  // 处理文件和版本信息，例如将文件重命名为固定名称
  const newFilePath = path.join(__dirname, '../updates', 'update.zip');
  fs.renameSync(filePath, newFilePath);

  res.send({ status: 'success', message: 'File uploaded successfully' });
};
