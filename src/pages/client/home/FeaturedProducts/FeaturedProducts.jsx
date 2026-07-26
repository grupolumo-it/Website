import { useEffect, useState } from "react";
import { getProducts } from "../../../../services/productService";
import ProductCard from "../../../../components/common/ProductCard/ProductCard";

const demo = {
  id: 1,
  name: "Lumo Smart Hub",
  description: "El corazón de tu hogar inteligente.",
  image_url:
    "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800",
  is_featured: true,
  product_prices: [
    {
      price: 299,
    },
  ]
  
};
const demo2 = {
  id: 2,
  name: "Lumo Smart Hub",
  description: "El corazón de tu hogar inteligente.",
  image_url:
    "",
  is_featured: true,
  product_prices: [
    {
      price: 299,
    },
  ]
  
};

export default function FeaturedProducts() {
  return (
    <section className="max-w-7xl mx-auto py-16">
      <div className="grid grid-cols-4 gap-8">
        <ProductCard product={demo} />
        <ProductCard product={demo2} />
      </div>
    </section>
  );
}