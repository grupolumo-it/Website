import PropTypes from 'prop-types';
import Icon from '@/components/ui/AppIcon';

export default function DistributorInfoForm({ formData, errors, onChange, onVerifyReferral }) {
  const handleInputChange = (e) => {
    onChange(e?.target?.name, e?.target?.value);
  };

  return (
    <div className="space-y-4 md:space-y-6">
      <div className="bg-accent/50 border border-accent rounded-lg p-4 md:p-6">
        <div className="flex items-start space-x-3">
          <Icon name="InformationCircleIcon" size={24} variant="solid" className="text-primary flex-shrink-0 mt-0.5" />
          <div className="flex-1 min-w-0">
            <h4 className="text-sm md:text-base font-semibold text-foreground mb-1">
              Información para Distribuidores
            </h4>
            <p className="text-xs md:text-sm text-muted-foreground line-clamp-3">
              Como distribuidor, podrás ganar comisiones en ventas directas y construir tu propio equipo de distribuidores. Necesitarás un código de patrocinador válido para comenzar.
            </p>
          </div>
        </div>
      </div>
      <div className="w-full min-w-0">
        <label htmlFor="referralCode" className="block text-sm font-medium text-foreground mb-2">
          Código de Patrocinador <span className="text-error">*</span>
        </label>
        <div className="flex space-x-2">
          <div className="relative flex-1 min-w-0">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Icon name="TicketIcon" size={20} className="text-muted-foreground" />
            </div>
            <input
              type="text"
              id="referralCode"
              name="referralCode"
              value={formData?.referralCode}
              onChange={handleInputChange}
              className={`w-full pl-10 pr-4 py-3 rounded-md border transition-smooth text-sm md:text-base ${
                errors?.referralCode
                  ? 'border-error focus:ring-error focus:border-error'
                  : formData?.referralVerified
                  ? 'border-success focus:ring-success focus:border-success' :'border-input focus:ring-primary focus:border-primary'
              } bg-background text-foreground`}
              placeholder="DIST-123456"
            />
            {formData?.referralVerified && (
              <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                <Icon name="CheckCircleIcon" size={20} variant="solid" className="text-success" />
              </div>
            )}
          </div>
          <button
            type="button"
            onClick={onVerifyReferral}
            disabled={!formData?.referralCode || formData?.referralVerified}
            className="px-4 md:px-6 py-3 bg-secondary text-secondary-foreground rounded-md text-sm font-medium transition-smooth hover:shadow-elevation-2 active:scale-97 disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap"
          >
            Verificar
          </button>
        </div>
        {errors?.referralCode && (
          <p className="mt-1 text-xs md:text-sm text-error flex items-center space-x-1">
            <Icon name="ExclamationCircleIcon" size={16} variant="solid" />
            <span>{errors?.referralCode}</span>
          </p>
        )}
        {formData?.referralVerified && formData?.sponsorName && (
          <div className="mt-2 flex items-center space-x-2 text-xs md:text-sm text-success">
            <Icon name="CheckCircleIcon" size={16} variant="solid" />
            <span>Patrocinador verificado: {formData?.sponsorName}</span>
          </div>
        )}
      </div>
      <div className="w-full min-w-0">
        <label htmlFor="businessName" className="block text-sm font-medium text-foreground mb-2">
          Nombre del Negocio <span className="text-error">*</span>
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Icon name="BuildingStorefrontIcon" size={20} className="text-muted-foreground" />
          </div>
          <input
            type="text"
            id="businessName"
            name="businessName"
            value={formData?.businessName}
            onChange={handleInputChange}
            className={`w-full pl-10 pr-4 py-3 rounded-md border transition-smooth text-sm md:text-base ${
              errors?.businessName
                ? 'border-error focus:ring-error focus:border-error' :'border-input focus:ring-primary focus:border-primary'
            } bg-background text-foreground`}
            placeholder="ChemClean Distribuciones S.L."
          />
        </div>
        {errors?.businessName && (
          <p className="mt-1 text-xs md:text-sm text-error flex items-center space-x-1">
            <Icon name="ExclamationCircleIcon" size={16} variant="solid" />
            <span>{errors?.businessName}</span>
          </p>
        )}
      </div>
      <div className="w-full min-w-0">
        <label htmlFor="taxId" className="block text-sm font-medium text-foreground mb-2">
          NIF/CIF <span className="text-error">*</span>
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Icon name="IdentificationIcon" size={20} className="text-muted-foreground" />
          </div>
          <input
            type="text"
            id="taxId"
            name="taxId"
            value={formData?.taxId}
            onChange={handleInputChange}
            className={`w-full pl-10 pr-4 py-3 rounded-md border transition-smooth text-sm md:text-base ${
              errors?.taxId
                ? 'border-error focus:ring-error focus:border-error' :'border-input focus:ring-primary focus:border-primary'
            } bg-background text-foreground`}
            placeholder="B12345678"
          />
        </div>
        {errors?.taxId && (
          <p className="mt-1 text-xs md:text-sm text-error flex items-center space-x-1">
            <Icon name="ExclamationCircleIcon" size={16} variant="solid" />
            <span>{errors?.taxId}</span>
          </p>
        )}
      </div>
      <div className="w-full min-w-0">
        <label htmlFor="businessAddress" className="block text-sm font-medium text-foreground mb-2">
          Dirección del Negocio <span className="text-error">*</span>
        </label>
        <div className="relative">
          <div className="absolute top-3 left-0 pl-3 flex items-start pointer-events-none">
            <Icon name="MapPinIcon" size={20} className="text-muted-foreground" />
          </div>
          <textarea
            id="businessAddress"
            name="businessAddress"
            value={formData?.businessAddress}
            onChange={handleInputChange}
            rows={3}
            className={`w-full pl-10 pr-4 py-3 rounded-md border transition-smooth text-sm md:text-base resize-none ${
              errors?.businessAddress
                ? 'border-error focus:ring-error focus:border-error' :'border-input focus:ring-primary focus:border-primary'
            } bg-background text-foreground`}
            placeholder="Calle Principal 123, 28001 Madrid, España"
          />
        </div>
        {errors?.businessAddress && (
          <p className="mt-1 text-xs md:text-sm text-error flex items-center space-x-1">
            <Icon name="ExclamationCircleIcon" size={16} variant="solid" />
            <span>{errors?.businessAddress}</span>
          </p>
        )}
      </div>
      <div className="w-full min-w-0">
        <label htmlFor="commissionPreference" className="block text-sm font-medium text-foreground mb-2">
          Preferencia de Comisión <span className="text-error">*</span>
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Icon name="BanknotesIcon" size={20} className="text-muted-foreground" />
          </div>
          <select
            id="commissionPreference"
            name="commissionPreference"
            value={formData?.commissionPreference}
            onChange={handleInputChange}
            className="w-full pl-10 pr-10 py-3 rounded-md border border-input focus:ring-primary focus:border-primary bg-background text-foreground appearance-none transition-smooth text-sm md:text-base"
          >
            <option value="">Selecciona una opción</option>
            <option value="bank-transfer">Transferencia Bancaria</option>
            <option value="product-credit">Crédito en Productos</option>
            <option value="mixed">Mixto (50% Efectivo / 50% Crédito)</option>
          </select>
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
            <Icon name="ChevronDownIcon" size={20} className="text-muted-foreground" />
          </div>
        </div>
        {errors?.commissionPreference && (
          <p className="mt-1 text-xs md:text-sm text-error flex items-center space-x-1">
            <Icon name="ExclamationCircleIcon" size={16} variant="solid" />
            <span>{errors?.commissionPreference}</span>
          </p>
        )}
      </div>
      <div className="bg-muted rounded-lg p-4 md:p-6">
        <h4 className="text-sm md:text-base font-semibold text-foreground mb-3">
          Estructura de Comisiones
        </h4>
        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs md:text-sm">
            <span className="text-muted-foreground">Ventas Directas:</span>
            <span className="font-semibold text-foreground whitespace-nowrap">15% - 25%</span>
          </div>
          <div className="flex items-center justify-between text-xs md:text-sm">
            <span className="text-muted-foreground">Nivel 1 (Equipo Directo):</span>
            <span className="font-semibold text-foreground whitespace-nowrap">5% - 10%</span>
          </div>
          <div className="flex items-center justify-between text-xs md:text-sm">
            <span className="text-muted-foreground">Nivel 2:</span>
            <span className="font-semibold text-foreground whitespace-nowrap">3% - 5%</span>
          </div>
          <div className="flex items-center justify-between text-xs md:text-sm">
            <span className="text-muted-foreground">Bonos por Volumen:</span>
            <span className="font-semibold text-foreground whitespace-nowrap">Hasta 10%</span>
          </div>
        </div>
      </div>
    </div>
  );
}

DistributorInfoForm.propTypes = {
  formData: PropTypes?.shape({
    referralCode: PropTypes?.string?.isRequired,
    referralVerified: PropTypes?.bool,
    sponsorName: PropTypes?.string,
    businessName: PropTypes?.string?.isRequired,
    taxId: PropTypes?.string?.isRequired,
    businessAddress: PropTypes?.string?.isRequired,
    commissionPreference: PropTypes?.string?.isRequired
  })?.isRequired,
  errors: PropTypes?.object?.isRequired,
  onChange: PropTypes?.func?.isRequired,
  onVerifyReferral: PropTypes?.func?.isRequired
};