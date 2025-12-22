'use client';

import { useState } from 'react';
import PropTypes from 'prop-types';
import Icon from '@/components/ui/AppIcon';

export default function SecuritySection({ securityData, onUpdatePassword, onToggle2FA }) {
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });
  const [errors, setErrors] = useState({});
  const [showPasswords, setShowPasswords] = useState({
    current: false,
    new: false,
    confirm: false,
  });

  const handlePasswordChange = (e) => {
    const { name, value } = e?.target;
    setPasswordForm((prev) => ({ ...prev, [name]: value }));
    if (errors?.[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const validatePasswordForm = () => {
    const newErrors = {};
    if (!passwordForm?.currentPassword) {
      newErrors.currentPassword = 'La contraseña actual es obligatoria';
    }
    if (!passwordForm?.newPassword) {
      newErrors.newPassword = 'La nueva contraseña es obligatoria';
    } else if (passwordForm?.newPassword?.length < 8) {
      newErrors.newPassword = 'La contraseña debe tener al menos 8 caracteres';
    } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/?.test(passwordForm?.newPassword)) {
      newErrors.newPassword = 'Debe incluir mayúsculas, minúsculas y números';
    }
    if (!passwordForm?.confirmPassword) {
      newErrors.confirmPassword = 'Confirma tu nueva contraseña';
    } else if (passwordForm?.newPassword !== passwordForm?.confirmPassword) {
      newErrors.confirmPassword = 'Las contraseñas no coinciden';
    }
    setErrors(newErrors);
    return Object.keys(newErrors)?.length === 0;
  };

  const handlePasswordSubmit = (e) => {
    e?.preventDefault();
    if (validatePasswordForm()) {
      onUpdatePassword(passwordForm);
      setPasswordForm({ currentPassword: '', newPassword: '', confirmPassword: '' });
      setIsChangingPassword(false);
    }
  };

  const togglePasswordVisibility = (field) => {
    setShowPasswords((prev) => ({ ...prev, [field]: !prev?.[field] }));
  };

  return (
    <div className="bg-card rounded-lg border border-border shadow-elevation-1 p-4 md:p-6 lg:p-8">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 bg-primary/10 rounded-lg">
          <Icon name="ShieldCheckIcon" size={24} className="text-primary" />
        </div>
        <h2 className="text-xl md:text-2xl lg:text-3xl font-semibold text-foreground">
          Seguridad de la Cuenta
        </h2>
      </div>
      <div className="space-y-6">
        <div className="p-4 md:p-6 bg-background rounded-lg border border-border">
          <div className="flex items-start justify-between mb-4">
            <div className="flex-1">
              <h3 className="text-base md:text-lg font-semibold text-foreground mb-2">
                Contraseña
              </h3>
              <p className="text-sm text-muted-foreground">
                Última actualización: {securityData?.lastPasswordChange}
              </p>
            </div>
            {!isChangingPassword && (
              <button
                onClick={() => setIsChangingPassword(true)}
                className="flex items-center space-x-2 px-4 py-2 bg-primary text-primary-foreground rounded-md text-sm font-medium transition-smooth hover:shadow-elevation-2 active:scale-97"
              >
                <Icon name="KeyIcon" size={16} />
                <span>Cambiar</span>
              </button>
            )}
          </div>

          {isChangingPassword && (
            <form onSubmit={handlePasswordSubmit} className="space-y-4 mt-4">
              <div>
                <label htmlFor="currentPassword" className="block text-sm font-medium text-foreground mb-2">
                  Contraseña Actual <span className="text-error">*</span>
                </label>
                <div className="relative">
                  <input
                    type={showPasswords?.current ? 'text' : 'password'}
                    id="currentPassword"
                    name="currentPassword"
                    value={passwordForm?.currentPassword}
                    onChange={handlePasswordChange}
                    className={`w-full px-4 py-2 pr-12 border rounded-md text-sm bg-background transition-smooth ${
                      errors?.currentPassword
                        ? 'border-error focus:ring-error' :'border-input focus:ring-ring'
                    }`}
                  />
                  <button
                    type="button"
                    onClick={() => togglePasswordVisibility('current')}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-smooth"
                  >
                    <Icon name={showPasswords?.current ? 'EyeSlashIcon' : 'EyeIcon'} size={20} />
                  </button>
                </div>
                {errors?.currentPassword && (
                  <p className="mt-1 text-xs text-error">{errors?.currentPassword}</p>
                )}
              </div>

              <div>
                <label htmlFor="newPassword" className="block text-sm font-medium text-foreground mb-2">
                  Nueva Contraseña <span className="text-error">*</span>
                </label>
                <div className="relative">
                  <input
                    type={showPasswords?.new ? 'text' : 'password'}
                    id="newPassword"
                    name="newPassword"
                    value={passwordForm?.newPassword}
                    onChange={handlePasswordChange}
                    className={`w-full px-4 py-2 pr-12 border rounded-md text-sm bg-background transition-smooth ${
                      errors?.newPassword
                        ? 'border-error focus:ring-error' :'border-input focus:ring-ring'
                    }`}
                  />
                  <button
                    type="button"
                    onClick={() => togglePasswordVisibility('new')}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-smooth"
                  >
                    <Icon name={showPasswords?.new ? 'EyeSlashIcon' : 'EyeIcon'} size={20} />
                  </button>
                </div>
                {errors?.newPassword && <p className="mt-1 text-xs text-error">{errors?.newPassword}</p>}
              </div>

              <div>
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-foreground mb-2">
                  Confirmar Nueva Contraseña <span className="text-error">*</span>
                </label>
                <div className="relative">
                  <input
                    type={showPasswords?.confirm ? 'text' : 'password'}
                    id="confirmPassword"
                    name="confirmPassword"
                    value={passwordForm?.confirmPassword}
                    onChange={handlePasswordChange}
                    className={`w-full px-4 py-2 pr-12 border rounded-md text-sm bg-background transition-smooth ${
                      errors?.confirmPassword
                        ? 'border-error focus:ring-error' :'border-input focus:ring-ring'
                    }`}
                  />
                  <button
                    type="button"
                    onClick={() => togglePasswordVisibility('confirm')}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-smooth"
                  >
                    <Icon name={showPasswords?.confirm ? 'EyeSlashIcon' : 'EyeIcon'} size={20} />
                  </button>
                </div>
                {errors?.confirmPassword && (
                  <p className="mt-1 text-xs text-error">{errors?.confirmPassword}</p>
                )}
              </div>

              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                <button
                  type="submit"
                  className="flex-1 sm:flex-none px-6 py-2 bg-primary text-primary-foreground rounded-md text-sm font-medium transition-smooth hover:shadow-elevation-2 active:scale-97"
                >
                  Actualizar Contraseña
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setIsChangingPassword(false);
                    setPasswordForm({ currentPassword: '', newPassword: '', confirmPassword: '' });
                    setErrors({});
                  }}
                  className="flex-1 sm:flex-none px-6 py-2 bg-muted text-foreground rounded-md text-sm font-medium transition-smooth hover:bg-muted/80 active:scale-97"
                >
                  Cancelar
                </button>
              </div>
            </form>
          )}
        </div>

        <div className="p-4 md:p-6 bg-background rounded-lg border border-border">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <h3 className="text-base md:text-lg font-semibold text-foreground mb-2">
                Autenticación de Dos Factores (2FA)
              </h3>
              <p className="text-sm text-muted-foreground mb-3">
                {securityData?.twoFactorEnabled
                  ? 'La autenticación de dos factores está activada. Tu cuenta está protegida con una capa adicional de seguridad.'
                  : 'Añade una capa extra de seguridad a tu cuenta requiriendo un código de verificación además de tu contraseña.'}
              </p>
              {securityData?.twoFactorEnabled && (
                <div className="flex items-center gap-2 text-success">
                  <Icon name="CheckCircleIcon" size={20} />
                  <span className="text-sm font-medium">Activado</span>
                </div>
              )}
            </div>
            <button
              onClick={onToggle2FA}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-smooth hover:shadow-elevation-2 active:scale-97 ${
                securityData?.twoFactorEnabled
                  ? 'bg-error text-error-foreground'
                  : 'bg-primary text-primary-foreground'
              }`}
            >
              {securityData?.twoFactorEnabled ? 'Desactivar' : 'Activar'}
            </button>
          </div>
        </div>

        <div className="p-4 md:p-6 bg-background rounded-lg border border-border">
          <h3 className="text-base md:text-lg font-semibold text-foreground mb-4">
            Historial de Inicio de Sesión
          </h3>
          <div className="space-y-3">
            {securityData?.loginHistory?.map((login) => (
              <div
                key={login?.id}
                className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3 bg-muted rounded-lg"
              >
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-background rounded">
                    <Icon name="ComputerDesktopIcon" size={20} className="text-primary" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-foreground">{login?.device}</p>
                    <p className="text-xs text-muted-foreground">{login?.location}</p>
                    <p className="text-xs text-muted-foreground">{login?.ip}</p>
                  </div>
                </div>
                <div className="text-right sm:text-left">
                  <p className="text-xs text-muted-foreground">{login?.date}</p>
                  <p className="text-xs text-muted-foreground">{login?.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="p-4 bg-warning/10 border border-warning rounded-lg">
          <div className="flex items-start gap-3">
            <Icon name="ExclamationTriangleIcon" size={20} className="text-warning flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-medium text-foreground mb-1">Recomendaciones de Seguridad</p>
              <ul className="text-xs text-muted-foreground space-y-1 list-disc list-inside">
                <li>Usa una contraseña única que no utilices en otros sitios</li>
                <li>Activa la autenticación de dos factores para mayor seguridad</li>
                <li>Revisa regularmente tu historial de inicio de sesión</li>
                <li>No compartas tu contraseña con nadie</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

SecuritySection.propTypes = {
  securityData: PropTypes?.shape({
    lastPasswordChange: PropTypes?.string?.isRequired,
    twoFactorEnabled: PropTypes?.bool?.isRequired,
    loginHistory: PropTypes?.arrayOf(
      PropTypes?.shape({
        id: PropTypes?.number?.isRequired,
        device: PropTypes?.string?.isRequired,
        location: PropTypes?.string?.isRequired,
        ip: PropTypes?.string?.isRequired,
        date: PropTypes?.string?.isRequired,
        time: PropTypes?.string?.isRequired,
      })
    )?.isRequired,
  })?.isRequired,
  onUpdatePassword: PropTypes?.func?.isRequired,
  onToggle2FA: PropTypes?.func?.isRequired,
};