const { initializeDatabase } = require('../config');

exports.getAllMahjongTables = async (req, res) => {
  const db = await initializeDatabase();
  const tables = await db.all('SELECT * FROM mahjong_tables');
  res.json(tables);
};

exports.createMahjongTable = async (req, res) => {
  const { name } = req.body;
  const db = await initializeDatabase();
  const result = await db.run(
    'INSERT INTO mahjong_tables (name) VALUES (?)', 
    [name]
  );
  res.status(201).json({ id: result.lastID });
};

exports.getMahjongTableById = async (req, res) => {
  const { id } = req.params;
  const db = await initializeDatabase();
  const table = await db.get('SELECT * FROM mahjong_tables WHERE id = ?', [id]);
  if (table) {
    res.json(table);
  } else {
    res.status(404).json({ error: 'Mahjong table not found' });
  }
};

exports.updateMahjongTable = async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  const db = await initializeDatabase();
  const result = await db.run(
    'UPDATE mahjong_tables SET name = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?', 
    [name, id]
  );
  if (result.changes > 0) {
    res.json({ message: 'Mahjong table updated successfully' });
  } else {
    res.status(404).json({ error: 'Mahjong table not found' });
  }
};

exports.deleteMahjongTable = async (req, res) => {
  const { id } = req.params;
  const db = await initializeDatabase();
  const result = await db.run('DELETE FROM mahjong_tables WHERE id = ?', [id]);
  if (result.changes > 0) {
    res.json({ message: 'Mahjong table deleted successfully' });
  } else {
    res.status(404).json({ error: 'Mahjong table not found' });
  }
};


