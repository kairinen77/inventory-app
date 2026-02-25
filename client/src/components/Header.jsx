import React from 'react';

export default function Header() {
  return (
    <header className="bg-gray-900 text-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center gap-3">
        <div className="bg-blue-500 rounded-lg p-2">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
              d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10" />
          </svg>
        </div>
        <div>
          <h1 className="text-xl font-bold tracking-tight">Inventory Manager</h1>
          <p className="text-xs text-gray-400">Track and manage your stock</p>
        </div>
      </div>
    </header>
  );
}
