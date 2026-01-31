import React from 'react';

import Icon from '../../../components/AppIcon';

const QuickActions = ({ onEmergencyClick, onOverdueClick, emergencyCount, overdueCount }) => {
  return (
    <div className="card mb-6">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 rounded-lg bg-destructive/10 flex items-center justify-center">
          <Icon name="AlertTriangle" size={20} color="var(--color-destructive)" />
        </div>
        <div>
          <h2 className="text-lg font-semibold text-foreground">Quick Actions</h2>
          <p className="text-sm text-muted-foreground caption">Immediate attention required</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <button
          onClick={onEmergencyClick}
          className="flex items-center justify-between p-4 rounded-lg border-2 border-destructive/20 bg-destructive/5 hover:bg-destructive/10 transition-smooth"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-destructive/20 flex items-center justify-center">
              <Icon name="AlertCircle" size={20} color="var(--color-destructive)" />
            </div>
            <div className="text-left">
              <div className="text-sm font-semibold text-foreground">Emergency Grievances</div>
              <div className="text-xs text-muted-foreground caption">Requires immediate action</div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xl font-bold text-destructive data-text">{emergencyCount}</span>
            <Icon name="ChevronRight" size={20} color="var(--color-destructive)" />
          </div>
        </button>

        <button
          onClick={onOverdueClick}
          className="flex items-center justify-between p-4 rounded-lg border-2 border-warning/20 bg-warning/5 hover:bg-warning/10 transition-smooth"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-warning/20 flex items-center justify-center">
              <Icon name="Clock" size={20} color="var(--color-warning)" />
            </div>
            <div className="text-left">
              <div className="text-sm font-semibold text-foreground">Overdue Items</div>
              <div className="text-xs text-muted-foreground caption">Past resolution deadline</div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xl font-bold text-warning data-text">{overdueCount}</span>
            <Icon name="ChevronRight" size={20} color="var(--color-warning)" />
          </div>
        </button>
      </div>
    </div>
  );
};

export default QuickActions;