import { ShoppingCart } from "lucide-react";
import { Link } from "react-router-dom";

export default function ProductCard({ product }) {

  const {
    name,
    image,
    description,
    price,
    currency,
    badge,
    featured,
  } = product;

  const formattedPrice = new Intl.NumberFormat("es-CO", {
    style: "currency",
    currency: currency || "COP",
    maximumFractionDigits: 0,
  }).format(price);
  

  return (
    <div className="bg-white rounded-3xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden group">

      {/* Imagen */}      

      <div className="relative overflow-hidden">
        <Link to={`/products/${product.slug}`}>
          <img 
            src={image}
            alt={name}
            className="w-full h-64 object-cover group-hover:scale-105 transition cursor-pointer duration-500"
          />
        </Link>

        {  featured && badge && (
          <span className="absolute top-4 left-4 bg-[#1D2559] text-white text-xs px-3 py-1 rounded-full">
            {badge}
          </span>
        )}

      </div>

      {/*Información*/}

      <div className="p-5">
        <Link to={`/products/${product.slug}`}>
          <h3 className="text-xl font-semibold text-[#1D2559] line-clamp-1">
            {name}
          </h3>
        </Link>

        <p className="text-gray-500 mt-2 line-clamp-2 text-sm">
          {description}
        </p>

        <div className="mt-5 flex justify-between items-center">

          <span className="text-2xl font-bold text-[#1D2559]">
            {formattedPrice}
          </span>

          <button
            className="bg-[#1D2559] hover:bg-[#303A80] text-white rounded-full p-3 cursor-pointer transition"
          >
            <ShoppingCart size={18} />
          </button>

        </div>

      </div>

    </div>
  );
} 