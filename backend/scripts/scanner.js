const { SerialPort } = require('serialport');
const Readline = require('@serialport/parser-readline');

const port = new SerialPort({
  path: '/dev/ttyUSB0', // 修改为你系统中对应的设备路径
  baudRate: 9600
});

const parser = port.pipe(new Readline({ delimiter: '\r\n' }));

parser.on('data', (data) => {
  console.log(`Scanned data: ${data}`);
  // 这里可以将数据发送到前端或保存到数据库中
});

port.on('error', (err) => {
  console.error('Error: ', err.message);
});
