const express = require('express');
const cors = require('cors');
const path = require('path');
const db = require('./db');

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

// Serve static files in production
app.use(express.static(path.join(__dirname, '../client/dist')));

// GET all products
app.get('/api/products', (req, res) => {
  const products = db.prepare('SELECT * FROM products ORDER BY id ASC').all();
  res.json(products);
});

// POST new product
app.post('/api/products', (req, res) => {
  const { name, category, quantity, price, sku } = req.body;
  if (!name || !category || quantity == null || !price || !sku) {
    return res.status(400).json({ error: 'All fields are required' });
  }
  try {
    const stmt = db.prepare(
      'INSERT INTO products (sku, name, category, quantity, price) VALUES (?, ?, ?, ?, ?)'
    );
    const result = stmt.run(sku, name, category, quantity, price);
    const product = db.prepare('SELECT * FROM products WHERE id = ?').get(result.lastInsertRowid);
    res.status(201).json(product);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// PUT update product
app.put('/api/products/:id', (req, res) => {
  const { id } = req.params;
  const { name, category, quantity, price, sku } = req.body;
  const existing = db.prepare('SELECT * FROM products WHERE id = ?').get(id);
  if (!existing) return res.status(404).json({ error: 'Product not found' });
  try {
    db.prepare(
      'UPDATE products SET sku=?, name=?, category=?, quantity=?, price=? WHERE id=?'
    ).run(
      sku ?? existing.sku,
      name ?? existing.name,
      category ?? existing.category,
      quantity ?? existing.quantity,
      price ?? existing.price,
      id
    );
    const updated = db.prepare('SELECT * FROM products WHERE id = ?').get(id);
    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// DELETE product
app.delete('/api/products/:id', (req, res) => {
  const { id } = req.params;
  const existing = db.prepare('SELECT * FROM products WHERE id = ?').get(id);
  if (!existing) return res.status(404).json({ error: 'Product not found' });
  db.prepare('DELETE FROM products WHERE id = ?').run(id);
  res.json({ success: true });
});

// SPA fallback
app.get('*', (req, res) => {
  const distIndex = path.join(__dirname, '../client/dist/index.html');
  const fs = require('fs');
  if (fs.existsSync(distIndex)) {
    res.sendFile(distIndex);
  } else {
    res.status(404).json({ error: 'Client not built' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
