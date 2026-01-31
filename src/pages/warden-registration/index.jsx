import React from 'react';
import AuthenticationNavigation from '../../components/navigation/AuthenticationNavigation';
import RegistrationForm from './components/RegistrationForm';
import SecurityFeatures from './components/SecurityFeatures';
import ResponsibilitiesOverview from './components/ResponsibilitiesOverview';
import Icon from '../../components/AppIcon';

const WardenRegistration = () => {
  return (
    <div className="min-h-screen bg-background">
      <AuthenticationNavigation />
      <div className="max-w-screen-2xl mx-auto px-4 md:px-6 lg:px-8 py-6 md:py-8 lg:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8 lg:gap-10">
          <div className="space-y-6 md:space-y-8">
            <div className="bg-gradient-to-br from-primary/10 via-secondary/5 to-accent/5 rounded-xl p-6 md:p-8 border border-primary/20">
              <div className="flex items-start gap-4 mb-6">
                <div className="w-12 h-12 md:w-14 md:h-14 bg-primary rounded-xl flex items-center justify-center flex-shrink-0">
                  <Icon name="Building2" size={28} color="white" />
                </div>
                <div>
                  <h2 className="text-xl md:text-2xl font-semibold text-foreground mb-2">
                    Welcome to HostelApp
                  </h2>
                  <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
                    Join our administrative team to streamline hostel operations and enhance student living experience through efficient management systems.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="bg-card rounded-lg p-4 text-center">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Icon name="Users" size={24} color="var(--color-primary)" />
                  </div>
                  <p className="text-2xl md:text-3xl font-semibold text-foreground mb-1">500+</p>
                  <p className="text-xs md:text-sm text-muted-foreground">Students Managed</p>
                </div>
                <div className="bg-card rounded-lg p-4 text-center">
                  <div className="w-12 h-12 bg-secondary/10 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Icon name="Building" size={24} color="var(--color-secondary)" />
                  </div>
                  <p className="text-2xl md:text-3xl font-semibold text-foreground mb-1">5</p>
                  <p className="text-xs md:text-sm text-muted-foreground">Hostel Blocks</p>
                </div>
                <div className="bg-card rounded-lg p-4 text-center">
                  <div className="w-12 h-12 bg-success/10 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Icon name="CheckCircle" size={24} color="var(--color-success)" />
                  </div>
                  <p className="text-2xl md:text-3xl font-semibold text-foreground mb-1">95%</p>
                  <p className="text-xs md:text-sm text-muted-foreground">Resolution Rate</p>
                </div>
              </div>
            </div>

            <div className="hidden lg:block">
              <SecurityFeatures />
            </div>

            <div className="hidden lg:block">
              <ResponsibilitiesOverview />
            </div>
          </div>

          <div className="space-y-6 md:space-y-8">
            <RegistrationForm />

            <div className="lg:hidden">
              <SecurityFeatures />
            </div>

            <div className="lg:hidden">
              <ResponsibilitiesOverview />
            </div>
          </div>
        </div>

        <div className="mt-8 md:mt-10 lg:mt-12 bg-card rounded-xl shadow-elevation-md p-6 md:p-8">
          <div className="text-center mb-6">
            <h2 className="text-xl md:text-2xl font-semibold text-foreground mb-2">
              Need Assistance?
            </h2>
            <p className="text-sm md:text-base text-muted-foreground">
              Contact our support team for registration help or technical issues
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
            <div className="flex items-center gap-4 p-4 bg-muted/30 rounded-lg">
              <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                <Icon name="Mail" size={20} color="var(--color-primary)" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs text-muted-foreground mb-1">Email Support</p>
                <p className="text-sm font-medium text-foreground truncate">admin@hostelapp.edu</p>
              </div>
            </div>

            <div className="flex items-center gap-4 p-4 bg-muted/30 rounded-lg">
              <div className="w-10 h-10 bg-secondary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                <Icon name="Phone" size={20} color="var(--color-secondary)" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs text-muted-foreground mb-1">Phone Support</p>
                <p className="text-sm font-medium text-foreground">+91 9876543210</p>
              </div>
            </div>

            <div className="flex items-center gap-4 p-4 bg-muted/30 rounded-lg">
              <div className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center flex-shrink-0">
                <Icon name="Clock" size={20} color="var(--color-accent)" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs text-muted-foreground mb-1">Working Hours</p>
                <p className="text-sm font-medium text-foreground">Mon-Sat, 9AM-6PM</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <footer className="bg-card border-t border-border mt-8 md:mt-12">
        <div className="max-w-screen-2xl mx-auto px-4 md:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm text-muted-foreground text-center md:text-left">
              &copy; {new Date()?.getFullYear()} HostelApp. All rights reserved.
            </p>
            <div className="flex items-center gap-6">
              <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-smooth">
                Privacy Policy
              </a>
              <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-smooth">
                Terms of Service
              </a>
              <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-smooth">
                Help Center
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default WardenRegistration;