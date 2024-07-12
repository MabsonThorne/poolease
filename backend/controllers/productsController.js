const { initializeDatabase } = require('../config');

exports.getAllProducts = async (req, res) => {
  const db = await initializeDatabase();
  const products = await db.all('SELECT * FROM products');
  res.json(products);
};

exports.createProduct = async (req, res) => {
  const { image, name, price, quantity, cost_price, category } = req.body;
  const db = await initializeDatabase();
  const result = await db.run(
    'INSERT INTO products (image, name, price, quantity, cost_price, category) VALUES (?, ?, ?, ?, ?, ?)', 
    [image, name, price, quantity, cost_price, category]
  );
  res.status(201).json({ id: result.lastID });
};

exports.getProductById = async (req, res) => {
  const { id } = req.params;
  const db = await initializeDatabase();
  const product = await db.get('SELECT * FROM products WHERE id = ?', [id]);
  if (product) {
    res.json(product);
  } else {
    res.status(404).json({ error: 'Product not found' });
  }
};

exports.updateProduct = async (req, res) => {
  const { id } = req.params;
  const { image, name, price, quantity, cost_price, category } = req.body;
  const db = await initializeDatabase();
  const result = await db.run(
    'UPDATE products SET image = ?, name = ?, price = ?, quantity = ?, cost_price = ?, category = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?', 
    [image, name, price, quantity, cost_price, category, id]
  );
  if (result.changes > 0) {
    res.json({ message: 'Product updated successfully' });
  } else {
    res.status(404).json({ error: 'Product not found' });
  }
};

exports.deleteProduct = async (req, res) => {
  const { id } = req.params;
  const db = await initializeDatabase();
  const result = await db.run('DELETE FROM products WHERE id = ?', [id]);
  if (result.changes > 0) {
    res.json({ message: 'Product deleted successfully' });
  } else {
    res.status(404).json({ error: 'Product not found' });
  }
};
