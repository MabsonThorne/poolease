const { initializeDatabase } = require('../config');

exports.getAllPoolTables = async (req, res) => {
  try {
    const db = await initializeDatabase();
    const tables = await db.all('SELECT * FROM pool_tables');
    res.json(tables);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.createOrUpdatePoolTable = async (req, res) => {
  try {
    const { name, status = 0, interface } = req.body;
    const db = await initializeDatabase();

    const existingTable = await db.get('SELECT * FROM pool_tables WHERE name = ?', [name]);

    if (existingTable) {
      await db.run('UPDATE pool_tables SET interface = ?, updated_at = CURRENT_TIMESTAMP WHERE name = ?', [interface, name]);
      res.json({ message: `Table with name ${name} updated successfully` });
    } else {
      const now = new Date().toISOString();
      await db.run('INSERT INTO pool_tables (name, status, interface, created_at) VALUES (?, ?, ?, ?)', [name, status, interface, now]);
      res.status(201).json({ message: `Table with name ${name} created successfully` });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.switchTable = async (req, res) => {
  try {
    const { currentTableId, newTableId } = req.body;
    const db = await initializeDatabase();

    const currentTable = await db.get('SELECT id FROM pool_tables WHERE name = ?', [currentTableId]);
    if (!currentTable) {
      return res.status(404).json({ error: 'Current table not found' });
    }

    const newTable = await db.get('SELECT id FROM pool_tables WHERE name = ?', [newTableId]);
    if (!newTable) {
      return res.status(404).json({ error: 'New table not found' });
    }

    await db.run('UPDATE pool_tables SET status = 0 WHERE id = ?', [currentTable.id]);
    await db.run('UPDATE pool_tables SET status = 1 WHERE id = ?', [newTable.id]);

    await db.run('UPDATE orders SET table_id = (SELECT id FROM pool_tables WHERE name = ?) WHERE table_id = (SELECT id FROM pool_tables WHERE name = ?)', [newTableId, currentTableId]);

    res.json({ message: 'Table switched successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteAllPoolTables = async (req, res) => {
  try {
    const db = await initializeDatabase();
    await db.run('DELETE FROM pool_tables');
    res.json({ message: 'All pool tables deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deletePoolTable = async (req, res) => {
  try {
    const { id } = req.params;
    const db = await initializeDatabase();
    await db.run('DELETE FROM pool_tables WHERE id = ?', [id]);
    res.json({ message: `Table with id ${id} deleted successfully` });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getAvailableTables = async (req, res) => {
  try {
    const db = await initializeDatabase();
    const tables = await db.all('SELECT * FROM pool_tables WHERE status = 0');
    res.json(tables);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};