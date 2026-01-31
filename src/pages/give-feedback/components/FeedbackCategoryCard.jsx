import React from 'react';
import Icon from '../../../components/AppIcon';
import StarRating from './StarRating';

const FeedbackCategoryCard = ({
  category,
  icon,
  rating,
  comment,
  onRatingChange,
  onCommentChange,
  disabled = false
}) => {
  const maxCharacters = 500;
  const remainingCharacters = maxCharacters - (comment?.length || 0);

  return (
    <div className="card">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
          <Icon name={icon} size={24} color="var(--color-primary)" />
        </div>
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-foreground">{category}</h3>
          <p className="text-sm text-muted-foreground caption">Rate your experience</p>
        </div>
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-foreground mb-2">
          Rating {rating > 0 && <span className="text-accent">({rating}/5)</span>}
        </label>
        <StarRating
          rating={rating}
          onRatingChange={onRatingChange}
          disabled={disabled}
          size={28}
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-foreground mb-2">
          Comments (Optional)
        </label>
        <textarea
          value={comment}
          onChange={(e) => onCommentChange(e?.target?.value)}
          disabled={disabled}
          placeholder={`Share your thoughts about ${category?.toLowerCase()}...`}
          maxLength={maxCharacters}
          rows={4}
          className="w-full px-4 py-3 rounded-lg border border-input bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent transition-all duration-200 resize-none disabled:opacity-50 disabled:cursor-not-allowed"
        />
        <div className="flex items-center justify-between mt-2">
          <p className="text-xs text-muted-foreground caption">
            Maximum {maxCharacters} characters
          </p>
          <p className={`text-xs caption data-text ${
            remainingCharacters < 50 ? 'text-warning' : 'text-muted-foreground'
          }`}>
            {remainingCharacters} remaining
          </p>
        </div>
      </div>
    </div>
  );
};

export default FeedbackCategoryCard;