import PropTypes from 'prop-types';
import Icon from '@/components/ui/AppIcon';

export default function MetricsCard({ title, value, subtitle, icon, trend, trendValue, bgColor }) {
  const trendColor = trend === 'up' ? 'text-success' : trend === 'down' ? 'text-error' : 'text-muted-foreground';
  const trendIcon = trend === 'up' ? 'ArrowTrendingUpIcon' : trend === 'down' ? 'ArrowTrendingDownIcon' : 'MinusIcon';

  return (
    <div className={`${bgColor} rounded-lg p-4 md:p-6 lg:p-8 shadow-elevation-2 transition-smooth hover:shadow-elevation-3 w-full min-w-0`}>
      <div className="flex items-start justify-between mb-3 md:mb-4">
        <div className="flex-1 min-w-0">
          <p className="text-xs md:text-sm text-muted-foreground font-caption mb-1 truncate">{title}</p>
          <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold text-foreground whitespace-nowrap">{value}</h3>
          {subtitle && (
            <p className="text-xs md:text-sm text-muted-foreground mt-1 truncate">{subtitle}</p>
          )}
        </div>
        <div className={`${bgColor === 'bg-card' ? 'bg-accent' : 'bg-card'} rounded-lg p-2 md:p-3 flex-shrink-0`}>
          <Icon name={icon} size={24} className="text-primary" />
        </div>
      </div>
      {trend && (
        <div className="flex items-center space-x-2">
          <Icon name={trendIcon} size={16} className={trendColor} />
          <span className={`text-xs md:text-sm font-medium ${trendColor}`}>{trendValue}</span>
          <span className="text-xs text-muted-foreground">vs mes anterior</span>
        </div>
      )}
    </div>
  );
}

MetricsCard.propTypes = {
  title: PropTypes?.string?.isRequired,
  value: PropTypes?.string?.isRequired,
  subtitle: PropTypes?.string,
  icon: PropTypes?.string?.isRequired,
  trend: PropTypes?.oneOf(['up', 'down', 'neutral']),
  trendValue: PropTypes?.string,
  bgColor: PropTypes?.string
};