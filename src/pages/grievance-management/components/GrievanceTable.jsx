import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import { Checkbox } from '../../../components/ui/Checkbox';
import GrievanceTableRow from './GrievanceTableRow';

const GrievanceTable = ({ grievances, onStatusUpdate, onBulkUpdate }) => {
  const [selectedGrievances, setSelectedGrievances] = useState([]);
  const [sortConfig, setSortConfig] = useState({ key: 'submissionDate', direction: 'desc' });

  const handleSelectAll = (checked) => {
    if (checked) {
      setSelectedGrievances(grievances?.map(g => g?.id));
    } else {
      setSelectedGrievances([]);
    }
  };

  const handleSelectGrievance = (id, checked) => {
    if (checked) {
      setSelectedGrievances([...selectedGrievances, id]);
    } else {
      setSelectedGrievances(selectedGrievances?.filter(gId => gId !== id));
    }
  };

  const handleSort = (key) => {
    setSortConfig({
      key,
      direction: sortConfig?.key === key && sortConfig?.direction === 'asc' ? 'desc' : 'asc'
    });
  };

  const handleBulkUpdate = () => {
    if (selectedGrievances?.length > 0) {
      onBulkUpdate(selectedGrievances);
      setSelectedGrievances([]);
    }
  };

  const getSortIcon = (key) => {
    if (sortConfig?.key !== key) return 'ChevronsUpDown';
    return sortConfig?.direction === 'asc' ? 'ChevronUp' : 'ChevronDown';
  };

  return (
    <div className="card">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
            <Icon name="ClipboardList" size={20} color="var(--color-primary)" />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-foreground">Grievance List</h2>
            <p className="text-sm text-muted-foreground caption">
              {grievances?.length} {grievances?.length === 1 ? 'grievance' : 'grievances'} found
            </p>
          </div>
        </div>
        {selectedGrievances?.length > 0 && (
          <Button
            variant="default"
            size="sm"
            onClick={handleBulkUpdate}
            iconName="CheckCircle"
            iconPosition="left"
          >
            Update {selectedGrievances?.length} Selected
          </Button>
        )}
      </div>
      <div className="overflow-x-auto">
        <table className="w-full min-w-[1200px]">
          <thead className="bg-muted/50">
            <tr className="border-b border-border">
              <th className="px-4 py-3 text-left">
                <Checkbox
                  checked={selectedGrievances?.length === grievances?.length && grievances?.length > 0}
                  onChange={(e) => handleSelectAll(e?.target?.checked)}
                />
              </th>
              <th className="px-4 py-3 text-left">
                <button
                  onClick={() => handleSort('id')}
                  className="flex items-center gap-2 text-xs font-semibold text-foreground uppercase caption hover:text-primary transition-smooth"
                >
                  ID
                  <Icon name={getSortIcon('id')} size={14} />
                </button>
              </th>
              <th className="px-4 py-3 text-left">
                <button
                  onClick={() => handleSort('studentName')}
                  className="flex items-center gap-2 text-xs font-semibold text-foreground uppercase caption hover:text-primary transition-smooth"
                >
                  Student
                  <Icon name={getSortIcon('studentName')} size={14} />
                </button>
              </th>
              <th className="px-4 py-3 text-left">
                <button
                  onClick={() => handleSort('category')}
                  className="flex items-center gap-2 text-xs font-semibold text-foreground uppercase caption hover:text-primary transition-smooth"
                >
                  Category
                  <Icon name={getSortIcon('category')} size={14} />
                </button>
              </th>
              <th className="px-4 py-3 text-left">
                <button
                  onClick={() => handleSort('submissionDate')}
                  className="flex items-center gap-2 text-xs font-semibold text-foreground uppercase caption hover:text-primary transition-smooth"
                >
                  Submitted
                  <Icon name={getSortIcon('submissionDate')} size={14} />
                </button>
              </th>
              <th className="px-4 py-3 text-left">
                <button
                  onClick={() => handleSort('status')}
                  className="flex items-center gap-2 text-xs font-semibold text-foreground uppercase caption hover:text-primary transition-smooth"
                >
                  Status
                  <Icon name={getSortIcon('status')} size={14} />
                </button>
              </th>
              <th className="px-4 py-3 text-left">
                <button
                  onClick={() => handleSort('priority')}
                  className="flex items-center gap-2 text-xs font-semibold text-foreground uppercase caption hover:text-primary transition-smooth"
                >
                  Priority
                  <Icon name={getSortIcon('priority')} size={14} />
                </button>
              </th>
              <th className="px-4 py-3 text-left">
                <span className="text-xs font-semibold text-foreground uppercase caption">Actions</span>
              </th>
            </tr>
          </thead>
          <tbody>
            {grievances?.map((grievance) => (
              <GrievanceTableRow
                key={grievance?.id}
                grievance={grievance}
                isSelected={selectedGrievances?.includes(grievance?.id)}
                onSelect={handleSelectGrievance}
                onStatusUpdate={onStatusUpdate}
              />
            ))}
          </tbody>
        </table>
      </div>
      {grievances?.length === 0 && (
        <div className="text-center py-12">
          <div className="w-16 h-16 rounded-full bg-muted mx-auto mb-4 flex items-center justify-center">
            <Icon name="Inbox" size={32} color="var(--color-muted-foreground)" />
          </div>
          <h3 className="text-lg font-semibold text-foreground mb-2">No Grievances Found</h3>
          <p className="text-sm text-muted-foreground caption">
            Try adjusting your filters to see more results
          </p>
        </div>
      )}
    </div>
  );
};

export default GrievanceTable;