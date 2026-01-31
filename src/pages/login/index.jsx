import React from 'react';
import { Helmet } from 'react-helmet';
import AuthenticationNavigation from '../../components/navigation/AuthenticationNavigation';
import LoginForm from './components/LoginForm';
import SecurityBadges from './components/SecurityBadges';
import QuickLinks from './components/QuickLinks';
import WelcomeSection from './components/WelcomeSection';

const Login = () => {
  return (
    <>
      <Helmet>
        <title>Login - HostelApp | Secure Hostel Management System</title>
        <meta name="description" content="Sign in to HostelApp with your College ID or Staff ID to access hostel management features including attendance marking, grievance submission, and facility feedback." />
      </Helmet>
      <AuthenticationNavigation />
      <div className="min-h-screen bg-background">
        <div className="max-w-screen-2xl mx-auto px-4 md:px-6 lg:px-8 py-8 md:py-12 lg:py-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            <div className="hidden lg:block">
              <WelcomeSection />
            </div>

            <div className="w-full max-w-md mx-auto lg:max-w-lg">
              <div className="bg-card rounded-2xl shadow-elevation-lg border border-border p-6 md:p-8 lg:p-10">
                <div className="text-center mb-6 md:mb-8">
                  <div className="inline-flex items-center justify-center w-14 h-14 md:w-16 md:h-16 rounded-xl bg-primary/10 mb-4">
                    <div className="w-8 h-8 md:w-10 md:h-10 rounded-lg bg-primary flex items-center justify-center">
                      <span className="text-primary-foreground font-bold text-lg md:text-xl">H</span>
                    </div>
                  </div>
                  <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-2">
                    Sign In
                  </h2>
                  <p className="text-sm md:text-base text-muted-foreground">
                    Access your hostel management account
                  </p>
                </div>

                <LoginForm />

                <div className="mt-6 md:mt-8">
                  <QuickLinks />
                </div>

                <div className="mt-6 md:mt-8 pt-6 md:pt-8 border-t border-border">
                  <SecurityBadges />
                </div>
              </div>

              <div className="lg:hidden mt-8">
                <WelcomeSection />
              </div>
            </div>
          </div>
        </div>

        <footer className="border-t border-border bg-card mt-12 md:mt-16 lg:mt-20">
          <div className="max-w-screen-2xl mx-auto px-4 md:px-6 lg:px-8 py-6 md:py-8">
            <div className="text-center text-xs md:text-sm text-muted-foreground">
              <p>&copy; {new Date()?.getFullYear()} HostelApp. All rights reserved.</p>
              <p className="mt-2">Secure hostel management for educational institutions</p>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
};

export default Login;