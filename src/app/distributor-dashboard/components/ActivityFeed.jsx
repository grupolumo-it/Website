import PropTypes from 'prop-types';
import Icon from '@/components/ui/AppIcon';

export default function ActivityFeed({ activities }) {
  const getActivityIcon = (type) => {
    const icons = {
      enrollment: 'UserPlusIcon',
      sale: 'ShoppingBagIcon',
      achievement: 'TrophyIcon',
      promotion: 'SparklesIcon'
    };
    return icons?.[type] || 'BellIcon';
  };

  const getActivityColor = (type) => {
    const colors = {
      enrollment: 'text-primary',
      sale: 'text-success',
      achievement: 'text-warning',
      promotion: 'text-secondary'
    };
    return colors?.[type] || 'text-muted-foreground';
  };

  return (
    <div className="bg-card rounded-lg shadow-elevation-2 p-4 md:p-6 lg:p-8 w-full min-w-0">
      <h3 className="text-lg md:text-xl font-semibold text-foreground mb-4 md:mb-6">Actividad Reciente</h3>
      <div className="space-y-4">
        {activities?.map((activity) => (
          <div key={activity?.id} className="flex items-start space-x-3 md:space-x-4 pb-4 border-b border-border last:border-0 last:pb-0">
            <div className={`${getActivityColor(activity?.type)} bg-muted rounded-full p-2 flex-shrink-0`}>
              <Icon name={getActivityIcon(activity?.type)} size={20} />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm md:text-base text-foreground line-clamp-2">{activity?.description}</p>
              <p className="text-xs md:text-sm text-muted-foreground mt-1">{activity?.time}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

ActivityFeed.propTypes = {
  activities: PropTypes?.arrayOf(
    PropTypes?.shape({
      id: PropTypes?.number?.isRequired,
      type: PropTypes?.oneOf(['enrollment', 'sale', 'achievement', 'promotion'])?.isRequired,
      description: PropTypes?.string?.isRequired,
      time: PropTypes?.string?.isRequired
    })
  )?.isRequired
};