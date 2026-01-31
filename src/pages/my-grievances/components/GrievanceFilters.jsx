import React from 'react';
import Select from '../../../components/ui/Select';
import Input from '../../../components/ui/Input';
import Button from '../../../components/ui/Button';

const GrievanceFilters = ({ 
  filters, 
  onFilterChange, 
  onReset,
  totalCount,
  filteredCount 
}) => {
  const statusOptions = [
    { value: 'all', label: 'All Status' },
    { value: 'pending', label: 'Pending' },
    { value: 'in-progress', label: 'In Progress' },
    { value: 'resolved', label: 'Resolved' },
    { value: 'rejected', label: 'Rejected' }
  ];

  const categoryOptions = [
    { value: 'all', label: 'All Categories' },
    { value: 'Water', label: 'Water' },
    { value: 'Electricity', label: 'Electricity' },
    { value: 'Food', label: 'Food' },
    { value: 'Internet', label: 'Internet' },
    { value: 'Cleanliness', label: 'Cleanliness' },
    { value: 'Security', label: 'Security' },
    { value: 'Others', label: 'Others' }
  ];

  const sortOptions = [
    { value: 'newest', label: 'Newest First' },
    { value: 'oldest', label: 'Oldest First' },
    { value: 'status', label: 'By Status' }
  ];

  return (
    <div className="card">
      <div className="space-y-4">
        {/* Results Count */}
        <div className="flex items-center justify-between">
          <h3 className="text-base md:text-lg font-semibold text-foreground">
            Filter Grievances
          </h3>
          <span className="text-sm text-muted-foreground data-text">
            Showing {filteredCount} of {totalCount}
          </span>
        </div>

        {/* Search Input */}
        <Input
          type="search"
          placeholder="Search by ID or description..."
          value={filters?.search}
          onChange={(e) => onFilterChange('search', e?.target?.value)}
          className="w-full"
        />

        {/* Filter Selects */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Select
            label="Status"
            options={statusOptions}
            value={filters?.status}
            onChange={(value) => onFilterChange('status', value)}
          />

          <Select
            label="Category"
            options={categoryOptions}
            value={filters?.category}
            onChange={(value) => onFilterChange('category', value)}
          />

          <Select
            label="Sort By"
            options={sortOptions}
            value={filters?.sortBy}
            onChange={(value) => onFilterChange('sortBy', value)}
          />
        </div>

        {/* Date Range Filters */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            type="date"
            label="From Date"
            value={filters?.dateFrom}
            onChange={(e) => onFilterChange('dateFrom', e?.target?.value)}
          />

          <Input
            type="date"
            label="To Date"
            value={filters?.dateTo}
            onChange={(e) => onFilterChange('dateTo', e?.target?.value)}
          />
        </div>

        {/* Reset Button */}
        <div className="flex justify-end">
          <Button
            variant="outline"
            size="sm"
            onClick={onReset}
            iconName="RotateCcw"
            iconPosition="left"
          >
            Reset Filters
          </Button>
        </div>
      </div>
    </div>
  );
};

export default GrievanceFilters;