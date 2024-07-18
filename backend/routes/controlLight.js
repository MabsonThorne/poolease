// routes/controlLight.js
const express = require('express');
const SerialPort = require('serialport');
const router = express.Router();

router.post('/', (req, res) => {
  const { tableId, status } = req.body;
  const command = status === 1 ? 'TURN_ON_COMMAND' : 'TURN_OFF_COMMAND'; // 替换为实际的开关灯命令

  serialPort.write(command, (err) => {
    if (err) {
      console.error('Error on write: ', err.message);
      return res.status(500).send('Failed to send command');
    }
    res.send('Command sent successfully');
  });
});

module.exports = router;
