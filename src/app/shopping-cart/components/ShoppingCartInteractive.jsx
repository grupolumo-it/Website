'use client';

import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import CartItem from './CartItem';
import SafetyWarning from './SafetyWarning';
import PromoCodeInput from './PromoCodeInput';
import OrderSummary from './OrderSummary';
import EmptyCart from './EmptyCart';

export default function ShoppingCartInteractive({ initialCartData, initialUserData }) {
  const [cartItems, setCartItems] = useState(initialCartData?.items);
  const [appliedPromoCode, setAppliedPromoCode] = useState(null);
  const [safetyWarnings, setSafetyWarnings] = useState([]);

  useEffect(() => {
    checkChemicalCompatibility();
  }, [cartItems]);

  const checkChemicalCompatibility = () => {
    const warnings = [];
    const acidProducts = cartItems?.filter(item => item?.chemicalType === 'Ácido');
    const baseProducts = cartItems?.filter(item => item?.chemicalType === 'Base');

    if (acidProducts?.length > 0 && baseProducts?.length > 0) {
      warnings?.push({
        title: 'Productos Ácidos y Básicos Detectados',
        message: 'Su carrito contiene productos ácidos y básicos que no deben mezclarse. La mezcla puede causar reacciones peligrosas.',
        recommendation: 'Considere realizar envíos separados o almacenar estos productos de forma segura y separada.',
      });
    }

    const chlorineProducts = cartItems?.filter(item => item?.name?.toLowerCase()?.includes('cloro'));
    const ammoniaProducts = cartItems?.filter(item => item?.name?.toLowerCase()?.includes('amoníaco'));

    if (chlorineProducts?.length > 0 && ammoniaProducts?.length > 0) {
      warnings?.push({
        title: 'Advertencia Crítica: Cloro y Amoníaco',
        message: 'NUNCA mezcle productos que contengan cloro con productos que contengan amoníaco. Esta combinación produce gases tóxicos peligrosos.',
        recommendation: 'Envío separado obligatorio. Mantenga estos productos en áreas de almacenamiento completamente separadas.',
      });
    }

    setSafetyWarnings(warnings);
  };

  const handleUpdateQuantity = async (itemId, newQuantity) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        setCartItems(prevItems =>
          prevItems.map(item =>
            item.id === itemId ? { ...item, quantity: newQuantity } : item
          )
        );
        resolve();
      }, 300);
    });
  };

  const handleRemoveItem = (itemId) => {
    setCartItems(prevItems => prevItems?.filter(item => item?.id !== itemId));
  };

  const handleSaveForLater = (itemId) => {
    const item = cartItems?.find(i => i?.id === itemId);
    if (item) {
      alert(`"${item?.name}" se ha guardado para más tarde.`);
      handleRemoveItem(itemId);
    }
  };

  const handleApplyPromoCode = async (code) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        if (code === null) {
          setAppliedPromoCode(null);
          resolve({ success: true });
          return;
        }

        const validCodes = {
          'LIMPIEZA10': { code: 'LIMPIEZA10', description: '10% de descuento', discount: 0.10 },
          'QUIMICO15': { code: 'QUIMICO15', description: '15% de descuento', discount: 0.15 },
          'DISTRIBUIDOR20': { code: 'DISTRIBUIDOR20', description: '20% de descuento para distribuidores', discount: 0.20 },
        };

        if (validCodes[code]) {
          setAppliedPromoCode(validCodes[code]);
          resolve({ success: true, message: 'Código aplicado correctamente' });
        } else {
          resolve({ success: false, message: 'Código promocional inválido o expirado' });
        }
      }, 500);
    });
  };

  const calculateSummary = () => {
    const subtotal = cartItems?.reduce((sum, item) => {
      const itemPrice = item?.bulkPricing && item?.quantity >= item?.bulkPricing?.minQuantity
        ? item?.bulkPricing?.price
        : item?.price;
      return sum + (itemPrice * item?.quantity);
    }, 0);

    const isDistributor = initialUserData?.accountType === 'distributor';
    const distributorDiscountPercent = isDistributor ? 15 : 0;
    const distributorDiscount = isDistributor ? subtotal * 0.15 : 0;

    const promoDiscount = appliedPromoCode ? subtotal * appliedPromoCode?.discount : 0;

    const hasHazmat = cartItems?.some(item => item?.hazmat);
    const totalWeight = cartItems?.reduce((sum, item) => sum + (item?.weight * item?.quantity), 0);
    const baseShipping = totalWeight > 50 ? 25 : totalWeight > 20 ? 15 : 8;
    const hazmatFee = hasHazmat ? 12 : 0;
    const shipping = subtotal >= 150 ? 0 : baseShipping + hazmatFee;

    const discountedSubtotal = subtotal - distributorDiscount - promoDiscount;
    const taxRate = 21;
    const tax = discountedSubtotal * (taxRate / 100);

    const total = discountedSubtotal + shipping + tax;

    return {
      itemCount: cartItems?.length,
      subtotal,
      distributorDiscount,
      distributorDiscountPercent,
      promoDiscount,
      shipping,
      hazmatShipping: hasHazmat,
      tax,
      taxRate,
      total,
    };
  };

  if (cartItems?.length === 0) {
    return <EmptyCart />;
  }

  const summary = calculateSummary();

  return (
    <div className="min-h-screen bg-background py-8 md:py-12">
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
        <div className="mb-6 md:mb-8">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-2">
            Carrito de Compras
          </h1>
          <p className="text-sm md:text-base text-muted-foreground">
            Revisa tus productos químicos de limpieza seleccionados antes de proceder al pago
          </p>
        </div>

        <SafetyWarning warnings={safetyWarnings} />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
          <div className="lg:col-span-2 space-y-4 md:space-y-6">
            {cartItems?.map((item) => (
              <CartItem
                key={item?.id}
                item={item}
                onUpdateQuantity={handleUpdateQuantity}
                onRemove={handleRemoveItem}
                onSaveForLater={handleSaveForLater}
              />
            ))}

            <div className="bg-card border border-border rounded-lg p-4 md:p-6 shadow-elevation-1">
              <h3 className="text-base md:text-lg font-semibold text-foreground mb-4">
                ¿Tienes un código promocional?
              </h3>
              <PromoCodeInput
                onApplyCode={handleApplyPromoCode}
                appliedCode={appliedPromoCode}
              />
            </div>
          </div>

          <div className="lg:col-span-1">
            <OrderSummary
              summary={summary}
              isDistributor={initialUserData?.accountType === 'distributor'}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

ShoppingCartInteractive.propTypes = {
  initialCartData: PropTypes?.shape({
    items: PropTypes?.arrayOf(
      PropTypes?.shape({
        id: PropTypes?.string?.isRequired,
        name: PropTypes?.string?.isRequired,
        image: PropTypes?.string?.isRequired,
        alt: PropTypes?.string?.isRequired,
        chemicalType: PropTypes?.string?.isRequired,
        concentration: PropTypes?.string?.isRequired,
        price: PropTypes?.number?.isRequired,
        quantity: PropTypes?.number?.isRequired,
        maxQuantity: PropTypes?.number?.isRequired,
        weight: PropTypes?.number?.isRequired,
        hazmat: PropTypes?.bool?.isRequired,
        bulkPricing: PropTypes?.shape({
          minQuantity: PropTypes?.number?.isRequired,
          price: PropTypes?.number?.isRequired,
        }),
      })
    )?.isRequired,
  })?.isRequired,
  initialUserData: PropTypes?.shape({
    accountType: PropTypes?.string,
    name: PropTypes?.string,
  }),
};