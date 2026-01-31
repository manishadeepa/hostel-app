import React from 'react';
import Icon from '../../../components/AppIcon';

const SummaryCard = ({ title, count, icon, iconColor, trend, trendValue, bgColor }) => {
  const isPositiveTrend = trend === 'up';
  
  return (
    <div className="bg-card rounded-xl p-4 md:p-6 shadow-elevation-md border border-border transition-smooth hover:shadow-elevation-lg">
      <div className="flex items-start justify-between mb-3 md:mb-4">
        <div className="flex-1">
          <p className="text-sm md:text-base text-muted-foreground mb-1 md:mb-2">{title}</p>
          <h3 className="text-2xl md:text-3xl lg:text-4xl font-semibold text-foreground">{count}</h3>
        </div>
        <div className={`w-12 h-12 md:w-14 md:h-14 lg:w-16 lg:h-16 rounded-lg ${bgColor} flex items-center justify-center flex-shrink-0`}>
          <Icon name={icon} size={24} color={iconColor} className="md:w-7 md:h-7 lg:w-8 lg:h-8" />
        </div>
      </div>
      
      {trend && (
        <div className="flex items-center gap-2">
          <div className={`flex items-center gap-1 px-2 py-1 rounded-md ${isPositiveTrend ? 'bg-success/10' : 'bg-error/10'}`}>
            <Icon 
              name={isPositiveTrend ? 'TrendingUp' : 'TrendingDown'} 
              size={14} 
              color={isPositiveTrend ? 'var(--color-success)' : 'var(--color-error)'} 
            />
            <span className={`text-xs md:text-sm font-medium ${isPositiveTrend ? 'text-success' : 'text-error'}`}>
              {trendValue}%
            </span>
          </div>
          <span className="text-xs md:text-sm text-muted-foreground">vs last week</span>
        </div>
      )}
    </div>
  );
};

export default SummaryCard;