import React, { useState, useEffect } from 'react';
import Header from './components/Header.jsx';
import ProductTable from './components/ProductTable.jsx';
import AddProductModal from './components/AddProductModal.jsx';

const API = 'http://localhost:3001/api';

export default function App() {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(true);

  const fetchProducts = async () => {
    try {
      const res = await fetch(`${API}/products`);
      const data = await res.json();
      setProducts(data);
    } catch (err) {
      console.error('Failed to fetch products', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchProducts(); }, []);

  const addProduct = async (product) => {
    const res = await fetch(`${API}/products`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(product),
    });
    if (res.ok) {
      await fetchProducts();
      setShowModal(false);
    } else {
      const err = await res.json();
      alert(err.error || 'Failed to add product');
    }
  };

  const deleteProduct = async (id) => {
    if (!window.confirm('Delete this product?')) return;
    await fetch(`${API}/products/${id}`, { method: 'DELETE' });
    setProducts((prev) => prev.filter((p) => p.id !== id));
  };

  const updateQuantity = async (id, quantity) => {
    if (quantity < 0) return;
    const res = await fetch(`${API}/products/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ quantity }),
    });
    if (res.ok) {
      const updated = await res.json();
      setProducts((prev) => prev.map((p) => (p.id === id ? updated : p)));
    }
  };

  const categories = ['All', ...new Set(products.map((p) => p.category))];

  const filtered = products.filter((p) => {
    const matchSearch =
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.category.toLowerCase().includes(search.toLowerCase());
    const matchCat = categoryFilter === 'All' || p.category === categoryFilter;
    return matchSearch && matchCat;
  });

  const totalItems = products.reduce((s, p) => s + p.quantity, 0);
  const lowStock = products.filter((p) => p.quantity < 10).length;
  const totalValue = products.reduce((s, p) => s + p.price * p.quantity, 0);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="max-w-7xl mx-auto px-4 py-6">
        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          {[
            { label: 'Total Products', value: products.length, color: 'bg-blue-500' },
            { label: 'Total Items', value: totalItems.toLocaleString(), color: 'bg-green-500' },
            { label: 'Low Stock', value: lowStock, color: 'bg-red-500' },
            { label: 'Total Value', value: `$${totalValue.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`, color: 'bg-purple-500' },
          ].map((s) => (
            <div key={s.label} className="bg-white rounded-xl shadow-sm p-4 flex items-center gap-4">
              <div className={`${s.color} w-12 h-12 rounded-lg flex items-center justify-center text-white text-xl font-bold shrink-0`}>
                {typeof s.value === 'number' ? s.value : s.value[0]}
              </div>
              <div>
                <p className="text-sm text-gray-500">{s.label}</p>
                <p className="text-xl font-semibold text-gray-800">{s.value}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Controls */}
        <div className="flex flex-col sm:flex-row gap-3 mb-4">
          <input
            type="text"
            placeholder="Search by name or category…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="flex-1 border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            {categories.map((c) => <option key={c}>{c}</option>)}
          </select>
          <button
            onClick={() => setShowModal(true)}
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-5 py-2 rounded-lg transition"
          >
            + Add Product
          </button>
        </div>

        {loading ? (
          <div className="text-center py-12 text-gray-500">Loading…</div>
        ) : (
          <ProductTable
            products={filtered}
            onDelete={deleteProduct}
            onUpdateQuantity={updateQuantity}
          />
        )}
      </main>

      {showModal && (
        <AddProductModal
          onClose={() => setShowModal(false)}
          onAdd={addProduct}
          categories={categories.filter((c) => c !== 'All')}
        />
      )}
    </div>
  );
}
