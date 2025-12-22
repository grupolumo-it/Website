import Header from '@/components/common/Header';
import ShoppingCartInteractive from './components/ShoppingCartInteractive';

export const metadata = {
  title: 'Carrito de Compras - ChemClean Commerce',
  description: 'Revisa y gestiona tus productos químicos de limpieza seleccionados antes de completar tu compra en ChemClean Commerce.'
};

export default function ShoppingCartPage() {
  const mockCartData = {
    items: [
    {
      id: 'cart-001',
      name: 'Desinfectante Multiusos Profesional',
      image: "https://img.rocket.new/generatedImages/rocket_gen_img_16aef964c-1764719921930.png",
      alt: 'Botella azul de desinfectante multiusos profesional con etiqueta blanca sobre superficie blanca',
      chemicalType: 'Desinfectante',
      concentration: '5% Amonio Cuaternario',
      price: 24.99,
      quantity: 2,
      maxQuantity: 50,
      weight: 5,
      hazmat: false,
      bulkPricing: {
        minQuantity: 10,
        price: 21.99
      }
    },
    {
      id: 'cart-002',
      name: 'Limpiador Ácido Industrial para Baños',
      image: "https://img.rocket.new/generatedImages/rocket_gen_img_16aef964c-1764719921930.png",
      alt: 'Botella verde de limpiador ácido industrial con etiqueta de advertencia amarilla',
      chemicalType: 'Ácido',
      concentration: '10% Ácido Clorhídrico',
      price: 32.50,
      quantity: 1,
      maxQuantity: 30,
      weight: 5,
      hazmat: true,
      bulkPricing: {
        minQuantity: 6,
        price: 28.99
      }
    },
    {
      id: 'cart-003',
      name: 'Desengrasante Alcalino Concentrado',
      image: "https://img.rocket.new/generatedImages/rocket_gen_img_16aef964c-1764719921930.png",
      alt: 'Bidón naranja de desengrasante alcalino concentrado con tapa negra sobre fondo industrial',
      chemicalType: 'Base',
      concentration: '15% Hidróxido de Sodio',
      price: 45.00,
      quantity: 3,
      maxQuantity: 40,
      weight: 10,
      hazmat: true,
      bulkPricing: {
        minQuantity: 5,
        price: 39.99
      }
    },
    {
      id: 'cart-004',
      name: 'Limpiador de Cristales Premium',
      image: "https://img.rocket.new/generatedImages/rocket_gen_img_11af865a2-1766183896390.png",
      alt: 'Botella transparente con spray de limpiador de cristales con líquido azul claro',
      chemicalType: 'Solvente',
      concentration: '8% Alcohol Isopropílico',
      price: 12.99,
      quantity: 5,
      maxQuantity: 100,
      weight: 1,
      hazmat: false,
      bulkPricing: {
        minQuantity: 12,
        price: 10.99
      }
    }]

  };

  const mockUserData = {
    name: 'Carlos Rodríguez',
    email: 'carlos.rodriguez@example.com',
    accountType: 'distributor'
  };

  return (
    <>
      <Header user={mockUserData} cartItemCount={mockCartData?.items?.length} />
      <ShoppingCartInteractive
        initialCartData={mockCartData}
        initialUserData={mockUserData} />

    </>);

}