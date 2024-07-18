const express = require('express');
const { SerialPort } = require('serialport');

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const ports = await SerialPort.list(); // Correctly use SerialPort.list()
    const portPaths = ports.map(port => port.path);
    res.json(portPaths);
  } catch (error) {
    console.error('Error listing serial ports:', error);
    res.status(500).json({ error: 'Failed to list serial ports' });
  }
});

module.exports = router;
