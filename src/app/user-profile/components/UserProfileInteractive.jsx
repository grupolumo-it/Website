'use client';

import { useState } from 'react';
import PropTypes from 'prop-types';
import Icon from '@/components/ui/AppIcon';
import PersonalInfoSection from './PersonalInfoSection';
import AddressSection from './AddressSection';
import PaymentMethodsSection from './PaymentMethodsSection';
import DistributorSettingsSection from './DistributorSettingsSection';
import SecuritySection from './SecuritySection';

export default function UserProfileInteractive({ initialData }) {
  const [activeTab, setActiveTab] = useState('personal');
  const [userData, setUserData] = useState(initialData?.user);
  const [addresses, setAddresses] = useState(initialData?.addresses);
  const [paymentMethods, setPaymentMethods] = useState(initialData?.paymentMethods);
  const [distributorData, setDistributorData] = useState(initialData?.distributor);
  const [securityData, setSecurityData] = useState(initialData?.security);

  const tabs = [
    { id: 'personal', label: 'Información Personal', icon: 'UserIcon' },
    { id: 'addresses', label: 'Direcciones', icon: 'MapPinIcon' },
    { id: 'payments', label: 'Métodos de Pago', icon: 'CreditCardIcon' },
    ...(userData?.accountType === 'distributor'
      ? [{ id: 'distributor', label: 'Distribuidor', icon: 'ChartBarIcon' }]
      : []),
    { id: 'security', label: 'Seguridad', icon: 'ShieldCheckIcon' },
  ];

  const handleUpdatePersonalInfo = (updatedData) => {
    setUserData((prev) => ({ ...prev, ...updatedData }));
  };

  const handleAddAddress = (newAddress) => {
    const address = {
      ...newAddress,
      id: addresses?.length + 1,
    };
    if (newAddress?.isDefault) {
      setAddresses((prev) =>
        prev?.map((addr) => ({ ...addr, isDefault: false }))?.concat(address)
      );
    } else {
      setAddresses((prev) => [...prev, address]);
    }
  };

  const handleUpdateAddress = (id, updatedAddress) => {
    setAddresses((prev) =>
      prev?.map((addr) => {
        if (addr?.id === id) return { ...addr, ...updatedAddress };
        if (updatedAddress?.isDefault) return { ...addr, isDefault: false };
        return addr;
      })
    );
  };

  const handleDeleteAddress = (id) => {
    setAddresses((prev) => prev?.filter((addr) => addr?.id !== id));
  };

  const handleSetDefaultAddress = (id) => {
    setAddresses((prev) =>
      prev?.map((addr) => ({ ...addr, isDefault: addr?.id === id }))
    );
  };

  const handleAddPayment = (newPayment) => {
    const payment = {
      ...newPayment,
      id: paymentMethods?.length + 1,
    };
    if (newPayment?.isDefault) {
      setPaymentMethods((prev) =>
        prev?.map((method) => ({ ...method, isDefault: false }))?.concat(payment)
      );
    } else {
      setPaymentMethods((prev) => [...prev, payment]);
    }
  };

  const handleDeletePayment = (id) => {
    setPaymentMethods((prev) => prev?.filter((method) => method?.id !== id));
  };

  const handleSetDefaultPayment = (id) => {
    setPaymentMethods((prev) =>
      prev?.map((method) => ({ ...method, isDefault: method?.id === id }))
    );
  };

  const handleUpdateDistributor = (updatedData) => {
    setDistributorData((prev) => ({ ...prev, ...updatedData }));
  };

  const handleUpdatePassword = (passwordData) => {
    const currentDate = new Date()?.toLocaleDateString('es-ES', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    });
    setSecurityData((prev) => ({
      ...prev,
      lastPasswordChange: currentDate,
    }));
  };

  const handleToggle2FA = () => {
    setSecurityData((prev) => ({
      ...prev,
      twoFactorEnabled: !prev?.twoFactorEnabled,
    }));
  };

  return (
    <div className="w-full">
      <div className="mb-6 md:mb-8">
        <div className="border-b border-border overflow-x-auto">
          <nav className="flex space-x-2 md:space-x-4 min-w-max px-4 md:px-0">
            {tabs?.map((tab) => (
              <button
                key={tab?.id}
                onClick={() => setActiveTab(tab?.id)}
                className={`flex items-center space-x-2 px-4 py-3 text-sm font-medium border-b-2 transition-smooth whitespace-nowrap ${
                  activeTab === tab?.id
                    ? 'border-primary text-primary' :'border-transparent text-muted-foreground hover:text-foreground hover:border-border'
                }`}
              >
                <Icon name={tab?.icon} size={20} />
                <span>{tab?.label}</span>
              </button>
            ))}
          </nav>
        </div>
      </div>
      <div className="space-y-6">
        {activeTab === 'personal' && (
          <PersonalInfoSection userData={userData} onUpdate={handleUpdatePersonalInfo} />
        )}

        {activeTab === 'addresses' && (
          <AddressSection
            addresses={addresses}
            onAddAddress={handleAddAddress}
            onUpdateAddress={handleUpdateAddress}
            onDeleteAddress={handleDeleteAddress}
            onSetDefault={handleSetDefaultAddress}
          />
        )}

        {activeTab === 'payments' && (
          <PaymentMethodsSection
            paymentMethods={paymentMethods}
            onAddPayment={handleAddPayment}
            onDeletePayment={handleDeletePayment}
            onSetDefault={handleSetDefaultPayment}
          />
        )}

        {activeTab === 'distributor' && userData?.accountType === 'distributor' && (
          <DistributorSettingsSection
            distributorData={distributorData}
            onUpdate={handleUpdateDistributor}
          />
        )}

        {activeTab === 'security' && (
          <SecuritySection
            securityData={securityData}
            onUpdatePassword={handleUpdatePassword}
            onToggle2FA={handleToggle2FA}
          />
        )}
      </div>
    </div>
  );
}

UserProfileInteractive.propTypes = {
  initialData: PropTypes?.shape({
    user: PropTypes?.shape({
      name: PropTypes?.string?.isRequired,
      email: PropTypes?.string?.isRequired,
      phone: PropTypes?.string?.isRequired,
      businessName: PropTypes?.string,
      taxId: PropTypes?.string,
      language: PropTypes?.string?.isRequired,
      emailNotifications: PropTypes?.bool?.isRequired,
      smsNotifications: PropTypes?.bool?.isRequired,
      accountType: PropTypes?.string?.isRequired,
    })?.isRequired,
    addresses: PropTypes?.array?.isRequired,
    paymentMethods: PropTypes?.array?.isRequired,
    distributor: PropTypes?.object,
    security: PropTypes?.object?.isRequired,
  })?.isRequired,
};