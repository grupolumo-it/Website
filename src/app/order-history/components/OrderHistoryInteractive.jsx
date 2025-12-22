'use client';

import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Icon from '@/components/ui/AppIcon';
import OrderCard from './OrderCard';
import OrderFilters from './OrderFilters';

export default function OrderHistoryInteractive({ initialOrders }) {
  const [orders, setOrders] = useState(initialOrders);
  const [filteredOrders, setFilteredOrders] = useState(initialOrders);
  const [currentFilters, setCurrentFilters] = useState({
    status: 'all',
    dateRange: 'all',
    minAmount: '',
    maxAmount: ''
  });
  const [notification, setNotification] = useState(null);

  useEffect(() => {
    applyFilters(currentFilters);
  }, [orders, currentFilters]);

  const showNotification = (message, type = 'success') => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 3000);
  };

  const applyFilters = (filters) => {
    let filtered = [...orders];

    if (filters?.status !== 'all') {
      filtered = filtered?.filter(order => order?.status === filters?.status);
    }

    if (filters?.dateRange !== 'all') {
      const now = new Date();
      const ranges = {
        last7days: 7,
        last30days: 30,
        last3months: 90,
        last6months: 180,
        lastyear: 365
      };
      const days = ranges?.[filters?.dateRange];
      if (days) {
        const cutoffDate = new Date(now.setDate(now.getDate() - days));
        filtered = filtered?.filter(order => new Date(order.date) >= cutoffDate);
      }
    }

    if (filters?.minAmount !== '') {
      const min = parseFloat(filters?.minAmount);
      filtered = filtered?.filter(order => order?.total >= min);
    }

    if (filters?.maxAmount !== '') {
      const max = parseFloat(filters?.maxAmount);
      filtered = filtered?.filter(order => order?.total <= max);
    }

    setFilteredOrders(filtered);
  };

  const handleFilterChange = (newFilters) => {
    setCurrentFilters(newFilters);
  };

  const handleReorder = (orderId) => {
    const order = orders?.find(o => o?.id === orderId);
    if (order) {
      showNotification(`Productos del pedido #${order?.orderNumber} añadidos al carrito`, 'success');
    }
  };

  const handleDownloadInvoice = (orderId) => {
    const order = orders?.find(o => o?.id === orderId);
    if (order) {
      showNotification(`Descargando factura del pedido #${order?.orderNumber}`, 'success');
    }
  };

  const handleRequestReturn = (orderId) => {
    const order = orders?.find(o => o?.id === orderId);
    if (order) {
      showNotification(`Solicitud de devolución iniciada para pedido #${order?.orderNumber}`, 'success');
    }
  };

  return (
    <div className="space-y-6">
      {notification && (
        <div className={`fixed top-20 right-4 md:right-8 z-50 px-4 md:px-6 py-3 md:py-4 rounded-lg shadow-elevation-4 flex items-center gap-3 ${
          notification?.type === 'success' ? 'bg-success text-success-foreground' : 'bg-error text-error-foreground'
        } animate-slide-in-right`}>
          <Icon name={notification?.type === 'success' ? 'CheckCircleIcon' : 'XCircleIcon'} size={20} />
          <span className="text-sm md:text-base font-medium">{notification?.message}</span>
        </div>
      )}
      <OrderFilters onFilterChange={handleFilterChange} />
      <div className="flex items-center justify-between">
        <p className="text-sm md:text-base text-muted-foreground">
          Mostrando {filteredOrders?.length} de {orders?.length} pedidos
        </p>
      </div>
      {filteredOrders?.length === 0 ? (
        <div className="bg-card border border-border rounded-lg p-8 md:p-12 text-center">
          <div className="w-16 h-16 md:w-20 md:h-20 mx-auto mb-4 bg-muted rounded-full flex items-center justify-center">
            <Icon name="ShoppingBagIcon" size={32} className="text-muted-foreground" />
          </div>
          <h3 className="text-lg md:text-xl font-semibold text-foreground mb-2">
            No se encontraron pedidos
          </h3>
          <p className="text-sm md:text-base text-muted-foreground mb-6">
            No hay pedidos que coincidan con los filtros seleccionados
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredOrders?.map((order) => (
            <OrderCard
              key={order?.id}
              order={order}
              onReorder={handleReorder}
              onDownloadInvoice={handleDownloadInvoice}
              onRequestReturn={handleRequestReturn}
            />
          ))}
        </div>
      )}
    </div>
  );
}

OrderHistoryInteractive.propTypes = {
  initialOrders: PropTypes?.arrayOf(PropTypes?.shape({
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
  }))?.isRequired
};