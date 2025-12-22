'use client';

import { useState } from 'react';
import PropTypes from 'prop-types';
import Icon from '@/components/ui/AppIcon';

export default function OrderFilters({ onFilterChange }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [filters, setFilters] = useState({
    status: 'all',
    dateRange: 'all',
    minAmount: '',
    maxAmount: ''
  });

  const handleFilterChange = (key, value) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const handleReset = () => {
    const resetFilters = {
      status: 'all',
      dateRange: 'all',
      minAmount: '',
      maxAmount: ''
    };
    setFilters(resetFilters);
    onFilterChange(resetFilters);
  };

  const hasActiveFilters = filters?.status !== 'all' || 
                          filters?.dateRange !== 'all' || 
                          filters?.minAmount !== '' || 
                          filters?.maxAmount !== '';

  return (
    <div className="bg-card border border-border rounded-lg shadow-elevation-1 overflow-hidden">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full px-4 md:px-6 py-3 md:py-4 flex items-center justify-between text-left transition-smooth hover:bg-muted"
      >
        <div className="flex items-center gap-2 md:gap-3">
          <Icon name="FunnelIcon" size={20} />
          <span className="text-sm md:text-base font-semibold text-foreground">
            Filtros de Búsqueda
          </span>
          {hasActiveFilters && (
            <span className="px-2 py-1 bg-primary text-primary-foreground text-xs rounded-full">
              Activo
            </span>
          )}
        </div>
        <Icon 
          name={isExpanded ? 'ChevronUpIcon' : 'ChevronDownIcon'} 
          size={20} 
        />
      </button>
      {isExpanded && (
        <div className="px-4 md:px-6 py-4 border-t border-border space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Estado del Pedido
              </label>
              <select
                value={filters?.status}
                onChange={(e) => handleFilterChange('status', e?.target?.value)}
                className="w-full px-3 py-2 bg-background border border-input rounded-md text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring transition-smooth"
              >
                <option value="all">Todos los Estados</option>
                <option value="processing">Procesando</option>
                <option value="shipped">Enviado</option>
                <option value="delivered">Entregado</option>
                <option value="cancelled">Cancelado</option>
                <option value="returned">Devuelto</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Rango de Fechas
              </label>
              <select
                value={filters?.dateRange}
                onChange={(e) => handleFilterChange('dateRange', e?.target?.value)}
                className="w-full px-3 py-2 bg-background border border-input rounded-md text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring transition-smooth"
              >
                <option value="all">Todas las Fechas</option>
                <option value="last7days">Últimos 7 días</option>
                <option value="last30days">Últimos 30 días</option>
                <option value="last3months">Últimos 3 meses</option>
                <option value="last6months">Últimos 6 meses</option>
                <option value="lastyear">Último año</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Monto Mínimo (€)
              </label>
              <input
                type="number"
                value={filters?.minAmount}
                onChange={(e) => handleFilterChange('minAmount', e?.target?.value)}
                placeholder="0.00"
                min="0"
                step="0.01"
                className="w-full px-3 py-2 bg-background border border-input rounded-md text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring transition-smooth"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Monto Máximo (€)
              </label>
              <input
                type="number"
                value={filters?.maxAmount}
                onChange={(e) => handleFilterChange('maxAmount', e?.target?.value)}
                placeholder="999.99"
                min="0"
                step="0.01"
                className="w-full px-3 py-2 bg-background border border-input rounded-md text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring transition-smooth"
              />
            </div>
          </div>

          {hasActiveFilters && (
            <div className="flex justify-end pt-2">
              <button
                onClick={handleReset}
                className="px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-smooth flex items-center gap-2"
              >
                <Icon name="XMarkIcon" size={16} />
                Limpiar Filtros
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

OrderFilters.propTypes = {
  onFilterChange: PropTypes?.func?.isRequired
};