import React from 'react';
import Icon from '../../../components/AppIcon';

const NoticeAlertCard = ({ notices, alerts }) => {
  const getPriorityConfig = (priority) => {
    if (priority === 'high' || priority === 'emergency') {
      return {
        color: 'text-error',
        bgColor: 'bg-error/10',
        icon: 'AlertTriangle'
      };
    }
    return {
      color: 'text-primary',
      bgColor: 'bg-primary/10',
      icon: 'Info'
    };
  };

  const allItems = [
    ...(notices || [])?.map(n => ({ ...n, type: 'notice' })),
    ...(alerts || [])?.map(a => ({ ...a, type: 'alert' }))
  ]?.sort((a, b) => new Date(b.date) - new Date(a.date))?.slice(0, 3);

  return (
    <div className="bg-card rounded-xl p-4 md:p-6 border border-border shadow-elevation-sm">
      <div className="flex items-center gap-3 mb-4">
        <div className="bg-primary/10 rounded-lg p-2">
          <Icon name="Bell" size={20} color="var(--color-primary)" />
        </div>
        <h3 className="text-base md:text-lg font-semibold text-foreground">Latest Updates</h3>
      </div>
      {allItems?.length === 0 ? (
        <div className="text-center py-6">
          <Icon name="BellOff" size={40} className="mx-auto mb-3 text-muted-foreground opacity-50" />
          <p className="text-sm text-muted-foreground">No updates available</p>
        </div>
      ) : (
        <div className="space-y-3">
          {allItems?.map((item, index) => {
            const config = getPriorityConfig(item?.priority);
            return (
              <div key={index} className="flex items-start gap-3 p-3 bg-muted/50 rounded-lg">
                <div className={`${config?.bgColor} rounded-lg p-2 flex-shrink-0`}>
                  <Icon name={config?.icon} size={16} className={config?.color} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className={`text-xs font-semibold uppercase ${config?.color}`}>
                      {item?.type}
                    </span>
                    {item?.priority === 'high' && (
                      <span className="text-xs bg-error text-error-foreground px-2 py-0.5 rounded-full">
                        High Priority
                      </span>
                    )}
                  </div>
                  <p className="text-sm font-medium text-foreground line-clamp-1 mb-1">
                    {item?.title}
                  </p>
                  <p className="text-xs text-muted-foreground line-clamp-2 mb-2">
                    {item?.message}
                  </p>
                  <span className="text-xs text-muted-foreground">{item?.date}</span>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default NoticeAlertCard;