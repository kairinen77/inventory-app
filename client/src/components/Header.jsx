import React from 'react';

export default function Header() {
  return (
    <header className="bg-gray-900 text-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center gap-3">
        <div className="bg-amber-500 rounded-lg p-2">
          {/* Dice icon */}
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <rect x="3" y="3" width="18" height="18" rx="3" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
            <circle cx="8.5" cy="8.5" r="1" fill="currentColor" />
            <circle cx="15.5" cy="8.5" r="1" fill="currentColor" />
            <circle cx="8.5" cy="15.5" r="1" fill="currentColor" />
            <circle cx="15.5" cy="15.5" r="1" fill="currentColor" />
            <circle cx="12" cy="12" r="1" fill="currentColor" />
          </svg>
        </div>
        <div>
          <h1 className="text-xl font-bold tracking-tight">FamilyPlay Games</h1>
          <p className="text-xs text-gray-400">Board Game Inventory</p>
        </div>
      </div>
    </header>
  );
}
