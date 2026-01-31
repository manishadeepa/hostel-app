import React from 'react';
import Icon from '../../../components/AppIcon';

const GrievanceStats = ({ stats }) => {
  const statCards = [
    {
      label: 'Total Submitted',
      value: stats?.total,
      icon: 'FileText',
      color: 'var(--color-primary)',
      bgColor: 'bg-primary/10'
    },
    {
      label: 'Pending',
      value: stats?.pending,
      icon: 'Clock',
      color: 'var(--color-warning)',
      bgColor: 'bg-warning/10'
    },
    {
      label: 'In Progress',
      value: stats?.inProgress,
      icon: 'RefreshCw',
      color: 'var(--color-accent)',
      bgColor: 'bg-accent/10'
    },
    {
      label: 'Resolved',
      value: stats?.resolved,
      icon: 'CheckCircle',
      color: 'var(--color-success)',
      bgColor: 'bg-success/10'
    }
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {statCards?.map((stat, index) => (
        <div key={index} className="card hover:shadow-md transition-smooth">
          <div className="flex items-center gap-3">
            <div className={`flex-shrink-0 w-12 h-12 rounded-lg ${stat?.bgColor} flex items-center justify-center`}>
              <Icon name={stat?.icon} size={24} color={stat?.color} />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs md:text-sm text-muted-foreground caption mb-1">
                {stat?.label}
              </p>
              <p className="text-xl md:text-2xl font-bold text-foreground data-text">
                {stat?.value}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default GrievanceStats;