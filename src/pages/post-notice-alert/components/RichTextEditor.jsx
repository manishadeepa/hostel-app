import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';

const RichTextEditor = ({ value, onChange, maxLength = 1000, error }) => {
  const [isFocused, setIsFocused] = useState(false);

  const formattingTools = [
    { icon: 'Bold', label: 'Bold', action: 'bold' },
    { icon: 'Italic', label: 'Italic', action: 'italic' },
    { icon: 'Underline', label: 'Underline', action: 'underline' },
    { icon: 'List', label: 'Bullet List', action: 'list' },
    { icon: 'ListOrdered', label: 'Numbered List', action: 'numbered' }
  ];

  const handleFormat = (action) => {
    // Simplified formatting - in production would use contentEditable or rich text library
    console.log(`Format action: ${action}`);
  };

  const characterCount = value?.length;
  const isNearLimit = characterCount > maxLength * 0.9;
  const isOverLimit = characterCount > maxLength;

  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-foreground">
        Message Content <span className="text-destructive">*</span>
      </label>
      <div className={`
        border-2 rounded-xl overflow-hidden transition-all duration-200
        ${isFocused ? 'border-primary' : error ? 'border-destructive' : 'border-border'}
        ${error ? 'bg-destructive/5' : 'bg-card'}
      `}>
        <div className="flex items-center gap-1 p-2 border-b border-border bg-muted/30">
          {formattingTools?.map((tool) => (
            <button
              key={tool?.action}
              type="button"
              onClick={() => handleFormat(tool?.action)}
              className="w-8 h-8 md:w-9 md:h-9 rounded-lg flex items-center justify-center hover:bg-muted transition-colors"
              title={tool?.label}
            >
              <Icon name={tool?.icon} size={16} />
            </button>
          ))}
        </div>
        
        <textarea
          value={value}
          onChange={(e) => onChange(e?.target?.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder="Enter your message here... You can use formatting tools above."
          className="w-full min-h-[200px] md:min-h-[250px] lg:min-h-[300px] p-4 md:p-5 lg:p-6 resize-none bg-transparent text-sm md:text-base text-foreground placeholder:text-muted-foreground focus:outline-none"
          maxLength={maxLength}
        />
        
        <div className="flex items-center justify-between px-4 py-2 border-t border-border bg-muted/30">
          <div className="text-xs md:text-sm caption text-muted-foreground">
            <Icon name="Info" size={14} className="inline mr-1" />
            Use formatting tools for better readability
          </div>
          <div className={`
            text-xs md:text-sm font-medium data-text
            ${isOverLimit ? 'text-destructive' : isNearLimit ? 'text-warning' : 'text-muted-foreground'}
          `}>
            {characterCount} / {maxLength}
          </div>
        </div>
      </div>
      {error && (
        <div className="flex items-center gap-2 text-xs md:text-sm text-destructive">
          <Icon name="AlertCircle" size={14} />
          <span>{error}</span>
        </div>
      )}
    </div>
  );
};

export default RichTextEditor;