import React from 'react';
import Icon from '../../../components/AppIcon';

const RecentGrievanceCard = ({ grievances }) => {
  const getStatusConfig = (status) => {
    const configs = {
      'Submitted': { color: 'text-blue-600', bgColor: 'bg-blue-50', icon: 'FileText' },
      'In Progress': { color: 'text-orange-600', bgColor: 'bg-orange-50', icon: 'Clock' },
      'Resolved': { color: 'text-success', bgColor: 'bg-success/10', icon: 'CheckCircle2' }
    };
    return configs?.[status] || configs?.['Submitted'];
  };

  if (!grievances || grievances?.length === 0) {
    return (
      <div className="bg-card rounded-xl p-4 md:p-6 border border-border shadow-elevation-sm">
        <div className="flex items-center gap-3 mb-4">
          <div className="bg-primary/10 rounded-lg p-2">
            <Icon name="MessageSquare" size={20} color="var(--color-primary)" />
          </div>
          <h3 className="text-base md:text-lg font-semibold text-foreground">Recent Grievances</h3>
        </div>
        <div className="text-center py-6">
          <Icon name="Inbox" size={40} className="mx-auto mb-3 text-muted-foreground opacity-50" />
          <p className="text-sm text-muted-foreground">No grievances submitted yet</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-card rounded-xl p-4 md:p-6 border border-border shadow-elevation-sm">
      <div className="flex items-center gap-3 mb-4">
        <div className="bg-primary/10 rounded-lg p-2">
          <Icon name="MessageSquare" size={20} color="var(--color-primary)" />
        </div>
        <h3 className="text-base md:text-lg font-semibold text-foreground">Recent Grievances</h3>
      </div>
      <div className="space-y-3">
        {grievances?.map((grievance) => {
          const config = getStatusConfig(grievance?.status);
          return (
            <div key={grievance?.id} className="flex items-start gap-3 p-3 bg-muted/50 rounded-lg">
              <div className={`${config?.bgColor} rounded-lg p-2 flex-shrink-0`}>
                <Icon name={config?.icon} size={16} className={config?.color} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-foreground line-clamp-1 mb-1">
                  {grievance?.category}
                </p>
                <p className="text-xs text-muted-foreground line-clamp-2 mb-2">
                  {grievance?.description}
                </p>
                <div className="flex items-center justify-between gap-2">
                  <span className={`text-xs font-medium ${config?.color}`}>
                    {grievance?.status}
                  </span>
                  <span className="text-xs text-muted-foreground whitespace-nowrap">
                    {grievance?.date}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default RecentGrievanceCard;