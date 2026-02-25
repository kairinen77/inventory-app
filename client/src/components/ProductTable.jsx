import React, { useState } from 'react';

function stockClass(qty) {
  if (qty < 10) return 'text-red-600 font-semibold';
  if (qty <= 30) return 'text-yellow-600 font-semibold';
  return 'text-green-600 font-semibold';
}

function stockBadge(qty) {
  if (qty < 10) return 'bg-red-100 text-red-700';
  if (qty <= 30) return 'bg-yellow-100 text-yellow-700';
  return 'bg-green-100 text-green-700';
}

export default function ProductTable({ products, onDelete, onUpdateQuantity }) {
  const [editingQty, setEditingQty] = useState({});

  const handleQtyInput = (id, val) => {
    setEditingQty((prev) => ({ ...prev, [id]: val }));
  };

  const commitQty = (id) => {
    const val = parseInt(editingQty[id], 10);
    if (!isNaN(val) && val >= 0) onUpdateQuantity(id, val);
    setEditingQty((prev) => { const n = { ...prev }; delete n[id]; return n; });
  };

  if (products.length === 0) {
    return (
      <div className="bg-white rounded-xl shadow-sm p-12 text-center text-gray-400">
        No products found.
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-sm overflow-hidden">
      <div className="overflow-x-auto">
        <table className="min-w-full text-sm">
          <thead className="bg-gray-100 text-gray-600 uppercase text-xs tracking-wider">
            <tr>
              {['SKU', 'Name', 'Category', 'Quantity', 'Price', 'Actions'].map((h) => (
                <th key={h} className="px-5 py-3 text-left">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {products.map((p) => (
              <tr key={p.id} className="hover:bg-gray-50 transition">
                <td className="px-5 py-3 font-mono text-gray-500">{p.sku}</td>
                <td className="px-5 py-3 font-medium text-gray-800">{p.name}</td>
                <td className="px-5 py-3">
                  <span className="bg-blue-100 text-blue-700 text-xs px-2 py-1 rounded-full">
                    {p.category}
                  </span>
                </td>
                <td className="px-5 py-3">
                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => onUpdateQuantity(p.id, p.quantity - 1)}
                      disabled={p.quantity <= 0}
                      className="w-7 h-7 rounded bg-gray-200 hover:bg-gray-300 font-bold text-gray-700 disabled:opacity-40 transition"
                    >−</button>
                    <input
                      type="number"
                      min="0"
                      value={editingQty[p.id] !== undefined ? editingQty[p.id] : p.quantity}
                      onChange={(e) => handleQtyInput(p.id, e.target.value)}
                      onBlur={() => commitQty(p.id)}
                      onKeyDown={(e) => e.key === 'Enter' && commitQty(p.id)}
                      className={`w-16 text-center border border-gray-300 rounded px-1 py-0.5 focus:outline-none focus:ring-1 focus:ring-blue-400 ${stockClass(p.quantity)}`}
                    />
                    <button
                      onClick={() => onUpdateQuantity(p.id, p.quantity + 1)}
                      className="w-7 h-7 rounded bg-gray-200 hover:bg-gray-300 font-bold text-gray-700 transition"
                    >+</button>
                    <span className={`ml-2 text-xs px-2 py-0.5 rounded-full ${stockBadge(p.quantity)}`}>
                      {p.quantity < 10 ? 'Low' : p.quantity <= 30 ? 'Med' : 'OK'}
                    </span>
                  </div>
                </td>
                <td className="px-5 py-3 text-gray-700">${p.price.toFixed(2)}</td>
                <td className="px-5 py-3">
                  <button
                    onClick={() => onDelete(p.id)}
                    className="text-red-500 hover:text-red-700 hover:bg-red-50 px-3 py-1 rounded transition text-xs font-semibold"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
