const { initializeDatabase } = require('../config');

exports.getProductOrders = async (req, res) => {
  const db = await initializeDatabase();
  try {
    const orders = await db.all('SELECT * FROM product_orders');
    res.json(orders);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.createProductOrder = async (req, res) => {
  try {
    const { items } = req.body;
    if (!items || !Array.isArray(items)) {
      return res.status(400).json({ error: 'Invalid request body' });
    }

    const db = await initializeDatabase();
    let totalCost = 0;
    const orderItems = [];

    for (const item of items) {
      const product = await db.get('SELECT * FROM products WHERE id = ?', [item.product_id]);
      if (!product) {
        return res.status(404).json({ error: `Product not found for id: ${item.product_id}` });
      }
      totalCost += product.price * item.quantity;
      orderItems.push({
        product_id: item.product_id,
        quantity: item.quantity,
        price: product.price,
      });

      await db.run('UPDATE products SET quantity = quantity - ? WHERE id = ?', [item.quantity, item.product_id]);
    }

    const result = await db.run('INSERT INTO product_orders (total_items, total_cost) VALUES (?, ?)', [
      JSON.stringify(orderItems),
      totalCost,
    ]);

    const orderId = result.lastID;
    for (const orderItem of orderItems) {
      await db.run('INSERT INTO order_items (order_id, product_id, quantity, price) VALUES (?, ?, ?, ?)', [
        orderId,
        orderItem.product_id,
        orderItem.quantity,
        orderItem.price,
      ]);
    }

    res.status(201).json({ id: orderId, total_items: JSON.stringify(orderItems), total_cost: totalCost });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
