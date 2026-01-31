import React from 'react';
import AuthenticationNavigation from '../../components/navigation/AuthenticationNavigation';
import RegistrationHeader from './components/RegistrationHeader';
import RegistrationForm from './components/RegistrationForm';
import RegistrationBenefits from './components/RegistrationBenefits';

const StudentRegistration = () => {
  return (
    <div className="min-h-screen bg-background">
      <AuthenticationNavigation />
      
      <div className="max-w-screen-2xl mx-auto px-4 md:px-6 lg:px-8 py-6 md:py-8 lg:py-12">
        <div className="max-w-6xl mx-auto">
          <RegistrationHeader />
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8 lg:gap-10">
            <div className="lg:col-span-2">
              <div className="bg-card rounded-xl shadow-elevation-md p-4 md:p-6 lg:p-8">
                <RegistrationForm />
              </div>
            </div>
            
            <div className="lg:col-span-1">
              <div className="sticky top-24">
                <RegistrationBenefits />
                
                <div className="mt-4 md:mt-6 bg-primary/5 border border-primary/20 rounded-xl p-4 md:p-6">
                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-8 h-8 md:w-10 md:h-10 rounded-full bg-primary/10 flex items-center justify-center">
                      <span className="text-lg md:text-xl">ℹ️</span>
                    </div>
                    <div>
                      <h3 className="text-sm md:text-base font-medium text-foreground mb-2">
                        Important Information
                      </h3>
                      <ul className="text-xs md:text-sm text-muted-foreground space-y-2">
                        <li className="flex items-start gap-2">
                          <span className="text-primary mt-1">•</span>
                          <span>Use your official college ID for registration</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-primary mt-1">•</span>
                          <span>Ensure room and block details are accurate</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-primary mt-1">•</span>
                          <span>Keep your phone number active for notifications</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-primary mt-1">•</span>
                          <span>Create a strong password for account security</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentRegistration;