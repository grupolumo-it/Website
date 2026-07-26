import { supabase } from "../lib/supabase";

export async function getProducts() {
  const { data, error } = await supabase
    .from("products")
    .select(`
      id,
      name,
      slug,
      short_description,
      image_url,
      badge,
      rating,
      reviews,
      discount_percentage,
      product_prices(price),
      product_images(image_url, position),
      products_categories(
        categories(name, slug, color, icon)
      )
    `)

  console.log(data);
  console.log(error);

  return data;
}