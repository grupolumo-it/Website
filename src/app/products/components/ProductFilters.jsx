"use client";

import { useState, useEffect } from "react";

export default function ProductFilters({ onFilterChange }) {
  const [category, setCategory] = useState("all");
  const [inStockOnly, setInStockOnly] = useState(false);

  useEffect(() => {
    onFilterChange({ category, inStockOnly });
  }, [category, inStockOnly, onFilterChange]);

  return (
    <div className="bg-gray-50 p-6 rounded-lg shadow-sm">
      <h3 className="font-bold text-lg mb-4 border-b pb-2">Filters</h3>
      <div className="space-y-4">
        <div>
          <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
            Category
          </label>
          <select
            id="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="all">All</option>
            <option value="Skincare">Skincare</option>
            <option value="Haircare">Haircare</option>
            <option value="Supplements">Supplements</option>
          </select>
        </div>
        <div className="flex items-center">
          <input
            id="inStock"
            type="checkbox"
            checked={inStockOnly}
            onChange={(e) => setInStockOnly(e.target.checked)}
            className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
          />
          <label htmlFor="inStock" className="ml-2 block text-sm text-gray-900">
            Show in-stock only
          </label>
        </div>
      </div>
    </div>
  );
}
