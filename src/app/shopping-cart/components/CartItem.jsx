'use client';

import { useState } from 'react';
import PropTypes from 'prop-types';
import AppImage from '@/components/ui/AppImage';
import Icon from '@/components/ui/AppIcon';

export default function CartItem({ item, onUpdateQuantity, onRemove, onSaveForLater }) {
  const [quantity, setQuantity] = useState(item?.quantity);
  const [isUpdating, setIsUpdating] = useState(false);

  const handleQuantityChange = async (newQuantity) => {
    if (newQuantity < 1 || newQuantity > item?.maxQuantity) return;
    
    setIsUpdating(true);
    setQuantity(newQuantity);
    await onUpdateQuantity(item?.id, newQuantity);
    setIsUpdating(false);
  };

  const incrementQuantity = () => {
    handleQuantityChange(quantity + 1);
  };

  const decrementQuantity = () => {
    handleQuantityChange(quantity - 1);
  };

  const handleRemove = () => {
    onRemove(item?.id);
  };

  const handleSaveForLater = () => {
    onSaveForLater(item?.id);
  };

  const lineTotal = (item?.price * quantity)?.toFixed(2);
  const bulkDiscount = item?.bulkPricing && quantity >= item?.bulkPricing?.minQuantity;

  return (
    <div className="bg-card border border-border rounded-lg p-4 md:p-6 shadow-elevation-1 transition-smooth hover:shadow-elevation-2">
      <div className="flex flex-col sm:flex-row gap-4 md:gap-6">
        {/* Product Image */}
        <div className="flex-shrink-0 w-full sm:w-32 md:w-40">
          <div className="aspect-square overflow-hidden rounded-md bg-muted">
            <AppImage
              src={item?.image}
              alt={item?.alt}
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Product Details */}
        <div className="flex-1 min-w-0">
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 mb-3">
            <div className="flex-1 min-w-0">
              <h3 className="text-base md:text-lg font-semibold text-foreground line-clamp-2 mb-1">
                {item?.name}
              </h3>
              <p className="text-xs md:text-sm text-muted-foreground line-clamp-1 mb-2">
                {item?.chemicalType} | {item?.concentration}
              </p>
              
              {/* Safety Badge */}
              {item?.hazmat && (
                <div className="inline-flex items-center gap-1 px-2 py-1 bg-warning/10 text-warning rounded text-xs font-medium">
                  <Icon name="ExclamationTriangleIcon" size={14} variant="solid" />
                  <span>Material Peligroso</span>
                </div>
              )}
            </div>

            {/* Price Section */}
            <div className="text-right flex-shrink-0">
              <p className="text-lg md:text-xl font-bold text-primary whitespace-nowrap">
                €{item?.price?.toFixed(2)}
              </p>
              <p className="text-xs text-muted-foreground">por unidad</p>
            </div>
          </div>

          {/* Bulk Pricing Notification */}
          {bulkDiscount && (
            <div className="bg-success/10 border border-success/20 rounded-md p-2 mb-3">
              <p className="text-xs md:text-sm text-success font-medium flex items-center gap-2">
                <Icon name="CheckCircleIcon" size={16} variant="solid" />
                <span>¡Precio al por mayor aplicado! Ahorro de €{((item?.price - item?.bulkPricing?.price) * quantity)?.toFixed(2)}</span>
              </p>
            </div>
          )}

          {/* Quantity Controls and Actions */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            {/* Quantity Controls */}
            <div className="flex items-center gap-3">
              <span className="text-sm text-muted-foreground">Cantidad:</span>
              <div className="flex items-center border border-border rounded-md">
                <button
                  onClick={decrementQuantity}
                  disabled={quantity <= 1 || isUpdating}
                  className="p-2 hover:bg-muted transition-smooth disabled:opacity-50 disabled:cursor-not-allowed"
                  aria-label="Disminuir cantidad"
                >
                  <Icon name="MinusIcon" size={16} />
                </button>
                <span className="px-4 py-2 text-sm font-semibold min-w-[3rem] text-center">
                  {quantity}
                </span>
                <button
                  onClick={incrementQuantity}
                  disabled={quantity >= item?.maxQuantity || isUpdating}
                  className="p-2 hover:bg-muted transition-smooth disabled:opacity-50 disabled:cursor-not-allowed"
                  aria-label="Aumentar cantidad"
                >
                  <Icon name="PlusIcon" size={16} />
                </button>
              </div>
              <span className="text-xs text-muted-foreground">
                (Máx: {item?.maxQuantity})
              </span>
            </div>

            {/* Line Total */}
            <div className="flex items-center justify-between sm:justify-end gap-4">
              <span className="text-sm text-muted-foreground">Subtotal:</span>
              <span className="text-xl md:text-2xl font-bold text-primary whitespace-nowrap">
                €{lineTotal}
              </span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-2 mt-4 pt-4 border-t border-border">
            <button
              onClick={handleSaveForLater}
              className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-foreground hover:bg-muted rounded-md transition-smooth"
            >
              <Icon name="BookmarkIcon" size={16} />
              <span>Guardar para después</span>
            </button>
            <button
              onClick={handleRemove}
              className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-error hover:bg-error/10 rounded-md transition-smooth"
            >
              <Icon name="TrashIcon" size={16} />
              <span>Eliminar</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

CartItem.propTypes = {
  item: PropTypes?.shape({
    id: PropTypes?.string?.isRequired,
    name: PropTypes?.string?.isRequired,
    image: PropTypes?.string?.isRequired,
    alt: PropTypes?.string?.isRequired,
    chemicalType: PropTypes?.string?.isRequired,
    concentration: PropTypes?.string?.isRequired,
    price: PropTypes?.number?.isRequired,
    quantity: PropTypes?.number?.isRequired,
    maxQuantity: PropTypes?.number?.isRequired,
    hazmat: PropTypes?.bool?.isRequired,
    bulkPricing: PropTypes?.shape({
      minQuantity: PropTypes?.number?.isRequired,
      price: PropTypes?.number?.isRequired,
    }),
  })?.isRequired,
  onUpdateQuantity: PropTypes?.func?.isRequired,
  onRemove: PropTypes?.func?.isRequired,
  onSaveForLater: PropTypes?.func?.isRequired,
};