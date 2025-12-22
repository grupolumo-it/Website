'use client';

import { useState } from 'react';
import PropTypes from 'prop-types';
import Icon from '@/components/ui/AppIcon';
import AppImage from '@/components/ui/AppImage';
import OrderStatusBadge from './OrderStatusBadge';

export default function OrderCard({ order, onReorder, onDownloadInvoice, onRequestReturn }) {
  const [isExpanded, setIsExpanded] = useState(false);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date?.toLocaleDateString('es-ES', { day: '2-digit', month: '2-digit', year: 'numeric' });
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('es-ES', {
      style: 'currency',
      currency: 'EUR',
      minimumFractionDigits: 2
    })?.format(amount);
  };

  return (
    <div className="bg-card border border-border rounded-lg shadow-elevation-1 overflow-hidden transition-smooth hover:shadow-elevation-2">
      <div className="p-4 md:p-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 md:gap-4 mb-4">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-2">
              <h3 className="text-base md:text-lg font-semibold text-foreground truncate">
                Pedido #{order?.orderNumber}
              </h3>
              <OrderStatusBadge status={order?.status} />
            </div>
            <div className="flex flex-wrap items-center gap-2 md:gap-4 text-xs md:text-sm text-muted-foreground">
              <span className="flex items-center gap-1">
                <Icon name="CalendarIcon" size={16} />
                {formatDate(order?.date)}
              </span>
              <span className="flex items-center gap-1">
                <Icon name="CurrencyEuroIcon" size={16} />
                {formatCurrency(order?.total)}
              </span>
              {order?.itemCount && (
                <span className="flex items-center gap-1">
                  <Icon name="ShoppingBagIcon" size={16} />
                  {order?.itemCount} {order?.itemCount === 1 ? 'producto' : 'productos'}
                </span>
              )}
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="p-2 rounded-md text-foreground hover:bg-muted transition-smooth"
              aria-label={isExpanded ? 'Contraer detalles' : 'Expandir detalles'}
            >
              <Icon 
                name={isExpanded ? 'ChevronUpIcon' : 'ChevronDownIcon'} 
                size={20} 
              />
            </button>
          </div>
        </div>

        {isExpanded && (
          <div className="border-t border-border pt-4 space-y-4">
            <div className="space-y-3">
              {order?.products?.map((product) => (
                <div key={product?.id} className="flex gap-3 md:gap-4 p-3 bg-muted/50 rounded-md">
                  <div className="w-16 h-16 md:w-20 md:h-20 flex-shrink-0 rounded-md overflow-hidden bg-background">
                    <AppImage
                      src={product?.image}
                      alt={product?.alt}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="text-sm md:text-base font-medium text-foreground line-clamp-2 mb-1">
                      {product?.name}
                    </h4>
                    <div className="flex flex-wrap items-center gap-2 text-xs md:text-sm text-muted-foreground">
                      <span>Cantidad: {product?.quantity}</span>
                      <span>•</span>
                      <span>{formatCurrency(product?.price)}</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm md:text-base font-semibold text-foreground whitespace-nowrap">
                      {formatCurrency(product?.price * product?.quantity)}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {order?.shippingAddress && (
              <div className="p-3 md:p-4 bg-muted/30 rounded-md">
                <h4 className="text-sm font-semibold text-foreground mb-2 flex items-center gap-2">
                  <Icon name="MapPinIcon" size={16} />
                  Dirección de Envío
                </h4>
                <p className="text-xs md:text-sm text-muted-foreground">
                  {order?.shippingAddress?.street}<br />
                  {order?.shippingAddress?.city}, {order?.shippingAddress?.postalCode}<br />
                  {order?.shippingAddress?.country}
                </p>
              </div>
            )}

            {order?.trackingNumber && (
              <div className="p-3 md:p-4 bg-muted/30 rounded-md">
                <h4 className="text-sm font-semibold text-foreground mb-2 flex items-center gap-2">
                  <Icon name="TruckIcon" size={16} />
                  Seguimiento
                </h4>
                <p className="text-xs md:text-sm text-muted-foreground font-mono">
                  {order?.trackingNumber}
                </p>
              </div>
            )}

            {order?.commission && (
              <div className="p-3 md:p-4 bg-accent/10 border border-accent/20 rounded-md">
                <h4 className="text-sm font-semibold text-accent-foreground mb-2 flex items-center gap-2">
                  <Icon name="BanknotesIcon" size={16} />
                  Comisión de Distribuidor
                </h4>
                <p className="text-base md:text-lg font-bold text-accent-foreground">
                  {formatCurrency(order?.commission)}
                </p>
              </div>
            )}

            <div className="flex flex-wrap gap-2 pt-2">
              <button
                onClick={() => onReorder(order?.id)}
                className="flex-1 sm:flex-none px-4 py-2 bg-primary text-primary-foreground rounded-md text-sm font-medium transition-smooth hover:shadow-elevation-2 active:scale-97 flex items-center justify-center gap-2"
              >
                <Icon name="ArrowPathIcon" size={16} />
                Reordenar
              </button>
              <button
                onClick={() => onDownloadInvoice(order?.id)}
                className="flex-1 sm:flex-none px-4 py-2 bg-secondary text-secondary-foreground rounded-md text-sm font-medium transition-smooth hover:shadow-elevation-2 active:scale-97 flex items-center justify-center gap-2"
              >
                <Icon name="DocumentArrowDownIcon" size={16} />
                Factura
              </button>
              {(order?.status === 'delivered' || order?.status === 'shipped') && (
                <button
                  onClick={() => onRequestReturn(order?.id)}
                  className="flex-1 sm:flex-none px-4 py-2 border border-border text-foreground rounded-md text-sm font-medium transition-smooth hover:bg-muted active:scale-97 flex items-center justify-center gap-2"
                >
                  <Icon name="ArrowUturnLeftIcon" size={16} />
                  Devolución
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

OrderCard.propTypes = {
  order: PropTypes?.shape({
    id: PropTypes?.string?.isRequired,
    orderNumber: PropTypes?.string?.isRequired,
    date: PropTypes?.string?.isRequired,
    status: PropTypes?.oneOf(['processing', 'shipped', 'delivered', 'cancelled', 'returned'])?.isRequired,
    total: PropTypes?.number?.isRequired,
    itemCount: PropTypes?.number,
    products: PropTypes?.arrayOf(PropTypes?.shape({
      id: PropTypes?.string?.isRequired,
      name: PropTypes?.string?.isRequired,
      image: PropTypes?.string?.isRequired,
      alt: PropTypes?.string?.isRequired,
      quantity: PropTypes?.number?.isRequired,
      price: PropTypes?.number?.isRequired
    }))?.isRequired,
    shippingAddress: PropTypes?.shape({
      street: PropTypes?.string?.isRequired,
      city: PropTypes?.string?.isRequired,
      postalCode: PropTypes?.string?.isRequired,
      country: PropTypes?.string?.isRequired
    }),
    trackingNumber: PropTypes?.string,
    commission: PropTypes?.number
  })?.isRequired,
  onReorder: PropTypes?.func?.isRequired,
  onDownloadInvoice: PropTypes?.func?.isRequired,
  onRequestReturn: PropTypes?.func?.isRequired
};