const { initializeDatabase } = require('../config');

// 计费函数
function calculateBilling(startTime, endTime, dayRate = 18, nightRate = 20) {
  const start = new Date(startTime);
  const end = new Date(endTime);
  const durationInSeconds = (end - start) / 1000;

  const dayStartHour = 8;
  const dayEndHour = 24;

  let totalCost = 0;
  let current = new Date(start);

  while (current < end) {
    const currentHour = current.getHours();
    const rate = (currentHour >= dayStartHour && currentHour < dayEndHour) ? dayRate : nightRate;
    totalCost += rate / 3600;

    current = new Date(current.getTime() + 1000);
  }

  return Math.round(totalCost * 100) / 100;
}

exports.createOrder = async (req, res) => {
  try {
    const { table_id } = req.body;
    const db = await initializeDatabase();

    const table = await db.get('SELECT name FROM pool_tables WHERE id = ?', [table_id]);
    if (!table) {
      return res.status(400).json({ error: 'Table not found' });
    }

    const startTime = new Date().toISOString();
    const result = await db.run('INSERT INTO orders (table_id, start_time) VALUES (?, ?)', [table_id, startTime]);
    await db.run('UPDATE pool_tables SET status = 1 WHERE name = ?', [table_id]);

    res.status(201).json({ id: result.lastID, start_time: startTime });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getCurrentOrder = async (req, res) => {
  const { table_id } = req.params;
  const db = await initializeDatabase();
  try {
    const order = await db.get('SELECT * FROM orders WHERE table_id = ? AND end_time IS NULL', [table_id]);
    if (order) {
      const items = await db.all('SELECT * FROM order_items WHERE order_id = ?', [order.id]);
      const tableCost = calculateBilling(order.start_time, new Date());
      const productCost = items.reduce((total, item) => total + item.price * item.quantity, 0);
      const totalCost = tableCost + productCost;
      res.json({ ...order, table_cost: tableCost, total_cost: totalCost, items });
    } else {
      res.status(404).json({ error: 'Current order not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateOrder = async (req, res) => {
  const { id } = req.params;
  const { total_cost, total_items, is_paid } = req.body;
  const db = await initializeDatabase();
  try {
    const result = await db.run(
      'UPDATE orders SET total_cost = ?, total_items = ?, is_paid = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?',
      [total_cost, total_items, is_paid, id]
    );
    res.status(200).json({ message: 'Order updated successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getOrder = async (req, res) => {
  const { id } = req.params;
  const db = await initializeDatabase();
  try {
    const order = await db.get('SELECT * FROM orders WHERE id = ?', [id]);
    if (order) {
      const items = await db.all('SELECT * FROM order_items WHERE order_id = ?', [id]);
      res.json({ ...order, items });
    } else {
      res.status(404).json({ error: 'Order not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.addItemToOrder = async (req, res) => {
  const { order_id, items } = req.body;
  if (!order_id || !items || !Array.isArray(items)) {
    return res.status(400).json({ error: 'Invalid request body' });
  }

  const db = await initializeDatabase();
  try {
    let totalProductCost = 0;
    let totalItems = [];

    const order = await db.get('SELECT total_items FROM orders WHERE id = ?', [order_id]);
    if (order.total_items) {
      totalItems = JSON.parse(order.total_items);
    }

    for (const item of items) {
      if (!item.product_id || !item.quantity) {
        return res.status(400).json({ error: 'Invalid item in request body' });
      }

      const product = await db.get('SELECT * FROM products WHERE id = ?', [item.product_id]);
      if (!product) {
        return res.status(404).json({ error: 'Product not found' });
      }

      const newQuantity = product.quantity - item.quantity;
      await db.run('UPDATE products SET quantity = ? WHERE id = ?', [newQuantity, item.product_id]);

      totalProductCost += product.price * item.quantity;

      const existingTotalItem = totalItems.find(i => i.product_id === item.product_id);
      if (existingTotalItem) {
        existingTotalItem.quantity += item.quantity;
      } else {
        totalItems.push({ product_id: item.product_id, quantity: item.quantity });
      }

      const existingOrderItem = await db.get('SELECT * FROM order_items WHERE order_id = ? AND product_id = ?', [order_id, item.product_id]);
      if (existingOrderItem) {
        await db.run('UPDATE order_items SET quantity = quantity + ? WHERE order_id = ? AND product_id = ?', [item.quantity, order_id, item.product_id]);
      } else {
        await db.run('INSERT INTO order_items (order_id, product_id, quantity, price) VALUES (?, ?, ?, ?)', [order_id, item.product_id, item.quantity, product.price]);
      }
    }

    await db.run(
      'UPDATE orders SET product_cost = product_cost + ?, total_items = ? WHERE id = ?',
      [totalProductCost, JSON.stringify(totalItems), order_id]
    );

    res.status(201).json({ message: 'Items added to order successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.transferOrder = async (req, res) => {
  const { id } = req.params;
  const { new_table_id } = req.body;
  const db = await initializeDatabase();
  try {
    const result = await db.run(
      'UPDATE orders SET table_id = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?',
      [new_table_id, id]
    );
    res.status(200).json({ message: 'Order transferred successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getAllOrders = async (req, res) => {
  const db = await initializeDatabase();
  try {
    const orders = await db.all('SELECT * FROM orders');
    res.json(orders);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.checkoutOrder = async (req, res) => {
  const { id } = req.params;
  const db = await initializeDatabase();
  const endTime = new Date().toISOString();
  try {
    const order = await db.get('SELECT * FROM orders WHERE id = ?', [id]);
    if (order) {
      const tableCost = calculateBilling(order.start_time, endTime);
      const items = await db.all('SELECT * FROM order_items WHERE order_id = ?', [id]);
      const productCost = items.reduce((total, item) => total + item.price * item.quantity, 0);
      const totalCost = tableCost + productCost;
      await db.run('UPDATE orders SET end_time = ?, table_cost = ?, product_cost = ?, total_cost = ?, is_paid = 1 WHERE id = ?', [endTime, tableCost, productCost, totalCost, id]);
      await db.run('UPDATE pool_tables SET status = 0 WHERE name = ?', [order.table_id]);
      res.json({ id, table_cost: tableCost, product_cost: productCost, total_cost: totalCost, end_time: endTime });
    } else {
      res.status(404).json({ error: 'Order not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateTableStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    const db = await initializeDatabase();
    const now = new Date().toISOString();

    const result = await db.run('UPDATE pool_tables SET status = ?, updated_at = ? WHERE name = ?', [status, now, table_id]);

    if (result.changes === 0) {
      res.status(404).json({ error: 'Table not found' });
    } else {
      res.json({ message: `Table with id ${id} updated successfully` });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.startBilling = async (req, res) => {
  try {
    const { table_id, table_type } = req.body;
    const startTime = new Date().toISOString();
    const db = await initializeDatabase();

    // 使用 table_id 查找表的名称
    const table = await db.get('SELECT name FROM pool_tables WHERE id = ?', [table_id]);
    if (!table) {
      return res.status(404).json({ error: 'Table not found' });
    }

    // 插入新的计费记录
    const result = await db.run('INSERT INTO billing (table_id, start_time, table_type) VALUES (?, ?, ?)', [table_id, startTime, table_type]);
    
    // 更新 pool_tables 的状态
    await db.run('UPDATE pool_tables SET status = 1 WHERE name = ?', [table_id]);

    res.status(201).json({ id: result.lastID, start_time: startTime });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.endBilling = async (req, res) => {
  try {
    const { id } = req.params;
    const endTime = new Date().toISOString();
    const db = await initializeDatabase();
    const billing = await db.get('SELECT * FROM billing WHERE id = ?', [id]);
    if (billing) {
      const totalCost = calculateBilling(billing.start_time, endTime);
      await db.run('UPDATE billing SET end_time = ?, total_cost = ? WHERE id = ?', [endTime, totalCost, id]);
      await db.run('UPDATE pool_tables SET status = 0 WHERE name = ?', [billing.table_id]);
      res.json({ id, total_cost: totalCost, end_time: endTime });
    } else {
      res.status(404).json({ error: 'Billing record not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
