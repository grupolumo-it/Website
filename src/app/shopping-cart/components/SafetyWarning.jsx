import PropTypes from 'prop-types';
import Icon from '@/components/ui/AppIcon';

export default function SafetyWarning({ warnings }) {
  if (!warnings || warnings?.length === 0) return null;

  return (
    <div className="bg-warning/10 border-2 border-warning rounded-lg p-4 md:p-6 mb-6">
      <div className="flex items-start gap-3">
        <Icon name="ExclamationTriangleIcon" size={24} variant="solid" className="text-warning flex-shrink-0 mt-1" />
        <div className="flex-1 min-w-0">
          <h3 className="text-base md:text-lg font-semibold text-warning mb-2">
            Advertencia de Seguridad Química
          </h3>
          <div className="space-y-2">
            {warnings?.map((warning, index) => (
              <div key={index} className="text-sm md:text-base text-foreground">
                <p className="font-medium mb-1">{warning?.title}</p>
                <p className="text-muted-foreground">{warning?.message}</p>
                {warning?.recommendation && (
                  <p className="mt-1 text-primary font-medium">
                    Recomendación: {warning?.recommendation}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

SafetyWarning.propTypes = {
  warnings: PropTypes?.arrayOf(
    PropTypes?.shape({
      title: PropTypes?.string?.isRequired,
      message: PropTypes?.string?.isRequired,
      recommendation: PropTypes?.string,
    })
  ),
};