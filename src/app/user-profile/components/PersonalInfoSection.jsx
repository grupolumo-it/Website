'use client';

import { useState } from 'react';
import PropTypes from 'prop-types';
import Icon from '@/components/ui/AppIcon';

export default function PersonalInfoSection({ userData, onUpdate }) {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: userData?.name || '',
    email: userData?.email || '',
    phone: userData?.phone || '',
    businessName: userData?.businessName || '',
    taxId: userData?.taxId || '',
    language: userData?.language || 'es',
    emailNotifications: userData?.emailNotifications || true,
    smsNotifications: userData?.smsNotifications || false,
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
    if (!formData?.name?.trim()) newErrors.name = 'El nombre es obligatorio';
    if (!formData?.email?.trim()) newErrors.email = 'El correo electrónico es obligatorio';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/?.test(formData?.email)) {
      newErrors.email = 'Formato de correo electrónico inválido';
    }
    if (!formData?.phone?.trim()) newErrors.phone = 'El teléfono es obligatorio';
    if (!/^\+?[\d\s-()]+$/?.test(formData?.phone)) {
      newErrors.phone = 'Formato de teléfono inválido';
    }
    setErrors(newErrors);
    return Object.keys(newErrors)?.length === 0;
  };

  const handleSubmit = (e) => {
    e?.preventDefault();
    if (validateForm()) {
      onUpdate(formData);
      setIsEditing(false);
    }
  };

  const handleCancel = () => {
    setFormData({
      name: userData?.name || '',
      email: userData?.email || '',
      phone: userData?.phone || '',
      businessName: userData?.businessName || '',
      taxId: userData?.taxId || '',
      language: userData?.language || 'es',
      emailNotifications: userData?.emailNotifications || true,
      smsNotifications: userData?.smsNotifications || false,
    });
    setErrors({});
    setIsEditing(false);
  };

  return (
    <div className="bg-card rounded-lg border border-border shadow-elevation-1 p-4 md:p-6 lg:p-8">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl md:text-2xl lg:text-3xl font-semibold text-foreground">
          Información Personal
        </h2>
        {!isEditing && (
          <button
            onClick={() => setIsEditing(true)}
            className="flex items-center space-x-2 px-4 py-2 bg-primary text-primary-foreground rounded-md text-sm font-medium transition-smooth hover:shadow-elevation-2 active:scale-97"
          >
            <Icon name="PencilIcon" size={16} />
            <span>Editar</span>
          </button>
        )}
      </div>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-foreground mb-2">
              Nombre Completo <span className="text-error">*</span>
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData?.name}
              onChange={handleChange}
              disabled={!isEditing}
              className={`w-full px-4 py-2 border rounded-md text-sm transition-smooth ${
                errors?.name
                  ? 'border-error focus:ring-error' :'border-input focus:ring-ring focus:border-ring'
              } ${
                isEditing
                  ? 'bg-background text-foreground'
                  : 'bg-muted text-muted-foreground cursor-not-allowed'
              }`}
            />
            {errors?.name && <p className="mt-1 text-xs text-error">{errors?.name}</p>}
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
              Correo Electrónico <span className="text-error">*</span>
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData?.email}
              onChange={handleChange}
              disabled={!isEditing}
              className={`w-full px-4 py-2 border rounded-md text-sm transition-smooth ${
                errors?.email
                  ? 'border-error focus:ring-error' :'border-input focus:ring-ring focus:border-ring'
              } ${
                isEditing
                  ? 'bg-background text-foreground'
                  : 'bg-muted text-muted-foreground cursor-not-allowed'
              }`}
            />
            {errors?.email && <p className="mt-1 text-xs text-error">{errors?.email}</p>}
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
              disabled={!isEditing}
              className={`w-full px-4 py-2 border rounded-md text-sm transition-smooth ${
                errors?.phone
                  ? 'border-error focus:ring-error' :'border-input focus:ring-ring focus:border-ring'
              } ${
                isEditing
                  ? 'bg-background text-foreground'
                  : 'bg-muted text-muted-foreground cursor-not-allowed'
              }`}
            />
            {errors?.phone && <p className="mt-1 text-xs text-error">{errors?.phone}</p>}
          </div>

          <div>
            <label htmlFor="language" className="block text-sm font-medium text-foreground mb-2">
              Idioma Preferido
            </label>
            <select
              id="language"
              name="language"
              value={formData?.language}
              onChange={handleChange}
              disabled={!isEditing}
              className={`w-full px-4 py-2 border rounded-md text-sm transition-smooth ${
                isEditing
                  ? 'bg-background text-foreground'
                  : 'bg-muted text-muted-foreground cursor-not-allowed'
              } border-input focus:ring-ring focus:border-ring`}
            >
              <option value="es">Español</option>
              <option value="en">English</option>
              <option value="ca">Català</option>
            </select>
          </div>

          {userData?.accountType === 'distributor' && (
            <>
              <div>
                <label htmlFor="businessName" className="block text-sm font-medium text-foreground mb-2">
                  Nombre del Negocio
                </label>
                <input
                  type="text"
                  id="businessName"
                  name="businessName"
                  value={formData?.businessName}
                  onChange={handleChange}
                  disabled={!isEditing}
                  className={`w-full px-4 py-2 border rounded-md text-sm transition-smooth ${
                    isEditing
                      ? 'bg-background text-foreground'
                      : 'bg-muted text-muted-foreground cursor-not-allowed'
                  } border-input focus:ring-ring focus:border-ring`}
                />
              </div>

              <div>
                <label htmlFor="taxId" className="block text-sm font-medium text-foreground mb-2">
                  NIF/CIF
                </label>
                <input
                  type="text"
                  id="taxId"
                  name="taxId"
                  value={formData?.taxId}
                  onChange={handleChange}
                  disabled={!isEditing}
                  className={`w-full px-4 py-2 border rounded-md text-sm transition-smooth ${
                    isEditing
                      ? 'bg-background text-foreground'
                      : 'bg-muted text-muted-foreground cursor-not-allowed'
                  } border-input focus:ring-ring focus:border-ring`}
                />
              </div>
            </>
          )}
        </div>

        <div className="border-t border-border pt-6">
          <h3 className="text-base md:text-lg font-semibold text-foreground mb-4">
            Preferencias de Comunicación
          </h3>
          <div className="space-y-3">
            <label className="flex items-center space-x-3 cursor-pointer">
              <input
                type="checkbox"
                name="emailNotifications"
                checked={formData?.emailNotifications}
                onChange={handleChange}
                disabled={!isEditing}
                className="w-5 h-5 rounded border-input text-primary focus:ring-ring disabled:cursor-not-allowed"
              />
              <span className="text-sm text-foreground">
                Recibir notificaciones por correo electrónico
              </span>
            </label>
            <label className="flex items-center space-x-3 cursor-pointer">
              <input
                type="checkbox"
                name="smsNotifications"
                checked={formData?.smsNotifications}
                onChange={handleChange}
                disabled={!isEditing}
                className="w-5 h-5 rounded border-input text-primary focus:ring-ring disabled:cursor-not-allowed"
              />
              <span className="text-sm text-foreground">Recibir notificaciones por SMS</span>
            </label>
          </div>
        </div>

        {isEditing && (
          <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-border">
            <button
              type="submit"
              className="flex-1 sm:flex-none px-6 py-2 bg-primary text-primary-foreground rounded-md text-sm font-medium transition-smooth hover:shadow-elevation-2 active:scale-97"
            >
              Guardar Cambios
            </button>
            <button
              type="button"
              onClick={handleCancel}
              className="flex-1 sm:flex-none px-6 py-2 bg-muted text-foreground rounded-md text-sm font-medium transition-smooth hover:bg-muted/80 active:scale-97"
            >
              Cancelar
            </button>
          </div>
        )}
      </form>
    </div>
  );
}

PersonalInfoSection.propTypes = {
  userData: PropTypes?.shape({
    name: PropTypes?.string,
    email: PropTypes?.string,
    phone: PropTypes?.string,
    businessName: PropTypes?.string,
    taxId: PropTypes?.string,
    language: PropTypes?.string,
    emailNotifications: PropTypes?.bool,
    smsNotifications: PropTypes?.bool,
    accountType: PropTypes?.string,
  })?.isRequired,
  onUpdate: PropTypes?.func?.isRequired,
};