import Link from 'next/link';
import Icon from '@/components/ui/AppIcon';

export default function EmptyCart() {
  return (
    <div className="flex flex-col items-center justify-center py-12 md:py-20 px-4">
      <div className="w-24 h-24 md:w-32 md:h-32 bg-muted rounded-full flex items-center justify-center mb-6">
        <Icon name="ShoppingCartIcon" size={48} className="text-muted-foreground" />
      </div>
      <h2 className="text-2xl md:text-3xl font-semibold text-foreground mb-3 text-center">
        Tu carrito está vacío
      </h2>
      <p className="text-sm md:text-base text-muted-foreground mb-8 text-center max-w-md">
        Parece que aún no has agregado ningún producto químico de limpieza a tu carrito. ¡Explora nuestro catálogo y encuentra los productos perfectos para tus necesidades!
      </p>
      <Link
        href="/"
        className="px-8 py-3 bg-primary text-primary-foreground rounded-md text-sm md:text-base font-semibold transition-smooth hover:shadow-elevation-3 active:scale-97 flex items-center gap-2"
      >
        <Icon name="BeakerIcon" size={20} />
        <span>Explorar Productos</span>
      </Link>
    </div>
  );
}