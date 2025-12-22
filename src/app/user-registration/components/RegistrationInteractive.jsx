'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import PropTypes from 'prop-types';
import Icon from '@/components/ui/AppIcon';
import RegistrationProgress from './RegistrationProgress';
import AccountTypeSelector from './AccountTypeSelector';
import PersonalInfoForm from './PersonalInfoForm';
import DistributorInfoForm from './DistributorInfoForm';
import VerificationForm from './VerificationForm';
import TrustBadges from './TrustBadges';
import SuccessTestimonials from './SuccessTestimonials';

export default function RegistrationInteractive({ initialData }) {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    accountType: 'customer',
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    businessType: '',
    referralCode: '',
    referralVerified: false,
    sponsorName: '',
    businessName: '',
    taxId: '',
    businessAddress: '',
    commissionPreference: '',
    acceptTerms: false,
    acceptDistributorTerms: false,
    acceptMarketing: false
  });

  const handleFormDataChange = (name, value) => {
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    if (errors?.[name]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors?.[name];
        return newErrors;
      });
    }
  };

  const handleAccountTypeChange = (type) => {
    setFormData(prev => ({
      ...prev,
      accountType: type
    }));
  };

  const handleVerifyReferral = () => {
    if (!formData?.referralCode) {
      setErrors(prev => ({
        ...prev,
        referralCode: 'Por favor ingresa un código de patrocinador'
      }));
      return;
    }

    const validCodes = initialData?.validReferralCodes || [];
    const isValid = validCodes?.some(code => code?.code === formData?.referralCode);

    if (isValid) {
      const sponsor = validCodes?.find(code => code?.code === formData?.referralCode);
      setFormData(prev => ({
        ...prev,
        referralVerified: true,
        sponsorName: sponsor?.name
      }));
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors?.referralCode;
        return newErrors;
      });
    } else {
      setErrors(prev => ({
        ...prev,
        referralCode: 'Código de patrocinador inválido'
      }));
    }
  };

  const validateStep = (step) => {
    const newErrors = {};

    if (step === 1) {
      if (!formData?.accountType) {
        newErrors.accountType = 'Selecciona un tipo de cuenta';
      }
    }

    if (step === 2) {
      if (!formData?.firstName?.trim()) {
        newErrors.firstName = 'El nombre es requerido';
      }
      if (!formData?.lastName?.trim()) {
        newErrors.lastName = 'El apellido es requerido';
      }
      if (!formData?.email?.trim()) {
        newErrors.email = 'El correo electrónico es requerido';
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/?.test(formData?.email)) {
        newErrors.email = 'Correo electrónico inválido';
      }
      if (!formData?.phone?.trim()) {
        newErrors.phone = 'El teléfono es requerido';
      }
      if (!formData?.password) {
        newErrors.password = 'La contraseña es requerida';
      } else if (formData?.password?.length < 8) {
        newErrors.password = 'La contraseña debe tener al menos 8 caracteres';
      } else if (!/[A-Z]/?.test(formData?.password)) {
        newErrors.password = 'La contraseña debe contener al menos una mayúscula';
      } else if (!/[0-9]/?.test(formData?.password)) {
        newErrors.password = 'La contraseña debe contener al menos un número';
      }
      if (!formData?.confirmPassword) {
        newErrors.confirmPassword = 'Confirma tu contraseña';
      } else if (formData?.password !== formData?.confirmPassword) {
        newErrors.confirmPassword = 'Las contraseñas no coinciden';
      }
    }

    if (step === 3 && formData?.accountType === 'distributor') {
      if (!formData?.referralCode?.trim()) {
        newErrors.referralCode = 'El código de patrocinador es requerido';
      } else if (!formData?.referralVerified) {
        newErrors.referralCode = 'Debes verificar el código de patrocinador';
      }
      if (!formData?.businessName?.trim()) {
        newErrors.businessName = 'El nombre del negocio es requerido';
      }
      if (!formData?.taxId?.trim()) {
        newErrors.taxId = 'El NIF/CIF es requerido';
      }
      if (!formData?.businessAddress?.trim()) {
        newErrors.businessAddress = 'La dirección del negocio es requerida';
      }
      if (!formData?.commissionPreference) {
        newErrors.commissionPreference = 'Selecciona una preferencia de comisión';
      }
    }

    if (step === 4) {
      if (!formData?.acceptTerms) {
        newErrors.acceptTerms = 'Debes aceptar los términos y condiciones';
      }
      if (formData?.accountType === 'distributor' && !formData?.acceptDistributorTerms) {
        newErrors.acceptDistributorTerms = 'Debes aceptar el acuerdo de distribuidor';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors)?.length === 0;
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      if (currentStep === 1 && formData?.accountType === 'customer') {
        setCurrentStep(2);
      } else if (currentStep === 2 && formData?.accountType === 'customer') {
        setCurrentStep(4);
      } else {
        setCurrentStep(prev => Math.min(prev + 1, 4));
      }
    }
  };

  const handleBack = () => {
    if (currentStep === 4 && formData?.accountType === 'customer') {
      setCurrentStep(2);
    } else {
      setCurrentStep(prev => Math.max(prev - 1, 1));
    }
  };

  const handleSubmit = async () => {
    if (!validateStep(4)) {
      return;
    }

    setIsSubmitting(true);

    try {
      await new Promise(resolve => setTimeout(resolve, 2000));

      const registrationData = {
        accountType: formData?.accountType,
        firstName: formData?.firstName,
        lastName: formData?.lastName,
        email: formData?.email,
        phone: formData?.phone,
        businessType: formData?.businessType,
        ...(formData?.accountType === 'distributor' && {
          referralCode: formData?.referralCode,
          sponsorName: formData?.sponsorName,
          businessName: formData?.businessName,
          taxId: formData?.taxId,
          businessAddress: formData?.businessAddress,
          commissionPreference: formData?.commissionPreference
        })
      };

      console.log('Registration successful:', registrationData);

      router?.push('/login?registered=true');
    } catch (error) {
      console.error('Registration error:', error);
      setErrors({ submit: 'Error al registrar. Por favor intenta de nuevo.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <AccountTypeSelector
            selectedType={formData?.accountType}
            onTypeChange={handleAccountTypeChange}
          />
        );
      case 2:
        return (
          <PersonalInfoForm
            formData={formData}
            errors={errors}
            onChange={handleFormDataChange}
          />
        );
      case 3:
        return (
          <DistributorInfoForm
            formData={formData}
            errors={errors}
            onChange={handleFormDataChange}
            onVerifyReferral={handleVerifyReferral}
          />
        );
      case 4:
        return (
          <VerificationForm
            formData={formData}
            errors={errors}
            onChange={handleFormDataChange}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="w-full px-4 md:px-6 lg:px-8 py-8 md:py-12">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8 md:mb-12">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-3 md:mb-4">
              Crear Cuenta
            </h1>
            <p className="text-base md:text-lg text-muted-foreground line-clamp-2">
              Únete a ChemClean Commerce y comienza tu viaje hacia productos de limpieza profesionales
            </p>
          </div>

          <RegistrationProgress currentStep={currentStep} totalSteps={4} />

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
            <div className="lg:col-span-2">
              <div className="bg-card rounded-lg border border-border p-6 md:p-8 shadow-elevation-2">
                <div className="mb-6 md:mb-8">
                  <h2 className="text-xl md:text-2xl font-semibold text-foreground mb-2">
                    {currentStep === 1 && 'Selecciona Tipo de Cuenta'}
                    {currentStep === 2 && 'Información Personal'}
                    {currentStep === 3 && 'Detalles de Distribuidor'}
                    {currentStep === 4 && 'Verificación y Confirmación'}
                  </h2>
                  <p className="text-sm md:text-base text-muted-foreground line-clamp-2">
                    {currentStep === 1 && 'Elige el tipo de cuenta que mejor se adapte a tus necesidades'}
                    {currentStep === 2 && 'Completa tu información personal y de contacto'}
                    {currentStep === 3 && 'Proporciona información sobre tu negocio de distribución'}
                    {currentStep === 4 && 'Revisa tu información y acepta los términos'}
                  </p>
                </div>

                {renderStepContent()}

                {errors?.submit && (
                  <div className="mt-6 p-4 bg-error/10 border border-error rounded-lg">
                    <div className="flex items-center space-x-2">
                      <Icon name="ExclamationCircleIcon" size={20} variant="solid" className="text-error" />
                      <p className="text-sm text-error">{errors?.submit}</p>
                    </div>
                  </div>
                )}

                <div className="flex items-center justify-between mt-8 pt-6 border-t border-border">
                  {currentStep > 1 ? (
                    <button
                      onClick={handleBack}
                      disabled={isSubmitting}
                      className="flex items-center space-x-2 px-6 py-3 text-foreground hover:bg-muted rounded-md transition-smooth disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <Icon name="ArrowLeftIcon" size={20} />
                      <span className="text-sm md:text-base font-medium">Atrás</span>
                    </button>
                  ) : (
                    <div />
                  )}

                  {currentStep < 4 ? (
                    <button
                      onClick={handleNext}
                      className="flex items-center space-x-2 px-6 md:px-8 py-3 bg-primary text-primary-foreground rounded-md text-sm md:text-base font-medium transition-smooth hover:shadow-elevation-2 active:scale-97"
                    >
                      <span>Siguiente</span>
                      <Icon name="ArrowRightIcon" size={20} />
                    </button>
                  ) : (
                    <button
                      onClick={handleSubmit}
                      disabled={isSubmitting}
                      className="flex items-center space-x-2 px-6 md:px-8 py-3 bg-success text-success-foreground rounded-md text-sm md:text-base font-medium transition-smooth hover:shadow-elevation-2 active:scale-97 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isSubmitting ? (
                        <>
                          <Icon name="ArrowPathIcon" size={20} className="animate-spin" />
                          <span>Registrando...</span>
                        </>
                      ) : (
                        <>
                          <Icon name="CheckCircleIcon" size={20} variant="solid" />
                          <span>Completar Registro</span>
                        </>
                      )}
                    </button>
                  )}
                </div>
              </div>
            </div>

            <div className="space-y-6 md:space-y-8">
              <SuccessTestimonials accountType={formData?.accountType} />
              
              <div className="bg-card rounded-lg border border-border p-4 md:p-6 shadow-elevation-1">
                <div className="flex items-start space-x-3 mb-4">
                  <Icon name="QuestionMarkCircleIcon" size={24} className="text-primary flex-shrink-0 mt-0.5" />
                  <div className="flex-1 min-w-0">
                    <h4 className="text-sm md:text-base font-semibold text-foreground mb-2">
                      ¿Necesitas Ayuda?
                    </h4>
                    <p className="text-xs md:text-sm text-muted-foreground mb-3 line-clamp-3">
                      Nuestro equipo está disponible para ayudarte con el proceso de registro
                    </p>
                    <a
                      href="mailto:soporte@chemclean.com"
                      className="text-xs md:text-sm text-primary hover:underline font-medium"
                    >
                      soporte@chemclean.com
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8 md:mt-12">
            <TrustBadges />
          </div>

          <div className="mt-8 text-center">
            <p className="text-sm md:text-base text-muted-foreground">
              ¿Ya tienes una cuenta?{' '}
              <a href="/login" className="text-primary hover:underline font-medium">
                Inicia Sesión
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

RegistrationInteractive.propTypes = {
  initialData: PropTypes?.shape({
    validReferralCodes: PropTypes?.arrayOf(
      PropTypes?.shape({
        code: PropTypes?.string?.isRequired,
        name: PropTypes?.string?.isRequired
      })
    )
  })?.isRequired
};