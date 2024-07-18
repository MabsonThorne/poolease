const { SerialPort } = require('serialport');
let serialPorts = {};

const initializeSerialPorts = async () => {
  const axios = require('axios'); // Ensure axios is imported in the function scope
  try {
    const response = await axios.get('http://localhost:5002/api/interfaces');
    const interfaces = response.data;

    interfaces.forEach(portPath => {
      serialPorts[portPath] = new SerialPort({ path: portPath, baudRate: 9600 });
      serialPorts[portPath].on('open', () => console.log(`Serial Port ${portPath} Opened`));
      serialPorts[portPath].on('error', (err) => console.error(`Error on ${portPath}:`, err.message));
    });
  } catch (error) {
    console.error('Error initializing serial ports:', error);
  }
};

const controlLight = (portPath, status) => {
  const command = status === 1 ? 'TURN_ON_COMMAND' : 'TURN_OFF_COMMAND';
  if (serialPorts[portPath]) {
    serialPorts[portPath].write(command, (err) => {
      if (err) {
        console.error(`Error controlling light on ${portPath}:`, err.message);
      } else {
        console.log(`Light control command sent on ${portPath}: ${command}`);
      }
    });
  } else {
    console.error(`Serial port ${portPath} not found`);
  }
};

module.exports = { initializeSerialPorts, controlLight };
