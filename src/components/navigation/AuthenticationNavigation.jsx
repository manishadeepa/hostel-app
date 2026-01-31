import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Icon from '../AppIcon';

const AuthenticationNavigation = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const isActive = (path) => location?.pathname === path;

  const handleNavigation = (path) => {
    navigate(path);
  };

  return (
    <nav className="auth-navigation">
      <div className="auth-navigation-container">
        <div className="auth-navigation-content">
          <div className="auth-navigation-logo">
            <div className="auth-navigation-brand">
              <Icon name="Home" size={24} color="var(--color-primary)" />
            </div>
            <span className="auth-navigation-title">HostelApp</span>
          </div>

          <div className="auth-navigation-links">
            <button
              onClick={() => handleNavigation('/login')}
              className={`auth-navigation-link ${isActive('/login') ? 'active' : ''}`}
            >
              Login
            </button>
            <button
              onClick={() => handleNavigation('/student-registration')}
              className={`auth-navigation-link ${isActive('/student-registration') ? 'active' : ''}`}
            >
              Student Registration
            </button>
            <button
              onClick={() => handleNavigation('/warden-registration')}
              className={`auth-navigation-link ${isActive('/warden-registration') ? 'active' : ''}`}
            >
              Warden Registration
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default AuthenticationNavigation;