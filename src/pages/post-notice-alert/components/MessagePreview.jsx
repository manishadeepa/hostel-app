import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const MessagePreview = ({ isOpen, onClose, messageData }) => {
  if (!isOpen) return null;

  const { type, title, content, targets, scheduledDate, scheduledTime, attachments } = messageData;

  const isEmergency = type === 'alert';
  const estimatedRecipients = targets?.length * 25; // Mock calculation

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center bg-background/80 backdrop-blur-sm p-4">
      <div className="bg-card rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden flex flex-col">
        <div className="flex items-center justify-between p-4 md:p-6 border-b border-border">
          <div className="flex items-center gap-3">
            <div className={`
              w-10 h-10 md:w-12 md:h-12 rounded-lg flex items-center justify-center
              ${isEmergency ? 'bg-destructive/10' : 'bg-primary/10'}
            `}>
              <Icon 
                name={isEmergency ? 'AlertTriangle' : 'Eye'} 
                size={20}
                color={isEmergency ? 'var(--color-destructive)' : 'var(--color-primary)'}
              />
            </div>
            <div>
              <h3 className="text-lg md:text-xl font-semibold text-foreground">
                Message Preview
              </h3>
              <p className="text-xs md:text-sm text-muted-foreground caption">
                How students will see this message
              </p>
            </div>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            iconName="X"
          />
        </div>

        <div className="flex-1 overflow-y-auto p-4 md:p-6">
          <div className={`
            p-4 md:p-6 rounded-xl border-2
            ${isEmergency 
              ? 'border-destructive bg-destructive/5' :'border-primary bg-primary/5'
            }
          `}>
            <div className="flex items-start gap-3 mb-4">
              <div className={`
                flex-shrink-0 w-10 h-10 md:w-12 md:h-12 rounded-lg flex items-center justify-center
                ${isEmergency ? 'bg-destructive/10' : 'bg-primary/10'}
              `}>
                <Icon 
                  name={isEmergency ? 'AlertTriangle' : 'Bell'} 
                  size={20}
                  color={isEmergency ? 'var(--color-destructive)' : 'var(--color-primary)'}
                />
              </div>
              <div className="flex-1">
                <div className={`
                  inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-medium caption mb-2
                  ${isEmergency 
                    ? 'bg-destructive/10 text-destructive border border-destructive/20' :'bg-primary/10 text-primary border border-primary/20'
                  }
                `}>
                  {isEmergency ? 'EMERGENCY ALERT' : 'NOTICE'}
                </div>
                <h4 className="text-base md:text-lg font-semibold text-foreground mb-2">
                  {title || 'Untitled Message'}
                </h4>
                <div className="text-sm md:text-base text-foreground whitespace-pre-wrap">
                  {content || 'No content provided'}
                </div>
              </div>
            </div>

            {attachments && attachments?.length > 0 && (
              <div className="mt-4 pt-4 border-t border-border">
                <div className="flex items-center gap-2 text-sm font-medium text-foreground mb-2">
                  <Icon name="Paperclip" size={16} />
                  <span>Attachments ({attachments?.length})</span>
                </div>
                <div className="space-y-2">
                  {attachments?.map((att) => (
                    <div key={att?.id} className="flex items-center gap-2 text-xs md:text-sm text-muted-foreground">
                      <Icon name="File" size={14} />
                      <span className="truncate">{att?.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="mt-4 pt-4 border-t border-border flex items-center justify-between text-xs md:text-sm text-muted-foreground caption">
              <div className="flex items-center gap-2">
                <Icon name="Clock" size={14} />
                <span>
                  {scheduledDate && scheduledTime
                    ? new Date(`${scheduledDate}T${scheduledTime}`)?.toLocaleString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        hour: 'numeric',
                        minute: '2-digit'
                      })
                    : 'Immediate delivery'
                  }
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Icon name="Users" size={14} />
                <span className="data-text">{estimatedRecipients} recipients</span>
              </div>
            </div>
          </div>

          <div className="mt-4 p-4 rounded-lg bg-muted/50 border border-border">
            <div className="flex items-start gap-2 text-xs md:text-sm text-muted-foreground caption">
              <Icon name="Info" size={14} className="flex-shrink-0 mt-0.5" />
              <span>
                This is how your message will appear to students. {isEmergency && 'Emergency alerts will be highlighted with red styling and push notifications.'}
              </span>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-end gap-3 p-4 md:p-6 border-t border-border">
          <Button
            variant="outline"
            onClick={onClose}
          >
            Close Preview
          </Button>
        </div>
      </div>
    </div>
  );
};

export default MessagePreview;