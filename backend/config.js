const sqlite3 = require('sqlite3').verbose();
const { open } = require('sqlite');

let dbInstance = null;

async function initializeDatabase(rebuild = false) {
  if (dbInstance && !rebuild) {
    return dbInstance;
  }

  const db = await open({
    filename: './database.sqlite',
    driver: sqlite3.Database
  });

  await db.exec('PRAGMA encoding = "UTF-8";');

  if (rebuild) {
    await db.exec('DROP TABLE IF EXISTS products');
    await db.exec('DROP TABLE IF EXISTS pool_tables');
    await db.exec('DROP TABLE IF EXISTS mahjong_tables');
    await db.exec('DROP TABLE IF EXISTS members');
    await db.exec('DROP TABLE IF EXISTS employees');
    await db.exec('DROP TABLE IF EXISTS billing');
    await db.exec('DROP TABLE IF EXISTS orders');
    await db.exec('DROP TABLE IF EXISTS product_orders');
    await db.exec('DROP TABLE IF EXISTS order_items');
  }

  await db.exec(`
    CREATE TABLE IF NOT EXISTS products (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      image TEXT,
      name TEXT,
      price REAL,
      quantity INTEGER,
      cost_price REAL,
      category TEXT,
      created_at TEXT DEFAULT CURRENT_TIMESTAMP,
      updated_at TEXT DEFAULT CURRENT_TIMESTAMP
    )
  `);

  await db.exec(`
    CREATE TABLE IF NOT EXISTS pool_tables (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT,
      status INTEGER DEFAULT 0,
      interface TEXT,
      created_at TEXT DEFAULT NULL,
      updated_at TEXT DEFAULT NULL
    )
  `);

  await db.exec(`
    CREATE TABLE IF NOT EXISTS mahjong_tables (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT,
      created_at TEXT DEFAULT CURRENT_TIMESTAMP,
      updated_at TEXT DEFAULT CURRENT_TIMESTAMP
    )
  `);

  await db.exec(`
    CREATE TABLE IF NOT EXISTS members (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT,
      credit_limit REAL,
      consumed_amount REAL,
      remaining_credit REAL,
      member_type TEXT CHECK(member_type IN ('ordinary', 'prestige')),
      member_number TEXT UNIQUE,
      created_at TEXT DEFAULT CURRENT_TIMESTAMP,
      expired_at TEXT
    )
  `);

  await db.exec(`
    CREATE TABLE IF NOT EXISTS employees (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT,
      start_date TEXT,
      end_date TEXT,
      salary REAL,
      created_at TEXT DEFAULT CURRENT_TIMESTAMP,
      updated_at TEXT DEFAULT CURRENT_TIMESTAMP
    )
  `);

  await db.exec(`
    CREATE TABLE IF NOT EXISTS billing (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      table_id INTEGER,
      start_time TEXT,
      end_time TEXT,
      total_cost REAL,
      table_type TEXT,
      FOREIGN KEY(table_id) REFERENCES pool_tables(id),
      FOREIGN KEY(table_id) REFERENCES mahjong_tables(id)
    )
  `);

  await db.exec(`
    CREATE TABLE IF NOT EXISTS orders (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      table_id INTEGER,
      start_time TEXT,
      end_time TEXT,
      total_cost REAL DEFAULT 0,
      table_cost REAL DEFAULT 0,
      product_cost REAL DEFAULT 0,
      total_items TEXT DEFAULT '',
      is_paid INTEGER DEFAULT 0,
      FOREIGN KEY(table_id) REFERENCES pool_tables(id)
    )
  `);

  // Create product_orders table
  await db.exec(`
    CREATE TABLE IF NOT EXISTS product_orders (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      total_items TEXT,
      total_cost REAL,
      created_at TEXT DEFAULT CURRENT_TIMESTAMP
    )
  `);

  // Create order_items table to store individual items in an order
  await db.exec(`
    CREATE TABLE IF NOT EXISTS order_items (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      order_id INTEGER,
      product_id INTEGER,
      quantity INTEGER,
      price REAL,
      FOREIGN KEY(order_id) REFERENCES product_orders(id),
      FOREIGN KEY(product_id) REFERENCES products(id)
    )
  `);

  dbInstance = db;
  return db;
}

module.exports = { initializeDatabase };
