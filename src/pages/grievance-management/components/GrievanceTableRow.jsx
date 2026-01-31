import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';
import StatusBadgeSystem from '../../../components/ui/StatusBadgeSystem';
import { Checkbox } from '../../../components/ui/Checkbox';

const GrievanceTableRow = ({ grievance, isSelected, onSelect, onStatusUpdate }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high':
        return 'text-destructive';
      case 'medium':
        return 'text-warning';
      case 'low':
        return 'text-success';
      default:
        return 'text-muted-foreground';
    }
  };

  const getPriorityIcon = (priority) => {
    switch (priority) {
      case 'high':
        return 'AlertTriangle';
      case 'medium':
        return 'AlertCircle';
      case 'low':
        return 'Info';
      default:
        return 'Circle';
    }
  };

  return (
    <>
      <tr className="border-b border-border hover:bg-muted/50 transition-smooth">
        <td className="px-4 py-4">
          <Checkbox
            checked={isSelected}
            onChange={(e) => onSelect(grievance?.id, e?.target?.checked)}
          />
        </td>
        <td className="px-4 py-4">
          <div className="text-sm font-medium text-foreground data-text">{grievance?.id}</div>
        </td>
        <td className="px-4 py-4">
          <div className="flex items-center gap-3">
            <Image
              src={grievance?.studentAvatar}
              alt={grievance?.studentAvatarAlt}
              className="w-10 h-10 rounded-lg object-cover"
            />
            <div>
              <div className="text-sm font-medium text-foreground">{grievance?.studentName}</div>
              <div className="text-xs text-muted-foreground caption">
                Block {grievance?.block} • Room {grievance?.room}
              </div>
            </div>
          </div>
        </td>
        <td className="px-4 py-4">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-primary/10 text-primary text-xs font-medium caption">
            <Icon name="Tag" size={12} />
            {grievance?.category}
          </div>
        </td>
        <td className="px-4 py-4">
          <div className="text-sm text-foreground data-text">{grievance?.submissionDate}</div>
          <div className="text-xs text-muted-foreground caption">{grievance?.submissionTime}</div>
        </td>
        <td className="px-4 py-4">
          <StatusBadgeSystem status={grievance?.status} />
        </td>
        <td className="px-4 py-4">
          <div className={`flex items-center gap-1.5 text-xs font-medium caption ${getPriorityColor(grievance?.priority)}`}>
            <Icon name={getPriorityIcon(grievance?.priority)} size={14} />
            <span className="capitalize">{grievance?.priority}</span>
          </div>
        </td>
        <td className="px-4 py-4">
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsExpanded(!isExpanded)}
              iconName={isExpanded ? 'ChevronUp' : 'ChevronDown'}
              iconPosition="left"
            >
              {isExpanded ? 'Hide' : 'View'}
            </Button>
            <Button
              variant="default"
              size="sm"
              onClick={() => onStatusUpdate(grievance)}
              iconName="Edit"
              iconPosition="left"
            >
              Update
            </Button>
          </div>
        </td>
      </tr>
      {isExpanded && (
        <tr className="border-b border-border bg-muted/30">
          <td colSpan="8" className="px-4 py-6">
            <div className="max-w-4xl">
              <div className="mb-4">
                <div className="flex items-center gap-2 mb-2">
                  <Icon name="FileText" size={16} color="var(--color-primary)" />
                  <h4 className="text-sm font-semibold text-foreground">Description</h4>
                </div>
                <p className="text-sm text-muted-foreground pl-6">{grievance?.description}</p>
              </div>

              {grievance?.images && grievance?.images?.length > 0 && (
                <div className="mb-4">
                  <div className="flex items-center gap-2 mb-3">
                    <Icon name="Image" size={16} color="var(--color-primary)" />
                    <h4 className="text-sm font-semibold text-foreground">Attached Images</h4>
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3 pl-6">
                    {grievance?.images?.map((img, index) => (
                      <div key={index} className="aspect-square rounded-lg overflow-hidden border border-border">
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

              {grievance?.remarks && (
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <Icon name="MessageSquare" size={16} color="var(--color-success)" />
                    <h4 className="text-sm font-semibold text-foreground">Resolution Remarks</h4>
                  </div>
                  <div className="pl-6 p-3 rounded-lg bg-success/10 border border-success/20">
                    <p className="text-sm text-foreground">{grievance?.remarks}</p>
                  </div>
                </div>
              )}
            </div>
          </td>
        </tr>
      )}
    </>
  );
};

export default GrievanceTableRow;