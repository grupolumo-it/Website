import { supabase } from "../lib/supabase";


function formatProduct(product) {
  const sortedImages = [...(product.product_images || [])]
    .sort((a, b) => a.position - b.position);

  const mainPrice = product.product_prices?.[0];

  // Imagen principal definida directamente en products
  const mainImage = product.image_url;

  // Galería adicional proveniente de product_images
  const galleryImages = sortedImages.map((image) => ({
    id: image.id,
    image_url: image.image_url,
    position: image.position,
  }));

  // La galería completa comienza con la imagen principal
  const gallery = [
    ...(mainImage
      ? [
          {
            id: `main-${product.id}`,
            image_url: mainImage,
            position: 0,
            isMain: true,
          },
        ]
      : []),
    ...galleryImages,
  ];

  return {
    id: product.id,
    sku: product.sku,

    name: product.name,
    slug: product.slug,

    shortDescription:
      product.short_description || "",

    description:
      product.description || "",

    // Siempre usamos products.image_url como imagen principal
    image: mainImage,

    // Galería completa
    gallery,

    price: mainPrice?.price || 0,

    currency:
      mainPrice?.currency || "COP",

    badge: product.badge,

    featured: product.is_featured,

    rating: product.rating || 0,

    reviews: product.reviews || 0,

    discount:
      product.discount_percentage || 0,

    stock: product.stock || 0,

    categories:
      product.products_categories
        ?.map((item) => item.categories)
        .filter(Boolean) || [],

    attributes:
      product.attributes || [],
  };
}

async function fetchProducts(query) {
  const { data, error } = await query;

  if (error) {
    throw error;
  }

  return data.map(formatProduct);
}


export async function getProducts() {
  return fetchProducts(
    supabase
      .from("products")
      .select(`
        *,
        product_prices(*),
        product_images(*),
        attributes(*),
        products_categories(
          categories(*)
        )
      `)
      .eq("is_active", true)
      .order("created_at", {
        ascending: false,
      })
  );
}


export async function getFeaturedProducts() {
  return fetchProducts(
    supabase
      .from("products")
      .select(`
        *,
        product_prices(*),
        product_images(*),
        attributes(*),
        products_categories(
          categories(*)
        )
      `)
      .eq("is_active", true)
      .eq("is_featured", true)
      .order("created_at", {
        ascending: false,
      })
      .limit(5)
  );
}

export async function getProductBySlug(slug) {
  const { data, error } = await supabase
    .from("products")
    .select(`
      *,
      product_prices(*),
      product_images(*),
      attributes(*),
      products_categories(
        categories(*)
      )
    `)
    .eq("slug", slug)
    .eq("is_active", true)
    .single();

  if (error) {
    throw error;
  }
  console.log("PRODUCTO ORIGINAL SUPABASE 1:", data);

  return formatProduct(data);
}  /*
export async function getProductBySlug(slug) {
  const { data: product, error: productError } = await supabase
    .from("products")
    .select("*")
    .eq("slug", slug)
    .eq("is_active", true)
    .single();

  console.log("PRODUCTO:", product);
  console.log("ERROR PRODUCTO:", productError);

  if (productError) {
    throw productError;
  }

  const { data: images, error: imagesError } = await supabase
    .from("product_images")
    .select("*")
    .eq("product_uuid", product.id)
    .order("position", {
      ascending: true,
    });

  console.log("ID DEL PRODUCTO:", product.id);
  console.log("IMAGENES DIRECTAS:", images);
  console.log("ERROR IMAGENES:", imagesError);

  if (imagesError) {
    throw imagesError;
  }

  product.product_images = images;

  return formatProduct(product);
}*/