const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const { initializeDatabase } = require('./config');
const WebSocket = require('ws');

const productsRouter = require('./routes/products');
const poolTablesRouter = require('./routes/poolTables');
const mahjongTablesRouter = require('./routes/mahjongTables');
const membersRouter = require('./routes/members');
const employeesRouter = require('./routes/employees');
const ordersRouter = require('./routes/orders');
const uploadRouter = require('./routes/upload');
const interfacesRouter = require('./routes/interfaces');
const productOrdersRouter = require('./routes/productOrders'); // 新增

const app = express();

// Enable CORS
app.use(cors());

// Body parser with increased limit
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

// Static files
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// API routes
app.use('/api/products', productsRouter);
app.use('/api/pool-tables', poolTablesRouter);
app.use('/api/mahjong-tables', mahjongTablesRouter);
app.use('/api/members', membersRouter);
app.use('/api/employees', employeesRouter);
app.use('/api/orders', ordersRouter);
app.use('/api/upload', uploadRouter);
app.use('/api/interfaces', interfacesRouter);
app.use('/api/product-orders', productOrdersRouter); // 新增

// Serve frontend files in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, 'build')));

  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
  });
}

// Initialize WebSocket server
const server = require('http').createServer(app);
const wss = new WebSocket.Server({ server });

wss.on('connection', (ws) => {
  console.log('WebSocket client connected');
});

// Example function to handle scanned data and broadcast to WebSocket clients
function handleScannedData(data) {
  console.log('Scanned data:', data);
  wss.clients.forEach(client => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(data);
    }
  });
}

// Initialize database and start server
initializeDatabase().then(() => {
  const PORT = process.env.PORT || 5002;
  server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}).catch((error) => {
  console.error('Failed to initialize database:', error);
  process.exit(1);
});

module.exports = { wss };
