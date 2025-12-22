'use client';

import { useState } from 'react';
import PropTypes from 'prop-types';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import Icon from '@/components/ui/AppIcon';

export default function SalesChart({ data }) {
  const [chartType, setChartType] = useState('line');

  return (
    <div className="bg-card rounded-lg shadow-elevation-2 p-4 md:p-6 lg:p-8 w-full min-w-0">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 md:mb-6 space-y-3 sm:space-y-0">
        <h3 className="text-lg md:text-xl font-semibold text-foreground">Análisis de Ventas</h3>
        <div className="flex items-center space-x-2 bg-muted rounded-lg p-1">
          <button
            onClick={() => setChartType('line')}
            className={`px-3 md:px-4 py-2 rounded-md text-xs md:text-sm font-medium transition-smooth ${
              chartType === 'line' ? 'bg-primary text-primary-foreground' : 'text-foreground hover:bg-card'
            }`}
          >
            <Icon name="ChartBarIcon" size={16} className="inline mr-1" />
            Línea
          </button>
          <button
            onClick={() => setChartType('bar')}
            className={`px-3 md:px-4 py-2 rounded-md text-xs md:text-sm font-medium transition-smooth ${
              chartType === 'bar' ? 'bg-primary text-primary-foreground' : 'text-foreground hover:bg-card'
            }`}
          >
            <Icon name="Squares2X2Icon" size={16} className="inline mr-1" />
            Barras
          </button>
        </div>
      </div>
      <div className="w-full h-64 md:h-80" aria-label="Gráfico de Ventas Mensuales">
        <ResponsiveContainer width="100%" height="100%">
          {chartType === 'line' ? (
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
              <XAxis dataKey="month" stroke="var(--color-text-secondary)" style={{ fontSize: '12px' }} />
              <YAxis stroke="var(--color-text-secondary)" style={{ fontSize: '12px' }} />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'var(--color-card)',
                  border: '1px solid var(--color-border)',
                  borderRadius: '8px',
                  fontSize: '14px'
                }}
              />
              <Legend wrapperStyle={{ fontSize: '14px' }} />
              <Line type="monotone" dataKey="sales" stroke="var(--color-primary)" strokeWidth={2} name="Ventas (€)" />
              <Line type="monotone" dataKey="commission" stroke="var(--color-success)" strokeWidth={2} name="Comisión (€)" />
            </LineChart>
          ) : (
            <BarChart data={data}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
              <XAxis dataKey="month" stroke="var(--color-text-secondary)" style={{ fontSize: '12px' }} />
              <YAxis stroke="var(--color-text-secondary)" style={{ fontSize: '12px' }} />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'var(--color-card)',
                  border: '1px solid var(--color-border)',
                  borderRadius: '8px',
                  fontSize: '14px'
                }}
              />
              <Legend wrapperStyle={{ fontSize: '14px' }} />
              <Bar dataKey="sales" fill="var(--color-primary)" name="Ventas (€)" />
              <Bar dataKey="commission" fill="var(--color-success)" name="Comisión (€)" />
            </BarChart>
          )}
        </ResponsiveContainer>
      </div>
    </div>
  );
}

SalesChart.propTypes = {
  data: PropTypes?.arrayOf(
    PropTypes?.shape({
      month: PropTypes?.string?.isRequired,
      sales: PropTypes?.number?.isRequired,
      commission: PropTypes?.number?.isRequired
    })
  )?.isRequired
};