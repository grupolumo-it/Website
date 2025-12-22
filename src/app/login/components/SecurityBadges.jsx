import Icon from '@/components/ui/AppIcon';

export default function SecurityBadges() {
  const badges = [
    {
      icon: 'ShieldCheckIcon',
      title: 'Conexión Segura',
      description: 'Cifrado SSL de 256 bits'
    },
    {
      icon: 'LockClosedIcon',
      title: 'Datos Protegidos',
      description: 'Cumplimiento RGPD'
    },
    {
      icon: 'CheckBadgeIcon',
      title: 'Verificado',
      description: 'Certificación ISO 27001'
    }
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-6">
      {badges?.map((badge, index) => (
        <div
          key={index}
          className="flex flex-col items-center text-center p-4 md:p-6 bg-card border border-border rounded-lg transition-smooth hover:shadow-elevation-2"
        >
          <div className="w-12 h-12 md:w-14 md:h-14 bg-accent rounded-full flex items-center justify-center mb-3">
            <Icon name={badge?.icon} size={24} className="text-accent-foreground" />
          </div>
          <h3 className="text-sm md:text-base font-semibold text-foreground mb-1">
            {badge?.title}
          </h3>
          <p className="text-xs md:text-sm text-muted-foreground">
            {badge?.description}
          </p>
        </div>
      ))}
    </div>
  );
}