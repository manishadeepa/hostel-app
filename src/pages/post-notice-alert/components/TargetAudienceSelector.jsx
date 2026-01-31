import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import { Checkbox } from '../../../components/ui/Checkbox';

const TargetAudienceSelector = ({ selectedTargets, onTargetChange }) => {
  const [selectAll, setSelectAll] = useState(false);

  const blocks = [
    { id: 'block-a', label: 'Block A', students: 120 },
    { id: 'block-b', label: 'Block B', students: 115 },
    { id: 'block-c', label: 'Block C', students: 108 },
    { id: 'block-d', label: 'Block D', students: 95 }
  ];

  const handleSelectAll = (checked) => {
    setSelectAll(checked);
    if (checked) {
      const allIds = [...blocks?.map(b => b?.id)];
      onTargetChange(allIds);
    } else {
      onTargetChange([]);
    }
  };

  const handleTargetToggle = (targetId) => {
    const newTargets = selectedTargets?.includes(targetId)
      ? selectedTargets?.filter(id => id !== targetId)
      : [...selectedTargets, targetId];
    onTargetChange(newTargets);
    setSelectAll(false);
  };

  const totalSelected = selectedTargets?.length;
  const estimatedRecipients = selectedTargets?.reduce((sum, id) => {
    const block = blocks?.find(b => b?.id === id);
    return sum + (block?.students || 0);
  }, 0);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <label className="block text-sm font-medium text-foreground">
          Target Audience <span className="text-destructive">*</span>
        </label>
        <Checkbox
          label="Select All"
          checked={selectAll}
          onChange={(e) => handleSelectAll(e?.target?.checked)}
          size="sm"
        />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-5 lg:gap-6">
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-sm font-medium text-foreground">
            <Icon name="Building" size={16} />
            <span>Hostel Blocks</span>
          </div>
          <div className="space-y-2">
            {blocks?.map((block) => (
              <label
                key={block?.id}
                className="flex items-center justify-between p-3 md:p-4 rounded-lg border border-border bg-card hover:bg-muted/50 transition-colors cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <Checkbox
                    checked={selectedTargets?.includes(block?.id)}
                    onChange={() => handleTargetToggle(block?.id)}
                  />
                  <span className="text-sm md:text-base text-foreground">{block?.label}</span>
                </div>
                <span className="text-xs md:text-sm text-muted-foreground data-text">
                  {block?.students} students
                </span>
              </label>
            ))}
          </div>
        </div>
      </div>
      {totalSelected > 0 && (
        <div className="flex items-center justify-between p-4 md:p-5 rounded-xl bg-primary/5 border border-primary/20">
          <div className="flex items-center gap-2 text-sm md:text-base font-medium text-primary">
            <Icon name="Users" size={18} />
            <span>Estimated Recipients</span>
          </div>
          <div className="text-lg md:text-xl font-semibold text-primary data-text">
            {estimatedRecipients}
          </div>
        </div>
      )}
    </div>
  );
};

export default TargetAudienceSelector;