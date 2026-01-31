import React from 'react';
import Icon from '../../../components/AppIcon';

const PrioritySelector = ({ value, onChange }) => {
  const priorities = [
    {
      value: 'low',
      label: 'Low',
      description: 'Can be addressed within a week',
      icon: 'ArrowDown',
      color: 'text-muted-foreground',
      bgColor: 'bg-muted'
    },
    {
      value: 'medium',
      label: 'Medium',
      description: 'Needs attention within 2-3 days',
      icon: 'Minus',
      color: 'text-warning',
      bgColor: 'bg-warning/10'
    },
    {
      value: 'high',
      label: 'High',
      description: 'Requires immediate attention',
      icon: 'ArrowUp',
      color: 'text-destructive',
      bgColor: 'bg-destructive/10'
    }
  ];

  return (
    <div className="w-full">
      <label className="block text-sm font-medium text-foreground mb-3">
        Priority Level <span className="text-destructive">*</span>
      </label>
      <p className="text-xs text-muted-foreground mb-4 caption">
        Select the urgency level for your grievance
      </p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-4">
        {priorities?.map((priority) => (
          <button
            key={priority?.value}
            type="button"
            onClick={() => onChange(priority?.value)}
            className={`
              relative p-4 rounded-lg border-2 transition-all duration-200
              ${value === priority?.value 
                ? 'border-primary bg-primary/5' :'border-border bg-card hover:border-primary/30'
              }
            `}
          >
            <div className="flex items-start gap-3">
              <div className={`
                w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0
                ${value === priority?.value ? priority?.bgColor : 'bg-muted'}
              `}>
                <Icon 
                  name={priority?.icon} 
                  size={20} 
                  color={value === priority?.value ? `var(--color-${priority?.value === 'low' ? 'muted-foreground' : priority?.value === 'medium' ? 'warning' : 'destructive'})` : 'var(--color-muted-foreground)'}
                />
              </div>
              <div className="flex-1 text-left">
                <div className={`font-semibold text-sm mb-1 ${value === priority?.value ? priority?.color : 'text-foreground'}`}>
                  {priority?.label}
                </div>
                <div className="text-xs text-muted-foreground caption">
                  {priority?.description}
                </div>
              </div>
            </div>
            {value === priority?.value && (
              <div className="absolute top-2 right-2">
                <Icon name="CheckCircle" size={18} color="var(--color-primary)" />
              </div>
            )}
          </button>
        ))}
      </div>
    </div>
  );
};

export default PrioritySelector;