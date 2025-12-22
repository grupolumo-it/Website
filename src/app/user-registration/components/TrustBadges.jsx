import Icon from '@/components/ui/AppIcon';

export default function TrustBadges() {
  const badges = [
    {
      icon: 'ShieldCheckIcon',
      title: 'Pago Seguro',
      description: 'Encriptación SSL 256-bit'
    },
    {
      icon: 'CheckBadgeIcon',
      title: 'Certificado ISO',
      description: 'Calidad garantizada'
    },
    {
      icon: 'LockClosedIcon',
      title: 'Datos Protegidos',
      description: 'RGPD compliant'
    },
    {
      icon: 'TruckIcon',
      title: 'Envío Rápido',
      description: '24-48 horas'
    }
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
      {badges?.map((badge, index) => (
        <div
          key={index}
          className="flex flex-col items-center text-center p-4 bg-card rounded-lg border border-border transition-smooth hover:shadow-elevation-2"
        >
          <div className="w-12 h-12 md:w-16 md:h-16 rounded-full bg-primary/10 flex items-center justify-center mb-3">
            <Icon name={badge?.icon} size={24} variant="solid" className="text-primary" />
          </div>
          <h4 className="text-sm md:text-base font-semibold text-foreground mb-1 line-clamp-1">
            {badge?.title}
          </h4>
          <p className="text-xs md:text-sm text-muted-foreground line-clamp-2">
            {badge?.description}
          </p>
        </div>
      ))}
    </div>
  );
}