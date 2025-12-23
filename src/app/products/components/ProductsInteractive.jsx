'use client';

import { useState, useEffect } from 'react';
import Header from '@/components/common/Header';
import ProductsHero from './ProductsHero';
import ProductsFilters from './ProductsFilters';
import ProductsGrid from './ProductsGrid';
import ProductsToolbar from './ProductsToolbar';

const mockProducts = [
  {
    id: 1,
    name: 'Detergente Industrial Ultra',
    description: 'Fórmula concentrada para limpieza profunda de superficies industriales',
    price: 45.99,
    category: 'limpieza-industrial',
    stock: 150,
    image: 'https://images.unsplash.com/photo-1563453392212-326f5e854473?w=400&h=400&fit=crop',
    features: ['Biodegradable', 'Alta concentración', 'Multiusos']
  },
  {
    id: 2,
    name: 'Desinfectante Hospitalario',
    description: 'Elimina 99.9% de gérmenes y bacterias. Certificado para uso médico',
    price: 32.50,
    category: 'desinfectantes',
    stock: 200,
    image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=400&h=400&fit=crop',
    features: ['Certificado', 'Acción rápida', 'Sin residuos']
  },
  {
    id: 3,
    name: 'Jabón Antibacterial Premium',
    description: 'Jabón líquido con fragancia suave, ideal para uso frecuente',
    price: 18.75,
    category: 'cuidado-personal',
    stock: 300,
    image: 'https://images.unsplash.com/photo-1585909695284-32d2985ac9c0?w=400&h=400&fit=crop',
    features: ['pH balanceado', 'Dermatológico', 'Aroma natural']
  },
  {
    id: 4,
    name: 'Limpiador Multiusos Ecológico',
    description: 'Limpiador versátil con ingredientes naturales y biodegradables',
    price: 24.99,
    category: 'hogar',
    stock: 180,
    image: 'https://images.unsplash.com/photo-1631889993959-41b4e9c6e3c5?w=400&h=400&fit=crop',
    features: ['100% natural', 'Sin químicos', 'Ecológico']
  },
  {
    id: 5,
    name: 'Desengrasante Profesional',
    description: 'Potente desengrasante para cocinas industriales y talleres',
    price: 38.00,
    category: 'limpieza-industrial',
    stock: 120,
    image: 'https://images.unsplash.com/photo-1610557892470-55d9e80c0bce?w=400&h=400&fit=crop',
    features: ['Extra fuerte', 'Secado rápido', 'No tóxico']
  },
  {
    id: 6,
    name: 'Sanitizante de Manos en Gel',
    description: 'Gel antibacterial con aloe vera, elimina 99.9% de gérmenes',
    price: 12.50,
    category: 'desinfectantes',
    stock: 500,
    image: 'https://images.unsplash.com/photo-1584744982491-665216d95f8b?w=400&h=400&fit=crop',
    features: ['Con aloe', 'No pegajoso', 'Portátil']
  },
  {
    id: 7,
    name: 'Limpiavidrios Profesional',
    description: 'Fórmula sin rayas para cristales y superficies reflectantes',
    price: 15.99,
    category: 'hogar',
    stock: 250,
    image: 'https://images.unsplash.com/photo-1628177142898-93e36e4e3a50?w=400&h=400&fit=crop',
    features: ['Sin rayas', 'Brillo intenso', 'Secado rápido']
  },
  {
    id: 8,
    name: 'Cloro Concentrado Industrial',
    description: 'Blanqueador y desinfectante de alta potencia para uso industrial',
    price: 28.75,
    category: 'limpieza-industrial',
    stock: 175,
    image: 'https://images.unsplash.com/photo-1603712725038-a9c96e1c9c3f?w=400&h=400&fit=crop',
    features: ['Alta potencia', 'Blanqueador', 'Desinfectante']
  },
  {
    id: 9,
    name: 'Shampoo Automotriz Premium',
    description: 'Shampoo concentrado para lavado profesional de vehículos',
    price: 35.00,
    category: 'automotriz',
    stock: 90,
    image: 'https://images.unsplash.com/photo-1607860108855-64acf2078ed9?w=400&h=400&fit=crop',
    features: ['Cera incluida', 'Brillo duradero', 'Concentrado']
  }
];

export default function ProductsInteractive() {
  const [user, setUser] = useState(null);
  const [cartItemCount, setCartItemCount] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState('todos');
  const [sortBy, setSortBy] = useState('name-asc');
  const [searchQuery, setSearchQuery] = useState('');
  const [priceRange, setPriceRange] = useState([0, 100]);
  const [viewMode, setViewMode] = useState('grid');

  useEffect(() => {
    try {
      const savedUser = localStorage.getItem('chemclean_user');
      if (savedUser) {
        setUser(JSON.parse(savedUser));
      }
      const savedCart = localStorage.getItem('chemclean_cart');
      if (savedCart) {
        const cart = JSON.parse(savedCart);
        setCartItemCount(cart?.length || 0);
      }
    } catch (error) {
      console.error('Error loading data from localStorage:', error);
    }
  }, []);

  const filteredProducts = mockProducts
    .filter(product => {
      if (selectedCategory !== 'todos' && product?.category !== selectedCategory) {
        return false;
      }
      if (searchQuery && !product?.name?.toLowerCase()?.includes(searchQuery?.toLowerCase()) &&
          !product?.description?.toLowerCase()?.includes(searchQuery?.toLowerCase())) {
        return false;
      }
      if (product?.price < priceRange?.[0] || product?.price > priceRange?.[1]) {
        return false;
      }
      return true;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'name-asc':
          return a?.name?.localeCompare(b?.name);
        case 'name-desc':
          return b?.name?.localeCompare(a?.name);
        case 'price-asc':
          return a?.price - b?.price;
        case 'price-desc':
          return b?.price - a?.price;
        case 'stock-desc':
          return b?.stock - a?.stock;
        default:
          return 0;
      }
    });

  const handleResetFilters = () => {
    setSelectedCategory('todos');
    setSearchQuery('');
    setPriceRange([0, 100]);
    setSortBy('name-asc');
  };

  return (
    <div className="min-h-screen bg-background">
      <Header user={user} cartItemCount={cartItemCount} />

      <ProductsHero />

      <main className="w-full px-4 md:px-6 lg:px-8 py-8 md:py-12">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            <ProductsFilters
              selectedCategory={selectedCategory}
              setSelectedCategory={setSelectedCategory}
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              priceRange={priceRange}
              setPriceRange={setPriceRange}
              onResetFilters={handleResetFilters}
            />

            <div className="lg:col-span-3 space-y-6">
              <ProductsToolbar
                filteredCount={filteredProducts?.length}
                totalCount={mockProducts?.length}
                sortBy={sortBy}
                setSortBy={setSortBy}
                viewMode={viewMode}
                setViewMode={setViewMode}
              />

              <ProductsGrid
                products={filteredProducts}
                viewMode={viewMode}
                onResetFilters={handleResetFilters}
              />
            </div>
          </div>
        </div>
      </main>

      <footer className="w-full px-4 md:px-6 lg:px-8 py-6 md:py-8 border-t border-border bg-card">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-sm text-muted-foreground">
            © {new Date()?.getFullYear()} ChemClean Commerce. Todos los derechos reservados.
          </p>
        </div>
      </footer>
    </div>
  );
}
