'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Icon from '@/components/ui/AppIcon';
import PropTypes from 'prop-types';

export default function LoginForm({ onLoginSuccess }) {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false,
    accountType: 'customer'
  });
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const mockCredentials = {
    customer: {
      email: 'cliente@chemclean.com',
      password: 'Cliente123',
      name: 'María García',
      accountType: 'customer'
    },
    distributor: {
      email: 'distribuidor@chemclean.com',
      password: 'Distribuidor123',
      name: 'Carlos Rodríguez',
      accountType: 'distributor'
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData?.email) {
      newErrors.email = 'El correo electrónico es obligatorio';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/?.test(formData?.email)) {
      newErrors.email = 'Formato de correo electrónico inválido';
    }

    if (!formData?.password) {
      newErrors.password = 'La contraseña es obligatoria';
    } else if (formData?.password?.length < 6) {
      newErrors.password = 'La contraseña debe tener al menos 6 caracteres';
    }

    setErrors(newErrors);
    return Object.keys(newErrors)?.length === 0;
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e?.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    if (errors?.[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleAccountTypeChange = (type) => {
    setFormData(prev => ({ ...prev, accountType: type }));
    setErrors({});
  };

  const handleSubmit = async (e) => {
    e?.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    setTimeout(() => {
      const credentials = mockCredentials?.[formData?.accountType];

      if (formData?.email === credentials?.email && formData?.password === credentials?.password) {
        const userData = {
          name: credentials?.name,
          email: credentials?.email,
          accountType: credentials?.accountType
        };

        try {
          localStorage.setItem('chemclean_user', JSON.stringify(userData));
          if (formData?.rememberMe) {
            localStorage.setItem('chemclean_remember', 'true');
          }
        } catch (error) {
          console.error('Error saving to localStorage:', error);
        }

        onLoginSuccess(userData);

        if (credentials?.accountType === 'distributor') {
          router?.push('/distributor-dashboard');
        } else {
          router?.push('/');
        }
      } else {
        setErrors({
          submit: `Credenciales incorrectas. Use: ${credentials?.email} / ${credentials?.password}`
        });
        setIsLoading(false);
      }
    }, 1000);
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <form onSubmit={handleSubmit} className="space-y-6" noValidate>
        <div className="flex gap-3 p-1 bg-muted rounded-lg">
          <button
            type="button"
            onClick={() => handleAccountTypeChange('customer')}
            className={`flex-1 py-3 px-4 rounded-md text-sm font-medium transition-smooth ${
              formData?.accountType === 'customer' ?'bg-card text-foreground shadow-elevation-1' :'text-muted-foreground hover:text-foreground'
            }`}
          >
            <div className="flex items-center justify-center space-x-2">
              <Icon name="UserIcon" size={18} />
              <span>Cliente</span>
            </div>
          </button>
          <button
            type="button"
            onClick={() => handleAccountTypeChange('distributor')}
            className={`flex-1 py-3 px-4 rounded-md text-sm font-medium transition-smooth ${
              formData?.accountType === 'distributor' ?'bg-card text-foreground shadow-elevation-1' :'text-muted-foreground hover:text-foreground'
            }`}
          >
            <div className="flex items-center justify-center space-x-2">
              <Icon name="BriefcaseIcon" size={18} />
              <span>Distribuidor</span>
            </div>
          </button>
        </div>

        <div className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
              Correo Electrónico
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
                onChange={handleChange}
                className={`w-full pl-10 pr-4 py-3 bg-card border rounded-lg text-sm transition-smooth focus:outline-none focus:ring-2 focus:ring-ring ${
                  errors?.email ? 'border-error' : 'border-input'
                }`}
                placeholder="tu@ejemplo.com"
                autoComplete="email"
              />
            </div>
            {errors?.email && (
              <p className="mt-1 text-xs text-error flex items-center space-x-1">
                <Icon name="ExclamationCircleIcon" size={14} />
                <span>{errors?.email}</span>
              </p>
            )}
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-foreground mb-2">
              Contraseña
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Icon name="LockClosedIcon" size={20} className="text-muted-foreground" />
              </div>
              <input
                type={showPassword ? 'text' : 'password'}
                id="password"
                name="password"
                value={formData?.password}
                onChange={handleChange}
                className={`w-full pl-10 pr-12 py-3 bg-card border rounded-lg text-sm transition-smooth focus:outline-none focus:ring-2 focus:ring-ring ${
                  errors?.password ? 'border-error' : 'border-input'
                }`}
                placeholder="••••••••"
                autoComplete="current-password"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-muted-foreground hover:text-foreground transition-smooth"
              >
                <Icon name={showPassword ? 'EyeSlashIcon' : 'EyeIcon'} size={20} />
              </button>
            </div>
            {errors?.password && (
              <p className="mt-1 text-xs text-error flex items-center space-x-1">
                <Icon name="ExclamationCircleIcon" size={14} />
                <span>{errors?.password}</span>
              </p>
            )}
          </div>
        </div>

        <div className="flex items-center justify-between">
          <label className="flex items-center space-x-2 cursor-pointer">
            <input
              type="checkbox"
              name="rememberMe"
              checked={formData?.rememberMe}
              onChange={handleChange}
              className="w-4 h-4 rounded border-input text-primary focus:ring-2 focus:ring-ring transition-smooth"
            />
            <span className="text-sm text-foreground">Recordarme</span>
          </label>
          <Link
            href="/login"
            className="text-sm font-medium text-primary hover:text-secondary transition-smooth"
          >
            ¿Olvidaste tu contraseña?
          </Link>
        </div>

        {errors?.submit && (
          <div className="p-4 bg-error/10 border border-error rounded-lg">
            <p className="text-sm text-error flex items-start space-x-2">
              <Icon name="ExclamationTriangleIcon" size={20} className="flex-shrink-0 mt-0.5" />
              <span>{errors?.submit}</span>
            </p>
          </div>
        )}

        <button
          type="submit"
          disabled={isLoading}
          className="w-full py-3 px-6 bg-primary text-primary-foreground rounded-lg text-sm font-medium transition-smooth hover:shadow-elevation-2 active:scale-97 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
        >
          {isLoading ? (
            <>
              <Icon name="ArrowPathIcon" size={20} className="animate-spin" />
              <span>Iniciando sesión...</span>
            </>
          ) : (
            <>
              <span>Iniciar Sesión</span>
              <Icon name="ArrowRightIcon" size={20} />
            </>
          )}
        </button>
      </form>
      <div className="mt-6 text-center">
        <p className="text-sm text-muted-foreground">
          ¿No tienes una cuenta?{' '}
          <Link
            href="/user-registration"
            className="font-medium text-primary hover:text-secondary transition-smooth"
          >
            Regístrate aquí
          </Link>
        </p>
      </div>
    </div>
  );
}

LoginForm.propTypes = {
  onLoginSuccess: PropTypes?.func?.isRequired
};