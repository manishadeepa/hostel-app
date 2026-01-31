import React from 'react';
import Icon from '../../../components/AppIcon';

const GrievanceAnalytics = ({ analytics }) => {
  const statCards = [
    {
      label: 'Total Grievances',
      value: analytics?.total,
      icon: 'FileText',
      color: 'var(--color-primary)',
      bgColor: 'bg-primary/10'
    },
    {
      label: 'Pending',
      value: analytics?.pending,
      icon: 'Clock',
      color: 'var(--color-warning)',
      bgColor: 'bg-warning/10'
    },
    {
      label: 'In Progress',
      value: analytics?.inProgress,
      icon: 'RefreshCw',
      color: 'var(--color-accent)',
      bgColor: 'bg-accent/10'
    },
    {
      label: 'Resolved',
      value: analytics?.resolved,
      icon: 'CheckCircle',
      color: 'var(--color-success)',
      bgColor: 'bg-success/10'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      {statCards?.map((stat, index) => (
        <div key={index} className="card">
          <div className="flex items-start justify-between mb-4">
            <div className={`w-12 h-12 rounded-lg ${stat?.bgColor} flex items-center justify-center`}>
              <Icon name={stat?.icon} size={24} color={stat?.color} />
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-foreground data-text">{stat?.value}</div>
              <div className="text-xs text-muted-foreground caption mt-1">{stat?.label}</div>
            </div>
          </div>
          <div className="h-1 bg-muted rounded-full overflow-hidden">
            <div
              className="h-full transition-all duration-500"
              style={{
                width: `${(stat?.value / analytics?.total) * 100}%`,
                backgroundColor: stat?.color
              }}
            />
          </div>
        </div>
      ))}
    </div>
  );
};

export default GrievanceAnalytics;