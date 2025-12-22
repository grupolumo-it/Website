import PropTypes from 'prop-types';
import Icon from '@/components/ui/AppIcon';

export default function DownlineTable({ distributors }) {
  const getLevelBadgeColor = (level) => {
    const colors = {
      1: 'bg-primary/10 text-primary',
      2: 'bg-secondary/10 text-secondary',
      3: 'bg-accent text-accent-foreground'
    };
    return colors?.[level] || 'bg-muted text-muted-foreground';
  };

  return (
    <div className="bg-card rounded-lg shadow-elevation-2 overflow-hidden w-full min-w-0">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-muted">
            <tr>
              <th className="px-4 md:px-6 py-3 md:py-4 text-left text-xs md:text-sm font-semibold text-foreground">Distribuidor</th>
              <th className="px-4 md:px-6 py-3 md:py-4 text-left text-xs md:text-sm font-semibold text-foreground">Nivel</th>
              <th className="px-4 md:px-6 py-3 md:py-4 text-left text-xs md:text-sm font-semibold text-foreground">Ventas Mensuales</th>
              <th className="px-4 md:px-6 py-3 md:py-4 text-left text-xs md:text-sm font-semibold text-foreground">Comisión</th>
              <th className="px-4 md:px-6 py-3 md:py-4 text-left text-xs md:text-sm font-semibold text-foreground">Estado</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {distributors?.map((distributor) => (
              <tr key={distributor?.id} className="hover:bg-muted/50 transition-smooth">
                <td className="px-4 md:px-6 py-3 md:py-4">
                  <div className="flex items-center space-x-3">
                    <div className="h-8 w-8 md:h-10 md:w-10 rounded-full bg-accent flex items-center justify-center flex-shrink-0">
                      <span className="text-xs md:text-sm font-semibold text-accent-foreground">
                        {distributor?.name?.charAt(0)?.toUpperCase()}
                      </span>
                    </div>
                    <div className="min-w-0">
                      <p className="text-sm md:text-base font-medium text-foreground truncate">{distributor?.name}</p>
                      <p className="text-xs md:text-sm text-muted-foreground truncate">{distributor?.email}</p>
                    </div>
                  </div>
                </td>
                <td className="px-4 md:px-6 py-3 md:py-4">
                  <span className={`inline-flex items-center px-2 md:px-3 py-1 rounded-full text-xs md:text-sm font-medium ${getLevelBadgeColor(distributor?.level)}`}>
                    Nivel {distributor?.level}
                  </span>
                </td>
                <td className="px-4 md:px-6 py-3 md:py-4">
                  <span className="text-sm md:text-base font-semibold text-foreground whitespace-nowrap">€{distributor?.monthlySales?.toLocaleString('es-ES', { minimumFractionDigits: 2 })}</span>
                </td>
                <td className="px-4 md:px-6 py-3 md:py-4">
                  <span className="text-sm md:text-base font-semibold text-success whitespace-nowrap">€{distributor?.commission?.toLocaleString('es-ES', { minimumFractionDigits: 2 })}</span>
                </td>
                <td className="px-4 md:px-6 py-3 md:py-4">
                  <span className={`inline-flex items-center space-x-1 px-2 md:px-3 py-1 rounded-full text-xs md:text-sm font-medium ${
                    distributor?.status === 'active' ? 'bg-success/10 text-success' : 'bg-muted text-muted-foreground'
                  }`}>
                    <Icon name={distributor?.status === 'active' ? 'CheckCircleIcon' : 'ClockIcon'} size={14} />
                    <span>{distributor?.status === 'active' ? 'Activo' : 'Inactivo'}</span>
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

DownlineTable.propTypes = {
  distributors: PropTypes?.arrayOf(
    PropTypes?.shape({
      id: PropTypes?.number?.isRequired,
      name: PropTypes?.string?.isRequired,
      email: PropTypes?.string?.isRequired,
      level: PropTypes?.number?.isRequired,
      monthlySales: PropTypes?.number?.isRequired,
      commission: PropTypes?.number?.isRequired,
      status: PropTypes?.oneOf(['active', 'inactive'])?.isRequired
    })
  )?.isRequired
};