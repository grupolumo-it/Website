import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getProductBySlug } from "../../../../services/productService";

export default function ProductDetail() {
  const { slug } = useParams();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    loadProduct();
  }, [slug]);

  async function loadProduct() {
    try {
        setLoading(true);
        setError(null);

        const data = await getProductBySlug(slug);
        console.log("Producto:", data);
        console.log("PRODUCTO COMPLETO:", data);
        console.log("IMAGEN PRINCIPAL:", data?.image);
        console.log("GALERÍA:", data?.gallery);
        console.log("CANTIDAD DE IMÁGENES:", data?.gallery?.length);

        setProduct(data);

        if (data?.image) {
            setSelectedImage(data.image);
        }

    } catch (error) {
      console.error("Error obteniendo producto:", error);

      setError("No fue posible cargar el producto.");
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <section className="max-w-6xl mx-auto px-6 py-16">
        <p className="text-gray-500">
          Cargando producto...
        </p>
      </section>
    );
  }

  if (error || !product) {
    return (
      <section className="max-w-6xl mx-auto px-6 py-16">

        <h1 className="text-2xl font-bold text-[#1D2559]">
          Producto no encontrado
        </h1>

        <p className="text-gray-500 mt-2">
          {error}
        </p>

      </section>
    );
  }

  const formattedPrice = new Intl.NumberFormat("es-CO", {
    style: "currency",
    currency: product.currency || "COP",
    maximumFractionDigits: 0,
  }).format(product.price);

  const discount = product.discount || 0;

  const originalPrice =
    discount > 0
      ? product.price / (1 - discount / 100)
      : null;

  const formattedOriginalPrice = originalPrice
    ? new Intl.NumberFormat("es-CO", {
        style: "currency",
        currency: product.currency || "COP",
        maximumFractionDigits: 0,
      }).format(originalPrice)
    : null;

  const isOutOfStock = product.stock <= 0;

  const hasGallery = product.gallery?.length > 1;

function changeImage(direction) {
    if (!hasGallery) return;

    const currentIndex = product.gallery.findIndex(
        (image) => image.image_url === selectedImage
    );

    const current = currentIndex >= 0 ? currentIndex : 0;

    let nextIndex;

    if (direction === "next") {
        nextIndex = (current + 1) % product.gallery.length;
    } else {
        nextIndex =
        (current - 1 + product.gallery.length) %
        product.gallery.length;
    }

    setSelectedImage(product.gallery[nextIndex].image_url);
}

  return (
    <section className="max-w-6xl mx-auto px-6 py-12">

      {/* Producto */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">

        {/* ========================= */}
        {/* GALERÍA */}
        {/* ========================= */}

        <div>

          {/* Imagen principal */}
          <div className="relative bg-gray-50 rounded-3xl overflow-hidden">

            <img
              src={selectedImage || product.image}
              alt={product.name}
              className="w-full aspect-square object-cover"
            />
            {/* Flecha anterior */}
            {hasGallery && (
                <button
                type="button"
                onClick={() => changeImage("prev")}
                aria-label="Imagen anterior"
                className="absolute left-4 top-1/2 -translate-y-1/2
                            w-11 h-11 rounded-full
                            bg-white/90 hover:bg-white
                            shadow-md
                            flex items-center justify-center
                            text-[#1D2559]
                            cursor-pointer
                            transition-all duration-200
                            hover:scale-105"
                >
                <span className="text-2xl leading-none">
                    <i class="fa-solid fa-circle-chevron-left"></i>
                </span>
                </button>
            )}

            {/* Flecha siguiente */}
            {hasGallery && (
                <button
                type="button"
                onClick={() => changeImage("next")}
                aria-label="Imagen siguiente"
                className="absolute right-4 top-1/2 -translate-y-1/2
                            w-11 h-11 rounded-full
                            bg-white/90 hover:bg-white
                            shadow-md
                            flex items-center justify-center
                            cursor-pointer
                            text-[#1D2559]
                            transition-all duration-200
                            hover:scale-105"
                >
                <span className="text-2xl leading-none">
                    <i class="fa-solid fa-circle-chevron-right"></i>
                </span>
                </button>
            )}

            {product.badge && (
              <span className="absolute top-5 left-5 bg-[#1D2559] text-white text-xs font-semibold px-4 py-2 rounded-full">
                {product.badge}
              </span>
            )}

          </div>

          {/* Miniaturas */}
          {product.gallery?.length > 0 && (
            <div className="flex gap-4 mt-4 overflow-x-auto">

              {product.gallery.map((image, index) => (
                <button
                  key={image.id || index}
                  type="button"
                  onClick={() => setSelectedImage(image.image_url)}
                  className={`flex-shrink-0 w-20 h-20 rounded-xl overflow-hidden border-2 transition ${
                    selectedImage === image.image_url
                      ? "border-[#1D2559]"
                      : "border-transparent"
                  }`}
                >
                  <img
                    src={image.image_url}
                    alt={`${product.name} ${index + 1}`}
                    className="w-full h-full cursor-pointer object-cover"
                  />
                </button>
              ))}

            </div>
          )}

        </div>

        {/* ========================= */}
        {/* INFORMACIÓN */}
        {/* ========================= */}

        <div className="flex flex-col justify-center">

          {/* Categorías */}
          {product.categories?.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-4">

              {product.categories.map((category) => (
                <span
                  key={category.id}
                  className="text-xs font-semibold px-3 py-1 rounded-full bg-gray-100 text-gray-600"
                >
                  {category.name}
                </span>
              ))}

            </div>
          )}

          {/* Nombre */}
          <h1 className="text-4xl font-bold text-[#1D2559]">
            {product.name}
          </h1>

          {/* SKU */}
          {product.sku && (
            <p className="text-sm text-gray-400 mt-2">
              SKU: {product.sku}
            </p>
          )}

          {/* Rating */}
          <div className="flex items-center gap-2 mt-5">

            <span className="text-yellow-500 text-lg">
              ★
            </span>

            <span className="font-semibold text-[#1D2559]">
              {product.rating?.toFixed(1)}
            </span>

            <span className="text-gray-500">
              ({product.reviews} reseñas)
            </span>

          </div>

          {/* Descripción */}
          <p className="text-gray-600 leading-relaxed mt-6">
            {product.description}
          </p>

          {/* Precio */}
          <div className="mt-8">

            <div className="flex items-center gap-3 flex-wrap">

              <span className="text-4xl font-bold text-[#1D2559]">
                {formattedPrice}
              </span>

              {formattedOriginalPrice && (
                <span className="text-lg text-gray-400 line-through">
                  {formattedOriginalPrice}
                </span>
              )}

            </div>

            {discount > 0 && (
              <p className="text-sm text-green-600 font-semibold mt-2">
                Ahorras {discount}%
              </p>
            )}

          </div>

          {/* Stock */}
          <div className="mt-6">

            {isOutOfStock ? (
              <p className="text-red-500 font-semibold">
                Producto agotado
              </p>
            ) : product.stock <= 5 ? (
              <p className="text-orange-500 font-semibold">
                ¡Solo quedan {product.stock} unidades!
              </p>
            ) : (
              <p className="text-green-600 font-semibold">
                Disponible
              </p>
            )}

          </div>

          {/* Botón */}
          <div className="mt-8">

            <button
              type="button"
              disabled={isOutOfStock}
              className={`w-full py-4 rounded-xl font-semibold transition ${
                isOutOfStock
                  ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                  : "bg-[#1D2559] hover:bg-[#303A80] text-white"
              }`}
            >
              {isOutOfStock
                ? "Producto agotado"
                : "Agregar al carrito"}
            </button>

          </div>

        </div>

      </div>

      {/* ========================= */}
      {/* ATRIBUTOS */}
      {/* ========================= */}

      {product.attributes?.length > 0 && (
        <div className="mt-20">

          <h2 className="text-2xl font-bold text-[#1D2559] mb-6">
            Especificaciones
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

            {product.attributes.map((attribute) => (

              <div
                key={attribute.id}
                className="bg-gray-50 rounded-xl p-5"
              >

                <p className="text-sm font-semibold text-[#1D2559] mb-3">
                  {attribute.type}
                </p>

                <div className="text-sm text-gray-600">

                  {typeof attribute.content === "object" ? (
                    Object.entries(attribute.content).map(
                      ([key, value]) => (
                        <div
                          key={key}
                          className="flex justify-between py-2 border-b border-gray-200 last:border-0"
                        >
                          <span className="font-medium">
                            {key}
                          </span>

                          <span>
                            {value}
                          </span>
                        </div>
                      )
                    )
                  ) : (
                    <p>{attribute.content}</p>
                  )}

                </div>

              </div>

            ))}

          </div>

        </div>
      )}

    </section>
  );
}