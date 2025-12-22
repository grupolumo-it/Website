import PropTypes from 'prop-types';
import Icon from '@/components/ui/AppIcon';
import AppImage from '@/components/ui/AppImage';

export default function SuccessTestimonials({ accountType }) {
  const testimonials = accountType === 'distributor' ? [
  {
    name: 'María González',
    role: 'Distribuidora Senior',
    image: "https://img.rocket.new/generatedImages/rocket_gen_img_101cc19cd-1763294878284.png",
    alt: 'Professional headshot of Hispanic woman with long dark hair in business attire smiling confidently',
    quote: 'En 2 años construí un equipo de 50 distribuidores. Las comisiones me permiten trabajar desde casa.',
    earnings: '€3.500/mes'
  },
  {
    name: 'Carlos Ruiz',
    role: 'Distribuidor Ejecutivo',
    image: "https://img.rocket.new/generatedImages/rocket_gen_img_103ac89f6-1763296203185.png",
    alt: 'Professional headshot of Hispanic man with short black hair in navy suit smiling warmly',
    quote: 'Empecé como cliente y ahora lidero una red de distribución en toda Andalucía.',
    earnings: '€5.200/mes'
  }] :
  [
  {
    name: 'Ana Martínez',
    role: 'Gerente de Limpieza',
    image: "https://img.rocket.new/generatedImages/rocket_gen_img_13f45c849-1763294061108.png",
    alt: 'Professional headshot of Hispanic woman with shoulder-length brown hair in white blouse smiling professionally',
    quote: 'Los productos químicos de ChemClean son los mejores que he usado. Calidad profesional a precio justo.',
    rating: 5
  },
  {
    name: 'Roberto Sánchez',
    role: 'Propietario de Hotel',
    image: "https://img.rocket.new/generatedImages/rocket_gen_img_12a8c497b-1763294003730.png",
    alt: 'Professional headshot of Hispanic man with short dark hair in gray suit smiling confidently',
    quote: 'Compro al por mayor para mi hotel. El servicio es excelente y los precios inmejorables.',
    rating: 5
  }];


  return (
    <div className="space-y-4 md:space-y-6">
      <h3 className="text-lg md:text-xl font-semibold text-foreground">
        {accountType === 'distributor' ? 'Historias de Éxito' : 'Lo Que Dicen Nuestros Clientes'}
      </h3>
      <div className="space-y-4">
        {testimonials?.map((testimonial, index) =>
        <div
          key={index}
          className="bg-card rounded-lg border border-border p-4 md:p-6 shadow-elevation-1 transition-smooth hover:shadow-elevation-2">

            <div className="flex items-start space-x-4 mb-4">
              <div className="w-12 h-12 md:w-16 md:h-16 rounded-full overflow-hidden flex-shrink-0">
                <AppImage
                src={testimonial?.image}
                alt={testimonial?.alt}
                className="w-full h-full object-cover" />

              </div>
              <div className="flex-1 min-w-0">
                <h4 className="text-sm md:text-base font-semibold text-foreground line-clamp-1">
                  {testimonial?.name}
                </h4>
                <p className="text-xs md:text-sm text-muted-foreground line-clamp-1">
                  {testimonial?.role}
                </p>
                {testimonial?.earnings &&
              <p className="text-xs md:text-sm font-semibold text-success mt-1 whitespace-nowrap">
                    {testimonial?.earnings}
                  </p>
              }
                {testimonial?.rating &&
              <div className="flex items-center space-x-1 mt-1">
                    {[...Array(testimonial?.rating)]?.map((_, i) =>
                <Icon key={i} name="StarIcon" size={14} variant="solid" className="text-warning" />
                )}
                  </div>
              }
              </div>
            </div>
            <p className="text-xs md:text-sm text-foreground italic line-clamp-3">
              "{testimonial?.quote}"
            </p>
          </div>
        )}
      </div>
    </div>);

}

SuccessTestimonials.propTypes = {
  accountType: PropTypes?.oneOf(['customer', 'distributor'])?.isRequired
};