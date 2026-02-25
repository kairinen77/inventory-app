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
    ['BG-001', 'Catan',                           'Strategy',   42, 44.99],
    ['BG-002', 'Ticket to Ride',                  'Family',     35, 49.99],
    ['BG-003', 'Pandemic',                        'Strategy',   28, 39.99],
    ['BG-004', 'Codenames',                       'Party',      60, 19.99],
    ['BG-005', 'Carcassonne',                     'Family',     55, 34.99],
    ['BG-006', 'Splendor',                        'Strategy',   20, 29.99],
    ['BG-007', 'Exploding Kittens',               'Party',      75, 19.99],
    ['BG-008', 'Dixit',                           'Family',     30, 34.99],
    ['BG-009', 'Dominion',                        'Card Games', 18, 44.99],
    ['BG-010', 'Sequence',                        'Family',     45, 29.99],
    ['BG-011', 'Sorry!',                          "Children's", 50, 19.99],
    ['BG-012', 'Candy Land',                      "Children's", 65, 14.99],
    ['BG-013', 'Uno',                             'Card Games', 90,  9.99],
    ['BG-014', 'Jenga',                           'Family',     40, 19.99],
    ['BG-015', 'Monopoly',                        'Family',     38, 29.99],
    ['BG-016', 'Scrabble',                        'Family',     25, 24.99],
    ['BG-017', 'Clue',                            'Family',     32, 24.99],
    ['BG-018', 'Connect Four',                    "Children's", 48, 17.99],
    ['BG-019', 'Taboo',                           'Party',       8, 24.99],
    ['BG-020', 'Azul',                            'Strategy',   15, 39.99],
  ];
  const insertMany = db.transaction((items) => {
    for (const item of items) insert.run(...item);
  });
  insertMany(seed);
}

module.exports = db;
