import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';

const StarRating = ({ rating, onRatingChange, disabled = false, size = 24 }) => {
  const [hoverRating, setHoverRating] = useState(0);

  const handleMouseEnter = (index) => {
    if (!disabled) {
      setHoverRating(index);
    }
  };

  const handleMouseLeave = () => {
    setHoverRating(0);
  };

  const handleClick = (index) => {
    if (!disabled) {
      onRatingChange(index);
    }
  };

  return (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5]?.map((index) => {
        const isFilled = index <= (hoverRating || rating);
        return (
          <button
            key={index}
            type="button"
            onClick={() => handleClick(index)}
            onMouseEnter={() => handleMouseEnter(index)}
            onMouseLeave={handleMouseLeave}
            disabled={disabled}
            className={`transition-all duration-200 ${
              disabled ? 'cursor-not-allowed opacity-50' : 'cursor-pointer hover:scale-110'
            }`}
            aria-label={`Rate ${index} out of 5 stars`}
          >
            <Icon
              name="Star"
              size={size}
              color={isFilled ? 'var(--color-accent)' : 'var(--color-muted-foreground)'}
              className={isFilled ? 'fill-current' : ''}
            />
          </button>
        );
      })}
    </div>
  );
};

export default StarRating;