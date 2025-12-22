'use client';

import { useState } from 'react';
import PropTypes from 'prop-types';
import Icon from '@/components/ui/AppIcon';

export default function AddressSection({ addresses, onAddAddress, onUpdateAddress, onDeleteAddress, onSetDefault }) {
  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    label: '',
    fullName: '',
    street: '',
    city: '',
    state: '',
    postalCode: '',
    country: 'España',
    phone: '',
    isDefault: false,
    allowsHazmat: true,
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value, type, checked } = e?.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
    if (errors?.[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData?.label?.trim()) newErrors.label = 'La etiqueta es obligatoria';
    if (!formData?.fullName?.trim()) newErrors.fullName = 'El nombre completo es obligatorio';
    if (!formData?.street?.trim()) newErrors.street = 'La dirección es obligatoria';
    if (!formData?.city?.trim()) newErrors.city = 'La ciudad es obligatoria';
    if (!formData?.state?.trim()) newErrors.state = 'La provincia es obligatoria';
    if (!formData?.postalCode?.trim()) newErrors.postalCode = 'El código postal es obligatorio';
    if (!/^\d{5}$/?.test(formData?.postalCode)) {
      newErrors.postalCode = 'Código postal inválido (5 dígitos)';
    }
    if (!formData?.phone?.trim()) newErrors.phone = 'El teléfono es obligatorio';
    setErrors(newErrors);
    return Object.keys(newErrors)?.length === 0;
  };

  const handleSubmit = (e) => {
    e?.preventDefault();
    if (validateForm()) {
      if (editingId) {
        onUpdateAddress(editingId, formData);
        setEditingId(null);
      } else {
        onAddAddress(formData);
        setIsAdding(false);
      }
      resetForm();
    }
  };

  const handleEdit = (address) => {
    setFormData(address);
    setEditingId(address?.id);
    setIsAdding(false);
  };

  const handleCancel = () => {
    resetForm();
    setIsAdding(false);
    setEditingId(null);
  };

  const resetForm = () => {
    setFormData({
      label: '',
      fullName: '',
      street: '',
      city: '',
      state: '',
      postalCode: '',
      country: 'España',
      phone: '',
      isDefault: false,
      allowsHazmat: true,
    });
    setErrors({});
  };

  return (
    <div className="bg-card rounded-lg border border-border shadow-elevation-1 p-4 md:p-6 lg:p-8">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl md:text-2xl lg:text-3xl font-semibold text-foreground">
          Direcciones de Envío
        </h2>
        {!isAdding && !editingId && (
          <button
            onClick={() => setIsAdding(true)}
            className="flex items-center space-x-2 px-4 py-2 bg-primary text-primary-foreground rounded-md text-sm font-medium transition-smooth hover:shadow-elevation-2 active:scale-97"
          >
            <Icon name="PlusIcon" size={16} />
            <span>Añadir Dirección</span>
          </button>
        )}
      </div>
      {(isAdding || editingId) && (
        <form onSubmit={handleSubmit} className="mb-6 p-4 md:p-6 bg-muted rounded-lg border border-border">
          <h3 className="text-base md:text-lg font-semibold text-foreground mb-4">
            {editingId ? 'Editar Dirección' : 'Nueva Dirección'}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="label" className="block text-sm font-medium text-foreground mb-2">
                Etiqueta <span className="text-error">*</span>
              </label>
              <input
                type="text"
                id="label"
                name="label"
                value={formData?.label}
                onChange={handleChange}
                placeholder="Casa, Oficina, etc."
                className={`w-full px-4 py-2 border rounded-md text-sm bg-background transition-smooth ${
                  errors?.label ? 'border-error focus:ring-error' : 'border-input focus:ring-ring'
                }`}
              />
              {errors?.label && <p className="mt-1 text-xs text-error">{errors?.label}</p>}
            </div>

            <div>
              <label htmlFor="fullName" className="block text-sm font-medium text-foreground mb-2">
                Nombre Completo <span className="text-error">*</span>
              </label>
              <input
                type="text"
                id="fullName"
                name="fullName"
                value={formData?.fullName}
                onChange={handleChange}
                className={`w-full px-4 py-2 border rounded-md text-sm bg-background transition-smooth ${
                  errors?.fullName ? 'border-error focus:ring-error' : 'border-input focus:ring-ring'
                }`}
              />
              {errors?.fullName && <p className="mt-1 text-xs text-error">{errors?.fullName}</p>}
            </div>

            <div className="md:col-span-2">
              <label htmlFor="street" className="block text-sm font-medium text-foreground mb-2">
                Dirección <span className="text-error">*</span>
              </label>
              <input
                type="text"
                id="street"
                name="street"
                value={formData?.street}
                onChange={handleChange}
                placeholder="Calle, número, piso, puerta"
                className={`w-full px-4 py-2 border rounded-md text-sm bg-background transition-smooth ${
                  errors?.street ? 'border-error focus:ring-error' : 'border-input focus:ring-ring'
                }`}
              />
              {errors?.street && <p className="mt-1 text-xs text-error">{errors?.street}</p>}
            </div>

            <div>
              <label htmlFor="city" className="block text-sm font-medium text-foreground mb-2">
                Ciudad <span className="text-error">*</span>
              </label>
              <input
                type="text"
                id="city"
                name="city"
                value={formData?.city}
                onChange={handleChange}
                className={`w-full px-4 py-2 border rounded-md text-sm bg-background transition-smooth ${
                  errors?.city ? 'border-error focus:ring-error' : 'border-input focus:ring-ring'
                }`}
              />
              {errors?.city && <p className="mt-1 text-xs text-error">{errors?.city}</p>}
            </div>

            <div>
              <label htmlFor="state" className="block text-sm font-medium text-foreground mb-2">
                Provincia <span className="text-error">*</span>
              </label>
              <input
                type="text"
                id="state"
                name="state"
                value={formData?.state}
                onChange={handleChange}
                className={`w-full px-4 py-2 border rounded-md text-sm bg-background transition-smooth ${
                  errors?.state ? 'border-error focus:ring-error' : 'border-input focus:ring-ring'
                }`}
              />
              {errors?.state && <p className="mt-1 text-xs text-error">{errors?.state}</p>}
            </div>

            <div>
              <label htmlFor="postalCode" className="block text-sm font-medium text-foreground mb-2">
                Código Postal <span className="text-error">*</span>
              </label>
              <input
                type="text"
                id="postalCode"
                name="postalCode"
                value={formData?.postalCode}
                onChange={handleChange}
                maxLength={5}
                className={`w-full px-4 py-2 border rounded-md text-sm bg-background transition-smooth ${
                  errors?.postalCode ? 'border-error focus:ring-error' : 'border-input focus:ring-ring'
                }`}
              />
              {errors?.postalCode && <p className="mt-1 text-xs text-error">{errors?.postalCode}</p>}
            </div>

            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-foreground mb-2">
                Teléfono <span className="text-error">*</span>
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData?.phone}
                onChange={handleChange}
                className={`w-full px-4 py-2 border rounded-md text-sm bg-background transition-smooth ${
                  errors?.phone ? 'border-error focus:ring-error' : 'border-input focus:ring-ring'
                }`}
              />
              {errors?.phone && <p className="mt-1 text-xs text-error">{errors?.phone}</p>}
            </div>

            <div className="md:col-span-2 space-y-3">
              <label className="flex items-center space-x-3 cursor-pointer">
                <input
                  type="checkbox"
                  name="allowsHazmat"
                  checked={formData?.allowsHazmat}
                  onChange={handleChange}
                  className="w-5 h-5 rounded border-input text-primary focus:ring-ring"
                />
                <span className="text-sm text-foreground">
                  Esta dirección acepta envíos de materiales peligrosos (productos químicos)
                </span>
              </label>
              <label className="flex items-center space-x-3 cursor-pointer">
                <input
                  type="checkbox"
                  name="isDefault"
                  checked={formData?.isDefault}
                  onChange={handleChange}
                  className="w-5 h-5 rounded border-input text-primary focus:ring-ring"
                />
                <span className="text-sm text-foreground">Establecer como dirección predeterminada</span>
              </label>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 mt-6">
            <button
              type="submit"
              className="flex-1 sm:flex-none px-6 py-2 bg-primary text-primary-foreground rounded-md text-sm font-medium transition-smooth hover:shadow-elevation-2 active:scale-97"
            >
              {editingId ? 'Actualizar' : 'Guardar'}
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
        {addresses?.length === 0 ? (
          <div className="text-center py-12">
            <Icon name="MapPinIcon" size={48} className="mx-auto text-muted-foreground mb-4" />
            <p className="text-sm md:text-base text-muted-foreground">
              No tienes direcciones guardadas
            </p>
          </div>
        ) : (
          addresses?.map((address) => (
            <div
              key={address?.id}
              className={`p-4 md:p-6 rounded-lg border transition-smooth ${
                address?.isDefault
                  ? 'border-primary bg-accent/10' :'border-border bg-background hover:border-primary/50'
              }`}
            >
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="text-base md:text-lg font-semibold text-foreground">
                      {address?.label}
                    </h3>
                    {address?.isDefault && (
                      <span className="px-2 py-1 bg-primary text-primary-foreground text-xs font-medium rounded">
                        Predeterminada
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-foreground mb-1">{address?.fullName}</p>
                  <p className="text-sm text-muted-foreground">{address?.street}</p>
                  <p className="text-sm text-muted-foreground">
                    {address?.city}, {address?.state} {address?.postalCode}
                  </p>
                  <p className="text-sm text-muted-foreground">{address?.country}</p>
                  <p className="text-sm text-muted-foreground mt-2">Tel: {address?.phone}</p>
                  {!address?.allowsHazmat && (
                    <div className="flex items-center gap-2 mt-2 text-warning">
                      <Icon name="ExclamationTriangleIcon" size={16} />
                      <span className="text-xs">No acepta materiales peligrosos</span>
                    </div>
                  )}
                </div>

                <div className="flex sm:flex-col gap-2">
                  <button
                    onClick={() => handleEdit(address)}
                    className="flex items-center justify-center space-x-1 px-3 py-2 text-sm text-foreground hover:bg-muted rounded-md transition-smooth"
                  >
                    <Icon name="PencilIcon" size={16} />
                    <span>Editar</span>
                  </button>
                  {!address?.isDefault && (
                    <button
                      onClick={() => onSetDefault(address?.id)}
                      className="flex items-center justify-center space-x-1 px-3 py-2 text-sm text-foreground hover:bg-muted rounded-md transition-smooth"
                    >
                      <Icon name="StarIcon" size={16} />
                      <span>Predeterminar</span>
                    </button>
                  )}
                  <button
                    onClick={() => onDeleteAddress(address?.id)}
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
    </div>
  );
}

AddressSection.propTypes = {
  addresses: PropTypes?.arrayOf(
    PropTypes?.shape({
      id: PropTypes?.number?.isRequired,
      label: PropTypes?.string?.isRequired,
      fullName: PropTypes?.string?.isRequired,
      street: PropTypes?.string?.isRequired,
      city: PropTypes?.string?.isRequired,
      state: PropTypes?.string?.isRequired,
      postalCode: PropTypes?.string?.isRequired,
      country: PropTypes?.string?.isRequired,
      phone: PropTypes?.string?.isRequired,
      isDefault: PropTypes?.bool?.isRequired,
      allowsHazmat: PropTypes?.bool?.isRequired,
    })
  )?.isRequired,
  onAddAddress: PropTypes?.func?.isRequired,
  onUpdateAddress: PropTypes?.func?.isRequired,
  onDeleteAddress: PropTypes?.func?.isRequired,
  onSetDefault: PropTypes?.func?.isRequired,
};