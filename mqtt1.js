// 文件名: mqtt_client.js

const mqtt = require('mqtt');

// MQTT 服务器地址
const brokerUrl = 'mqtt://localhost:1883'; // 修改为您的服务器地址

// 创建 MQTT 客户端，添加账号和密码
const client = mqtt.connect(brokerUrl, {
  username: 'poolease', // 设置用户名
  password: 'poolease'  // 设置密码
});

// 连接到服务器
client.on('connect', () => {
  console.log('已连接到 MQTT 服务器');

  // 定义要发送的控制消息
  const publishTopic = '/xm/sh/request/mqtt/1510100101132026/1020/v2';
  const responseTopic = '/xm/sh/response/mqtt/1510100110132026/1020/v2';
  const message = {
    header: {
      timeStamp: '', // 这里保持空值，如需时间戳可以填入相应值
    },
    payload: {
      devices: [
        {
          devicesn: '', // 设备序列号，保持空值或填写实际序列号
          action: 'command',
          params: {
            '11': true,
            '46': 0,
          },
        },
      ],
    },
  };

  // 将消息转换为 JSON 字符串
  const messageString = JSON.stringify(message);

  // 发送控制消息给设备
  client.publish(publishTopic, messageString, { qos: 0, retain: false }, (error) => {
    if (error) {
      console.error('消息发送失败:', error);
    } else {
      console.log('消息已发送:', messageString);
    }
  });

  // 订阅响应主题
  client.subscribe(responseTopic, { qos: 0 }, (err) => {
    if (err) {
      console.error('订阅失败:', err);
    } else {
      console.log(`已订阅主题: ${responseTopic}`);
    }
  });
});

// 处理接收到的消息
client.on('message', (topic, message) => {
  if (topic === '/xm/sh/response/mqtt/1510100110132026/1020/v2') {
    console.log('收到设备响应:', message.toString());
  }
});

// 处理错误
client.on('error', (error) => {
  console.error('连接出错:', error);
});

// 处理关闭连接
client.on('close', () => {
  console.log('MQTT 连接已关闭');
});
