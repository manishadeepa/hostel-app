import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import RoleBasedNavigation from '../../components/navigation/RoleBasedNavigation';
import NotificationDisplay from '../../components/ui/NotificationDisplay';
import Button from '../../components/ui/Button';

import Icon from '../../components/AppIcon';
import FeedbackCategoryCard from './components/FeedbackCategoryCard';
import SuccessModal from './components/SuccessModal';

const GiveFeedback = () => {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [isAnonymous, setIsAnonymous] = useState(false);

  const [notification] = useState({
    type: 'notice',
    title: 'Feedback Guidelines',
    message: 'Your honest feedback helps us improve hostel facilities. All submissions are reviewed by administration.',
    timestamp: new Date()?.toISOString()
  });

  const handleDismissNotification = () => {
    // Handler for dismissing notification
  };

  const [feedbackCategories, setFeedbackCategories] = useState([
    {
      id: 'food',
      category: 'Food',
      icon: 'Utensils',
      rating: 0,
      comment: ''
    },
    {
      id: 'cleanliness',
      category: 'Cleanliness',
      icon: 'Sparkles',
      rating: 0,
      comment: ''
    },
    {
      id: 'security',
      category: 'Security',
      icon: 'Shield',
      rating: 0,
      comment: ''
    },
    {
      id: 'overall',
      category: 'Overall Experience',
      icon: 'Heart',
      rating: 0,
      comment: ''
    }
  ]);

  const handleRatingChange = (categoryId, newRating) => {
    setFeedbackCategories(prev =>
      prev?.map(cat =>
        cat?.id === categoryId ? { ...cat, rating: newRating } : cat
      )
    );
  };

  const handleCommentChange = (categoryId, newComment) => {
    setFeedbackCategories(prev =>
      prev?.map(cat =>
        cat?.id === categoryId ? { ...cat, comment: newComment } : cat
      )
    );
  };

  const hasAnyRating = feedbackCategories?.some(cat => cat?.rating > 0);

  const handleSubmit = async (e) => {
    e?.preventDefault();

    if (!hasAnyRating) {
      return;
    }

    setIsSubmitting(true);

    try {
      await new Promise(resolve => setTimeout(resolve, 1500));

      const feedbackData = {
        timestamp: new Date()?.toISOString(),
        anonymous: isAnonymous,
        categories: feedbackCategories?.filter(cat => cat?.rating > 0)?.map(cat => ({
          category: cat?.category,
          rating: cat?.rating,
          comment: cat?.comment || null
        }))
      };

      console.log('Feedback submitted:', feedbackData);

      setShowSuccessModal(true);
    } catch (error) {
      console.error('Error submitting feedback:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setFeedbackCategories(prev =>
      prev?.map(cat => ({ ...cat, rating: 0, comment: '' }))
    );
    setIsAnonymous(false);
  };

  const handleSuccessClose = () => {
    setShowSuccessModal(false);
    navigate('/attendance-marking');
  };

  const handleSubmitAnother = () => {
    setShowSuccessModal(false);
    handleReset();
  };

  return (
    <div className="min-h-screen bg-background">
      <RoleBasedNavigation userRole="student" />
      <div className="main-content with-notification">
        <NotificationDisplay 
          notification={notification} 
          onDismiss={handleDismissNotification} 
        />

        <div className="content-container">
          <div className="mb-6 lg:mb-8">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-12 h-12 lg:w-14 lg:h-14 rounded-xl bg-accent/10 flex items-center justify-center">
                <Icon name="MessageSquare" size={28} color="var(--color-accent)" />
              </div>
              <div>
                <h1 className="text-2xl lg:text-3xl font-bold text-foreground">Give Feedback</h1>
                <p className="text-sm lg:text-base text-muted-foreground">Share your experience to help us improve</p>
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6 mb-6">
              {feedbackCategories?.map((category) => (
                <FeedbackCategoryCard
                  key={category?.id}
                  category={category?.category}
                  icon={category?.icon}
                  rating={category?.rating}
                  comment={category?.comment}
                  onRatingChange={(rating) => handleRatingChange(category?.id, rating)}
                  onCommentChange={(comment) => handleCommentChange(category?.id, comment)}
                  disabled={isSubmitting}
                />
              ))}
            </div>

            <div className="card mb-6">
              <div className="flex items-start gap-3">
                <Icon name="Info" size={20} color="var(--color-primary)" className="flex-shrink-0 mt-0.5" />
                <div className="flex-1">
                  <h3 className="text-base font-semibold text-foreground mb-2">Submission Guidelines</h3>
                  <ul className="space-y-1 text-sm text-muted-foreground">
                    <li className="flex items-start gap-2">
                      <Icon name="Check" size={16} className="flex-shrink-0 mt-0.5" />
                      <span>Rate at least one category to submit feedback</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Icon name="Check" size={16} className="flex-shrink-0 mt-0.5" />
                      <span>Comments are optional but help us understand your experience better</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Icon name="Check" size={16} className="flex-shrink-0 mt-0.5" />
                      <span>Your feedback is reviewed by hostel administration for improvements</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 lg:gap-4">
              <Button
                type="button"
                variant="outline"
                onClick={handleReset}
                disabled={isSubmitting || !hasAnyRating}
                iconName="RotateCcw"
                iconPosition="left"
                className="w-full sm:w-auto"
              >
                Reset Form
              </Button>
              <Button
                type="submit"
                variant="default"
                loading={isSubmitting}
                disabled={!hasAnyRating}
                iconName="Send"
                iconPosition="left"
                className="w-full sm:flex-1"
              >
                {hasAnyRating ? 'Submit Feedback' : 'Rate at least one category'}
              </Button>
            </div>

            {!hasAnyRating && (
              <div className="mt-4 flex items-center gap-2 text-sm text-warning bg-warning/10 rounded-lg p-3">
                <Icon name="AlertCircle" size={16} className="flex-shrink-0" />
                <p>Please rate at least one category before submitting your feedback.</p>
              </div>
            )}
          </form>
        </div>
      </div>
      <SuccessModal
        isOpen={showSuccessModal}
        onClose={handleSuccessClose}
        onSubmitAnother={handleSubmitAnother}
      />
    </div>
  );
};

export default GiveFeedback;