'use client';

import { useState } from 'react';
import PropTypes from 'prop-types';
import Icon from '@/components/ui/AppIcon';

export default function CommissionCalculator({ commissionRates }) {
  const [salesAmount, setSalesAmount] = useState('');
  const [teamSize, setTeamSize] = useState('');
  const [calculatedCommission, setCalculatedCommission] = useState(null);

  const calculateCommission = () => {
    const sales = parseFloat(salesAmount) || 0;
    const team = parseInt(teamSize) || 0;
    
    let rate = commissionRates?.base;
    if (team >= 10) rate = commissionRates?.silver;
    if (team >= 25) rate = commissionRates?.gold;
    if (team >= 50) rate = commissionRates?.platinum;
    
    const commission = sales * (rate / 100);
    const bonus = team >= 10 ? sales * 0.02 : 0;
    
    setCalculatedCommission({
      commission: commission,
      bonus: bonus,
      total: commission + bonus,
      rate: rate
    });
  };

  return (
    <div className="bg-card rounded-lg shadow-elevation-2 p-4 md:p-6 lg:p-8 w-full min-w-0">
      <h3 className="text-lg md:text-xl font-semibold text-foreground mb-4 md:mb-6">Calculadora de Comisiones</h3>
      <div className="space-y-4">
        <div>
          <label className="block text-sm md:text-base font-medium text-foreground mb-2">
            Volumen de Ventas (€)
          </label>
          <input
            type="number"
            value={salesAmount}
            onChange={(e) => setSalesAmount(e?.target?.value)}
            placeholder="Ej: 5000"
            className="w-full px-4 py-2 md:py-3 border border-input rounded-lg text-sm md:text-base text-foreground bg-background focus:outline-none focus:ring-2 focus:ring-ring transition-smooth"
          />
        </div>
        
        <div>
          <label className="block text-sm md:text-base font-medium text-foreground mb-2">
            Tamaño del Equipo
          </label>
          <input
            type="number"
            value={teamSize}
            onChange={(e) => setTeamSize(e?.target?.value)}
            placeholder="Ej: 15"
            className="w-full px-4 py-2 md:py-3 border border-input rounded-lg text-sm md:text-base text-foreground bg-background focus:outline-none focus:ring-2 focus:ring-ring transition-smooth"
          />
        </div>
        
        <button
          onClick={calculateCommission}
          className="w-full bg-primary text-primary-foreground px-6 py-3 rounded-lg text-sm md:text-base font-medium transition-smooth hover:shadow-elevation-2 active:scale-97 flex items-center justify-center space-x-2"
        >
          <Icon name="CalculatorIcon" size={20} />
          <span>Calcular Comisión</span>
        </button>
        
        {calculatedCommission && (
          <div className="mt-6 p-4 md:p-6 bg-accent rounded-lg space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm md:text-base text-accent-foreground">Tasa de Comisión:</span>
              <span className="text-base md:text-lg font-semibold text-accent-foreground">{calculatedCommission?.rate}%</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm md:text-base text-accent-foreground">Comisión Base:</span>
              <span className="text-base md:text-lg font-semibold text-accent-foreground">
                €{calculatedCommission?.commission?.toLocaleString('es-ES', { minimumFractionDigits: 2 })}
              </span>
            </div>
            {calculatedCommission?.bonus > 0 && (
              <div className="flex items-center justify-between">
                <span className="text-sm md:text-base text-accent-foreground">Bono de Equipo:</span>
                <span className="text-base md:text-lg font-semibold text-success">
                  +€{calculatedCommission?.bonus?.toLocaleString('es-ES', { minimumFractionDigits: 2 })}
                </span>
              </div>
            )}
            <div className="pt-3 border-t border-accent-foreground/20 flex items-center justify-between">
              <span className="text-base md:text-lg font-semibold text-accent-foreground">Total Estimado:</span>
              <span className="text-xl md:text-2xl font-bold text-accent-foreground whitespace-nowrap">
                €{calculatedCommission?.total?.toLocaleString('es-ES', { minimumFractionDigits: 2 })}
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

CommissionCalculator.propTypes = {
  commissionRates: PropTypes?.shape({
    base: PropTypes?.number?.isRequired,
    silver: PropTypes?.number?.isRequired,
    gold: PropTypes?.number?.isRequired,
    platinum: PropTypes?.number?.isRequired
  })?.isRequired
};