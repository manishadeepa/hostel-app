import React from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const QuickActionCard = ({ title, description, icon, iconColor, bgColor, actionText, actionPath, badge }) => {
  const navigate = useNavigate();

  const handleAction = () => {
    if (actionPath) {
      navigate(actionPath);
    }
  };

  return (
    <div className="bg-card rounded-xl p-4 md:p-6 shadow-elevation-md border border-border transition-smooth hover:shadow-elevation-lg">
      <div className="flex items-start gap-3 md:gap-4 mb-4 md:mb-6">
        <div className={`w-12 h-12 md:w-14 md:h-14 lg:w-16 lg:h-16 rounded-lg ${bgColor} flex items-center justify-center flex-shrink-0`}>
          <Icon name={icon} size={24} color={iconColor} className="md:w-7 md:h-7 lg:w-8 lg:h-8" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1 md:mb-2">
            <h3 className="text-base md:text-lg font-semibold text-foreground">{title}</h3>
            {badge && (
              <span className="px-2 py-0.5 text-xs font-medium bg-error text-error-foreground rounded-full">
                {badge}
              </span>
            )}
          </div>
          <p className="text-sm md:text-base text-muted-foreground line-clamp-2">{description}</p>
        </div>
      </div>

      <Button 
        variant="outline" 
        fullWidth 
        onClick={handleAction}
        iconName="ArrowRight"
        iconPosition="right"
        className="text-sm md:text-base"
      >
        {actionText}
      </Button>
    </div>
  );
};

export default QuickActionCard;