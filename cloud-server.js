const express = require('express');
const http = require('http');
const https = require('https');
const WebSocket = require('ws');
const bodyParser = require('body-parser');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const axios = require('axios');

const authRoutes = require('./routes/authRoutes');
const updateRoutes = require('./routes/updateRoutes');
const userRoutes = require('./routes/userRoutes');
const billiardOrdersRoutes = require('./routes/billiardOrdersRoutes');
const emailRoutes = require('./routes/emailRoutes');
const uploadRoutes = require('./routes/uploadRoutes');
const merchantAuthRoutes = require('./routes/merchantAuthRoutes');
const merchantInfoRoutes = require('./routes/merchantInfoRoutes'); // 新添加的商家信息更新路由
const productOrdersRoutes = require('./routes/productOrdersRoutes');
const addressRoutes = require('./routes/addressRoutes');
const merchantSceneImageRoutes = require('./routes/merchantSceneImageRoutes');
const cityRoutes = require('./routes/cityRoutes'); // 引入新创建的路由文件

const app = express();

const httpServer = http.createServer(app);

const httpsServer = https.createServer({
  key: fs.readFileSync('/home/ubuntu/ssl/privkey.pem'),
  cert: fs.readFileSync('/home/ubuntu/ssl/fullchain.pem')
}, app);

const wss = new WebSocket.Server({ server: httpsServer });

const CONFIG_DIR = path.join(__dirname, 'config');
const CLIENTS_FILE = path.join(CONFIG_DIR, 'clients.json');
const UPLOADS_DIR = path.join(__dirname, 'uploads'); // 添加 uploads 目录路径

// 创建配置目录和上传目录（如果不存在）
if (!fs.existsSync(CONFIG_DIR)) {
  fs.mkdirSync(CONFIG_DIR);
}

if (!fs.existsSync(UPLOADS_DIR)) {
  fs.mkdirSync(UPLOADS_DIR); // 确保 uploads 目录存在
}

app.locals.clients = new Map();

// 如果存在已保存的客户端 ID，则加载它们
if (fs.existsSync(CLIENTS_FILE)) {
  const clientIds = JSON.parse(fs.readFileSync(CLIENTS_FILE, 'utf-8'));
  clientIds.forEach(id => app.locals.clients.set(id, null));
}

// 保存当前连接的客户端
function saveClients() {
  const clientIds = Array.from(app.locals.clients.keys());
  fs.writeFileSync(CLIENTS_FILE, JSON.stringify(clientIds, null, 2));
}

app.use(cors());
app.use(bodyParser.json());

// 提供 /uploads 路由以便访问上传的图片
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use((req, res, next) => {
  const storeId = req.headers['x-store-id'];
  console.log(`Received request for ${req.originalUrl} with storeId: ${storeId}`);
  if (storeId && !req.originalUrl.includes('/api/email/send-code')) {
    const client = app.locals.clients.get(storeId);
    if (client) {
      const requestId = `${storeId}-${Date.now()}`;
      console.log(`Forwarding request ${requestId} to client ${storeId}`);
      client.send(JSON.stringify({
        requestId,
        method: req.method,
        endpoint: req.originalUrl,
        data: req.body
      }), (error) => {
        if (error) {
          console.error('Error sending message to client:', error);
          return res.status(500).send({ status: 'error', message: 'Failed to send request to client' });
        }

        const handleMessage = (message) => {
          const response = JSON.parse(message);
          if (response.requestId === requestId) {
            client.off('message', handleMessage);
            console.log(`Received response for request ${requestId} from client`);
            res.send(response.data);
          }
        };

        client.on('message', handleMessage);
      });
    } else {
      console.log(`Client ${storeId} not connected`);
      res.status(404).send({ status: 'info', message: 'Client not connected' });
    }
  } else {
    next();
  }
});

app.use('/api/', authRoutes);
app.use('/api/update', updateRoutes);
app.use('/api/email', emailRoutes);
app.use('/api/user', userRoutes);
app.use('/api', billiardOrdersRoutes);
app.use('/api', uploadRoutes);
app.use('/api/merchant/auth', merchantAuthRoutes);
app.use('/api/merchant', merchantInfoRoutes); // 使用新的商家信息更新路由
app.use('/api/merchant-scene-images', merchantSceneImageRoutes);
app.use('/api', cityRoutes);

app.get('/api/get-location', async (req, res) => {
  try {
    const response = await axios.get('http://ip-api.com/json/');
    console.log('IP-API Response:', response.data);  // 确保返回的数据正确
    res.json(response.data);
  } catch (error) {
    console.error('Failed to fetch data from IP-API:', error);
    res.status(500).json({ error: 'Failed to fetch data from IP-API' });
  }
});

app.use('/api', productOrdersRoutes); // 商品订单路由
app.use('/api', addressRoutes); // 将路由挂载到 /api 路径下

wss.on('connection', (ws, req) => {
  const storeId = req.url.split('?storeId=')[1];
  app.locals.clients.set(storeId, ws);
  saveClients();

  console.log(`Client connected: ${storeId}`);

  ws.on('message', (message, isBinary) => {
    if (isBinary) {
      // 从消息中提取文件名和数据
      const separatorIndex = message.indexOf('|');
      if (separatorIndex !== -1) {
        const fileNameBuffer = message.slice(0, separatorIndex);
        const fileData = message.slice(separatorIndex + 1);

        const fileName = fileNameBuffer.toString('utf-8');
        const filePath = path.join(UPLOADS_DIR, fileName);

        if (fs.existsSync(filePath)) {
          console.error(`File already exists: ${fileName}. Upload rejected.`);
          ws.send(JSON.stringify({ error: `File already exists: ${fileName}. Upload rejected.` }));
        } else {
          fs.writeFile(filePath, fileData, (err) => {
            if (err) {
              console.error('Failed to save file:', err);
              ws.send(JSON.stringify({ error: 'Failed to save file.' }));
            } else {
              console.log(`File saved successfully to ${filePath}`);
              ws.send(JSON.stringify({ success: `File saved successfully to ${filePath}` }));
            }
          });
        }
      } else {
        console.error('Failed to parse the received message. Invalid format.');
      }
    } else {
      console.error('Expected binary data, but received text. Ignoring message.');
    }
  });

  ws.on('close', () => {
    console.log(`Connection closed for store ${storeId}`);
    app.locals.clients.set(storeId, null);
    saveClients();
  });

  ws.on('error', (error) => {
    console.error(`Connection error for store ${storeId}:`, error);
  });
});

app.use('/updates', express.static(path.join(__dirname, 'updates')));

httpServer.listen(3002, () => {
  console.log('HTTP Server is listening on port 3002');
});

httpsServer.listen(443, () => {
  console.log('HTTPS Server is listening on port 443');
});
