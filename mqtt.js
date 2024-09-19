// 文件名: mqtt_server.js

const aedes = require('aedes')();
const server = require('net').createServer(aedes.handle);
const port = 1883;

// 启动 MQTT 服务器
server.listen(port, function () {
  console.log(`MQTT 服务器正在监听端口 ${port}`);
});

// 处理客户端连接
aedes.on('client', (client) => {
  console.log(`客户端连接: ${client.id}`);
});

// 处理客户端断开连接
aedes.on('clientDisconnect', (client) => {
  console.log(`客户端断开连接: ${client.id}`);
});

// 处理发布消息
aedes.on('publish', (packet, client) => {
  if (client) {
    console.log(`客户端 ${client.id} 发布消息: ${packet.payload.toString()}`);
  }
});

// 处理订阅
aedes.on('subscribe', (subscriptions, client) => {
  console.log(`客户端 ${client.id} 订阅: ${subscriptions.map(s => s.topic).join(', ')}`);
});

// 处理取消订阅
aedes.on('unsubscribe', (subscriptions, client) => {
  console.log(`客户端 ${client.id} 取消订阅: ${subscriptions.join(', ')}`);
});

// 添加认证逻辑
aedes.authenticate = (client, username, password, callback) => {
  const validUsername = 'poolease';
  const validPassword = 'poolease';
  if (username === validUsername && password.toString() === validPassword) {
    callback(null, true); // 认证通过
  } else {
    const error = new Error('认证失败');
    error.returnCode = 4; // 返回编码4代表认证失败
    callback(error, false); // 认证失败
  }
};
