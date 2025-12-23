import ProductsInteractive from "./components/ProductsInteractive";

export default function ProductsPage() {
  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-8">Our Products</h1>
      <ProductsInteractive />
    </main>
  );
}
