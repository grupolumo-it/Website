import Icon from '@/components/ui/AppIcon';

export default function BenefitsSection() {
  const benefits = [
    {
      icon: 'ShoppingCartIcon',
      title: 'Compra Rápida',
      description: 'Accede a tu carrito guardado y finaliza compras en segundos'
    },
    {
      icon: 'ClipboardDocumentListIcon',
      title: 'Historial de Pedidos',
      description: 'Consulta y repite pedidos anteriores fácilmente'
    },
    {
      icon: 'BellAlertIcon',
      title: 'Ofertas Exclusivas',
      description: 'Recibe notificaciones de promociones y descuentos especiales'
    },
    {
      icon: 'ChartBarIcon',
      title: 'Panel de Distribuidor',
      description: 'Gestiona tu red y comisiones desde un solo lugar'
    }
  ];

  return (
    <div className="space-y-4 md:space-y-6">
      <div className="text-center">
        <h2 className="text-2xl md:text-3xl font-semibold text-foreground mb-2">
          Beneficios de tu Cuenta
        </h2>
        <p className="text-sm md:text-base text-muted-foreground">
          Disfruta de ventajas exclusivas al iniciar sesión
        </p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
        {benefits?.map((benefit, index) => (
          <div
            key={index}
            className="flex items-start space-x-4 p-4 md:p-6 bg-card border border-border rounded-lg transition-smooth hover:shadow-elevation-2"
          >
            <div className="flex-shrink-0 w-10 h-10 md:w-12 md:h-12 bg-primary/10 rounded-lg flex items-center justify-center">
              <Icon name={benefit?.icon} size={20} className="text-primary" />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="text-sm md:text-base font-semibold text-foreground mb-1 line-clamp-1">
                {benefit?.title}
              </h3>
              <p className="text-xs md:text-sm text-muted-foreground line-clamp-2">
                {benefit?.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}