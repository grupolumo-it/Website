'use client';

import { useState } from 'react';
import PropTypes from 'prop-types';
import Icon from '@/components/ui/AppIcon';

export default function PromoCodeInput({ onApplyCode, appliedCode }) {
  const [code, setCode] = useState('');
  const [isApplying, setIsApplying] = useState(false);
  const [error, setError] = useState('');

  const handleApply = async () => {
    if (!code?.trim()) {
      setError('Por favor ingrese un código promocional');
      return;
    }

    setIsApplying(true);
    setError('');

    const result = await onApplyCode(code?.trim()?.toUpperCase());
    
    if (!result?.success) {
      setError(result?.message);
    } else {
      setCode('');
    }
    
    setIsApplying(false);
  };

  const handleRemove = () => {
    onApplyCode(null);
    setCode('');
    setError('');
  };

  return (
    <div className="space-y-3">
      {appliedCode ? (
        <div className="flex items-center justify-between p-3 bg-success/10 border border-success/20 rounded-md">
          <div className="flex items-center gap-2">
            <Icon name="CheckCircleIcon" size={20} variant="solid" className="text-success" />
            <div>
              <p className="text-sm font-semibold text-success">Código aplicado: {appliedCode?.code}</p>
              <p className="text-xs text-muted-foreground">{appliedCode?.description}</p>
            </div>
          </div>
          <button
            onClick={handleRemove}
            className="p-2 hover:bg-error/10 rounded-md transition-smooth text-error"
            aria-label="Eliminar código promocional"
          >
            <Icon name="XMarkIcon" size={20} />
          </button>
        </div>
      ) : (
        <div>
          <div className="flex gap-2">
            <input
              type="text"
              value={code}
              onChange={(e) => setCode(e?.target?.value?.toUpperCase())}
              placeholder="Código promocional"
              className="flex-1 px-4 py-2 border border-input rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-ring bg-background text-foreground"
              disabled={isApplying}
            />
            <button
              onClick={handleApply}
              disabled={isApplying || !code?.trim()}
              className="px-6 py-2 bg-primary text-primary-foreground rounded-md text-sm font-medium transition-smooth hover:shadow-elevation-2 active:scale-97 disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap"
            >
              {isApplying ? 'Aplicando...' : 'Aplicar'}
            </button>
          </div>
          {error && (
            <p className="text-xs text-error mt-2 flex items-center gap-1">
              <Icon name="ExclamationCircleIcon" size={14} variant="solid" />
              <span>{error}</span>
            </p>
          )}
        </div>
      )}
    </div>
  );
}

PromoCodeInput.propTypes = {
  onApplyCode: PropTypes?.func?.isRequired,
  appliedCode: PropTypes?.shape({
    code: PropTypes?.string?.isRequired,
    description: PropTypes?.string?.isRequired,
    discount: PropTypes?.number?.isRequired,
  }),
};