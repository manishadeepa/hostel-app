import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import DashboardNavigation from '../../components/navigation/DashboardNavigation';
import BreadcrumbNavigation from '../../components/navigation/BreadcrumbNavigation';
import AttendanceStatusCard from './components/AttendanceStatusCard';
import WiFiValidationCard from './components/WiFiValidationCard';
import AttendanceHistoryWidget from './components/AttendanceHistoryWidget';
import AttendancePolicyCard from './components/AttendancePolicyCard';
import Icon from '../../components/AppIcon';

const MarkAttendance = () => {
  const navigate = useNavigate();
  const [currentTime, setCurrentTime] = useState(new Date());
  const [isMarked, setIsMarked] = useState(false);
  const [markedTime, setMarkedTime] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const [wifiStatus, setWifiStatus] = useState({
    isConnected: true,
    isValidNetwork: true,
    networkName: "HostelWiFi_Main"
  });

  const attendanceRecords = [
    {
      id: 1,
      date: "30 January 2026",
      time: "09:15 AM",
      status: "present"
    },
    {
      id: 2,
      date: "29 January 2026",
      time: "08:45 AM",
      status: "present"
    },
    {
      id: 3,
      date: "28 January 2026",
      time: "10:30 AM",
      status: "present"
    },
    {
      id: 4,
      date: "27 January 2026",
      time: "Not Marked",
      status: "absent"
    },
    {
      id: 5,
      date: "26 January 2026",
      time: "09:00 AM",
      status: "present"
    }
  ];

  const currentStreak = 3;

  const breadcrumbItems = [
    { label: 'Dashboard', path: '/student-dashboard' },
    { label: 'Mark Attendance', path: '/mark-attendance' }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatDate = (date) => {
    return date?.toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  };

  const formatTime = (date) => {
    return date?.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: true
    });
  };

  const handleMarkAttendance = async () => {
    if (!wifiStatus?.isConnected || !wifiStatus?.isValidNetwork || isMarked) {
      return;
    }

    setIsLoading(true);

    setTimeout(() => {
      const now = new Date();
      setMarkedTime(formatTime(now));
      setIsMarked(true);
      setIsLoading(false);
      setShowSuccessModal(true);

      setTimeout(() => {
        setShowSuccessModal(false);
      }, 3000);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-background">
      <DashboardNavigation userRole="student" notificationCount={3} />
      <BreadcrumbNavigation items={breadcrumbItems} />
      <div className="max-w-screen-2xl mx-auto px-4 md:px-6 lg:px-8 py-6 md:py-8 lg:py-10">
        <div className="mb-6 md:mb-8">
          <button
            onClick={() => navigate('/student-dashboard')}
            className="flex items-center gap-2 text-sm md:text-base text-muted-foreground hover:text-foreground transition-smooth mb-4"
          >
            <Icon name="ArrowLeft" size={20} />
            <span>Back to Dashboard</span>
          </button>
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-foreground mb-2">
            Mark Attendance
          </h1>
          <p className="text-sm md:text-base lg:text-lg text-muted-foreground">
            Record your daily hostel presence with Wi-Fi validation
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6 lg:gap-8">
          <div className="lg:col-span-2 space-y-4 md:space-y-6 lg:space-y-8">
            <AttendanceStatusCard
              isMarked={isMarked}
              currentDate={formatDate(currentTime)}
              currentTime={formatTime(currentTime)}
              markedTime={markedTime}
            />

            <WiFiValidationCard
              isConnected={wifiStatus?.isConnected}
              isValidNetwork={wifiStatus?.isValidNetwork}
              networkName={wifiStatus?.networkName}
              onMarkAttendance={handleMarkAttendance}
              isLoading={isLoading}
              isMarked={isMarked}
            />

            <AttendanceHistoryWidget
              attendanceRecords={attendanceRecords}
              currentStreak={currentStreak}
            />
          </div>

          <div className="lg:col-span-1">
            <div className="lg:sticky lg:top-24 space-y-4 md:space-y-6">
              <AttendancePolicyCard />

              <div className="bg-card rounded-xl shadow-elevation-md p-4 md:p-6 border border-border">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-primary/10 flex items-center justify-center">
                    <Icon name="Clock" size={20} color="var(--color-primary)" />
                  </div>
                  <h3 className="text-base md:text-lg font-semibold text-foreground">
                    Today's Deadline
                  </h3>
                </div>
                <div className="text-center py-4 md:py-6 bg-muted/30 rounded-lg border border-border">
                  <div className="text-3xl md:text-4xl font-bold text-primary mb-2">
                    11:59 PM
                  </div>
                  <p className="text-xs md:text-sm text-muted-foreground">
                    Time remaining to mark attendance
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {showSuccessModal && (
        <div className="fixed inset-0 z-[2000] flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm">
          <div className="bg-card rounded-xl shadow-elevation-xl p-6 md:p-8 max-w-md w-full border border-border animate-in fade-in zoom-in duration-300">
            <div className="text-center">
              <div className="w-16 h-16 md:w-20 md:h-20 mx-auto mb-4 rounded-full bg-success/10 flex items-center justify-center">
                <Icon name="CheckCircle2" size={40} color="var(--color-success)" />
              </div>
              <h3 className="text-xl md:text-2xl font-bold text-foreground mb-2">
                Attendance Marked!
              </h3>
              <p className="text-sm md:text-base text-muted-foreground mb-4">
                Your attendance has been successfully recorded for today at {markedTime}.
              </p>
              <div className="flex items-center justify-center gap-2 text-sm text-success">
                <Icon name="CheckCircle2" size={16} />
                <span>You're all set for today</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MarkAttendance;