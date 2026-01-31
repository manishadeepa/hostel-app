import React, { useState, useEffect } from 'react';
import RoleBasedNavigation from '../../components/navigation/RoleBasedNavigation';
import NotificationDisplay from '../../components/ui/NotificationDisplay';
import GrievanceFilters from './components/GrievanceFilters';
import GrievanceAnalytics from './components/GrievanceAnalytics';
import QuickActions from './components/QuickActions';
import GrievanceTable from './components/GrievanceTable';
import GrievanceMobileCard from './components/GrievanceMobileCard';
import StatusUpdateModal from './components/StatusUpdateModal';
import BulkUpdateModal from './components/BulkUpdateModal';

const GrievanceManagement = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 1024);
  const [notification, setNotification] = useState({
    type: 'notice',
    title: 'System Update',
    message: 'Grievance management system has been updated with new filtering capabilities',
    timestamp: new Date()?.toISOString()
  });
  const [filters, setFilters] = useState({
    category: 'all',
    status: 'all',
    priority: 'all',
    search: '',
    fromDate: '',
    toDate: ''
  });
  const [selectedGrievance, setSelectedGrievance] = useState(null);
  const [isStatusModalOpen, setIsStatusModalOpen] = useState(false);
  const [isBulkModalOpen, setIsBulkModalOpen] = useState(false);
  const [selectedGrievances, setSelectedGrievances] = useState([]);

  const mockGrievances = [
  {
    id: "GRV-2026-001",
    studentName: "Rahul Sharma",
    studentAvatar: "https://img.rocket.new/generatedImages/rocket_gen_img_10977c15f-1763295924025.png",
    studentAvatarAlt: "Professional headshot of young Indian male student with short black hair wearing blue shirt",
    block: "A",
    room: "101",
    category: "Water",
    description: "Water supply has been irregular for the past three days. The tap water pressure is very low during morning hours from 6 AM to 9 AM, making it difficult to complete daily routines before classes.",
    submissionDate: "01/28/2026",
    submissionTime: "09:15 AM",
    status: "submitted",
    priority: "high",
    images: [
    {
      url: "https://img.rocket.new/generatedImages/rocket_gen_img_1f0625f66-1765214498786.png",
      alt: "Close-up view of bathroom tap with low water pressure showing minimal water flow"
    },
    {
      url: "https://images.unsplash.com/photo-1565785469014-29bf352dc5a9",
      alt: "Empty water bucket placed under tap in bathroom with tiled walls"
    }]

  },
  {
    id: "GRV-2026-002",
    studentName: "Priya Patel",
    studentAvatar: "https://img.rocket.new/generatedImages/rocket_gen_img_17591a98c-1763295472530.png",
    studentAvatarAlt: "Professional headshot of young Indian female student with long black hair wearing white top",
    block: "B",
    room: "205",
    category: "Electricity",
    description: "Frequent power cuts in our wing lasting 2-3 hours daily. This is affecting our study schedule and online classes. The backup generator is not working properly.",
    submissionDate: "01/27/2026",
    submissionTime: "02:30 PM",
    status: "in-progress",
    priority: "high",
    remarks: "Electrician has been assigned. Generator repair scheduled for tomorrow.",
    images: [
    {
      url: "https://img.rocket.new/generatedImages/rocket_gen_img_1262793bd-1769853588227.png",
      alt: "Dark hostel room with no lights showing power outage situation"
    }]

  },
  {
    id: "GRV-2026-003",
    studentName: "Amit Kumar",
    studentAvatar: "https://img.rocket.new/generatedImages/rocket_gen_img_10977c15f-1763295924025.png",
    studentAvatarAlt: "Professional headshot of young Indian male student with glasses and short hair wearing green shirt",
    block: "A",
    room: "304",
    category: "Food",
    description: "The quality of dinner served yesterday was poor. The rice was undercooked and the dal was too watery. Several students complained about stomach issues after eating.",
    submissionDate: "01/26/2026",
    submissionTime: "08:45 PM",
    status: "resolved",
    priority: "medium",
    remarks: "Kitchen staff has been counseled. New quality control measures implemented. Menu revised with student feedback committee.",
    images: []
  },
  {
    id: "GRV-2026-004",
    studentName: "Sneha Reddy",
    studentAvatar: "https://img.rocket.new/generatedImages/rocket_gen_img_17591a98c-1763295472530.png",
    studentAvatarAlt: "Professional headshot of young Indian female student with shoulder-length black hair wearing pink top",
    block: "C",
    room: "102",
    category: "Internet",
    description: "WiFi connectivity is very poor in C Block. The signal strength is weak and keeps disconnecting every few minutes. Unable to attend online classes properly.",
    submissionDate: "01/29/2026",
    submissionTime: "11:20 AM",
    status: "submitted",
    priority: "high",
    images: [
    {
      url: "https://img.rocket.new/generatedImages/rocket_gen_img_1e092bcf9-1768397286134.png",
      alt: "Laptop screen showing weak WiFi signal indicator with student studying in background"
    }]

  },
  {
    id: "GRV-2026-005",
    studentName: "Vikram Singh",
    studentAvatar: "https://img.rocket.new/generatedImages/rocket_gen_img_10977c15f-1763295924025.png",
    studentAvatarAlt: "Professional headshot of young Indian male student with short hair and beard wearing blue shirt",
    block: "B",
    room: "408",
    category: "Cleanliness",
    description: "Common washroom on 4th floor has not been cleaned for two days. The condition is unhygienic and there is a foul smell. Dustbins are overflowing.",
    submissionDate: "01/28/2026",
    submissionTime: "07:00 AM",
    status: "in-progress",
    priority: "high",
    remarks: "Cleaning staff assigned. Deep cleaning scheduled for today evening.",
    images: [
    {
      url: "https://images.unsplash.com/photo-1622017094139-5da89b761815",
      alt: "Unclean washroom with overflowing dustbin and dirty floor tiles"
    }]

  },
  {
    id: "GRV-2026-006",
    studentName: "Anjali Verma",
    studentAvatar: "https://img.rocket.new/generatedImages/rocket_gen_img_17591a98c-1763295472530.png",
    studentAvatarAlt: "Professional headshot of young Indian female student with long black hair wearing yellow top",
    block: "A",
    room: "207",
    category: "Security",
    description: "The main gate security guard was not present during late evening hours yesterday. This is a serious security concern as unauthorized persons can enter the premises.",
    submissionDate: "01/27/2026",
    submissionTime: "10:15 PM",
    status: "resolved",
    priority: "high",
    remarks: "Security supervisor has been notified. Additional guard deployed for night shift. CCTV monitoring enhanced.",
    images: []
  },
  {
    id: "GRV-2026-007",
    studentName: "Karthik Menon",
    studentAvatar: "https://img.rocket.new/generatedImages/rocket_gen_img_176c76f81-1763300561991.png",
    studentAvatarAlt: "Professional headshot of young Indian male student with curly hair wearing red shirt",
    block: "C",
    room: "305",
    category: "Others",
    description: "The study room lights are not working properly. Some tube lights are flickering and creating disturbance during study hours. Need immediate replacement.",
    submissionDate: "01/29/2026",
    submissionTime: "04:30 PM",
    status: "submitted",
    priority: "medium",
    images: [
    {
      url: "https://img.rocket.new/generatedImages/rocket_gen_img_151cd7547-1767201775156.png",
      alt: "Study room with flickering fluorescent tube lights on ceiling"
    }]

  },
  {
    id: "GRV-2026-008",
    studentName: "Divya Krishnan",
    studentAvatar: "https://img.rocket.new/generatedImages/rocket_gen_img_18e23b0ba-1763300956208.png",
    studentAvatarAlt: "Professional headshot of young Indian female student with short black hair wearing blue top",
    block: "B",
    room: "301",
    category: "Water",
    description: "Hot water is not available in the morning. The geyser in our floor bathroom is not functioning. This is causing inconvenience during winter season.",
    submissionDate: "01/28/2026",
    submissionTime: "06:45 AM",
    status: "in-progress",
    priority: "medium",
    remarks: "Plumber inspecting the geyser. Replacement parts ordered.",
    images: []
  },
  {
    id: "GRV-2026-009",
    studentName: "Rohan Gupta",
    studentAvatar: "https://img.rocket.new/generatedImages/rocket_gen_img_1ce60a699-1763292378021.png",
    studentAvatarAlt: "Professional headshot of young Indian male student with short hair wearing white shirt",
    block: "A",
    room: "405",
    category: "Electricity",
    description: "Power socket in my room is not working. Unable to charge laptop and phone. This is affecting my studies and assignments.",
    submissionDate: "01/29/2026",
    submissionTime: "01:20 PM",
    status: "submitted",
    priority: "low",
    images: [
    {
      url: "https://img.rocket.new/generatedImages/rocket_gen_img_12b9da76d-1766890251918.png",
      alt: "Close-up of damaged electrical socket on wall with exposed wires"
    }]

  },
  {
    id: "GRV-2026-010",
    studentName: "Meera Nair",
    studentAvatar: "https://img.rocket.new/generatedImages/rocket_gen_img_17591a98c-1763295472530.png",
    studentAvatarAlt: "Professional headshot of young Indian female student with long black hair wearing green top",
    block: "C",
    room: "201",
    category: "Food",
    description: "Breakfast timing is too early at 7 AM. Many students miss breakfast due to early morning classes. Request to extend breakfast timing till 9 AM.",
    submissionDate: "01/26/2026",
    submissionTime: "08:00 AM",
    status: "resolved",
    priority: "low",
    remarks: "Breakfast timing extended to 8:30 AM after discussion with mess committee. New schedule effective from next week.",
    images: []
  }];


  const [filteredGrievances, setFilteredGrievances] = useState(mockGrievances);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1024);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    applyFilters();
  }, [filters]);

  const applyFilters = () => {
    let filtered = [...mockGrievances];

    if (filters?.category !== 'all') {
      filtered = filtered?.filter((g) => g?.category?.toLowerCase() === filters?.category);
    }

    if (filters?.status !== 'all') {
      filtered = filtered?.filter((g) => g?.status === filters?.status);
    }

    if (filters?.priority !== 'all') {
      filtered = filtered?.filter((g) => g?.priority === filters?.priority);
    }

    if (filters?.search) {
      const searchLower = filters?.search?.toLowerCase();
      filtered = filtered?.filter((g) =>
      g?.id?.toLowerCase()?.includes(searchLower) ||
      g?.studentName?.toLowerCase()?.includes(searchLower)
      );
    }

    if (filters?.fromDate) {
      filtered = filtered?.filter((g) => {
        const grievanceDate = new Date(g.submissionDate);
        const fromDate = new Date(filters.fromDate);
        return grievanceDate >= fromDate;
      });
    }

    if (filters?.toDate) {
      filtered = filtered?.filter((g) => {
        const grievanceDate = new Date(g.submissionDate);
        const toDate = new Date(filters.toDate);
        return grievanceDate <= toDate;
      });
    }

    setFilteredGrievances(filtered);
  };

  const handleFilterChange = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const handleResetFilters = () => {
    setFilters({
      category: 'all',
      status: 'all',
      priority: 'all',
      search: '',
      fromDate: '',
      toDate: ''
    });
  };

  const handleStatusUpdate = (grievance) => {
    setSelectedGrievance(grievance);
    setIsStatusModalOpen(true);
  };

  const handleUpdateSubmit = (updateData) => {
    console.log('Updating grievance:', updateData);
    setIsStatusModalOpen(false);
    setSelectedGrievance(null);
  };

  const handleBulkUpdate = (selectedIds) => {
    setSelectedGrievances(selectedIds);
    setIsBulkModalOpen(true);
  };

  const handleBulkUpdateSubmit = (updateData) => {
    console.log('Bulk updating grievances:', selectedGrievances, updateData);
    setIsBulkModalOpen(false);
    setSelectedGrievances([]);
  };

  const handleEmergencyClick = () => {
    setFilters((prev) => ({ ...prev, priority: 'high', status: 'submitted' }));
  };

  const handleOverdueClick = () => {
    setFilters((prev) => ({ ...prev, status: 'in-progress' }));
  };

  const analytics = {
    total: mockGrievances?.length,
    pending: mockGrievances?.filter((g) => g?.status === 'submitted')?.length,
    inProgress: mockGrievances?.filter((g) => g?.status === 'in-progress')?.length,
    resolved: mockGrievances?.filter((g) => g?.status === 'resolved')?.length
  };

  const emergencyCount = mockGrievances?.filter((g) => g?.priority === 'high' && g?.status === 'submitted')?.length;
  const overdueCount = mockGrievances?.filter((g) => g?.status === 'in-progress')?.length;

  return (
    <div className="min-h-screen bg-background">
      <RoleBasedNavigation userRole="warden" />
      {notification &&
      <NotificationDisplay
        notification={notification}
        onDismiss={() => setNotification(null)}
        autoHideDuration={5000} />

      }
      <main className={`main-content ${notification ? 'with-notification' : ''}`}>
        <div className="content-container">
          <div className="mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
              Grievance Management
            </h1>
            <p className="text-base md:text-lg text-muted-foreground">
              Review, update, and resolve student complaints efficiently
            </p>
          </div>

          <GrievanceAnalytics analytics={analytics} />

          <QuickActions
            onEmergencyClick={handleEmergencyClick}
            onOverdueClick={handleOverdueClick}
            emergencyCount={emergencyCount}
            overdueCount={overdueCount} />


          <GrievanceFilters
            filters={filters}
            onFilterChange={handleFilterChange}
            onReset={handleResetFilters}
            resultsCount={filteredGrievances?.length} />


          {isMobile ?
          <div className="space-y-4">
              {filteredGrievances?.map((grievance) =>
            <GrievanceMobileCard
              key={grievance?.id}
              grievance={grievance}
              isSelected={selectedGrievances?.includes(grievance?.id)}
              onSelect={(id, checked) => {
                if (checked) {
                  setSelectedGrievances([...selectedGrievances, id]);
                } else {
                  setSelectedGrievances(selectedGrievances?.filter((gId) => gId !== id));
                }
              }}
              onStatusUpdate={handleStatusUpdate} />

            )}
            </div> :

          <GrievanceTable
            grievances={filteredGrievances}
            onStatusUpdate={handleStatusUpdate}
            onBulkUpdate={handleBulkUpdate} />

          }
        </div>
      </main>
      <StatusUpdateModal
        isOpen={isStatusModalOpen}
        onClose={() => {
          setIsStatusModalOpen(false);
          setSelectedGrievance(null);
        }}
        grievance={selectedGrievance}
        onUpdate={handleUpdateSubmit} />

      <BulkUpdateModal
        isOpen={isBulkModalOpen}
        onClose={() => {
          setIsBulkModalOpen(false);
          setSelectedGrievances([]);
        }}
        selectedCount={selectedGrievances?.length}
        onUpdate={handleBulkUpdateSubmit} />

    </div>);

};

export default GrievanceManagement;