import PropTypes from 'prop-types';

export default function OrderStatusBadge({ status }) {
  const statusConfig = {
    processing: {
      label: 'Procesando',
      bgColor: 'bg-warning/10',
      textColor: 'text-warning',
      borderColor: 'border-warning/20'
    },
    shipped: {
      label: 'Enviado',
      bgColor: 'bg-secondary/10',
      textColor: 'text-secondary',
      borderColor: 'border-secondary/20'
    },
    delivered: {
      label: 'Entregado',
      bgColor: 'bg-success/10',
      textColor: 'text-success',
      borderColor: 'border-success/20'
    },
    cancelled: {
      label: 'Cancelado',
      bgColor: 'bg-error/10',
      textColor: 'text-error',
      borderColor: 'border-error/20'
    },
    returned: {
      label: 'Devuelto',
      bgColor: 'bg-muted',
      textColor: 'text-muted-foreground',
      borderColor: 'border-border'
    }
  };

  const config = statusConfig?.[status] || statusConfig?.processing;

  return (
    <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs md:text-sm font-medium border ${config?.bgColor} ${config?.textColor} ${config?.borderColor} whitespace-nowrap`}>
      {config?.label}
    </span>
  );
}

OrderStatusBadge.propTypes = {
  status: PropTypes?.oneOf(['processing', 'shipped', 'delivered', 'cancelled', 'returned'])?.isRequired
};