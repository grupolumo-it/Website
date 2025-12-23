"use client";

import { useState } from "react";
import ProductFilters from "./ProductFilters";
import ProductGrid from "./ProductGrid";

const mockProducts = [
  {
    id: 1,
    name: "LUMO Glow Serum",
    category: "Skincare",
    price: 65.0,
    inStock: true,
    imageUrl: "/assets/images/no_image.png",
    rating: 4.8,
    reviews: 124,
  },
  {
    id: 2,
    name: "LUMO Hydrate Moisturizer",
    category: "Skincare",
    price: 50.0,
    inStock: true,
    imageUrl: "/assets/images/no_image.png",
    rating: 4.9,
    reviews: 250,
  },
  {
    id: 3,
    name: "LUMO Shine Shampoo",
    category: "Haircare",
    price: 30.0,
    inStock: false,
    imageUrl: "/assets/images/no_image.png",
    rating: 4.5,
    reviews: 98,
  },
  {
    id: 4,
    name: "LUMO Silk Conditioner",
    category: "Haircare",
    price: 32.0,
    inStock: true,
    imageUrl: "/assets/images/no_image.png",
    rating: 4.6,
    reviews: 87,
  },
  {
    id: 5,
    name: "LUMO Vitamin C Boost",
    category: "Supplements",
    price: 45.0,
    inStock: true,
    imageUrl: "/assets/images/no_image.png",
    rating: 4.7,
    reviews: 312,
  },
  {
    id: 6,
    name: "LUMO Collagen Peptides",
    category: "Supplements",
    price: 55.0,
    inStock: false,
    imageUrl: "/assets/images/no_image.png",
    rating: 4.8,
    reviews: 180,
  },
];

export default function ProductsInteractive() {
  const [filteredProducts, setFilteredProducts] = useState(mockProducts);

  const handleFilterChange = (filters) => {
    let tempProducts = [...mockProducts];

    if (filters.category && filters.category !== "all") {
      tempProducts = tempProducts.filter(
        (p) => p.category.toLowerCase() === filters.category.toLowerCase()
      );
    }

    if (filters.inStockOnly) {
      tempProducts = tempProducts.filter((p) => p.inStock);
    }

    setFilteredProducts(tempProducts);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
      <div className="lg:col-span-1">
        <ProductFilters onFilterChange={handleFilterChange} />
      </div>
      <div className="lg:col-span-3">
        <ProductGrid products={filteredProducts} />
      </div>
    </div>
  );
}
