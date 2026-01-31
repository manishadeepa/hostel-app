import React from 'react';
import Select from '../../../components/ui/Select';


const CategorySelector = ({ value, onChange, error }) => {
  const categories = [
    { 
      value: 'water', 
      label: 'Water',
      description: 'Water supply, leakage, or quality issues'
    },
    { 
      value: 'electricity', 
      label: 'Electricity',
      description: 'Power outage, wiring, or electrical appliance issues'
    },
    { 
      value: 'food', 
      label: 'Food',
      description: 'Mess food quality, hygiene, or menu concerns'
    },
    { 
      value: 'internet', 
      label: 'Internet',
      description: 'WiFi connectivity, speed, or network issues'
    },
    { 
      value: 'cleanliness', 
      label: 'Cleanliness',
      description: 'Room, bathroom, or common area cleaning issues'
    },
    { 
      value: 'security', 
      label: 'Security',
      description: 'Safety concerns, access control, or security personnel issues'
    },
    { 
      value: 'others', 
      label: 'Others',
      description: 'Any other hostel-related concerns'
    }
  ];

  return (
    <div className="w-full">
      <Select
        label="Grievance Category"
        description="Select the category that best describes your issue"
        options={categories}
        value={value}
        onChange={onChange}
        error={error}
        required
        searchable
        placeholder="Choose a category"
      />
    </div>
  );
};

export default CategorySelector;