'use client';

import { useState } from 'react';
import PropTypes from 'prop-types';
import Icon from '@/components/ui/AppIcon';

export default function NetworkVisualization({ networkData }) {
  const [expandedNodes, setExpandedNodes] = useState([]);

  const toggleNode = (nodeId) => {
    setExpandedNodes(prev =>
      prev?.includes(nodeId) ? prev?.filter(id => id !== nodeId) : [...prev, nodeId]
    );
  };

  const renderNode = (node, level = 0) => {
    const isExpanded = expandedNodes?.includes(node?.id);
    const hasChildren = node?.children && node?.children?.length > 0;

    return (
      <div key={node?.id} className="w-full min-w-0">
        <div
          className={`flex items-center space-x-3 p-3 md:p-4 rounded-lg transition-smooth cursor-pointer ${
            level === 0 ? 'bg-primary text-primary-foreground' : 'bg-card hover:bg-muted'
          }`}
          style={{ marginLeft: `${level * 24}px` }}
          onClick={() => hasChildren && toggleNode(node?.id)}
        >
          {hasChildren && (
            <Icon
              name={isExpanded ? 'ChevronDownIcon' : 'ChevronRightIcon'}
              size={20}
              className="flex-shrink-0"
            />
          )}
          <div className={`h-8 w-8 md:h-10 md:w-10 rounded-full ${level === 0 ? 'bg-primary-foreground/20' : 'bg-accent'} flex items-center justify-center flex-shrink-0`}>
            <span className={`text-xs md:text-sm font-semibold ${level === 0 ? 'text-primary-foreground' : 'text-accent-foreground'}`}>
              {node?.name?.charAt(0)?.toUpperCase()}
            </span>
          </div>
          <div className="flex-1 min-w-0">
            <p className={`text-sm md:text-base font-medium truncate ${level === 0 ? 'text-primary-foreground' : 'text-foreground'}`}>
              {node?.name}
            </p>
            <p className={`text-xs md:text-sm truncate ${level === 0 ? 'text-primary-foreground/80' : 'text-muted-foreground'}`}>
              Nivel {node?.level} • €{node?.sales?.toLocaleString('es-ES')} ventas
            </p>
          </div>
          <div className={`px-2 md:px-3 py-1 rounded-full text-xs font-medium flex-shrink-0 ${
            node?.performance === 'high' ? 'bg-success/20 text-success' :
            node?.performance === 'medium'? 'bg-warning/20 text-warning' : 'bg-muted text-muted-foreground'
          }`}>
            {node?.teamSize} equipo
          </div>
        </div>
        {isExpanded && hasChildren && (
          <div className="mt-2 space-y-2">
            {node?.children?.map(child => renderNode(child, level + 1))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="bg-card rounded-lg shadow-elevation-2 p-4 md:p-6 lg:p-8 w-full min-w-0">
      <div className="flex items-center justify-between mb-4 md:mb-6">
        <h3 className="text-lg md:text-xl font-semibold text-foreground">Red de Distribución</h3>
        <button
          onClick={() => setExpandedNodes([])}
          className="text-xs md:text-sm text-primary hover:text-primary/80 font-medium transition-smooth"
        >
          Colapsar Todo
        </button>
      </div>
      <div className="space-y-2">
        {renderNode(networkData)}
      </div>
    </div>
  );
}

NetworkVisualization.propTypes = {
  networkData: PropTypes?.shape({
    id: PropTypes?.number?.isRequired,
    name: PropTypes?.string?.isRequired,
    level: PropTypes?.number?.isRequired,
    sales: PropTypes?.number?.isRequired,
    teamSize: PropTypes?.number?.isRequired,
    performance: PropTypes?.oneOf(['high', 'medium', 'low'])?.isRequired,
    children: PropTypes?.array
  })?.isRequired
};