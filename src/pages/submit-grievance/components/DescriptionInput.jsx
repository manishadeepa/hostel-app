import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';

const DescriptionInput = ({ value, onChange, error }) => {
  const maxLength = 500;
  const [isFocused, setIsFocused] = useState(false);

  const handleChange = (e) => {
    const newValue = e?.target?.value;
    if (newValue?.length <= maxLength) {
      onChange(newValue);
    }
  };

  const remainingChars = maxLength - value?.length;
  const isNearLimit = remainingChars <= 50;

  return (
    <div className="w-full">
      <label className="block text-sm font-medium text-foreground mb-2">
        Detailed Description <span className="text-destructive">*</span>
      </label>
      <p className="text-xs text-muted-foreground mb-3 caption">
        Provide a clear and detailed description of your grievance
      </p>
      
      <div className={`
        relative rounded-lg border-2 transition-all duration-200
        ${error ? 'border-destructive' : isFocused ? 'border-primary' : 'border-border'}
        ${error ? 'bg-destructive/5' : 'bg-card'}
      `}>
        <textarea
          value={value}
          onChange={handleChange}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder="Example: The water tap in my room (Block A, Room 205) has been leaking continuously for the past two days. Water is dripping even when the tap is fully closed, causing wastage and dampness in the bathroom floor."
          className="w-full px-4 py-3 bg-transparent text-foreground placeholder:text-muted-foreground resize-none focus:outline-none"
          rows={6}
          required
        />
        
        <div className="flex items-center justify-between px-4 py-2 border-t border-border bg-muted/30">
          <div className="flex items-center gap-2 text-xs text-muted-foreground caption">
            <Icon name="Info" size={14} />
            <span>Include location, time, and specific details</span>
          </div>
          <div className={`
            text-xs font-medium data-text
            ${isNearLimit ? 'text-warning' : 'text-muted-foreground'}
          `}>
            {remainingChars} / {maxLength}
          </div>
        </div>
      </div>

      {error && (
        <div className="flex items-center gap-2 mt-2 text-xs text-destructive">
          <Icon name="AlertCircle" size={14} />
          <span>{error}</span>
        </div>
      )}

      <div className="mt-3 p-3 bg-accent/10 rounded-lg border border-accent/20">
        <div className="flex items-start gap-2">
          <Icon name="Lightbulb" size={16} color="var(--color-accent)" className="flex-shrink-0 mt-0.5" />
          <div className="text-xs text-accent-foreground caption">
            <span className="font-semibold">Tip:</span> Include your block number, room number, and when the issue started for faster resolution.
          </div>
        </div>
      </div>
    </div>
  );
};

export default DescriptionInput;