import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const AttendanceCard = ({ 
  studentInfo, 
  todayAttendance, 
  onMarkAttendance, 
  isLoading 
}) => {
  const currentDate = new Date();
  const formattedDate = currentDate?.toLocaleDateString('en-US', { 
    weekday: 'long', 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  });

  return (
    <div className="card">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 lg:gap-6 mb-6">
        <div className="flex-1">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-semibold text-foreground mb-2">
            Mark Your Attendance
          </h2>
          <p className="text-sm md:text-base text-muted-foreground caption">
            {formattedDate}
          </p>
        </div>
        <div className="flex items-center gap-3 px-4 py-3 bg-muted rounded-lg">
          <Icon name="Calendar" size={20} color="var(--color-primary)" />
          <span className="text-sm md:text-base font-medium data-text">
            {currentDate?.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
          </span>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 mb-6">
        <div className="flex items-start gap-3 p-4 bg-muted/50 rounded-lg">
          <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
            <Icon name="User" size={20} color="var(--color-primary)" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-xs md:text-sm text-muted-foreground caption mb-1">Student Name</p>
            <p className="text-sm md:text-base font-medium text-foreground truncate">
              {studentInfo?.name}
            </p>
          </div>
        </div>

        <div className="flex items-start gap-3 p-4 bg-muted/50 rounded-lg">
          <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center">
            <Icon name="Hash" size={20} color="var(--color-accent)" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-xs md:text-sm text-muted-foreground caption mb-1">College ID</p>
            <p className="text-sm md:text-base font-medium text-foreground data-text">
              {studentInfo?.collegeId}
            </p>
          </div>
        </div>

        <div className="flex items-start gap-3 p-4 bg-muted/50 rounded-lg">
          <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-success/10 flex items-center justify-center">
            <Icon name="Building" size={20} color="var(--color-success)" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-xs md:text-sm text-muted-foreground caption mb-1">Block & Room</p>
            <p className="text-sm md:text-base font-medium text-foreground">
              Block {studentInfo?.block}, Room {studentInfo?.room}
            </p>
          </div>
        </div>

        <div className="flex items-start gap-3 p-4 bg-muted/50 rounded-lg">
          <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-secondary/10 flex items-center justify-center">
            <Icon name="GraduationCap" size={20} color="var(--color-secondary)" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-xs md:text-sm text-muted-foreground caption mb-1">Department & Year</p>
            <p className="text-sm md:text-base font-medium text-foreground">
              {studentInfo?.department}, Year {studentInfo?.year}
            </p>
          </div>
        </div>
      </div>
      <div className={`flex items-center gap-3 p-4 md:p-6 rounded-lg mb-6 ${
        todayAttendance?.marked 
          ? 'bg-success/10 border border-success/20' :'bg-warning/10 border border-warning/20'
      }`}>
        <div className="flex-shrink-0">
          <Icon 
            name={todayAttendance?.marked ? 'CheckCircle' : 'Clock'} 
            size={24} 
            color={todayAttendance?.marked ? 'var(--color-success)' : 'var(--color-warning)'}
          />
        </div>
        <div className="flex-1">
          <p className="text-sm md:text-base font-semibold mb-1" style={{ 
            color: todayAttendance?.marked ? 'var(--color-success)' : 'var(--color-warning)' 
          }}>
            {todayAttendance?.marked ? 'Attendance Marked' : 'Attendance Pending'}
          </p>
          <p className="text-xs md:text-sm text-muted-foreground caption">
            {todayAttendance?.marked 
              ? `Marked at ${todayAttendance?.timestamp}` 
              : 'Please mark your attendance before 11:59 PM'}
          </p>
        </div>
      </div>
      <Button
        variant={todayAttendance?.marked ? 'outline' : 'default'}
        size="lg"
        fullWidth
        onClick={onMarkAttendance}
        disabled={todayAttendance?.marked}
        loading={isLoading}
        iconName={todayAttendance?.marked ? 'CheckCircle' : 'Wifi'}
        iconPosition="left"
        className="mb-4"
      >
        {todayAttendance?.marked ? 'Attendance Already Marked' : 'Mark Attendance'}
      </Button>
      <div className="flex items-start gap-2 p-3 bg-muted/30 rounded-lg">
        <Icon name="Info" size={16} className="flex-shrink-0 mt-0.5" color="var(--color-primary)" />
        <p className="text-xs md:text-sm text-muted-foreground caption">
          You must be connected to the hostel Wi-Fi network to mark attendance. If attendance is not marked by 11:59 PM, you will be automatically marked absent.
        </p>
      </div>
    </div>
  );
};

export default AttendanceCard;