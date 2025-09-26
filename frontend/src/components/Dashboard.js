import React, { useState, useEffect } from 'react';
import { NavLink, useLocation, Outlet } from 'react-router-dom';
import './Dashboard.css';

const Dashboard = () => {
  const location = useLocation();
  const [feedbackOpen, setFeedbackOpen] = useState(false);

  // Keep Feedback menu open when you're already inside a feedback route
  useEffect(() => {
    if (location.pathname.startsWith('/feedback')) {
      setFeedbackOpen(true);
    } else {
      setFeedbackOpen(false);
    }
  }, [location.pathname]);

  return (
    <div className="dashboard">
      {/* Sidebar */}
      <div className="sidebar">
        <div className="logo-section">
          <img 
            src="/logo.png" 
            alt="SUMERU DIGITAL" 
            className="logo-image"
          />
        </div>
        
        <nav className="navigation">
          {/* Dashboard */}
          <NavLink 
            to="/dashboard" 
            className={({ isActive }) => (isActive && !feedbackOpen && !location.pathname.startsWith('/feedback')) ? "nav-item active" : "nav-item"}
            onClick={() => setFeedbackOpen(false)}
          >
            <div className="nav-icon">⊞</div>
            <span>Dashboard</span>
          </NavLink>

          {/* Insights */}
          <NavLink 
            to="/insights"
            className={({ isActive }) => (isActive && !feedbackOpen && !location.pathname.startsWith('/feedback')) ? "nav-item active" : "nav-item"}
            onClick={() => setFeedbackOpen(false)}
          >
            <div className="nav-icon">📈</div>
            <span>Insights</span>
          </NavLink>

          {/* Feedback (expandable) */}
          <div
            className={`nav-item ${
              (feedbackOpen || location.pathname.startsWith('/feedback')) ? 'active' : ''
            }`}
            onClick={() => setFeedbackOpen(!feedbackOpen)}
          >
            <div className="nav-icon">💬</div>
            <span>Feedback</span>
          </div>

          {feedbackOpen && (
            <div className="submenu">
              <NavLink 
                to="/feedback/send"
                className={({ isActive }) => isActive ? "submenu-item active-sub" : "submenu-item"}
              >
                📩 Send Feedback
              </NavLink>
              <NavLink 
                to="/feedback/receive"
                className={({ isActive }) => isActive ? "submenu-item active-sub" : "submenu-item"}
              >
                📥 Receive Feedback
              </NavLink>
            </div>
          )}

          {/* Members */}
          <NavLink 
            to="/members"
            className={({ isActive }) => (isActive && !feedbackOpen && !location.pathname.startsWith('/feedback')) ? "nav-item active" : "nav-item"}
            onClick={() => setFeedbackOpen(false)}
          >
            <div className="nav-icon">👥</div>
            <span>Members</span>
          </NavLink>

          {/* Appraisal */}
          <NavLink 
            to="/appraisal"
            className={({ isActive }) => (isActive && !feedbackOpen && !location.pathname.startsWith('/feedback')) ? "nav-item active" : "nav-item"}
            onClick={() => setFeedbackOpen(false)}
          >
            <div className="nav-icon">📄</div>
            <span>Appraisal</span>
          </NavLink>
        </nav>
      </div>

      {/* Main Content */}
      <div className="main-content">
        <Outlet />
      </div>
    </div>
  );
};

export default Dashboard;
