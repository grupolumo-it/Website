import PropTypes from 'prop-types';
import Icon from '@/components/ui/AppIcon';

export default function PersonalInfoForm({ formData, errors, onChange }) {
  const handleInputChange = (e) => {
    onChange(e?.target?.name, e?.target?.value);
  };

  return (
    <div className="space-y-4 md:space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
        <div className="w-full min-w-0">
          <label htmlFor="firstName" className="block text-sm font-medium text-foreground mb-2">
            Nombre <span className="text-error">*</span>
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Icon name="UserIcon" size={20} className="text-muted-foreground" />
            </div>
            <input
              type="text"
              id="firstName"
              name="firstName"
              value={formData?.firstName}
              onChange={handleInputChange}
              className={`w-full pl-10 pr-4 py-3 rounded-md border transition-smooth text-sm md:text-base ${
                errors?.firstName
                  ? 'border-error focus:ring-error focus:border-error' :'border-input focus:ring-primary focus:border-primary'
              } bg-background text-foreground`}
              placeholder="Juan"
            />
          </div>
          {errors?.firstName && (
            <p className="mt-1 text-xs md:text-sm text-error flex items-center space-x-1">
              <Icon name="ExclamationCircleIcon" size={16} variant="solid" />
              <span>{errors?.firstName}</span>
            </p>
          )}
        </div>

        <div className="w-full min-w-0">
          <label htmlFor="lastName" className="block text-sm font-medium text-foreground mb-2">
            Apellido <span className="text-error">*</span>
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Icon name="UserIcon" size={20} className="text-muted-foreground" />
            </div>
            <input
              type="text"
              id="lastName"
              name="lastName"
              value={formData?.lastName}
              onChange={handleInputChange}
              className={`w-full pl-10 pr-4 py-3 rounded-md border transition-smooth text-sm md:text-base ${
                errors?.lastName
                  ? 'border-error focus:ring-error focus:border-error' :'border-input focus:ring-primary focus:border-primary'
              } bg-background text-foreground`}
              placeholder="Pérez"
            />
          </div>
          {errors?.lastName && (
            <p className="mt-1 text-xs md:text-sm text-error flex items-center space-x-1">
              <Icon name="ExclamationCircleIcon" size={16} variant="solid" />
              <span>{errors?.lastName}</span>
            </p>
          )}
        </div>
      </div>
      <div className="w-full min-w-0">
        <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
          Correo Electrónico <span className="text-error">*</span>
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Icon name="EnvelopeIcon" size={20} className="text-muted-foreground" />
          </div>
          <input
            type="email"
            id="email"
            name="email"
            value={formData?.email}
            onChange={handleInputChange}
            className={`w-full pl-10 pr-4 py-3 rounded-md border transition-smooth text-sm md:text-base ${
              errors?.email
                ? 'border-error focus:ring-error focus:border-error' :'border-input focus:ring-primary focus:border-primary'
            } bg-background text-foreground`}
            placeholder="juan.perez@ejemplo.com"
          />
        </div>
        {errors?.email && (
          <p className="mt-1 text-xs md:text-sm text-error flex items-center space-x-1">
            <Icon name="ExclamationCircleIcon" size={16} variant="solid" />
            <span>{errors?.email}</span>
          </p>
        )}
      </div>
      <div className="w-full min-w-0">
        <label htmlFor="phone" className="block text-sm font-medium text-foreground mb-2">
          Teléfono <span className="text-error">*</span>
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Icon name="PhoneIcon" size={20} className="text-muted-foreground" />
          </div>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData?.phone}
            onChange={handleInputChange}
            className={`w-full pl-10 pr-4 py-3 rounded-md border transition-smooth text-sm md:text-base ${
              errors?.phone
                ? 'border-error focus:ring-error focus:border-error' :'border-input focus:ring-primary focus:border-primary'
            } bg-background text-foreground`}
            placeholder="+34 600 123 456"
          />
        </div>
        {errors?.phone && (
          <p className="mt-1 text-xs md:text-sm text-error flex items-center space-x-1">
            <Icon name="ExclamationCircleIcon" size={16} variant="solid" />
            <span>{errors?.phone}</span>
          </p>
        )}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
        <div className="w-full min-w-0">
          <label htmlFor="password" className="block text-sm font-medium text-foreground mb-2">
            Contraseña <span className="text-error">*</span>
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Icon name="LockClosedIcon" size={20} className="text-muted-foreground" />
            </div>
            <input
              type="password"
              id="password"
              name="password"
              value={formData?.password}
              onChange={handleInputChange}
              className={`w-full pl-10 pr-4 py-3 rounded-md border transition-smooth text-sm md:text-base ${
                errors?.password
                  ? 'border-error focus:ring-error focus:border-error' :'border-input focus:ring-primary focus:border-primary'
              } bg-background text-foreground`}
              placeholder="Mínimo 8 caracteres"
            />
          </div>
          {errors?.password && (
            <p className="mt-1 text-xs md:text-sm text-error flex items-center space-x-1">
              <Icon name="ExclamationCircleIcon" size={16} variant="solid" />
              <span>{errors?.password}</span>
            </p>
          )}
          {formData?.password && !errors?.password && (
            <div className="mt-2 space-y-1">
              <div className="flex items-center space-x-2">
                <div className={`h-1 flex-1 rounded-full ${formData?.password?.length >= 8 ? 'bg-success' : 'bg-muted'}`} />
                <div className={`h-1 flex-1 rounded-full ${/[A-Z]/?.test(formData?.password) ? 'bg-success' : 'bg-muted'}`} />
                <div className={`h-1 flex-1 rounded-full ${/[0-9]/?.test(formData?.password) ? 'bg-success' : 'bg-muted'}`} />
              </div>
              <p className="text-xs text-muted-foreground">
                Debe contener al menos 8 caracteres, una mayúscula y un número
              </p>
            </div>
          )}
        </div>

        <div className="w-full min-w-0">
          <label htmlFor="confirmPassword" className="block text-sm font-medium text-foreground mb-2">
            Confirmar Contraseña <span className="text-error">*</span>
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Icon name="LockClosedIcon" size={20} className="text-muted-foreground" />
            </div>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={formData?.confirmPassword}
              onChange={handleInputChange}
              className={`w-full pl-10 pr-4 py-3 rounded-md border transition-smooth text-sm md:text-base ${
                errors?.confirmPassword
                  ? 'border-error focus:ring-error focus:border-error' :'border-input focus:ring-primary focus:border-primary'
              } bg-background text-foreground`}
              placeholder="Repite tu contraseña"
            />
          </div>
          {errors?.confirmPassword && (
            <p className="mt-1 text-xs md:text-sm text-error flex items-center space-x-1">
              <Icon name="ExclamationCircleIcon" size={16} variant="solid" />
              <span>{errors?.confirmPassword}</span>
            </p>
          )}
        </div>
      </div>
      <div className="w-full min-w-0">
        <label htmlFor="businessType" className="block text-sm font-medium text-foreground mb-2">
          Tipo de Negocio
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Icon name="BuildingOfficeIcon" size={20} className="text-muted-foreground" />
          </div>
          <select
            id="businessType"
            name="businessType"
            value={formData?.businessType}
            onChange={handleInputChange}
            className="w-full pl-10 pr-10 py-3 rounded-md border border-input focus:ring-primary focus:border-primary bg-background text-foreground appearance-none transition-smooth text-sm md:text-base"
          >
            <option value="">Selecciona una opción</option>
            <option value="personal">Uso Personal</option>
            <option value="small-business">Pequeño Negocio</option>
            <option value="cleaning-service">Servicio de Limpieza</option>
            <option value="facility-management">Gestión de Instalaciones</option>
            <option value="hospitality">Hostelería</option>
            <option value="healthcare">Sector Sanitario</option>
            <option value="other">Otro</option>
          </select>
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
            <Icon name="ChevronDownIcon" size={20} className="text-muted-foreground" />
          </div>
        </div>
      </div>
    </div>
  );
}

PersonalInfoForm.propTypes = {
  formData: PropTypes?.shape({
    firstName: PropTypes?.string?.isRequired,
    lastName: PropTypes?.string?.isRequired,
    email: PropTypes?.string?.isRequired,
    phone: PropTypes?.string?.isRequired,
    password: PropTypes?.string?.isRequired,
    confirmPassword: PropTypes?.string?.isRequired,
    businessType: PropTypes?.string
  })?.isRequired,
  errors: PropTypes?.object?.isRequired,
  onChange: PropTypes?.func?.isRequired
};