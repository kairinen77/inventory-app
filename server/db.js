const Database = require('better-sqlite3');
const path = require('path');

const db = new Database(path.join(__dirname, 'inventory.db'));

db.exec(`
  CREATE TABLE IF NOT EXISTS products (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    sku TEXT NOT NULL UNIQUE,
    name TEXT NOT NULL,
    category TEXT NOT NULL,
    quantity INTEGER NOT NULL DEFAULT 0,
    price REAL NOT NULL DEFAULT 0
  )
`);

const count = db.prepare('SELECT COUNT(*) as cnt FROM products').get();
if (count.cnt === 0) {
  const insert = db.prepare(
    'INSERT INTO products (sku, name, category, quantity, price) VALUES (?, ?, ?, ?, ?)'
  );
  const seed = [
    ['ELEC-001', 'Wireless Bluetooth Headphones', 'Electronics', 45, 79.99],
    ['ELEC-002', 'USB-C Charging Cable (6ft)', 'Electronics', 120, 12.99],
    ['ELEC-003', '4K Webcam', 'Electronics', 18, 129.99],
    ['ELEC-004', 'Mechanical Keyboard', 'Electronics', 30, 89.99],
    ['ELEC-005', 'Portable Power Bank 20000mAh', 'Electronics', 55, 49.99],
    ['CLTH-001', 'Men\'s Running Shorts', 'Clothing', 75, 29.99],
    ['CLTH-002', 'Women\'s Yoga Pants', 'Clothing', 60, 44.99],
    ['CLTH-003', 'Unisex Hooded Sweatshirt', 'Clothing', 40, 39.99],
    ['CLTH-004', 'Cotton T-Shirt Pack (3)', 'Clothing', 8, 24.99],
    ['FOOD-001', 'Organic Granola Bars (12-pack)', 'Food', 200, 14.99],
    ['FOOD-002', 'Cold Brew Coffee Concentrate', 'Food', 85, 11.99],
    ['FOOD-003', 'Protein Powder - Vanilla (2lb)', 'Food', 25, 34.99],
    ['FOOD-004', 'Assorted Nuts Mix (1lb)', 'Food', 6, 9.99],
    ['TOOL-001', 'Cordless Drill Set', 'Tools', 15, 119.99],
    ['TOOL-002', 'Adjustable Wrench Set', 'Tools', 22, 34.99],
    ['TOOL-003', 'Digital Multimeter', 'Tools', 12, 24.99],
    ['TOOL-004', 'Tape Measure 25ft', 'Tools', 50, 12.99],
    ['SPRT-001', 'Yoga Mat with Strap', 'Sports', 35, 27.99],
    ['SPRT-002', 'Resistance Bands Set', 'Sports', 7, 19.99],
    ['SPRT-003', 'Foam Roller - High Density', 'Sports', 28, 22.99],
  ];
  const insertMany = db.transaction((items) => {
    for (const item of items) insert.run(...item);
  });
  insertMany(seed);
}

module.exports = db;
