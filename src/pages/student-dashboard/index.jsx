import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import DashboardNavigation from '../../components/navigation/DashboardNavigation';
import BreadcrumbNavigation from '../../components/navigation/BreadcrumbNavigation';
import WelcomeCard from './components/WelcomeCard';
import AttendanceStatusWidget from './components/AttendanceStatusWidget';
import ServiceCard from './components/ServiceCard';
import RecentGrievanceCard from './components/RecentGrievanceCard';
import NoticeAlertCard from './components/NoticeAlertCard';
import QuickActionsBar from './components/QuickActionsBar';

const StudentDashboard = () => {
  const [studentData] = useState({
    name: "Rahul Sharma",
    collegeId: "CS2021045",
    roomNumber: "204",
    blockNumber: "A",
    department: "Computer Science",
    year: "3rd Year",
    phoneNumber: "+91 98765 43210"
  });

  const [attendanceData] = useState({
    status: "present",
    lastMarkedTime: "08:45 AM",
    markedDate: "31/01/2026"
  });

  const [grievanceStats] = useState({
    total: 5,
    pending: 2,
    inProgress: 1,
    resolved: 2
  });

  const [recentGrievances] = useState([
    {
      id: 1,
      category: "Water Supply",
      description: "Low water pressure in bathroom during morning hours affecting daily routine",
      status: "In Progress",
      date: "29/01/2026"
    },
    {
      id: 2,
      category: "Internet",
      description: "Wi-Fi connectivity issues in room, frequent disconnections during evening hours",
      status: "Submitted",
      date: "28/01/2026"
    },
    {
      id: 3,
      category: "Cleanliness",
      description: "Common area cleaning not done properly, dustbins overflowing in corridor",
      status: "Resolved",
      date: "25/01/2026"
    }
  ]);

  const [notices] = useState([
    {
      title: "Hostel Maintenance Schedule",
      message: "Routine maintenance work will be conducted in Block A on 02/02/2026 from 10:00 AM to 2:00 PM. Water supply may be affected during this period.",
      date: "30/01/2026",
      priority: "normal"
    },
    {
      title: "Mess Menu Update",
      message: "New breakfast options including South Indian dishes will be available from next week. Feedback forms available at mess counter.",
      date: "29/01/2026",
      priority: "normal"
    }
  ]);

  const [alerts] = useState([
    {
      title: "Emergency Contact Update",
      message: "All students must update their emergency contact details in the hostel office by 05/02/2026. This is mandatory for safety protocols.",
      date: "31/01/2026",
      priority: "high"
    }
  ]);

  const [notificationCount] = useState(3);

  const breadcrumbItems = [
    { label: 'Dashboard', path: '/student-dashboard' }
  ];

  const serviceCards = [
    {
      title: "Mark Attendance",
      description: "Mark your daily hostel attendance using Wi-Fi validation",
      icon: "CheckSquare",
      route: "/mark-attendance",
      badge: attendanceData?.status === 'pending' ? 'Pending' : 'Marked',
      badgeColor: attendanceData?.status === 'pending' ? 'bg-warning' : 'bg-success',
      iconColor: "var(--color-success)"
    },
    {
      title: "Submit Grievance",
      description: "Report maintenance issues and facility complaints",
      icon: "MessageSquare",
      route: "/submit-grievance",
      badge: grievanceStats?.pending > 0 ? grievanceStats?.pending : null,
      badgeColor: 'bg-orange-500',
      iconColor: "var(--color-warning)"
    },
    {
      title: "My Grievances",
      description: "Track status of your submitted complaints and requests",
      icon: "FileText",
      route: "/my-grievances",
      badge: grievanceStats?.total,
      badgeColor: 'bg-primary',
      iconColor: "var(--color-primary)"
    },
    {
      title: "Feedback",
      description: "Share your experience and rate hostel facilities",
      icon: "Star",
      route: "/feedback",
      iconColor: "var(--color-accent)"
    },
    {
      title: "Notices",
      description: "View important announcements and hostel updates",
      icon: "Bell",
      route: "/notices",
      badge: notices?.length,
      badgeColor: 'bg-blue-500',
      iconColor: "var(--color-secondary)"
    },
    {
      title: "Alerts",
      description: "Check priority notifications and emergency messages",
      icon: "AlertTriangle",
      route: "/alerts",
      badge: alerts?.length,
      badgeColor: 'bg-error',
      iconColor: "var(--color-error)"
    }
  ];

  return (
    <>
      <Helmet>
        <title>Student Dashboard - HostelApp</title>
        <meta name="description" content="Access all hostel services including attendance, grievances, feedback, and communications from your student dashboard" />
      </Helmet>
      <div className="min-h-screen bg-background">
        <DashboardNavigation userRole="student" notificationCount={notificationCount} />
        <BreadcrumbNavigation items={breadcrumbItems} />

        <main className="max-w-screen-2xl mx-auto px-4 md:px-6 lg:px-8 py-6 md:py-8 lg:py-10">
          <div className="space-y-6 md:space-y-8">
            <WelcomeCard 
              studentName={studentData?.name}
              roomNumber={studentData?.roomNumber}
              blockNumber={studentData?.blockNumber}
            />

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6">
              <AttendanceStatusWidget 
                status={attendanceData?.status}
                lastMarkedTime={attendanceData?.lastMarkedTime}
              />
              <div className="lg:col-span-2">
                <QuickActionsBar attendanceStatus={attendanceData?.status} />
              </div>
            </div>

            <div>
              <h2 className="text-xl md:text-2xl font-semibold text-foreground mb-4 md:mb-6">
                Hostel Services
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                {serviceCards?.map((card, index) => (
                  <ServiceCard key={index} {...card} />
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
              <RecentGrievanceCard grievances={recentGrievances} />
              <NoticeAlertCard notices={notices} alerts={alerts} />
            </div>
          </div>
        </main>
      </div>
    </>
  );
};

export default StudentDashboard;