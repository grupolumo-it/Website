import Icon from '@/components/ui/AppIcon';
import PropTypes from 'prop-types';
import ProductCard from './ProductCard';

export default function ProductsGrid({ products, viewMode, onResetFilters }) {
  if (products?.length === 0) {
    return (
      <div className="bg-card border border-border rounded-lg p-12 md:p-16 shadow-elevation-1 text-center">
        <div className="flex justify-center mb-6">
          <div className="w-20 h-20 bg-muted rounded-full flex items-center justify-center">
            <Icon name="MagnifyingGlassIcon" size={40} className="text-muted-foreground" />
          </div>
        </div>
        <h3 className="text-xl md:text-2xl font-semibold text-foreground mb-2">
          No se encontraron productos
        </h3>
        <p className="text-sm md:text-base text-muted-foreground mb-6">
          Intenta ajustar los filtros o realiza una nueva búsqueda
        </p>
        <button
          onClick={onResetFilters}
          className="inline-flex items-center space-x-2 px-6 py-3 bg-primary text-primary-foreground rounded-lg text-sm font-medium transition-smooth hover:shadow-elevation-2 active:scale-97"
        >
          <Icon name="ArrowPathIcon" size={18} />
          <span>Limpiar Filtros</span>
        </button>
      </div>
    );
  }

  return (
    <div
      className={
        viewMode === 'grid'
          ? 'grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6'
          : 'space-y-6'
      }
    >
      {products?.map((product) => (
        <ProductCard key={product?.id} product={product} viewMode={viewMode} />
      ))}
    </div>
  );
}

ProductsGrid.propTypes = {
  products: PropTypes?.arrayOf(
    PropTypes?.shape({
      id: PropTypes?.number?.isRequired,
      name: PropTypes?.string?.isRequired,
      description: PropTypes?.string?.isRequired,
      price: PropTypes?.number?.isRequired,
      category: PropTypes?.string?.isRequired,
      stock: PropTypes?.number?.isRequired,
      image: PropTypes?.string?.isRequired,
      features: PropTypes?.arrayOf(PropTypes?.string)
    })
  )?.isRequired,
  viewMode: PropTypes?.string?.isRequired,
  onResetFilters: PropTypes?.func?.isRequired
};
