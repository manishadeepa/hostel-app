import React, { useState } from 'react';
import RoleBasedNavigation from '../../components/navigation/RoleBasedNavigation';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import CategorySelector from './components/CategorySelector';
import PrioritySelector from './components/PrioritySelector';
import DescriptionInput from './components/DescriptionInput';
import ImageUploader from './components/ImageUploader';
import SuccessModal from './components/SuccessModal';


const SubmitGrievance = () => {
  const [formData, setFormData] = useState({
    category: '',
    priority: 'medium',
    description: '',
    images: []
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [grievanceId, setGrievanceId] = useState('');

  const validateForm = () => {
    const newErrors = {};

    if (!formData?.category) {
      newErrors.category = 'Please select a grievance category';
    }

    if (!formData?.description?.trim()) {
      newErrors.description = 'Please provide a detailed description';
    } else if (formData?.description?.trim()?.length < 20) {
      newErrors.description = 'Description must be at least 20 characters';
    }

    if (!formData?.priority) {
      newErrors.priority = 'Please select a priority level';
    }

    setErrors(newErrors);
    return Object.keys(newErrors)?.length === 0;
  };

  const generateGrievanceId = () => {
    const timestamp = Date.now();
    const random = Math.floor(Math.random() * 1000);
    return `GRV${timestamp}${random}`?.slice(0, 15);
  };

  const handleSubmit = async (e) => {
    e?.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      await new Promise(resolve => setTimeout(resolve, 2000));

      const newGrievanceId = generateGrievanceId();
      setGrievanceId(newGrievanceId);
      setShowSuccessModal(true);

      setFormData({
        category: '',
        priority: 'medium',
        description: '',
        images: []
      });
      setErrors({});
    } catch (error) {
      console.error('Error submitting grievance:', error);
      alert('Failed to submit grievance. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCloseSuccessModal = () => {
    setShowSuccessModal(false);
    setGrievanceId('');
  };

  return (
    <div className="min-h-screen bg-background">
      <RoleBasedNavigation userRole="student" />
      <main className="main-content">
        <div className="content-container">
          <div className="max-w-5xl mx-auto">
            <div className="mb-6 md:mb-8">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Icon name="AlertCircle" size={24} color="var(--color-primary)" />
                </div>
                <div>
                  <h1 className="text-2xl md:text-3xl font-semibold text-foreground">
                    Submit Grievance
                  </h1>
                  <p className="text-sm text-muted-foreground caption mt-1">
                    Report hostel maintenance and facility issues
                  </p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
              <div className="lg:col-span-2">
                <form onSubmit={handleSubmit} className="space-y-6 md:space-y-8">
                  <div className="card ml-0 mt-0 pr-6 pt-6">
                    <div className="flex items-center gap-3 mb-6">
                      <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center">
                        <Icon name="FileText" size={20} color="var(--color-accent)" />
                      </div>
                      <h2 className="text-lg font-semibold text-foreground">
                        Grievance Details
                      </h2>
                    </div>

                    <div className="space-y-6">
                      <CategorySelector
                        value={formData?.category}
                        onChange={(value) => {
                          setFormData({ ...formData, category: value });
                          setErrors({ ...errors, category: '' });
                        }}
                        error={errors?.category}
                      />

                      <PrioritySelector
                        value={formData?.priority}
                        onChange={(value) => {
                          setFormData({ ...formData, priority: value });
                          setErrors({ ...errors, priority: '' });
                        }}
                      />

                      <DescriptionInput
                        value={formData?.description}
                        onChange={(value) => {
                          setFormData({ ...formData, description: value });
                          setErrors({ ...errors, description: '' });
                        }}
                        error={errors?.description}
                      />

                      <ImageUploader
                        images={formData?.images}
                        onChange={(images) => {
                          setFormData({ ...formData, images });
                        }}
                        error={errors?.images}
                      />
                    </div>
                  </div>

                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => {
                      setFormData({
                        category: '',
                        priority: 'medium',
                        description: '',
                        images: []
                      });
                      setErrors({});
                    }}
                    iconName="RotateCcw"
                    iconPosition="left"
                    className="sm:w-auto"
                  >
                    Reset Form
                  </Button>
                  <Button
                    type="submit"
                    variant="default"
                    loading={isSubmitting}
                    iconName="Send"
                    iconPosition="left"
                    fullWidth
                    className="sm:flex-1"
                  >
                    {isSubmitting ? 'Submitting...' : 'Submit Grievance'}
                  </Button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </main>
      <SuccessModal
        isOpen={showSuccessModal}
        grievanceId={grievanceId}
        onClose={handleCloseSuccessModal}
      />
    </div>
  );
};

export default SubmitGrievance;