import PropTypes from 'prop-types';
import Icon from '@/components/ui/AppIcon';

export default function VerificationForm({ formData, errors, onChange }) {
  const handleCheckboxChange = (name) => {
    onChange(name, !formData?.[name]);
  };

  return (
    <div className="space-y-6 md:space-y-8">
      <div className="bg-card rounded-lg border border-border p-4 md:p-6 shadow-elevation-1">
        <h3 className="text-lg md:text-xl font-semibold text-foreground mb-4">
          Resumen de Registro
        </h3>
        
        <div className="space-y-3">
          <div className="flex items-start space-x-3">
            <Icon name="UserCircleIcon" size={20} className="text-primary flex-shrink-0 mt-0.5" />
            <div className="flex-1 min-w-0">
              <p className="text-xs md:text-sm text-muted-foreground">Nombre Completo</p>
              <p className="text-sm md:text-base font-medium text-foreground line-clamp-1">
                {formData?.firstName} {formData?.lastName}
              </p>
            </div>
          </div>

          <div className="flex items-start space-x-3">
            <Icon name="EnvelopeIcon" size={20} className="text-primary flex-shrink-0 mt-0.5" />
            <div className="flex-1 min-w-0">
              <p className="text-xs md:text-sm text-muted-foreground">Correo Electrónico</p>
              <p className="text-sm md:text-base font-medium text-foreground line-clamp-1">
                {formData?.email}
              </p>
            </div>
          </div>

          <div className="flex items-start space-x-3">
            <Icon name="PhoneIcon" size={20} className="text-primary flex-shrink-0 mt-0.5" />
            <div className="flex-1 min-w-0">
              <p className="text-xs md:text-sm text-muted-foreground">Teléfono</p>
              <p className="text-sm md:text-base font-medium text-foreground line-clamp-1">
                {formData?.phone}
              </p>
            </div>
          </div>

          <div className="flex items-start space-x-3">
            <Icon name="BriefcaseIcon" size={20} className="text-primary flex-shrink-0 mt-0.5" />
            <div className="flex-1 min-w-0">
              <p className="text-xs md:text-sm text-muted-foreground">Tipo de Cuenta</p>
              <p className="text-sm md:text-base font-medium text-foreground">
                {formData?.accountType === 'distributor' ? 'Distribuidor' : 'Cliente'}
              </p>
            </div>
          </div>

          {formData?.accountType === 'distributor' && (
            <>
              <div className="flex items-start space-x-3">
                <Icon name="BuildingStorefrontIcon" size={20} className="text-primary flex-shrink-0 mt-0.5" />
                <div className="flex-1 min-w-0">
                  <p className="text-xs md:text-sm text-muted-foreground">Nombre del Negocio</p>
                  <p className="text-sm md:text-base font-medium text-foreground line-clamp-1">
                    {formData?.businessName}
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <Icon name="IdentificationIcon" size={20} className="text-primary flex-shrink-0 mt-0.5" />
                <div className="flex-1 min-w-0">
                  <p className="text-xs md:text-sm text-muted-foreground">NIF/CIF</p>
                  <p className="text-sm md:text-base font-medium text-foreground line-clamp-1">
                    {formData?.taxId}
                  </p>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
      <div className="space-y-4">
        <div
          className={`flex items-start space-x-3 p-4 rounded-lg border transition-smooth cursor-pointer ${
            formData?.acceptTerms ? 'border-primary bg-accent/30' : 'border-border bg-card'
          }`}
          onClick={() => handleCheckboxChange('acceptTerms')}
        >
          <div className="flex-shrink-0 mt-0.5">
            <div
              className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-smooth ${
                formData?.acceptTerms
                  ? 'border-primary bg-primary' :'border-input bg-background'
              }`}
            >
              {formData?.acceptTerms && (
                <Icon name="CheckIcon" size={14} variant="solid" className="text-primary-foreground" />
              )}
            </div>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm md:text-base text-foreground">
              Acepto los{' '}
              <a href="#" className="text-primary hover:underline font-medium">
                Términos y Condiciones
              </a>{' '}
              y la{' '}
              <a href="#" className="text-primary hover:underline font-medium">
                Política de Privacidad
              </a>
            </p>
          </div>
        </div>
        {errors?.acceptTerms && (
          <p className="text-xs md:text-sm text-error flex items-center space-x-1">
            <Icon name="ExclamationCircleIcon" size={16} variant="solid" />
            <span>{errors?.acceptTerms}</span>
          </p>
        )}

        {formData?.accountType === 'distributor' && (
          <>
            <div
              className={`flex items-start space-x-3 p-4 rounded-lg border transition-smooth cursor-pointer ${
                formData?.acceptDistributorTerms ? 'border-primary bg-accent/30' : 'border-border bg-card'
              }`}
              onClick={() => handleCheckboxChange('acceptDistributorTerms')}
            >
              <div className="flex-shrink-0 mt-0.5">
                <div
                  className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-smooth ${
                    formData?.acceptDistributorTerms
                      ? 'border-primary bg-primary' :'border-input bg-background'
                  }`}
                >
                  {formData?.acceptDistributorTerms && (
                    <Icon name="CheckIcon" size={14} variant="solid" className="text-primary-foreground" />
                  )}
                </div>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm md:text-base text-foreground">
                  Acepto el{' '}
                  <a href="#" className="text-primary hover:underline font-medium">
                    Acuerdo de Distribuidor
                  </a>{' '}
                  y entiendo la estructura de comisiones
                </p>
              </div>
            </div>
            {errors?.acceptDistributorTerms && (
              <p className="text-xs md:text-sm text-error flex items-center space-x-1">
                <Icon name="ExclamationCircleIcon" size={16} variant="solid" />
                <span>{errors?.acceptDistributorTerms}</span>
              </p>
            )}
          </>
        )}

        <div
          className={`flex items-start space-x-3 p-4 rounded-lg border transition-smooth cursor-pointer ${
            formData?.acceptMarketing ? 'border-primary bg-accent/30' : 'border-border bg-card'
          }`}
          onClick={() => handleCheckboxChange('acceptMarketing')}
        >
          <div className="flex-shrink-0 mt-0.5">
            <div
              className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-smooth ${
                formData?.acceptMarketing
                  ? 'border-primary bg-primary' :'border-input bg-background'
              }`}
            >
              {formData?.acceptMarketing && (
                <Icon name="CheckIcon" size={14} variant="solid" className="text-primary-foreground" />
              )}
            </div>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm md:text-base text-foreground">
              Deseo recibir ofertas especiales, novedades de productos y consejos de limpieza (opcional)
            </p>
          </div>
        </div>
      </div>
      <div className="bg-accent/50 border border-accent rounded-lg p-4 md:p-6">
        <div className="flex items-start space-x-3">
          <Icon name="ShieldCheckIcon" size={24} variant="solid" className="text-primary flex-shrink-0 mt-0.5" />
          <div className="flex-1 min-w-0">
            <h4 className="text-sm md:text-base font-semibold text-foreground mb-2">
              Seguridad y Privacidad
            </h4>
            <p className="text-xs md:text-sm text-muted-foreground line-clamp-3">
              Tus datos están protegidos con encriptación de nivel bancario. Nunca compartiremos tu información personal sin tu consentimiento explícito.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

VerificationForm.propTypes = {
  formData: PropTypes?.shape({
    firstName: PropTypes?.string?.isRequired,
    lastName: PropTypes?.string?.isRequired,
    email: PropTypes?.string?.isRequired,
    phone: PropTypes?.string?.isRequired,
    accountType: PropTypes?.oneOf(['customer', 'distributor'])?.isRequired,
    businessName: PropTypes?.string,
    taxId: PropTypes?.string,
    acceptTerms: PropTypes?.bool?.isRequired,
    acceptDistributorTerms: PropTypes?.bool,
    acceptMarketing: PropTypes?.bool?.isRequired
  })?.isRequired,
  errors: PropTypes?.object?.isRequired,
  onChange: PropTypes?.func?.isRequired
};