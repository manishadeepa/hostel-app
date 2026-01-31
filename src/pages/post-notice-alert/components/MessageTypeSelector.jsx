import React from 'react';
import Icon from '../../../components/AppIcon';

const MessageTypeSelector = ({ selectedType, onTypeChange }) => {
  const messageTypes = [
    {
      id: 'notice',
      label: 'General Notice',
      description: 'Regular announcements and updates',
      icon: 'Bell',
      color: 'primary'
    },
    {
      id: 'alert',
      label: 'Emergency Alert',
      description: 'Urgent notifications requiring immediate attention',
      icon: 'AlertTriangle',
      color: 'destructive'
    }
  ];

  return (
    <div className="space-y-3">
      <label className="block text-sm font-medium text-foreground">
        Message Type <span className="text-destructive">*</span>
      </label>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
        {messageTypes?.map((type) => (
          <button
            key={type?.id}
            type="button"
            onClick={() => onTypeChange(type?.id)}
            className={`
              relative p-4 md:p-5 lg:p-6 rounded-xl border-2 transition-all duration-200
              ${selectedType === type?.id
                ? type?.color === 'destructive' ?'border-destructive bg-destructive/5' :'border-primary bg-primary/5' :'border-border bg-card hover:border-muted-foreground/30'
              }
            `}
          >
            <div className="flex items-start gap-3 md:gap-4">
              <div className={`
                flex-shrink-0 w-10 h-10 md:w-12 md:h-12 rounded-lg flex items-center justify-center
                ${selectedType === type?.id
                  ? type?.color === 'destructive' ?'bg-destructive/10 text-destructive' :'bg-primary/10 text-primary' :'bg-muted text-muted-foreground'
                }
              `}>
                <Icon name={type?.icon} size={20} />
              </div>
              <div className="flex-1 text-left">
                <div className={`
                  text-sm md:text-base font-semibold mb-1
                  ${selectedType === type?.id
                    ? type?.color === 'destructive' ?'text-destructive' :'text-primary' :'text-foreground'
                  }
                `}>
                  {type?.label}
                </div>
                <div className="text-xs md:text-sm text-muted-foreground caption">
                  {type?.description}
                </div>
              </div>
              {selectedType === type?.id && (
                <div className={`
                  absolute top-3 right-3 w-5 h-5 rounded-full flex items-center justify-center
                  ${type?.color === 'destructive' ? 'bg-destructive' : 'bg-primary'}
                `}>
                  <Icon name="Check" size={12} color="white" />
                </div>
              )}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default MessageTypeSelector;