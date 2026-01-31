import React from 'react';
import Icon from '../../../components/AppIcon';

const AttendanceWidget = ({ totalStudents, presentToday, absentToday, attendanceRate }) => {
  return (
    <div className="bg-card rounded-xl p-4 md:p-6 shadow-elevation-md border border-border">
      <div className="flex items-center justify-between mb-4 md:mb-6">
        <h3 className="text-base md:text-lg lg:text-xl font-semibold text-foreground">Today's Attendance</h3>
        <div className="w-10 h-10 md:w-12 md:h-12 rounded-lg bg-primary/10 flex items-center justify-center">
          <Icon name="Users" size={20} color="var(--color-primary)" className="md:w-6 md:h-6" />
        </div>
      </div>

      <div className="space-y-3 md:space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-sm md:text-base text-muted-foreground">Total Students</span>
          <span className="text-base md:text-lg font-semibold text-foreground">{totalStudents}</span>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 md:w-3 md:h-3 rounded-full bg-success"></div>
            <span className="text-sm md:text-base text-muted-foreground">Present</span>
          </div>
          <span className="text-base md:text-lg font-semibold text-success">{presentToday}</span>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 md:w-3 md:h-3 rounded-full bg-error"></div>
            <span className="text-sm md:text-base text-muted-foreground">Absent</span>
          </div>
          <span className="text-base md:text-lg font-semibold text-error">{absentToday}</span>
        </div>

        <div className="pt-3 md:pt-4 border-t border-border">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm md:text-base font-medium text-foreground">Attendance Rate</span>
            <span className="text-base md:text-lg font-semibold text-primary">{attendanceRate}%</span>
          </div>
          <div className="w-full h-2 md:h-3 bg-muted rounded-full overflow-hidden">
            <div 
              className="h-full bg-primary rounded-full transition-smooth"
              style={{ width: `${attendanceRate}%` }}
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AttendanceWidget;