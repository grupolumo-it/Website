import { useEffect, useState } from "react";
import { getProducts } from "../../../../services/productService";
import ProductCard from "../../../../components/common/ProductCard/ProductCard";

export default function FeaturedProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadProducts();
  }, []);

  async function loadProducts() {
    try {
      const data = await getProducts();

      console.log("Productos:", data);

      setProducts(data);
    } catch (error) {
      console.error("Error obteniendo productos:", error);
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <section className="max-w-7xl mx-auto py-0">
        <p>Cargando productos...</p>
      </section>
    );
  }

  return (
    <section className="max-w-6xl mx-auto py-0">

      <div className="flex justify-between items-center mb-8">

        <h2 className="text-3xl font-bold text-[#1D2559]">
          Productos Destacados
        </h2>

      </div>

      <div className="grid grid-cols-4 gap-8">
        {products.slice(0, 4).map((product) => (
            <ProductCard
            key={product.id}
            product={product}
            />
        ))}
        </div>


    </section>
  );
}