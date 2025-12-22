import Icon from '@/components/ui/AppIcon';
import PropTypes from 'prop-types';

const categories = [
  { id: 'todos', name: 'Todos los Productos', icon: 'Squares2X2Icon' },
  { id: 'limpieza-industrial', name: 'Limpieza Industrial', icon: 'BuildingOfficeIcon' },
  { id: 'desinfectantes', name: 'Desinfectantes', icon: 'ShieldCheckIcon' },
  { id: 'cuidado-personal', name: 'Cuidado Personal', icon: 'UserIcon' },
  { id: 'hogar', name: 'Hogar', icon: 'HomeIcon' },
  { id: 'automotriz', name: 'Automotriz', icon: 'TruckIcon' }
];

export default function ProductsFilters({
  selectedCategory,
  setSelectedCategory,
  searchQuery,
  setSearchQuery,
  priceRange,
  setPriceRange,
  onResetFilters
}) {
  return (
    <aside className="lg:col-span-1">
      <div className="bg-card border border-border rounded-lg p-6 md:p-8 shadow-elevation-2 lg:sticky lg:top-24">
        <h3 className="text-xl md:text-2xl font-semibold text-foreground mb-6">
          Filtros
        </h3>

        {/* Búsqueda */}
        <div className="mb-6">
          <label htmlFor="search" className="block text-sm font-medium text-foreground mb-2">
            Buscar
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Icon name="MagnifyingGlassIcon" size={20} className="text-muted-foreground" />
            </div>
            <input
              type="text"
              id="search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e?.target?.value)}
              placeholder="Buscar productos..."
              className="w-full pl-10 pr-4 py-3 bg-card border border-input rounded-lg text-sm transition-smooth focus:outline-none focus:ring-2 focus:ring-ring"
            />
          </div>
        </div>

        {/* Categorías */}
        <div className="mb-6">
          <h4 className="text-sm font-medium text-foreground mb-3">Categorías</h4>
          <div className="space-y-2">
            {categories?.map((category) => (
              <button
                key={category?.id}
                onClick={() => setSelectedCategory(category?.id)}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-sm font-medium transition-smooth ${
                  selectedCategory === category?.id
                    ? 'bg-primary text-primary-foreground shadow-elevation-1'
                    : 'text-foreground hover:bg-muted'
                }`}
              >
                <Icon name={category?.icon} size={20} />
                <span>{category?.name}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Rango de Precio */}
        <div className="mb-6">
          <h4 className="text-sm font-medium text-foreground mb-3">
            Rango de Precio
          </h4>
          <div className="space-y-3">
            <div className="flex items-center justify-between text-sm text-muted-foreground">
              <span>${priceRange?.[0]}</span>
              <span>${priceRange?.[1]}</span>
            </div>
            <input
              type="range"
              min="0"
              max="100"
              value={priceRange?.[1]}
              onChange={(e) => setPriceRange([0, Number(e?.target?.value)])}
              className="w-full h-2 bg-muted rounded-lg appearance-none cursor-pointer"
              style={{
                background: `linear-gradient(to right, var(--color-primary) 0%, var(--color-primary) ${priceRange?.[1]}%, var(--color-muted) ${priceRange?.[1]}%, var(--color-muted) 100%)`
              }}
            />
          </div>
        </div>

        {/* Botón Limpiar Filtros */}
        <button
          onClick={onResetFilters}
          className="w-full py-3 px-6 border border-border rounded-lg text-sm font-medium text-foreground hover:bg-muted transition-smooth flex items-center justify-center space-x-2"
        >
          <Icon name="XMarkIcon" size={18} />
          <span>Limpiar Filtros</span>
        </button>
      </div>
    </aside>
  );
}

ProductsFilters.propTypes = {
  selectedCategory: PropTypes?.string?.isRequired,
  setSelectedCategory: PropTypes?.func?.isRequired,
  searchQuery: PropTypes?.string?.isRequired,
  setSearchQuery: PropTypes?.func?.isRequired,
  priceRange: PropTypes?.arrayOf(PropTypes?.number)?.isRequired,
  setPriceRange: PropTypes?.func?.isRequired,
  onResetFilters: PropTypes?.func?.isRequired
};
