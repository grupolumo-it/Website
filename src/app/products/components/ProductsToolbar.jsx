import Icon from '@/components/ui/AppIcon';
import PropTypes from 'prop-types';

const sortOptions = [
  { value: 'name-asc', label: 'Nombre (A-Z)' },
  { value: 'name-desc', label: 'Nombre (Z-A)' },
  { value: 'price-asc', label: 'Precio (Menor a Mayor)' },
  { value: 'price-desc', label: 'Precio (Mayor a Menor)' },
  { value: 'stock-desc', label: 'Mayor Disponibilidad' }
];

export default function ProductsToolbar({
  filteredCount,
  totalCount,
  sortBy,
  setSortBy,
  viewMode,
  setViewMode
}) {
  return (
    <div className="bg-card border border-border rounded-lg p-4 md:p-6 shadow-elevation-1">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="text-sm text-muted-foreground">
          Mostrando <span className="font-semibold text-foreground">{filteredCount}</span> de{' '}
          <span className="font-semibold text-foreground">{totalCount}</span> productos
        </div>

        <div className="flex items-center gap-4 w-full sm:w-auto">
          {/* Ordenar */}
          <div className="flex items-center gap-2 flex-1 sm:flex-initial">
            <label htmlFor="sort" className="text-sm font-medium text-foreground whitespace-nowrap">
              Ordenar:
            </label>
            <select
              id="sort"
              value={sortBy}
              onChange={(e) => setSortBy(e?.target?.value)}
              className="flex-1 sm:flex-initial px-3 py-2 bg-card border border-input rounded-lg text-sm transition-smooth focus:outline-none focus:ring-2 focus:ring-ring"
            >
              {sortOptions?.map((option) => (
                <option key={option?.value} value={option?.value}>
                  {option?.label}
                </option>
              ))}
            </select>
          </div>

          {/* Vista */}
          <div className="flex items-center gap-1 bg-muted rounded-lg p-1">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2 rounded-md transition-smooth ${
                viewMode === 'grid'
                  ? 'bg-card shadow-elevation-1 text-foreground'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
              aria-label="Vista de cuadrícula"
            >
              <Icon name="Squares2X2Icon" size={20} />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-2 rounded-md transition-smooth ${
                viewMode === 'list'
                  ? 'bg-card shadow-elevation-1 text-foreground'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
              aria-label="Vista de lista"
            >
              <Icon name="ListBulletIcon" size={20} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

ProductsToolbar.propTypes = {
  filteredCount: PropTypes?.number?.isRequired,
  totalCount: PropTypes?.number?.isRequired,
  sortBy: PropTypes?.string?.isRequired,
  setSortBy: PropTypes?.func?.isRequired,
  viewMode: PropTypes?.string?.isRequired,
  setViewMode: PropTypes?.func?.isRequired
};
