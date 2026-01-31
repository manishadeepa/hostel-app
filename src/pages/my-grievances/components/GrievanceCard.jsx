import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import StatusBadgeSystem from '../../../components/ui/StatusBadgeSystem';
import Button from '../../../components/ui/Button';

const GrievanceCard = ({ grievance, onViewDetails }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date?.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric', 
      year: 'numeric' 
    });
  };

  const formatTime = (dateString) => {
    const date = new Date(dateString);
    return date?.toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  const getCategoryIcon = (category) => {
    const icons = {
      'Water': 'Droplet',
      'Electricity': 'Zap',
      'Food': 'UtensilsCrossed',
      'Internet': 'Wifi',
      'Cleanliness': 'Sparkles',
      'Security': 'Shield',
      'Others': 'AlertCircle'
    };
    return icons?.[category] || 'AlertCircle';
  };

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className="card hover:shadow-lg transition-smooth">
      <div className="flex flex-col gap-4">
        {/* Header Section */}
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-start gap-3 flex-1 min-w-0">
            <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
              <Icon 
                name={getCategoryIcon(grievance?.category)} 
                size={20} 
                color="var(--color-primary)" 
              />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1 flex-wrap">
                <h3 className="text-base md:text-lg font-semibold text-foreground">
                  {grievance?.category}
                </h3>
                <StatusBadgeSystem status={grievance?.status} />
              </div>
              <p className="text-xs md:text-sm text-muted-foreground data-text">
                ID: {grievance?.id}
              </p>
            </div>
          </div>
          <button
            onClick={toggleExpand}
            className="flex-shrink-0 w-8 h-8 rounded-lg hover:bg-muted transition-smooth flex items-center justify-center"
            aria-label={isExpanded ? 'Collapse details' : 'Expand details'}
          >
            <Icon 
              name={isExpanded ? 'ChevronUp' : 'ChevronDown'} 
              size={20} 
            />
          </button>
        </div>

        {/* Date and Time */}
        <div className="flex items-center gap-4 text-xs md:text-sm text-muted-foreground">
          <div className="flex items-center gap-1.5">
            <Icon name="Calendar" size={14} />
            <span>{formatDate(grievance?.submittedDate)}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Icon name="Clock" size={14} />
            <span>{formatTime(grievance?.submittedDate)}</span>
          </div>
        </div>

        {/* Description Preview */}
        <p className="text-sm md:text-base text-foreground line-clamp-2">
          {grievance?.description}
        </p>

        {/* Expanded Content */}
        {isExpanded && (
          <div className="pt-4 border-t border-border space-y-4">
            {/* Full Description */}
            <div>
              <h4 className="text-sm font-semibold text-foreground mb-2">Full Description</h4>
              <p className="text-sm text-muted-foreground whitespace-pre-line">
                {grievance?.description}
              </p>
            </div>

            {/* Uploaded Images */}
            {grievance?.images && grievance?.images?.length > 0 && (
              <div>
                <h4 className="text-sm font-semibold text-foreground mb-2">Attached Images</h4>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {grievance?.images?.map((img, index) => (
                    <div 
                      key={index} 
                      className="aspect-square rounded-lg overflow-hidden bg-muted"
                    >
                      <Image
                        src={img?.url}
                        alt={img?.alt}
                        className="w-full h-full object-cover hover:scale-105 transition-smooth cursor-pointer"
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Timeline */}
            {grievance?.timeline && grievance?.timeline?.length > 0 && (
              <div>
                <h4 className="text-sm font-semibold text-foreground mb-3">Timeline</h4>
                <div className="space-y-3">
                  {grievance?.timeline?.map((event, index) => (
                    <div key={index} className="flex gap-3">
                      <div className="flex-shrink-0 w-2 h-2 rounded-full bg-primary mt-1.5"></div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-sm font-medium text-foreground">
                            {event?.status}
                          </span>
                          <span className="text-xs text-muted-foreground data-text">
                            {formatDate(event?.date)} at {formatTime(event?.date)}
                          </span>
                        </div>
                        {event?.remarks && (
                          <p className="text-sm text-muted-foreground">
                            {event?.remarks}
                          </p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Resolution Remarks */}
            {grievance?.status === 'resolved' && grievance?.resolutionRemarks && (
              <div className="bg-success/10 rounded-lg p-4">
                <div className="flex items-start gap-2 mb-2">
                  <Icon name="CheckCircle" size={18} color="var(--color-success)" />
                  <h4 className="text-sm font-semibold text-success-foreground">
                    Resolution Details
                  </h4>
                </div>
                <p className="text-sm text-success-foreground/80">
                  {grievance?.resolutionRemarks}
                </p>
              </div>
            )}

            {/* Action Button */}
            <div className="flex justify-end pt-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => onViewDetails(grievance)}
                iconName="ExternalLink"
                iconPosition="right"
              >
                View Full Details
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default GrievanceCard;