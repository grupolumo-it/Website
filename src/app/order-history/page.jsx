import Header from '@/components/common/Header';
import OrderHistoryInteractive from './components/OrderHistoryInteractive';

export const metadata = {
  title: 'Historial de Pedidos - ChemClean Commerce',
  description: 'Consulta tu historial completo de pedidos, realiza seguimiento de envíos y gestiona devoluciones de productos químicos de limpieza profesional'
};

export default function OrderHistoryPage() {
  const mockUser = {
    id: 'user_001',
    name: 'María García',
    email: 'maria.garcia@email.com',
    accountType: 'distributor'
  };

  const mockOrders = [
  {
    id: 'order_001',
    orderNumber: 'CC2025-001234',
    date: '2025-12-15T10:30:00',
    status: 'delivered',
    total: 245.80,
    itemCount: 3,
    products: [
    {
      id: 'prod_001',
      name: 'Desinfectante Multiusos Concentrado 5L - Elimina 99.9% Bacterias',
      image: "https://img.rocket.new/generatedImages/rocket_gen_img_16aef964c-1764719921930.png",
      alt: 'Botella azul de desinfectante multiusos concentrado de 5 litros con etiqueta profesional',
      quantity: 2,
      price: 45.90
    },
    {
      id: 'prod_002',
      name: 'Limpiador Industrial para Suelos pH Neutro 10L',
      image: "https://img.rocket.new/generatedImages/rocket_gen_img_1660b7abe-1764701913656.png",
      alt: 'Garrafa blanca de limpiador industrial para suelos de 10 litros con asa ergonómica',
      quantity: 1,
      price: 154.00
    }],

    shippingAddress: {
      street: 'Calle Mayor 45, 3º B',
      city: 'Madrid',
      postalCode: '28013',
      country: 'España'
    },
    trackingNumber: 'ES1234567890CC',
    commission: 24.58
  },
  {
    id: 'order_002',
    orderNumber: 'CC2025-001189',
    date: '2025-12-10T14:20:00',
    status: 'shipped',
    total: 389.50,
    itemCount: 5,
    products: [
    {
      id: 'prod_003',
      name: 'Detergente Enzimático Biodegradable 20L - Uso Profesional',
      image: "https://img.rocket.new/generatedImages/rocket_gen_img_163dcb8d7-1764671140144.png",
      alt: 'Bidón verde de detergente enzimático biodegradable de 20 litros con certificación ecológica',
      quantity: 1,
      price: 189.00
    },
    {
      id: 'prod_004',
      name: 'Quitamanchas Profesional Spray 750ml - Acción Rápida',
      image: "https://img.rocket.new/generatedImages/rocket_gen_img_1b98ed769-1764831191695.png",
      alt: 'Botella spray transparente de quitamanchas profesional de 750ml con gatillo ergonómico',
      quantity: 4,
      price: 50.125
    }],

    shippingAddress: {
      street: 'Avenida Diagonal 123',
      city: 'Barcelona',
      postalCode: '08019',
      country: 'España'
    },
    trackingNumber: 'ES0987654321CC',
    commission: 38.95
  },
  {
    id: 'order_003',
    orderNumber: 'CC2025-001145',
    date: '2025-12-05T09:15:00',
    status: 'processing',
    total: 567.30,
    itemCount: 4,
    products: [
    {
      id: 'prod_005',
      name: 'Desengrasante Industrial Alcalino 25L - Alta Potencia',
      image: "https://img.rocket.new/generatedImages/rocket_gen_img_16aef964c-1764719921930.png",
      alt: 'Contenedor amarillo de desengrasante industrial alcalino de 25 litros con advertencias de seguridad',
      quantity: 2,
      price: 215.00
    },
    {
      id: 'prod_006',
      name: 'Abrillantador para Superficies Metálicas 5L',
      image: "https://img.rocket.new/generatedImages/rocket_gen_img_1fc5a956d-1764734427794.png",
      alt: 'Botella plateada de abrillantador para superficies metálicas de 5 litros con acabado brillante',
      quantity: 2,
      price: 68.65
    }],

    shippingAddress: {
      street: 'Calle Valencia 78, Local 2',
      city: 'Valencia',
      postalCode: '46002',
      country: 'España'
    },
    commission: 56.73
  },
  {
    id: 'order_004',
    orderNumber: 'CC2025-001098',
    date: '2025-11-28T16:45:00',
    status: 'delivered',
    total: 178.90,
    itemCount: 2,
    products: [
    {
      id: 'prod_007',
      name: 'Limpiador de Cristales Profesional 5L - Sin Rayas',
      image: "https://img.rocket.new/generatedImages/rocket_gen_img_16aef964c-1764719921930.png",
      alt: 'Botella azul transparente de limpiador de cristales profesional de 5 litros',
      quantity: 2,
      price: 89.45
    }],

    shippingAddress: {
      street: 'Plaza España 12',
      city: 'Sevilla',
      postalCode: '41013',
      country: 'España'
    },
    trackingNumber: 'ES5678901234CC',
    commission: 17.89
  },
  {
    id: 'order_005',
    orderNumber: 'CC2025-001056',
    date: '2025-11-20T11:30:00',
    status: 'delivered',
    total: 423.75,
    itemCount: 3,
    products: [
    {
      id: 'prod_008',
      name: 'Desinfectante Virucida Certificado 10L - COVID-19',
      image: "https://images.unsplash.com/photo-1587291085251-432bb9e6d3af",
      alt: 'Garrafa blanca de desinfectante virucida certificado de 10 litros con sello sanitario',
      quantity: 3,
      price: 141.25
    }],

    shippingAddress: {
      street: 'Calle Gran Vía 89',
      city: 'Bilbao',
      postalCode: '48011',
      country: 'España'
    },
    trackingNumber: 'ES3456789012CC',
    commission: 42.38
  },
  {
    id: 'order_006',
    orderNumber: 'CC2025-001012',
    date: '2025-11-15T13:20:00',
    status: 'cancelled',
    total: 298.60,
    itemCount: 2,
    products: [
    {
      id: 'prod_009',
      name: 'Limpiador Multiusos Ecológico 20L - Certificado Bio',
      image: "https://img.rocket.new/generatedImages/rocket_gen_img_14b97bab0-1764656583292.png",
      alt: 'Bidón verde de limpiador multiusos ecológico de 20 litros con certificación orgánica',
      quantity: 2,
      price: 149.30
    }],

    shippingAddress: {
      street: 'Avenida Constitución 34',
      city: 'Málaga',
      postalCode: '29002',
      country: 'España'
    }
  }];


  return (
    <div className="min-h-screen bg-background">
      <Header user={mockUser} cartItemCount={3} />
      
      <main className="w-full px-4 md:px-6 lg:px-8 py-6 md:py-8 lg:py-12">
        <div className="max-w-7xl mx-auto">
          <div className="mb-6 md:mb-8">
            <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-foreground mb-2">
              Historial de Pedidos
            </h1>
            <p className="text-sm md:text-base lg:text-lg text-muted-foreground">
              Consulta y gestiona todos tus pedidos de productos químicos de limpieza
            </p>
          </div>

          <OrderHistoryInteractive initialOrders={mockOrders} />
        </div>
      </main>
    </div>);

}