import PropTypes from 'prop-types';
import Icon from '@/components/ui/AppIcon';

export default function RegistrationProgress({ currentStep, totalSteps }) {
  const steps = [
    { number: 1, label: 'Tipo de Cuenta' },
    { number: 2, label: 'Información Personal' },
    { number: 3, label: 'Detalles de Negocio' },
    { number: 4, label: 'Verificación' }
  ];

  return (
    <div className="w-full bg-card rounded-lg p-4 md:p-6 lg:p-8 shadow-elevation-2 mb-6 md:mb-8">
      <div className="flex items-center justify-between">
        {steps?.map((step, index) => (
          <div key={step?.number} className="flex items-center flex-1">
            <div className="flex flex-col items-center w-full">
              <div
                className={`w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center transition-smooth ${
                  step?.number < currentStep
                    ? 'bg-success text-success-foreground'
                    : step?.number === currentStep
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-muted text-muted-foreground'
                }`}
              >
                {step?.number < currentStep ? (
                  <Icon name="CheckIcon" size={20} variant="solid" />
                ) : (
                  <span className="text-sm md:text-base font-semibold">{step?.number}</span>
                )}
              </div>
              <span
                className={`mt-2 text-xs md:text-sm font-medium text-center transition-smooth ${
                  step?.number <= currentStep ? 'text-foreground' : 'text-muted-foreground'
                }`}
              >
                {step?.label}
              </span>
            </div>
            {index < steps?.length - 1 && (
              <div className="flex-1 h-0.5 mx-2 md:mx-4">
                <div
                  className={`h-full transition-smooth ${
                    step?.number < currentStep ? 'bg-success' : 'bg-muted'
                  }`}
                />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

RegistrationProgress.propTypes = {
  currentStep: PropTypes?.number?.isRequired,
  totalSteps: PropTypes?.number?.isRequired
};