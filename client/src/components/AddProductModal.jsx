import React, { useState } from 'react';

const CATEGORIES = ['Electronics', 'Clothing', 'Food', 'Tools', 'Sports', 'Other'];

export default function AddProductModal({ onClose, onAdd, categories }) {
  const allCats = categories.length > 0 ? categories : CATEGORIES;
  const [form, setForm] = useState({
    name: '', category: allCats[0], quantity: '', price: '', sku: '',
  });

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onAdd({
      ...form,
      quantity: parseInt(form.quantity, 10),
      price: parseFloat(form.price),
    });
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md">
        <div className="flex items-center justify-between px-6 py-4 border-b">
          <h2 className="text-lg font-bold text-gray-800">Add New Product</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 text-2xl leading-none">&times;</button>
        </div>
        <form onSubmit={handleSubmit} className="px-6 py-5 space-y-4">
          {[
            { label: 'Product Name', name: 'name', type: 'text', placeholder: 'e.g. Wireless Mouse' },
            { label: 'SKU', name: 'sku', type: 'text', placeholder: 'e.g. ELEC-006' },
            { label: 'Quantity', name: 'quantity', type: 'number', placeholder: '0', min: '0' },
            { label: 'Price ($)', name: 'price', type: 'number', placeholder: '0.00', step: '0.01', min: '0' },
          ].map((f) => (
            <div key={f.name}>
              <label className="block text-sm font-medium text-gray-700 mb-1">{f.label}</label>
              <input
                required
                {...f}
                value={form[f.name]}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 text-sm"
              />
            </div>
          ))}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
            <select
              name="category"
              value={form.category}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 text-sm"
            >
              {allCats.map((c) => <option key={c}>{c}</option>)}
              <option value="Other">Other</option>
            </select>
          </div>
          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 border border-gray-300 text-gray-700 rounded-lg py-2 hover:bg-gray-50 transition font-medium"
            >Cancel</button>
            <button
              type="submit"
              className="flex-1 bg-blue-600 hover:bg-blue-700 text-white rounded-lg py-2 transition font-semibold"
            >Add Product</button>
          </div>
        </form>
      </div>
    </div>
  );
}
