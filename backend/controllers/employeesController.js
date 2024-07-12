const { initializeDatabase } = require('../config');

exports.getAllEmployees = async (req, res) => {
  const db = await initializeDatabase();
  const employees = await db.all('SELECT * FROM employees');
  res.json(employees);
};

exports.createEmployee = async (req, res) => {
  const { name, start_date, end_date, salary } = req.body;
  const db = await initializeDatabase();
  const result = await db.run(
    'INSERT INTO employees (name, start_date, end_date, salary) VALUES (?, ?, ?, ?)', 
    [name, start_date, end_date, salary]
  );
  res.status(201).json({ id: result.lastID });
};

exports.getEmployeeById = async (req, res) => {
  const { id } = req.params;
  const db = await initializeDatabase();
  const employee = await db.get('SELECT * FROM employees WHERE id = ?', [id]);
  if (employee) {
    res.json(employee);
  } else {
    res.status(404).json({ error: 'Employee not found' });
  }
};

exports.updateEmployee = async (req, res) => {
  const { id } = req.params;
  const { name, start_date, end_date, salary } = req.body;
  const db = await initializeDatabase();
  const result = await db.run(
    'UPDATE employees SET name = ?, start_date = ?, end_date = ?, salary = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?', 
    [name, start_date, end_date, salary, id]
  );
  if (result.changes > 0) {
    res.json({ message: 'Employee updated successfully' });
  } else {
    res.status(404).json({ error: 'Employee not found' });
  }
};

exports.deleteEmployee = async (req, res) => {
  const { id } = req.params;
  const db = await initializeDatabase();
  const result = await db.run('DELETE FROM employees WHERE id = ?', [id]);
  if (result.changes > 0) {
    res.json({ message: 'Employee deleted successfully' });
  } else {
    res.status(404).json({ error: 'Employee not found' });
  }
};
