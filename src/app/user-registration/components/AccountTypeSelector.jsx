import PropTypes from 'prop-types';
import Icon from '@/components/ui/AppIcon';

export default function AccountTypeSelector({ selectedType, onTypeChange }) {
  const accountTypes = [
    {
      id: 'customer',
      title: 'Cliente',
      description: 'Compra productos de limpieza profesionales para uso personal o comercial',
      icon: 'UserIcon',
      benefits: [
        'Acceso a catálogo completo de productos',
        'Precios competitivos',
        'Historial de pedidos',
        'Soporte al cliente prioritario'
      ]
    },
    {
      id: 'distributor',
      title: 'Distribuidor',
      description: 'Construye tu negocio vendiendo productos químicos de limpieza de calidad',
      icon: 'BriefcaseIcon',
      benefits: [
        'Comisiones en ventas directas',
        'Bonos por construcción de equipo',
        'Precios preferenciales',
        'Panel de análisis de ventas',
        'Capacitación y soporte empresarial'
      ],
      featured: true
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
      {accountTypes?.map((type) => (
        <button
          key={type?.id}
          onClick={() => onTypeChange(type?.id)}
          className={`relative w-full min-w-0 p-6 md:p-8 rounded-lg border-2 transition-smooth text-left ${
            selectedType === type?.id
              ? 'border-primary bg-accent shadow-elevation-3'
              : 'border-border bg-card hover:border-primary/50 hover:shadow-elevation-2'
          }`}
        >
          {type?.featured && (
            <div className="absolute -top-3 right-4 bg-primary text-primary-foreground px-3 py-1 rounded-full text-xs font-semibold">
              Recomendado
            </div>
          )}
          
          <div className="flex items-start space-x-4 mb-4">
            <div
              className={`w-12 h-12 md:w-16 md:h-16 rounded-lg flex items-center justify-center transition-smooth ${
                selectedType === type?.id ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'
              }`}
            >
              <Icon name={type?.icon} size={24} variant={selectedType === type?.id ? 'solid' : 'outline'} />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="text-lg md:text-xl font-semibold text-foreground mb-1">{type?.title}</h3>
              <p className="text-sm md:text-base text-muted-foreground line-clamp-2">{type?.description}</p>
            </div>
          </div>

          <div className="space-y-2">
            {type?.benefits?.map((benefit, index) => (
              <div key={index} className="flex items-start space-x-2">
                <Icon
                  name="CheckCircleIcon"
                  size={16}
                  variant="solid"
                  className={selectedType === type?.id ? 'text-primary' : 'text-muted-foreground'}
                />
                <span className="text-xs md:text-sm text-foreground line-clamp-2">{benefit}</span>
              </div>
            ))}
          </div>

          {selectedType === type?.id && (
            <div className="absolute top-4 right-4">
              <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center">
                <Icon name="CheckIcon" size={16} variant="solid" className="text-primary-foreground" />
              </div>
            </div>
          )}
        </button>
      ))}
    </div>
  );
}

AccountTypeSelector.propTypes = {
  selectedType: PropTypes?.oneOf(['customer', 'distributor'])?.isRequired,
  onTypeChange: PropTypes?.func?.isRequired
};