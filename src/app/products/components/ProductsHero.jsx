import Icon from '@/components/ui/AppIcon';

export default function ProductsHero() {
  return (
    <section className="bg-gradient-to-br from-primary to-secondary text-primary-foreground py-12 md:py-16 lg:py-20">
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
        <div className="text-center">
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 md:w-20 md:h-20 bg-primary-foreground/20 rounded-full flex items-center justify-center">
              <Icon name="BeakerIcon" size={40} className="text-primary-foreground" />
            </div>
          </div>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-semibold text-primary-foreground mb-4">
            Catálogo de Productos
          </h1>
          <p className="text-base md:text-lg text-primary-foreground/90 max-w-2xl mx-auto">
            Encuentra los mejores productos de limpieza y desinfección para tu negocio.
            Calidad profesional garantizada.
          </p>
        </div>
      </div>
    </section>
  );
}
