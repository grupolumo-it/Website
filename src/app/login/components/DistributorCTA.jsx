import Link from 'next/link';
import Icon from '@/components/ui/AppIcon';

export default function DistributorCTA() {
  return (
    <div className="bg-gradient-to-br from-primary to-secondary p-6 md:p-8 rounded-lg text-primary-foreground">
      <div className="flex flex-col md:flex-row items-center md:items-start space-y-4 md:space-y-0 md:space-x-6">
        <div className="flex-shrink-0 w-16 h-16 md:w-20 md:h-20 bg-primary-foreground/20 rounded-full flex items-center justify-center">
          <Icon name="UserGroupIcon" size={32} className="text-primary-foreground" />
        </div>
        <div className="flex-1 text-center md:text-left">
          <h3 className="text-xl md:text-2xl font-semibold mb-2">
            ¿Quieres ser Distribuidor?
          </h3>
          <p className="text-sm md:text-base text-primary-foreground/90 mb-4">
            Únete a nuestra red de distribuidores y comienza a generar ingresos vendiendo productos químicos de limpieza profesionales. Obtén comisiones por tus ventas y las de tu equipo.
          </p>
          <Link
            href="/user-registration"
            className="inline-flex items-center space-x-2 px-6 py-3 bg-primary-foreground text-primary rounded-lg text-sm font-medium transition-smooth hover:shadow-elevation-2 active:scale-97"
          >
            <span>Registrarse como Distribuidor</span>
            <Icon name="ArrowRightIcon" size={18} />
          </Link>
        </div>
      </div>
    </div>
  );
}