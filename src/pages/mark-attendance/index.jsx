import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import DashboardNavigation from "../../components/navigation/DashboardNavigation";
import BreadcrumbNavigation from "../../components/navigation/BreadcrumbNavigation";
import AttendanceStatusCard from "./components/AttendanceStatusCard";
import WiFiValidationCard from "./components/WiFiValidationCard";
import AttendanceHistoryWidget from "./components/AttendanceHistoryWidget";
import AttendancePolicyCard from "./components/AttendancePolicyCard";
import Icon from "../../components/AppIcon";

const MarkAttendance = () => {
  const navigate = useNavigate();

  const [currentTime, setCurrentTime] = useState(new Date());
  const [isMarked, setIsMarked] = useState(false);
  const [markedTime, setMarkedTime] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  // UI-only Wi-Fi display (backend decides real validation)
  const [wifiStatus] = useState({
    isConnected: true,
    isValidNetwork: true,
    networkName: "HostelWiFi_Main",
  });

  const breadcrumbItems = [
    { label: "Dashboard", path: "/student-dashboard" },
    { label: "Mark Attendance", path: "/mark-attendance" },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatDate = (date) =>
    date.toLocaleDateString("en-GB", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });

  const formatTime = (date) =>
    date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: true,
    });

  // 🔥 REAL BACKEND-VERIFIED ATTENDANCE
  const handleMarkAttendance = async () => {
    if (isMarked) return;

    setIsLoading(true);

    try {
      const response = await fetch(
        "http://192.168.107.190:5000/mark-attendance", // 🔴 CHANGE to YOUR backend IP
        { method: "POST" }
      );

      const data = await response.json();

      if (data.success) {
        const now = new Date();
        setMarkedTime(formatTime(now));
        setIsMarked(true);
        setShowSuccessModal(true);

        setTimeout(() => setShowSuccessModal(false), 3000);
      } else {
        alert("❌ " + data.message);
      }
    } catch (error) {
      // Happens when NOT on college Wi-Fi
      alert("❌ Please connect to hostel Wi-Fi to mark attendance");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <DashboardNavigation userRole="student" notificationCount={3} />
      <BreadcrumbNavigation items={breadcrumbItems} />

      <div className="max-w-screen-2xl mx-auto px-6 py-8">
        <button
          onClick={() => navigate("/student-dashboard")}
          className="flex items-center gap-2 text-muted-foreground mb-4"
        >
          <Icon name="ArrowLeft" size={20} />
          Back to Dashboard
        </button>

        <h1 className="text-3xl font-bold mb-2">Mark Attendance</h1>
        <p className="text-muted-foreground mb-6">
          Record your daily hostel presence with Wi-Fi validation
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <AttendanceStatusCard
              isMarked={isMarked}
              currentDate={formatDate(currentTime)}
              currentTime={formatTime(currentTime)}
              markedTime={markedTime}
            />

            <WiFiValidationCard
              isConnected={wifiStatus.isConnected}
              isValidNetwork={wifiStatus.isValidNetwork}
              networkName={wifiStatus.networkName}
              onMarkAttendance={handleMarkAttendance}
              isLoading={isLoading}
              isMarked={isMarked}
            />

            <AttendanceHistoryWidget />
          </div>

          <AttendancePolicyCard />
        </div>
      </div>

      {/* SUCCESS MODAL */}
      {showSuccessModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-xl text-center">
            <Icon name="CheckCircle2" size={48} className="text-green-600 mx-auto" />
            <h3 className="text-xl font-bold mt-3">Attendance Marked!</h3>
            <p className="text-muted-foreground mt-1">
              Marked at {markedTime}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default MarkAttendance;
