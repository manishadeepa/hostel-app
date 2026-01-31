import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import RoleBasedNavigation from '../../components/navigation/RoleBasedNavigation';
import GrievanceStats from './components/GrievanceStats';
import GrievanceFilters from './components/GrievanceFilters';
import GrievanceCard from './components/GrievanceCard';
import EmptyState from './components/EmptyState';
import Button from '../../components/ui/Button';

const MyGrievances = () => {
  const navigate = useNavigate();

  // Mock grievances data
  const mockGrievances = [
  {
    id: 'GRV-2026-001',
    category: 'Water',
    description: `There is no water supply in Room 305, Block A since yesterday morning. We have tried contacting the maintenance staff but received no response.\n\nThis is causing significant inconvenience as we cannot perform basic hygiene activities. Multiple students in our block are facing the same issue.`,
    status: 'in-progress',
    submittedDate: '2026-01-28T09:30:00',
    images: [
    {
      url: "https://img.rocket.new/generatedImages/rocket_gen_img_16d350f7f-1765469876633.png",
      alt: 'Empty water tap with no water flow in hostel bathroom showing dry faucet and sink'
    },
    {
      url: "https://images.unsplash.com/photo-1563910033-55557b8c3c2b",
      alt: 'Close-up view of broken water pipe connection with visible damage and rust'
    }],

    timeline: [
    {
      status: 'Submitted',
      date: '2026-01-28T09:30:00',
      remarks: 'Grievance submitted successfully'
    },
    {
      status: 'In Progress',
      date: '2026-01-28T14:20:00',
      remarks: 'Maintenance team has been notified. Plumber scheduled for inspection.'
    }]

  },
  {
    id: 'GRV-2026-002',
    category: 'Electricity',
    description: 'Frequent power cuts in Block B, especially during evening hours. This is affecting our study schedule and causing damage to electronic devices.',
    status: 'resolved',
    submittedDate: '2026-01-25T16:45:00',
    images: [],
    timeline: [
    {
      status: 'Submitted',
      date: '2026-01-25T16:45:00',
      remarks: 'Grievance submitted successfully'
    },
    {
      status: 'In Progress',
      date: '2026-01-26T10:15:00',
      remarks: 'Electrical team inspecting the main distribution board'
    },
    {
      status: 'Resolved',
      date: '2026-01-27T15:30:00',
      remarks: 'Faulty circuit breaker replaced. Power supply stabilized.'
    }],

    resolutionRemarks: 'The issue was caused by an overloaded circuit breaker in Block B. Our electrical team has replaced the faulty breaker and redistributed the load across multiple circuits. Power supply has been stable for the past 24 hours. Please report immediately if you experience any further issues.'
  },
  {
    id: 'GRV-2026-003',
    category: 'Food',
    description: 'The quality of food served in the mess has deteriorated significantly. Multiple students have complained about undercooked meals and poor hygiene standards.',
    status: 'pending',
    submittedDate: '2026-01-30T12:20:00',
    images: [
    {
      url: "https://img.rocket.new/generatedImages/rocket_gen_img_1b74ec8a8-1769853588630.png",
      alt: 'Unappetizing mess hall food plate showing poorly cooked vegetables and rice with visible quality issues'
    }],

    timeline: [
    {
      status: 'Submitted',
      date: '2026-01-30T12:20:00',
      remarks: 'Grievance submitted successfully'
    }]

  },
  {
    id: 'GRV-2026-004',
    category: 'Internet',
    description: 'WiFi connectivity is extremely poor in rooms 401-410. Unable to attend online classes or submit assignments on time.',
    status: 'in-progress',
    submittedDate: '2026-01-29T08:15:00',
    images: [],
    timeline: [
    {
      status: 'Submitted',
      date: '2026-01-29T08:15:00',
      remarks: 'Grievance submitted successfully'
    },
    {
      status: 'In Progress',
      date: '2026-01-29T16:40:00',
      remarks: 'IT team checking router configuration and signal strength in the affected area'
    }]

  },
  {
    id: 'GRV-2026-005',
    category: 'Cleanliness',
    description: 'Common washrooms on the 3rd floor are not being cleaned regularly. Unhygienic conditions pose health risks.',
    status: 'resolved',
    submittedDate: '2026-01-24T11:30:00',
    images: [
    {
      url: "https://img.rocket.new/generatedImages/rocket_gen_img_13bb2b9ac-1768507650680.png",
      alt: 'Dirty hostel washroom showing uncleaned floors and fixtures with visible stains and debris'
    }],

    timeline: [
    {
      status: 'Submitted',
      date: '2026-01-24T11:30:00',
      remarks: 'Grievance submitted successfully'
    },
    {
      status: 'In Progress',
      date: '2026-01-24T15:00:00',
      remarks: 'Housekeeping supervisor assigned to address the issue'
    },
    {
      status: 'Resolved',
      date: '2026-01-25T09:00:00',
      remarks: 'Deep cleaning completed. Daily cleaning schedule revised.'
    }],

    resolutionRemarks: 'We apologize for the inconvenience. The housekeeping team has performed a thorough deep cleaning of all 3rd floor washrooms. We have also revised the cleaning schedule to ensure twice-daily maintenance. A supervisor will conduct daily inspections to maintain hygiene standards.'
  },
  {
    id: 'GRV-2026-006',
    category: 'Security',
    description: 'Main gate security guard is often absent during late evening hours. This raises safety concerns for students returning from library.',
    status: 'pending',
    submittedDate: '2026-01-31T07:45:00',
    images: [],
    timeline: [
    {
      status: 'Submitted',
      date: '2026-01-31T07:45:00',
      remarks: 'Grievance submitted successfully'
    }]

  }];


  const [filters, setFilters] = useState({
    search: '',
    status: 'all',
    category: 'all',
    sortBy: 'newest',
    dateFrom: '',
    dateTo: ''
  });

  // Calculate statistics
  const stats = useMemo(() => {
    return {
      total: mockGrievances?.length,
      pending: mockGrievances?.filter((g) => g?.status === 'pending')?.length,
      inProgress: mockGrievances?.filter((g) => g?.status === 'in-progress')?.length,
      resolved: mockGrievances?.filter((g) => g?.status === 'resolved')?.length
    };
  }, [mockGrievances]);

  // Filter and sort grievances
  const filteredGrievances = useMemo(() => {
    let filtered = [...mockGrievances];

    // Search filter
    if (filters?.search) {
      const searchLower = filters?.search?.toLowerCase();
      filtered = filtered?.filter((g) =>
      g?.id?.toLowerCase()?.includes(searchLower) ||
      g?.description?.toLowerCase()?.includes(searchLower) ||
      g?.category?.toLowerCase()?.includes(searchLower)
      );
    }

    // Status filter
    if (filters?.status !== 'all') {
      filtered = filtered?.filter((g) => g?.status === filters?.status);
    }

    // Category filter
    if (filters?.category !== 'all') {
      filtered = filtered?.filter((g) => g?.category === filters?.category);
    }

    // Date range filter
    if (filters?.dateFrom) {
      filtered = filtered?.filter((g) =>
      new Date(g.submittedDate) >= new Date(filters.dateFrom)
      );
    }
    if (filters?.dateTo) {
      filtered = filtered?.filter((g) =>
      new Date(g.submittedDate) <= new Date(filters.dateTo + 'T23:59:59')
      );
    }

    // Sort
    filtered?.sort((a, b) => {
      if (filters?.sortBy === 'newest') {
        return new Date(b.submittedDate) - new Date(a.submittedDate);
      } else if (filters?.sortBy === 'oldest') {
        return new Date(a.submittedDate) - new Date(b.submittedDate);
      } else if (filters?.sortBy === 'status') {
        const statusOrder = { 'pending': 0, 'in-progress': 1, 'resolved': 2, 'rejected': 3 };
        return statusOrder?.[a?.status] - statusOrder?.[b?.status];
      }
      return 0;
    });

    return filtered;
  }, [mockGrievances, filters]);

  const handleFilterChange = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const handleResetFilters = () => {
    setFilters({
      search: '',
      status: 'all',
      category: 'all',
      sortBy: 'newest',
      dateFrom: '',
      dateTo: ''
    });
  };

  const handleViewDetails = (grievance) => {
    console.log('View details for:', grievance?.id);
  };

  const hasActiveFilters = filters?.search ||
  filters?.status !== 'all' ||
  filters?.category !== 'all' ||
  filters?.dateFrom ||
  filters?.dateTo;

  return (
    <div className="min-h-screen bg-background">
      <RoleBasedNavigation userRole="student" />
      <main className="main-content">
        <div className="content-container">
          {/* Page Header */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
            <div>
              <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-foreground mb-2">
                My Grievances
              </h1>
              <p className="text-sm md:text-base text-muted-foreground">
                Track and manage your submitted grievances with real-time status updates
              </p>
            </div>
            <Button
              variant="default"
              onClick={() => navigate('/submit-grievance')}
              iconName="Plus"
              iconPosition="left">

              New Grievance
            </Button>
          </div>

          {/* Statistics */}
          <div className="mb-6">
            <GrievanceStats stats={stats} />
          </div>

          {/* Filters */}
          <div className="mb-6">
            <GrievanceFilters
              filters={filters}
              onFilterChange={handleFilterChange}
              onReset={handleResetFilters}
              totalCount={mockGrievances?.length}
              filteredCount={filteredGrievances?.length} />

          </div>

          {/* Grievances List */}
          {filteredGrievances?.length > 0 ?
          <div className="space-y-4">
              {filteredGrievances?.map((grievance) =>
            <GrievanceCard
              key={grievance?.id}
              grievance={grievance}
              onViewDetails={handleViewDetails} />

            )}
            </div> :

          <EmptyState
            hasFilters={hasActiveFilters}
            onResetFilters={handleResetFilters} />

          }
        </div>
      </main>
    </div>);

};

export default MyGrievances;