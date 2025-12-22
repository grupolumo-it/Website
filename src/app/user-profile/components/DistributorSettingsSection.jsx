'use client';

import { useState } from 'react';
import PropTypes from 'prop-types';
import Icon from '@/components/ui/AppIcon';

export default function DistributorSettingsSection({ distributorData, onUpdate }) {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    commissionPreference: distributorData?.commissionPreference || 'bank',
    taxId: distributorData?.taxId || '',
    marketingConsent: distributorData?.marketingConsent || false,
    referralLink: distributorData?.referralLink || '',
    autoRenewal: distributorData?.autoRenewal || true,
    newsletterFrequency: distributorData?.newsletterFrequency || 'weekly',
  });
  const [copied, setCopied] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e?.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e?.preventDefault();
    onUpdate(formData);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setFormData({
      commissionPreference: distributorData?.commissionPreference || 'bank',
      taxId: distributorData?.taxId || '',
      marketingConsent: distributorData?.marketingConsent || false,
      referralLink: distributorData?.referralLink || '',
      autoRenewal: distributorData?.autoRenewal || true,
      newsletterFrequency: distributorData?.newsletterFrequency || 'weekly',
    });
    setIsEditing(false);
  };

  const copyReferralLink = () => {
    navigator.clipboard?.writeText(formData?.referralLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-card rounded-lg border border-border shadow-elevation-1 p-4 md:p-6 lg:p-8">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-primary/10 rounded-lg">
            <Icon name="ChartBarIcon" size={24} className="text-primary" />
          </div>
          <div>
            <h2 className="text-xl md:text-2xl lg:text-3xl font-semibold text-foreground">
              Configuración de Distribuidor
            </h2>
            <p className="text-sm text-muted-foreground">
              Nivel: {distributorData?.level} | Comisión: {distributorData?.commissionRate}%
            </p>
          </div>
        </div>
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
        <div className="p-4 md:p-6 bg-accent/10 rounded-lg border border-accent">
          <h3 className="text-base md:text-lg font-semibold text-foreground mb-4">
            Enlace de Referido
          </h3>
          <div className="flex flex-col sm:flex-row gap-3">
            <input
              type="text"
              value={formData?.referralLink}
              readOnly
              className="flex-1 px-4 py-2 bg-background border border-input rounded-md text-sm text-foreground"
            />
            <button
              type="button"
              onClick={copyReferralLink}
              className="flex items-center justify-center space-x-2 px-4 py-2 bg-primary text-primary-foreground rounded-md text-sm font-medium transition-smooth hover:shadow-elevation-2 active:scale-97"
            >
              <Icon name={copied ? 'CheckIcon' : 'ClipboardDocumentIcon'} size={16} />
              <span>{copied ? 'Copiado' : 'Copiar'}</span>
            </button>
          </div>
          <p className="mt-2 text-xs text-muted-foreground">
            Comparte este enlace para invitar nuevos distribuidores a tu red
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
          <div>
            <label htmlFor="commissionPreference" className="block text-sm font-medium text-foreground mb-2">
              Método de Pago de Comisiones
            </label>
            <select
              id="commissionPreference"
              name="commissionPreference"
              value={formData?.commissionPreference}
              onChange={handleChange}
              disabled={!isEditing}
              className={`w-full px-4 py-2 border rounded-md text-sm transition-smooth ${
                isEditing
                  ? 'bg-background text-foreground'
                  : 'bg-muted text-muted-foreground cursor-not-allowed'
              } border-input focus:ring-ring focus:border-ring`}
            >
              <option value="bank">Transferencia Bancaria</option>
              <option value="paypal">PayPal</option>
              <option value="check">Cheque</option>
            </select>
          </div>

          <div>
            <label htmlFor="taxId" className="block text-sm font-medium text-foreground mb-2">
              NIF/CIF Fiscal
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

          <div>
            <label htmlFor="newsletterFrequency" className="block text-sm font-medium text-foreground mb-2">
              Frecuencia de Boletín
            </label>
            <select
              id="newsletterFrequency"
              name="newsletterFrequency"
              value={formData?.newsletterFrequency}
              onChange={handleChange}
              disabled={!isEditing}
              className={`w-full px-4 py-2 border rounded-md text-sm transition-smooth ${
                isEditing
                  ? 'bg-background text-foreground'
                  : 'bg-muted text-muted-foreground cursor-not-allowed'
              } border-input focus:ring-ring focus:border-ring`}
            >
              <option value="daily">Diario</option>
              <option value="weekly">Semanal</option>
              <option value="monthly">Mensual</option>
              <option value="never">Nunca</option>
            </select>
          </div>
        </div>

        <div className="border-t border-border pt-6">
          <h3 className="text-base md:text-lg font-semibold text-foreground mb-4">
            Preferencias de Marketing
          </h3>
          <div className="space-y-3">
            <label className="flex items-start space-x-3 cursor-pointer">
              <input
                type="checkbox"
                name="marketingConsent"
                checked={formData?.marketingConsent}
                onChange={handleChange}
                disabled={!isEditing}
                className="w-5 h-5 mt-0.5 rounded border-input text-primary focus:ring-ring disabled:cursor-not-allowed"
              />
              <div>
                <span className="text-sm text-foreground font-medium">
                  Consentimiento de Marketing
                </span>
                <p className="text-xs text-muted-foreground mt-1">
                  Acepto recibir materiales de marketing y promociones para compartir con mi red
                </p>
              </div>
            </label>
            <label className="flex items-start space-x-3 cursor-pointer">
              <input
                type="checkbox"
                name="autoRenewal"
                checked={formData?.autoRenewal}
                onChange={handleChange}
                disabled={!isEditing}
                className="w-5 h-5 mt-0.5 rounded border-input text-primary focus:ring-ring disabled:cursor-not-allowed"
              />
              <div>
                <span className="text-sm text-foreground font-medium">
                  Renovación Automática
                </span>
                <p className="text-xs text-muted-foreground mt-1">
                  Renovar automáticamente mi membresía de distribuidor anualmente
                </p>
              </div>
            </label>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 p-4 md:p-6 bg-muted rounded-lg">
          <div className="text-center">
            <p className="text-2xl md:text-3xl lg:text-4xl font-bold text-primary whitespace-nowrap">
              {distributorData?.totalSales}
            </p>
            <p className="text-xs md:text-sm text-muted-foreground mt-1">Ventas Totales</p>
          </div>
          <div className="text-center">
            <p className="text-2xl md:text-3xl lg:text-4xl font-bold text-primary whitespace-nowrap">
              {distributorData?.teamSize}
            </p>
            <p className="text-xs md:text-sm text-muted-foreground mt-1">Miembros del Equipo</p>
          </div>
          <div className="text-center">
            <p className="text-2xl md:text-3xl lg:text-4xl font-bold text-primary whitespace-nowrap">
              €{distributorData?.totalCommissions?.toLocaleString('es-ES')}
            </p>
            <p className="text-xs md:text-sm text-muted-foreground mt-1">Comisiones Totales</p>
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

DistributorSettingsSection.propTypes = {
  distributorData: PropTypes?.shape({
    level: PropTypes?.string?.isRequired,
    commissionRate: PropTypes?.number?.isRequired,
    commissionPreference: PropTypes?.string,
    taxId: PropTypes?.string,
    marketingConsent: PropTypes?.bool,
    referralLink: PropTypes?.string,
    autoRenewal: PropTypes?.bool,
    newsletterFrequency: PropTypes?.string,
    totalSales: PropTypes?.number?.isRequired,
    teamSize: PropTypes?.number?.isRequired,
    totalCommissions: PropTypes?.number?.isRequired,
  })?.isRequired,
  onUpdate: PropTypes?.func?.isRequired,
};