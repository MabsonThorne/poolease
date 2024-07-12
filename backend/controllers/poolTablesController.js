const { initializeDatabase } = require('../config');
const calculateBilling = require('../billing');

exports.getAllPoolTables = async (req, res) => {
  const db = await initializeDatabase();
  const tables = await db.all('SELECT * FROM pool_tables');
  res.json(tables);
};

exports.createPoolTable = async (req, res) => {
  const { name } = req.body;
  const db = await initializeDatabase();
  const result = await db.run(
    'INSERT INTO pool_tables (name) VALUES (?)', 
    [name]
  );
  res.status(201).json({ id: result.lastID });
};

exports.getPoolTableById = async (req, res) => {
  const { id } = req.params;
  const db = await initializeDatabase();
  const table = await db.get('SELECT * FROM pool_tables WHERE id = ?', [id]);
  if (table) {
    res.json(table);
  } else {
    res.status(404).json({ error: 'Pool table not found' });
  }
};

exports.updatePoolTable = async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  const db = await initializeDatabase();
  const result = await db.run(
    'UPDATE pool_tables SET name = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?', 
    [name, id]
  );
  if (result.changes > 0) {
    res.json({ message: 'Pool table updated successfully' });
  } else {
    res.status(404).json({ error: 'Pool table not found' });
  }
};

exports.deletePoolTable = async (req, res) => {
  const { id } = req.params;
  const db = await initializeDatabase();
  const result = await db.run('DELETE FROM pool_tables WHERE id = ?', [id]);
  if (result.changes > 0) {
    res.json({ message: 'Pool table deleted successfully' });
  } else {
    res.status(404).json({ error: 'Pool table not found' });
  }
};

exports.startBilling = async (req, res) => {
  const { table_id, table_type } = req.body;
  const startTime = new Date().toISOString();
  const db = await initializeDatabase();
  const result = await db.run(
    'INSERT INTO billing (table_id, start_time, table_type) VALUES (?, ?, ?)',
    [table_id, startTime, table_type]
  );
  res.status(201).json({ id: result.lastID, start_time: startTime });
};

exports.endBilling = async (req, res) => {
  const { id } = req.params;
  const endTime = new Date().toISOString();
  const db = await initializeDatabase();
  const billing = await db.get('SELECT * FROM billing WHERE id = ?', [id]);
  
  if (billing) {
    const totalCost = calculateBilling(billing.start_time, endTime);
    await db.run(
      'UPDATE billing SET end_time = ?, total_cost = ? WHERE id = ?',
      [endTime, totalCost, id]
    );
    res.json({ id, total_cost: totalCost, end_time: endTime });
  } else {
    res.status(404).json({ error: 'Billing record not found' });
  }
};
