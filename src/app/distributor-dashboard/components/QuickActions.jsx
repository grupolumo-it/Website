import PropTypes from 'prop-types';
import Icon from '@/components/ui/AppIcon';

export default function QuickActions({ actions }) {
  return (
    <div className="bg-card rounded-lg shadow-elevation-2 p-4 md:p-6 lg:p-8 w-full min-w-0">
      <h3 className="text-lg md:text-xl font-semibold text-foreground mb-4 md:mb-6">Acciones Rápidas</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4">
        {actions?.map((action) => (
          <button
            key={action?.id}
            className="flex items-center space-x-3 p-4 rounded-lg border border-border hover:border-primary hover:bg-accent/50 transition-smooth text-left w-full min-w-0"
          >
            <div className="bg-primary/10 rounded-lg p-3 flex-shrink-0">
              <Icon name={action?.icon} size={24} className="text-primary" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm md:text-base font-medium text-foreground truncate">{action?.title}</p>
              <p className="text-xs md:text-sm text-muted-foreground line-clamp-2">{action?.description}</p>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}

QuickActions.propTypes = {
  actions: PropTypes?.arrayOf(
    PropTypes?.shape({
      id: PropTypes?.number?.isRequired,
      title: PropTypes?.string?.isRequired,
      description: PropTypes?.string?.isRequired,
      icon: PropTypes?.string?.isRequired
    })
  )?.isRequired
};