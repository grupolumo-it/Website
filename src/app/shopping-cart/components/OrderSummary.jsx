import PropTypes from 'prop-types';
import Link from 'next/link';
import Icon from '@/components/ui/AppIcon';

export default function OrderSummary({ summary, isDistributor }) {
  return (
    <div className="bg-card border border-border rounded-lg p-4 md:p-6 shadow-elevation-2 sticky top-24">
      <h2 className="text-xl md:text-2xl font-semibold text-foreground mb-4 md:mb-6">
        Resumen del Pedido
      </h2>
      <div className="space-y-3 mb-6">
        <div className="flex justify-between text-sm md:text-base">
          <span className="text-muted-foreground">Subtotal ({summary?.itemCount} productos)</span>
          <span className="font-medium text-foreground">€{summary?.subtotal?.toFixed(2)}</span>
        </div>

        {isDistributor && summary?.distributorDiscount > 0 && (
          <div className="flex justify-between text-sm md:text-base">
            <span className="text-success flex items-center gap-1">
              <Icon name="SparklesIcon" size={16} variant="solid" />
              Descuento Distribuidor ({summary?.distributorDiscountPercent}%)
            </span>
            <span className="font-medium text-success">-€{summary?.distributorDiscount?.toFixed(2)}</span>
          </div>
        )}

        {summary?.promoDiscount > 0 && (
          <div className="flex justify-between text-sm md:text-base">
            <span className="text-success flex items-center gap-1">
              <Icon name="TicketIcon" size={16} variant="solid" />
              Código Promocional
            </span>
            <span className="font-medium text-success">-€{summary?.promoDiscount?.toFixed(2)}</span>
          </div>
        )}

        <div className="flex justify-between text-sm md:text-base">
          <span className="text-muted-foreground flex items-center gap-1">
            Envío
            {summary?.hazmatShipping && (
              <Icon name="ExclamationTriangleIcon" size={14} variant="solid" className="text-warning" />
            )}
          </span>
          <span className="font-medium text-foreground">€{summary?.shipping?.toFixed(2)}</span>
        </div>

        {summary?.hazmatShipping && (
          <p className="text-xs text-warning flex items-start gap-1">
            <Icon name="InformationCircleIcon" size={14} variant="solid" className="flex-shrink-0 mt-0.5" />
            <span>Incluye cargo adicional por materiales peligrosos</span>
          </p>
        )}

        <div className="flex justify-between text-sm md:text-base">
          <span className="text-muted-foreground">IVA ({summary?.taxRate}%)</span>
          <span className="font-medium text-foreground">€{summary?.tax?.toFixed(2)}</span>
        </div>
      </div>
      <div className="border-t border-border pt-4 mb-6">
        <div className="flex justify-between items-center">
          <span className="text-lg md:text-xl font-semibold text-foreground">Total</span>
          <span className="text-2xl md:text-3xl font-bold text-primary whitespace-nowrap">
            €{summary?.total?.toFixed(2)}
          </span>
        </div>
      </div>
      <div className="space-y-3">
        <Link
          href="/checkout"
          className="block w-full px-6 py-3 bg-primary text-primary-foreground rounded-md text-sm md:text-base font-semibold text-center transition-smooth hover:shadow-elevation-3 active:scale-97"
        >
          Proceder al Pago
        </Link>
        <Link
          href="/"
          className="block w-full px-6 py-3 border border-border text-foreground rounded-md text-sm md:text-base font-medium text-center transition-smooth hover:bg-muted"
        >
          Continuar Comprando
        </Link>
      </div>
      {/* Trust Badges */}
      <div className="mt-6 pt-6 border-t border-border space-y-3">
        <div className="flex items-center gap-2 text-xs md:text-sm text-muted-foreground">
          <Icon name="ShieldCheckIcon" size={20} variant="solid" className="text-success" />
          <span>Pago seguro y encriptado</span>
        </div>
        <div className="flex items-center gap-2 text-xs md:text-sm text-muted-foreground">
          <Icon name="TruckIcon" size={20} variant="solid" className="text-primary" />
          <span>Envío gratuito en pedidos superiores a €150</span>
        </div>
        <div className="flex items-center gap-2 text-xs md:text-sm text-muted-foreground">
          <Icon name="ArrowPathIcon" size={20} variant="solid" className="text-primary" />
          <span>Devoluciones fáciles en 30 días</span>
        </div>
      </div>
    </div>
  );
}

OrderSummary.propTypes = {
  summary: PropTypes?.shape({
    itemCount: PropTypes?.number?.isRequired,
    subtotal: PropTypes?.number?.isRequired,
    distributorDiscount: PropTypes?.number?.isRequired,
    distributorDiscountPercent: PropTypes?.number?.isRequired,
    promoDiscount: PropTypes?.number?.isRequired,
    shipping: PropTypes?.number?.isRequired,
    hazmatShipping: PropTypes?.bool?.isRequired,
    tax: PropTypes?.number?.isRequired,
    taxRate: PropTypes?.number?.isRequired,
    total: PropTypes?.number?.isRequired,
  })?.isRequired,
  isDistributor: PropTypes?.bool?.isRequired,
};