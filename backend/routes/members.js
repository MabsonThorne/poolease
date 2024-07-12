const express = require('express');
const router = express.Router();
const { initializeDatabase } = require('../config');

router.get('/', async (req, res) => {
  const db = await initializeDatabase();
  const members = await db.all('SELECT * FROM members');
  res.json(members);
});

router.post('/', async (req, res) => {
  const { name, credit_limit, consumed_amount, remaining_credit, member_type, member_number, expired_at } = req.body;
  const db = await initializeDatabase();
  const result = await db.run(
    'INSERT INTO members (name, credit_limit, consumed_amount, remaining_credit, member_type, member_number, expired_at) VALUES (?, ?, ?, ?, ?, ?, ?)', 
    [name, credit_limit, consumed_amount, remaining_credit, member_type, member_number, expired_at]
  );
  res.status(201).json({ id: result.lastID });
});

router.get('/:id', async (req, res) => {
  const { id } = req.params;
  const db = await initializeDatabase();
  const member = await db.get('SELECT * FROM members WHERE id = ?', [id]);
  if (member) {
    res.json(member);
  } else {
    res.status(404).json({ error: 'Member not found' });
  }
});

router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { name, credit_limit, consumed_amount, remaining_credit, member_type, member_number, expired_at } = req.body;
  const db = await initializeDatabase();
  const result = await db.run(
    'UPDATE members SET name = ?, credit_limit = ?, consumed_amount = ?, remaining_credit = ?, member_type = ?, member_number = ?, expired_at = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?', 
    [name, credit_limit, consumed_amount, remaining_credit, member_type, member_number, expired_at, id]
  );
  if (result.changes > 0) {
    res.json({ message: 'Member updated successfully' });
  } else {
    res.status(404).json({ error: 'Member not found' });
  }
});

router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  const db = await initializeDatabase();
  const result = await db.run('DELETE FROM members WHERE id = ?', [id]);
  if (result.changes > 0) {
    res.json({ message: 'Member deleted successfully' });
  } else {
    res.status(404).json({ error: 'Member not found' });
  }
});

module.exports = router;
