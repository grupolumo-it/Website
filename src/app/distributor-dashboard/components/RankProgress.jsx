import PropTypes from 'prop-types';
import Icon from '@/components/ui/AppIcon';

export default function RankProgress({ currentRank, nextRank, progress, requirements }) {
  return (
    <div className="bg-card rounded-lg shadow-elevation-2 p-4 md:p-6 lg:p-8 w-full min-w-0">
      <h3 className="text-lg md:text-xl font-semibold text-foreground mb-4 md:mb-6">Progreso de Rango</h3>
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="bg-primary/10 rounded-lg p-3">
            <Icon name="TrophyIcon" size={24} className="text-primary" />
          </div>
          <div>
            <p className="text-xs md:text-sm text-muted-foreground">Rango Actual</p>
            <p className="text-base md:text-lg font-semibold text-foreground">{currentRank}</p>
          </div>
        </div>
        <Icon name="ArrowRightIcon" size={24} className="text-muted-foreground" />
        <div className="flex items-center space-x-3">
          <div className="bg-secondary/10 rounded-lg p-3">
            <Icon name="StarIcon" size={24} className="text-secondary" />
          </div>
          <div>
            <p className="text-xs md:text-sm text-muted-foreground">Próximo Rango</p>
            <p className="text-base md:text-lg font-semibold text-foreground">{nextRank}</p>
          </div>
        </div>
      </div>
      <div className="mb-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs md:text-sm text-muted-foreground">Progreso</span>
          <span className="text-xs md:text-sm font-semibold text-foreground">{progress}%</span>
        </div>
        <div className="w-full bg-muted rounded-full h-3">
          <div
            className="bg-primary h-3 rounded-full transition-smooth"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
      <div className="space-y-3">
        <p className="text-sm md:text-base font-medium text-foreground">Requisitos para {nextRank}:</p>
        {requirements?.map((req, index) => (
          <div key={index} className="flex items-start space-x-3">
            <Icon
              name={req?.completed ? 'CheckCircleIcon' : 'ClockIcon'}
              size={20}
              className={req?.completed ? 'text-success' : 'text-muted-foreground'}
            />
            <div className="flex-1 min-w-0">
              <p className={`text-sm md:text-base ${req?.completed ? 'text-success line-through' : 'text-foreground'}`}>
                {req?.description}
              </p>
              {!req?.completed && req?.current && (
                <p className="text-xs md:text-sm text-muted-foreground mt-1">
                  {req?.current} / {req?.target}
                </p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

RankProgress.propTypes = {
  currentRank: PropTypes?.string?.isRequired,
  nextRank: PropTypes?.string?.isRequired,
  progress: PropTypes?.number?.isRequired,
  requirements: PropTypes?.arrayOf(
    PropTypes?.shape({
      description: PropTypes?.string?.isRequired,
      completed: PropTypes?.bool?.isRequired,
      current: PropTypes?.string,
      target: PropTypes?.string
    })
  )?.isRequired
};