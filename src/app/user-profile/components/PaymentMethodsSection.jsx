'use client';

import { useState } from 'react';
import PropTypes from 'prop-types';
import Icon from '@/components/ui/AppIcon';

export default function PaymentMethodsSection({ paymentMethods, onAddPayment, onDeletePayment, onSetDefault }) {
  const [isAdding, setIsAdding] = useState(false);
  const [formData, setFormData] = useState({
    type: 'card',
    cardNumber: '',
    cardHolder: '',
    expiryMonth: '',
    expiryYear: '',
    cvv: '',
    bankName: '',
    accountNumber: '',
    isDefault: false,
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value, type, checked } = e?.target;
    let processedValue = value;

    if (name === 'cardNumber') {
      processedValue = value?.replace(/\s/g, '')?.replace(/(\d{4})/g, '$1 ')?.trim();
    }

    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : processedValue,
    }));

    if (errors?.[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (formData?.type === 'card') {
      const cardNumberClean = formData?.cardNumber?.replace(/\s/g, '');
      if (!cardNumberClean) newErrors.cardNumber = 'El número de tarjeta es obligatorio';
      else if (!/^\d{16}$/?.test(cardNumberClean)) {
        newErrors.cardNumber = 'Número de tarjeta inválido (16 dígitos)';
      }

      if (!formData?.cardHolder?.trim()) newErrors.cardHolder = 'El titular es obligatorio';
      if (!formData?.expiryMonth) newErrors.expiryMonth = 'El mes es obligatorio';
      if (!formData?.expiryYear) newErrors.expiryYear = 'El año es obligatorio';
      if (!formData?.cvv) newErrors.cvv = 'El CVV es obligatorio';
      else if (!/^\d{3,4}$/?.test(formData?.cvv)) {
        newErrors.cvv = 'CVV inválido (3-4 dígitos)';
      }
    } else if (formData?.type === 'bank') {
      if (!formData?.bankName?.trim()) newErrors.bankName = 'El nombre del banco es obligatorio';
      if (!formData?.accountNumber?.trim()) {
        newErrors.accountNumber = 'El número de cuenta es obligatorio';
      } else if (!/^ES\d{22}$/?.test(formData?.accountNumber?.replace(/\s/g, ''))) {
        newErrors.accountNumber = 'IBAN inválido (formato: ES + 22 dígitos)';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors)?.length === 0;
  };

  const handleSubmit = (e) => {
    e?.preventDefault();
    if (validateForm()) {
      const paymentData = {
        ...formData,
        cardNumber: formData?.cardNumber?.replace(/\s/g, ''),
        accountNumber: formData?.accountNumber?.replace(/\s/g, ''),
      };
      onAddPayment(paymentData);
      resetForm();
      setIsAdding(false);
    }
  };

  const handleCancel = () => {
    resetForm();
    setIsAdding(false);
  };

  const resetForm = () => {
    setFormData({
      type: 'card',
      cardNumber: '',
      cardHolder: '',
      expiryMonth: '',
      expiryYear: '',
      cvv: '',
      bankName: '',
      accountNumber: '',
      isDefault: false,
    });
    setErrors({});
  };

  const getCardBrand = (number) => {
    const cleanNumber = number?.replace(/\s/g, '');
    if (/^4/?.test(cleanNumber)) return 'Visa';
    if (/^5[1-5]/?.test(cleanNumber)) return 'Mastercard';
    if (/^3[47]/?.test(cleanNumber)) return 'American Express';
    return 'Tarjeta';
  };

  const currentYear = new Date()?.getFullYear();
  const years = Array.from({ length: 15 }, (_, i) => currentYear + i);
  const months = Array.from({ length: 12 }, (_, i) => String(i + 1)?.padStart(2, '0'));

  return (
    <div className="bg-card rounded-lg border border-border shadow-elevation-1 p-4 md:p-6 lg:p-8">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl md:text-2xl lg:text-3xl font-semibold text-foreground">
          Métodos de Pago
        </h2>
        {!isAdding && (
          <button
            onClick={() => setIsAdding(true)}
            className="flex items-center space-x-2 px-4 py-2 bg-primary text-primary-foreground rounded-md text-sm font-medium transition-smooth hover:shadow-elevation-2 active:scale-97"
          >
            <Icon name="PlusIcon" size={16} />
            <span>Añadir Método</span>
          </button>
        )}
      </div>
      {isAdding && (
        <form onSubmit={handleSubmit} className="mb-6 p-4 md:p-6 bg-muted rounded-lg border border-border">
          <h3 className="text-base md:text-lg font-semibold text-foreground mb-4">
            Nuevo Método de Pago
          </h3>

          <div className="mb-4">
            <label className="block text-sm font-medium text-foreground mb-2">Tipo de Pago</label>
            <div className="flex gap-4">
              <label className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="radio"
                  name="type"
                  value="card"
                  checked={formData?.type === 'card'}
                  onChange={handleChange}
                  className="w-4 h-4 text-primary focus:ring-ring"
                />
                <span className="text-sm text-foreground">Tarjeta de Crédito/Débito</span>
              </label>
              <label className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="radio"
                  name="type"
                  value="bank"
                  checked={formData?.type === 'bank'}
                  onChange={handleChange}
                  className="w-4 h-4 text-primary focus:ring-ring"
                />
                <span className="text-sm text-foreground">Cuenta Bancaria</span>
              </label>
            </div>
          </div>

          {formData?.type === 'card' ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="md:col-span-2">
                <label htmlFor="cardNumber" className="block text-sm font-medium text-foreground mb-2">
                  Número de Tarjeta <span className="text-error">*</span>
                </label>
                <input
                  type="text"
                  id="cardNumber"
                  name="cardNumber"
                  value={formData?.cardNumber}
                  onChange={handleChange}
                  maxLength={19}
                  placeholder="1234 5678 9012 3456"
                  className={`w-full px-4 py-2 border rounded-md text-sm bg-background transition-smooth ${
                    errors?.cardNumber ? 'border-error focus:ring-error' : 'border-input focus:ring-ring'
                  }`}
                />
                {errors?.cardNumber && <p className="mt-1 text-xs text-error">{errors?.cardNumber}</p>}
              </div>

              <div className="md:col-span-2">
                <label htmlFor="cardHolder" className="block text-sm font-medium text-foreground mb-2">
                  Titular de la Tarjeta <span className="text-error">*</span>
                </label>
                <input
                  type="text"
                  id="cardHolder"
                  name="cardHolder"
                  value={formData?.cardHolder}
                  onChange={handleChange}
                  placeholder="Nombre como aparece en la tarjeta"
                  className={`w-full px-4 py-2 border rounded-md text-sm bg-background transition-smooth ${
                    errors?.cardHolder ? 'border-error focus:ring-error' : 'border-input focus:ring-ring'
                  }`}
                />
                {errors?.cardHolder && <p className="mt-1 text-xs text-error">{errors?.cardHolder}</p>}
              </div>

              <div>
                <label htmlFor="expiryMonth" className="block text-sm font-medium text-foreground mb-2">
                  Mes de Expiración <span className="text-error">*</span>
                </label>
                <select
                  id="expiryMonth"
                  name="expiryMonth"
                  value={formData?.expiryMonth}
                  onChange={handleChange}
                  className={`w-full px-4 py-2 border rounded-md text-sm bg-background transition-smooth ${
                    errors?.expiryMonth ? 'border-error focus:ring-error' : 'border-input focus:ring-ring'
                  }`}
                >
                  <option value="">Mes</option>
                  {months?.map((month) => (
                    <option key={month} value={month}>
                      {month}
                    </option>
                  ))}
                </select>
                {errors?.expiryMonth && <p className="mt-1 text-xs text-error">{errors?.expiryMonth}</p>}
              </div>

              <div>
                <label htmlFor="expiryYear" className="block text-sm font-medium text-foreground mb-2">
                  Año de Expiración <span className="text-error">*</span>
                </label>
                <select
                  id="expiryYear"
                  name="expiryYear"
                  value={formData?.expiryYear}
                  onChange={handleChange}
                  className={`w-full px-4 py-2 border rounded-md text-sm bg-background transition-smooth ${
                    errors?.expiryYear ? 'border-error focus:ring-error' : 'border-input focus:ring-ring'
                  }`}
                >
                  <option value="">Año</option>
                  {years?.map((year) => (
                    <option key={year} value={year}>
                      {year}
                    </option>
                  ))}
                </select>
                {errors?.expiryYear && <p className="mt-1 text-xs text-error">{errors?.expiryYear}</p>}
              </div>

              <div>
                <label htmlFor="cvv" className="block text-sm font-medium text-foreground mb-2">
                  CVV <span className="text-error">*</span>
                </label>
                <input
                  type="text"
                  id="cvv"
                  name="cvv"
                  value={formData?.cvv}
                  onChange={handleChange}
                  maxLength={4}
                  placeholder="123"
                  className={`w-full px-4 py-2 border rounded-md text-sm bg-background transition-smooth ${
                    errors?.cvv ? 'border-error focus:ring-error' : 'border-input focus:ring-ring'
                  }`}
                />
                {errors?.cvv && <p className="mt-1 text-xs text-error">{errors?.cvv}</p>}
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-4">
              <div>
                <label htmlFor="bankName" className="block text-sm font-medium text-foreground mb-2">
                  Nombre del Banco <span className="text-error">*</span>
                </label>
                <input
                  type="text"
                  id="bankName"
                  name="bankName"
                  value={formData?.bankName}
                  onChange={handleChange}
                  className={`w-full px-4 py-2 border rounded-md text-sm bg-background transition-smooth ${
                    errors?.bankName ? 'border-error focus:ring-error' : 'border-input focus:ring-ring'
                  }`}
                />
                {errors?.bankName && <p className="mt-1 text-xs text-error">{errors?.bankName}</p>}
              </div>

              <div>
                <label htmlFor="accountNumber" className="block text-sm font-medium text-foreground mb-2">
                  Número de Cuenta (IBAN) <span className="text-error">*</span>
                </label>
                <input
                  type="text"
                  id="accountNumber"
                  name="accountNumber"
                  value={formData?.accountNumber}
                  onChange={handleChange}
                  placeholder="ES1234567890123456789012"
                  className={`w-full px-4 py-2 border rounded-md text-sm bg-background transition-smooth ${
                    errors?.accountNumber ? 'border-error focus:ring-error' : 'border-input focus:ring-ring'
                  }`}
                />
                {errors?.accountNumber && <p className="mt-1 text-xs text-error">{errors?.accountNumber}</p>}
              </div>
            </div>
          )}

          <div className="mt-4">
            <label className="flex items-center space-x-3 cursor-pointer">
              <input
                type="checkbox"
                name="isDefault"
                checked={formData?.isDefault}
                onChange={handleChange}
                className="w-5 h-5 rounded border-input text-primary focus:ring-ring"
              />
              <span className="text-sm text-foreground">Establecer como método predeterminado</span>
            </label>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 mt-6">
            <button
              type="submit"
              className="flex-1 sm:flex-none px-6 py-2 bg-primary text-primary-foreground rounded-md text-sm font-medium transition-smooth hover:shadow-elevation-2 active:scale-97"
            >
              Guardar
            </button>
            <button
              type="button"
              onClick={handleCancel}
              className="flex-1 sm:flex-none px-6 py-2 bg-background text-foreground border border-border rounded-md text-sm font-medium transition-smooth hover:bg-muted active:scale-97"
            >
              Cancelar
            </button>
          </div>
        </form>
      )}
      <div className="space-y-4">
        {paymentMethods?.length === 0 ? (
          <div className="text-center py-12">
            <Icon name="CreditCardIcon" size={48} className="mx-auto text-muted-foreground mb-4" />
            <p className="text-sm md:text-base text-muted-foreground">
              No tienes métodos de pago guardados
            </p>
          </div>
        ) : (
          paymentMethods?.map((method) => (
            <div
              key={method?.id}
              className={`p-4 md:p-6 rounded-lg border transition-smooth ${
                method?.isDefault
                  ? 'border-primary bg-accent/10' :'border-border bg-background hover:border-primary/50'
              }`}
            >
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-muted rounded-lg">
                    <Icon
                      name={method?.type === 'card' ? 'CreditCardIcon' : 'BanknotesIcon'}
                      size={24}
                      className="text-primary"
                    />
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="text-base md:text-lg font-semibold text-foreground">
                        {method?.type === 'card'
                          ? getCardBrand(method?.cardNumber)
                          : method?.bankName}
                      </h3>
                      {method?.isDefault && (
                        <span className="px-2 py-1 bg-primary text-primary-foreground text-xs font-medium rounded">
                          Predeterminado
                        </span>
                      )}
                    </div>
                    {method?.type === 'card' ? (
                      <>
                        <p className="text-sm text-muted-foreground">
                          •••• •••• •••• {method?.cardNumber?.slice(-4)}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          Expira: {method?.expiryMonth}/{method?.expiryYear}
                        </p>
                        <p className="text-sm text-muted-foreground">{method?.cardHolder}</p>
                      </>
                    ) : (
                      <p className="text-sm text-muted-foreground">
                        {method?.accountNumber?.slice(0, 4)} •••• •••• •••• ••••{' '}
                        {method?.accountNumber?.slice(-4)}
                      </p>
                    )}
                  </div>
                </div>

                <div className="flex sm:flex-col gap-2">
                  {!method?.isDefault && (
                    <button
                      onClick={() => onSetDefault(method?.id)}
                      className="flex items-center justify-center space-x-1 px-3 py-2 text-sm text-foreground hover:bg-muted rounded-md transition-smooth"
                    >
                      <Icon name="StarIcon" size={16} />
                      <span>Predeterminar</span>
                    </button>
                  )}
                  <button
                    onClick={() => onDeletePayment(method?.id)}
                    className="flex items-center justify-center space-x-1 px-3 py-2 text-sm text-error hover:bg-error/10 rounded-md transition-smooth"
                  >
                    <Icon name="TrashIcon" size={16} />
                    <span>Eliminar</span>
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
      <div className="mt-6 p-4 bg-accent/10 border border-accent rounded-lg">
        <div className="flex items-start gap-3">
          <Icon name="ShieldCheckIcon" size={20} className="text-primary flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-sm font-medium text-foreground mb-1">Seguridad PCI-DSS</p>
            <p className="text-xs text-muted-foreground">
              Todos los datos de pago están encriptados y protegidos según los estándares de seguridad
              PCI-DSS. Nunca almacenamos tu CVV.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

PaymentMethodsSection.propTypes = {
  paymentMethods: PropTypes?.arrayOf(
    PropTypes?.shape({
      id: PropTypes?.number?.isRequired,
      type: PropTypes?.oneOf(['card', 'bank'])?.isRequired,
      cardNumber: PropTypes?.string,
      cardHolder: PropTypes?.string,
      expiryMonth: PropTypes?.string,
      expiryYear: PropTypes?.oneOfType([PropTypes?.string, PropTypes?.number]),
      bankName: PropTypes?.string,
      accountNumber: PropTypes?.string,
      isDefault: PropTypes?.bool?.isRequired,
    })
  )?.isRequired,
  onAddPayment: PropTypes?.func?.isRequired,
  onDeletePayment: PropTypes?.func?.isRequired,
  onSetDefault: PropTypes?.func?.isRequired,
};