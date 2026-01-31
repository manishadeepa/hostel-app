import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const SuccessModal = ({ isOpen, onClose, onSubmitAnother }) => {
  if (!isOpen) return null;

  return (
    <div className="validation-popup">
      <div className="validation-popup-content">
        <div className="validation-popup-header">
          <div className="validation-popup-icon success">
            <Icon name="CheckCircle" size={24} />
          </div>
          <div className="flex-1">
            <h3 className="validation-popup-title">Feedback Submitted Successfully!</h3>
          </div>
        </div>

        <div className="validation-popup-message">
          <p className="mb-3">
            Thank you for taking the time to share your valuable feedback. Your input helps us improve hostel facilities and services for everyone.
          </p>
          <div className="flex items-start gap-2 text-sm text-muted-foreground bg-muted rounded-lg p-3">
            <Icon name="Info" size={16} className="flex-shrink-0 mt-0.5" />
            <p>
              Your feedback has been recorded and will be reviewed by the hostel administration team.
            </p>
          </div>
        </div>

        <div className="validation-popup-actions">
          <Button variant="outline" onClick={onSubmitAnother} iconName="Plus" iconPosition="left">
            Submit Another
          </Button>
          <Button variant="default" onClick={onClose} iconName="Home" iconPosition="left">
            Back to Dashboard
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SuccessModal;