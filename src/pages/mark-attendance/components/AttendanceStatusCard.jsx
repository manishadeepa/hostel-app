import React from 'react';
import Icon from '../../../components/AppIcon';

const AttendanceStatusCard = ({ isMarked, currentDate, currentTime, markedTime }) => {
  return (
    <div className="bg-card rounded-xl shadow-elevation-md p-4 md:p-6 lg:p-8 border border-border">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 md:gap-6">
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-3">
            <div className={`w-12 h-12 md:w-14 md:h-14 lg:w-16 lg:h-16 rounded-full flex items-center justify-center ${
              isMarked ? 'bg-success/10' : 'bg-warning/10'
            }`}>
              <Icon 
                name={isMarked ? "CheckCircle2" : "Clock"} 
                size={24} 
                color={isMarked ? "var(--color-success)" : "var(--color-warning)"} 
              />
            </div>
            <div>
              <h2 className="text-xl md:text-2xl lg:text-3xl font-semibold text-foreground">
                {isMarked ? "Attendance Marked" : "Mark Your Attendance"}
              </h2>
              <p className="text-sm md:text-base text-muted-foreground mt-1">
                {currentDate}
              </p>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex items-center gap-2 text-sm md:text-base">
              <Icon name="Clock" size={18} color="var(--color-muted-foreground)" />
              <span className="text-muted-foreground">Current Time:</span>
              <span className="font-medium text-foreground">{currentTime}</span>
            </div>

            {isMarked && markedTime && (
              <div className="flex items-center gap-2 text-sm md:text-base">
                <Icon name="CheckCircle2" size={18} color="var(--color-success)" />
                <span className="text-muted-foreground">Marked At:</span>
                <span className="font-medium text-success">{markedTime}</span>
              </div>
            )}
          </div>
        </div>

        <div className={`px-4 py-2 md:px-6 md:py-3 rounded-lg text-center ${
          isMarked 
            ? 'bg-success/10 border border-success/20' :'bg-warning/10 border border-warning/20'
        }`}>
          <div className="text-2xl md:text-3xl lg:text-4xl font-bold mb-1" style={{ 
            color: isMarked ? 'var(--color-success)' : 'var(--color-warning)' 
          }}>
            {isMarked ? "✓" : "!"}
          </div>
          <div className="text-xs md:text-sm font-medium whitespace-nowrap" style={{ 
            color: isMarked ? 'var(--color-success)' : 'var(--color-warning)' 
          }}>
            {isMarked ? "Present" : "Not Marked"}
          </div>
        </div>
      </div>

      {isMarked && (
        <div className="mt-4 md:mt-6 p-3 md:p-4 bg-success/5 rounded-lg border border-success/20">
          <p className="text-sm md:text-base text-success flex items-start gap-2">
            <Icon name="Info" size={18} className="flex-shrink-0 mt-0.5" />
            <span>Your attendance has been successfully recorded for today. You can view your attendance history below.</span>
          </p>
        </div>
      )}
    </div>
  );
};

export default AttendanceStatusCard;