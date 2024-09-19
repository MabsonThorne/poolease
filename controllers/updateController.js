// controllers/updateController.js

const path = require('path');

exports.sendUpdate = (req, res) => {
  const { version, downloadUrl } = req.body;
  const clients = req.app.locals.clients;

  clients.forEach((ws, storeId) => {
    if (ws && ws.readyState === WebSocket.OPEN) {
      ws.send(JSON.stringify({ action: 'update', data: { version, downloadUrl } }));
    }
  });
  res.send({ status: 'success', message: 'Update instructions sent to all clients' });
};

exports.provideUpdateFile = (req, res) => {
  const updateFilePath = path.join(__dirname, '../updates', req.params.fileName);
  res.sendFile(updateFilePath);
};
