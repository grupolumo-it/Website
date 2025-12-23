import AppImage from "@/components/ui/AppImage";
import { Star, ShoppingCart } from "lucide-react";

export default function ProductCard({ product }) {
  const { name, imageUrl, price, inStock, rating, reviews, category } = product;

  return (
    <div className="border rounded-lg overflow-hidden shadow-sm hover:shadow-lg transition-shadow duration-300 bg-white">
      <div className="relative">
        <AppImage
          src={imageUrl}
          alt={name}
          width={400}
          height={400}
          className="object-cover w-full h-56"
        />
        {!inStock && (
          <div className="absolute top-2 left-2 bg-gray-800 text-white text-xs font-bold px-2 py-1 rounded">
            OUT OF STOCK
          </div>
        )}
        <div className="absolute top-2 right-2 bg-blue-500 text-white text-xs font-semibold px-2 py-1 rounded">
          {category}
        </div>
      </div>
      <div className="p-4">
        <h3 className="text-lg font-semibold mb-2 h-14">{name}</h3>
        
        <div className="flex items-center justify-between mb-4">
          <p className="text-2xl font-bold text-gray-800">${price.toFixed(2)}</p>
          <div className="flex items-center text-sm text-gray-500">
            <Star className="w-4 h-4 text-yellow-400 mr-1" />
            <span>{rating} ({reviews} reviews)</span>
          </div>
        </div>

        <button
          disabled={!inStock}
          className={`w-full flex items-center justify-center px-4 py-2 font-semibold text-white rounded-md transition-colors duration-300 ${
            inStock
              ? "bg-blue-600 hover:bg-blue-700"
              : "bg-gray-400 cursor-not-allowed"
          }`}
        >
          <ShoppingCart className="w-5 h-5 mr-2" />
          {inStock ? "Add to Cart" : "Out of Stock"}
        </button>
      </div>
    </div>
  );
}
