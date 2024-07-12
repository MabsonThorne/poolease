const { initializeDatabase } = require('./config');

initializeDatabase().then(() => {
  console.log('Database initialized');
}).catch((err) => {
  console.error('Error initializing database:', err);
});
