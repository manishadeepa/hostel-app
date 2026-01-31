import React from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';

const ServiceCard = ({ 
  title, 
  description, 
  icon, 
  route, 
  badge, 
  badgeColor = 'bg-primary',
  iconColor = 'var(--color-primary)'
}) => {
  const navigate = useNavigate();

  const handleClick = () => {
    if (route) {
      navigate(route);
    }
  };

  return (
    <button
      onClick={handleClick}
      className="w-full bg-card rounded-xl p-4 md:p-6 border border-border hover:border-primary/50 hover:shadow-elevation-md transition-smooth text-left group"
    >
      <div className="flex items-start justify-between gap-3 mb-3">
        <div className="bg-primary/10 rounded-lg p-3 md:p-4 group-hover:bg-primary/20 transition-smooth flex-shrink-0">
          <Icon name={icon} size={24} color={iconColor} />
        </div>
        {badge !== undefined && badge !== null && (
          <span className={`${badgeColor} text-white text-xs md:text-sm font-semibold px-2 md:px-3 py-1 rounded-full flex-shrink-0`}>
            {badge}
          </span>
        )}
      </div>
      <h3 className="text-base md:text-lg font-semibold text-foreground mb-2 group-hover:text-primary transition-smooth">
        {title}
      </h3>
      <p className="text-xs md:text-sm text-muted-foreground line-clamp-2">
        {description}
      </p>
      <div className="flex items-center gap-2 mt-3 md:mt-4 text-primary text-xs md:text-sm font-medium">
        <span>Access</span>
        <Icon name="ArrowRight" size={16} className="group-hover:translate-x-1 transition-smooth" />
      </div>
    </button>
  );
};

export default ServiceCard;