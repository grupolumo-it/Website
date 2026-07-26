import { ShoppingCart } from "lucide-react";

export default function ProductCard({ product }) {
  const image =
    product.product_images?.[0]?.image_url ||
    product.image_url ||
    "https://placehold.co/600x600?text=Lumo";

  const price =
    product.product_prices?.[0]?.price ?? 0;

  return (
    <div className="bg-white rounded-3xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden group">

      {/* Imagen */}      

      <div className="relative overflow-hidden">

        <img
          src={image}
          alt={product.name}
          className="w-full h-64 object-cover group-hover:scale-105 transition cursor-pointer duration-500"
        />

        {product.is_featured && (
          <span className="absolute top-4 left-4 bg-[#1D2559] text-white text-xs px-3 py-1 rounded-full">
            DESTACADO
          </span>
        )}

      </div>

      {/*Información*/}

      <div className="p-5">

        <h3 className="text-xl font-semibold text-[#1D2559] line-clamp-1">
          {product.name}
        </h3>

        <p className="text-gray-500 mt-2 line-clamp-2 text-sm">
          {product.description}
        </p>

        <div className="mt-5 flex justify-between items-center">

          <span className="text-2xl font-bold text-[#1D2559]">
            ${price}
          </span>

          <button
            className="bg-[#1D2559] hover:bg-[#303A80] text-white rounded-full p-3 transition"
          >
            <ShoppingCart size={18} />
          </button>

        </div>

      </div>

    </div>
  );
} 