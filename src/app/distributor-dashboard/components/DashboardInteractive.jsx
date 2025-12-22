'use client';

import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import MetricsCard from './MetricsCard';
import DownlineTable from './DownlineTable';
import ActivityFeed from './ActivityFeed';
import SalesChart from './SalesChart';
import NetworkVisualization from './NetworkVisualization';
import CommissionCalculator from './CommissionCalculator';
import QuickActions from './QuickActions';
import RankProgress from './RankProgress';

export default function DashboardInteractive({ initialData }) {
  const [sortField, setSortField] = useState('monthlySales');
  const [sortDirection, setSortDirection] = useState('desc');
  const [filteredDistributors, setFilteredDistributors] = useState(initialData?.distributors);

  useEffect(() => {
    const sorted = [...initialData?.distributors]?.sort((a, b) => {
      const aValue = a?.[sortField];
      const bValue = b?.[sortField];
      return sortDirection === 'asc' ? aValue - bValue : bValue - aValue;
    });
    setFilteredDistributors(sorted);
  }, [sortField, sortDirection, initialData?.distributors]);

  return (
    <div className="space-y-6 md:space-y-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        {initialData?.metrics?.map((metric) => (
          <MetricsCard key={metric?.id} {...metric} />
        ))}
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
        <div className="lg:col-span-2">
          <SalesChart data={initialData?.salesData} />
        </div>
        <div>
          <RankProgress
            currentRank={initialData?.rankProgress?.currentRank}
            nextRank={initialData?.rankProgress?.nextRank}
            progress={initialData?.rankProgress?.progress}
            requirements={initialData?.rankProgress?.requirements}
          />
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
        <CommissionCalculator commissionRates={initialData?.commissionRates} />
        <QuickActions actions={initialData?.quickActions} />
      </div>
      <DownlineTable distributors={filteredDistributors} />
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
        <div className="lg:col-span-2">
          <NetworkVisualization networkData={initialData?.networkData} />
        </div>
        <div>
          <ActivityFeed activities={initialData?.activities} />
        </div>
      </div>
    </div>
  );
}

DashboardInteractive.propTypes = {
  initialData: PropTypes?.shape({
    metrics: PropTypes?.array?.isRequired,
    salesData: PropTypes?.array?.isRequired,
    distributors: PropTypes?.array?.isRequired,
    activities: PropTypes?.array?.isRequired,
    networkData: PropTypes?.object?.isRequired,
    commissionRates: PropTypes?.object?.isRequired,
    quickActions: PropTypes?.array?.isRequired,
    rankProgress: PropTypes?.object?.isRequired
  })?.isRequired
};