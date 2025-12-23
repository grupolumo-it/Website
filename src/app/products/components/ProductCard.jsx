'use client';

import { useState } from 'react';
import Icon from '@/components/ui/AppIcon';
import AppImage from '@/components/ui/AppImage';
import PropTypes from 'prop-types';

export default function ProductCard({ product, viewMode }) {
  const [isFavorite, setIsFavorite] = useState(false);

  const handleAddToCart = () => {
    try {
      const cart = JSON.parse(localStorage.getItem('chemclean_cart') || '[]');
      const existingItem = cart?.find(item => item?.id === product?.id);

      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        cart.push({ ...product, quantity: 1 });
      }

      localStorage.setItem('chemclean_cart', JSON.stringify(cart));
      alert(`${product?.name} agregado al carrito`);
    } catch (error) {
      console.error('Error adding to cart:', error);
    }
  };

  const toggleFavorite = () => {
    setIsFavorite(!isFavorite);
  };

  if (viewMode === 'list') {
    return (
      <div className="bg-card border border-border rounded-lg shadow-elevation-1 hover:shadow-elevation-2 transition-smooth overflow-hidden">
        <div className="flex flex-col sm:flex-row">
          <div className="sm:w-56 h-56 sm:h-auto flex-shrink-0 overflow-hidden">
            <AppImage
              src={product?.image}
              alt={product?.name}
              className="w-full h-full object-cover hover:scale-105 transition-smooth"
              width={224}
              height={224}
            />
          </div>
          <div className="flex-1 p-6">
            <div className="flex items-start justify-between mb-3">
              <div className="flex-1">
                <h3 className="text-lg md:text-xl font-semibold text-foreground mb-2">
                  {product?.name}
                </h3>
                <p className="text-sm text-muted-foreground mb-4">
                  {product?.description}
                </p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {product?.features?.map((feature, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-accent text-accent-foreground text-xs font-medium rounded-md"
                    >
                      {feature}
                    </span>
                  ))}
                </div>
              </div>
              <div className="text-right ml-6 flex-shrink-0">
                <div className="text-2xl font-semibold text-primary mb-2">
                  ${product?.price?.toFixed(2)}
                </div>
                <div className="text-xs font-medium">
                  {product?.stock > 0 ? (
                    <span className="text-success flex items-center justify-end space-x-1">
                      <Icon name="CheckCircleIcon" size={14} />
                      <span>Stock: {product?.stock}</span>
                    </span>
                  ) : (
                    <span className="text-error flex items-center justify-end space-x-1">
                      <Icon name="XCircleIcon" size={14} />
                      <span>Agotado</span>
                    </span>
                  )}
                </div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={handleAddToCart}
                disabled={product?.stock === 0}
                className="flex-1 py-3 px-6 bg-primary text-primary-foreground rounded-lg text-sm font-medium transition-smooth hover:shadow-elevation-2 active:scale-97 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
              >
                <Icon name="ShoppingCartIcon" size={20} />
                <span>Agregar al Carrito</span>
              </button>
              <button
                onClick={toggleFavorite}
                className={`p-3 border rounded-lg transition-smooth ${
                  isFavorite
                    ? 'border-error bg-error/10'
                    : 'border-border hover:bg-muted'
                }`}
              >
                <Icon
                  name="HeartIcon"
                  size={20}
                  className={isFavorite ? 'text-error' : 'text-foreground'}
                  variant={isFavorite ? 'solid' : 'outline'}
                />
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-card border border-border rounded-lg shadow-elevation-1 hover:shadow-elevation-2 transition-smooth overflow-hidden group">
      <div className="relative h-64 overflow-hidden">
        <AppImage
          src={product?.image}
          alt={product?.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-smooth"
          fill
        />
        {product?.stock > 0 && product?.stock <= 50 && (
          <div className="absolute top-3 right-3 px-3 py-1 bg-warning text-warning-foreground text-xs font-semibold rounded-full shadow-elevation-1">
            Pocas Unidades
          </div>
        )}
        {product?.stock === 0 && (
          <div className="absolute top-3 right-3 px-3 py-1 bg-error text-error-foreground text-xs font-semibold rounded-full shadow-elevation-1">
            Agotado
          </div>
        )}
        <button
          onClick={toggleFavorite}
          className={`absolute top-3 left-3 p-2 rounded-full backdrop-blur-sm transition-smooth ${
            isFavorite
              ? 'bg-error/90 text-error-foreground'
              : 'bg-card/90 text-foreground hover:bg-card'
          }`}
        >
          <Icon name="HeartIcon" size={20} variant={isFavorite ? 'solid' : 'outline'} />
        </button>
      </div>
      <div className="p-6">
        <h3 className="text-lg font-semibold text-foreground mb-2 line-clamp-1">
          {product?.name}
        </h3>
        <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
          {product?.description}
        </p>
        <div className="flex flex-wrap gap-2 mb-4">
          {product?.features?.slice(0, 2)?.map((feature, index) => (
            <span
              key={index}
              className="px-2 py-1 bg-accent text-accent-foreground text-xs font-medium rounded-md"
            >
              {feature}
            </span>
          ))}
        </div>
        <div className="flex items-center justify-between mb-4">
          <div className="text-2xl font-semibold text-primary">
            ${product?.price?.toFixed(2)}
          </div>
          <div className="text-xs font-medium">
            {product?.stock > 0 ? (
              <span className="text-success flex items-center space-x-1">
                <Icon name="CheckCircleIcon" size={14} />
                <span>Stock: {product?.stock}</span>
              </span>
            ) : (
              <span className="text-error flex items-center space-x-1">
                <Icon name="XCircleIcon" size={14} />
                <span>Agotado</span>
              </span>
            )}
          </div>
        </div>
        <button
          onClick={handleAddToCart}
          disabled={product?.stock === 0}
          className="w-full py-3 px-6 bg-primary text-primary-foreground rounded-lg text-sm font-medium transition-smooth hover:shadow-elevation-2 active:scale-97 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
        >
          <Icon name="ShoppingCartIcon" size={20} />
          <span>Agregar al Carrito</span>
        </button>
      </div>
    </div>
  );
}

ProductCard.propTypes = {
  product: PropTypes?.shape({
    id: PropTypes?.number?.isRequired,
    name: PropTypes?.string?.isRequired,
    description: PropTypes?.string?.isRequired,
    price: PropTypes?.number?.isRequired,
    stock: PropTypes?.number?.isRequired,
    image: PropTypes?.string?.isRequired,
    features: PropTypes?.arrayOf(PropTypes?.string)
  })?.isRequired,
  viewMode: PropTypes?.string?.isRequired
};
