import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './DashboardPage.css';
import AppraisalProgress from '../components/AppraisalProgress';
import TimeOffPopup from '../components/TimeOffPopup';
import ProfileDropdown from '../components/ProfileDropdown';
import { getInsightsAppraisalProgress } from '../utils/insightsData';
import { 
  getTotalWorkingDaysInMonth, 
  getAttendedDaysInCurrentMonth, 
  getLeaveDaysInCurrentMonth, 
  getUnscheduledAbsence,
  getCurrentMonthName,
  getCurrentYear
} from '../utils/attendanceUtils';

const DashboardPage = () => {
  const navigate = useNavigate();
  const [appraisalProgress, setAppraisalProgress] = useState(71);
  const [showTimeOffPopup, setShowTimeOffPopup] = useState(false);
  const [leaveRequests, setLeaveRequests] = useState([]);
  const [attendanceStats, setAttendanceStats] = useState({
    totalWorkingDays: 0,
    attendedDays: 0,
    unscheduledAbsence: 0
  });
  const [profileData, setProfileData] = useState({});

  const handleRequestLeave = () => {
    navigate('/request-leave');
  };

  // Read appraisal progress from Insights page structure
  useEffect(() => {
    // Get the same percentage that Insights page shows
    const insightsProgress = getInsightsAppraisalProgress();
    setAppraisalProgress(insightsProgress);
  }, []);

  // Load leave requests from localStorage
  useEffect(() => {
    const savedRequests = JSON.parse(localStorage.getItem('leaveRequests') || '[]');
    setLeaveRequests(savedRequests);
  }, []);

  // Load profile data
  useEffect(() => {
    const savedProfile = JSON.parse(localStorage.getItem('employeeProfile') || '{}');
    setProfileData(savedProfile);
  }, []);

  // Calculate attendance statistics
  useEffect(() => {
    const totalWorkingDays = getTotalWorkingDaysInMonth();
    const attendedDays = getAttendedDaysInCurrentMonth();
    const unscheduledAbsence = getUnscheduledAbsence();
    
    setAttendanceStats({
      totalWorkingDays,
      attendedDays,
      unscheduledAbsence
    });
  }, []);

  // Listen for new leave requests and attendance changes
  useEffect(() => {
    const handleStorageChange = () => {
      const savedRequests = JSON.parse(localStorage.getItem('leaveRequests') || '[]');
      setLeaveRequests(savedRequests);
      
      // Recalculate attendance stats
      const totalWorkingDays = getTotalWorkingDaysInMonth();
      const attendedDays = getAttendedDaysInCurrentMonth();
      const unscheduledAbsence = getUnscheduledAbsence();
      
      setAttendanceStats({
        totalWorkingDays,
        attendedDays,
        unscheduledAbsence
      });
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  // Keep appraisal progress at 71% to match Insights page
  // This should be the same percentage shown in the Insights page

  const handleTimeOff = () => {
    setShowTimeOffPopup(true);
  };

  const handleCloseTimeOffPopup = () => {
    setShowTimeOffPopup(false);
    // Refresh leave requests when popup closes
    const savedRequests = JSON.parse(localStorage.getItem('leaveRequests') || '[]');
    setLeaveRequests(savedRequests);
  };

  const handleAppraisal = () => {

  };


  const handleLeaveHistory = () => {
    navigate('/leave-history');
  };

  const handleAttendance = () => {
    navigate('/attendance-tracker');
  };

  return (
    <div className="dashboard-page">
      {/* Header */}
      <div className="header">
        <h1>Good Morning, {profileData.name || 'XYZ'}</h1>
        <div className="header-actions">
          <div className="notification-icon">🔔</div>
          <ProfileDropdown />
        </div>
      </div>

      {/* Employee Overview and Top Performer */}
      <div className="top-section">
        <div className="employee-overview-card">
          <div className="employee-photo-placeholder">
            {profileData.profileImage ? (
              <img 
                src={profileData.profileImage} 
                alt="Profile" 
                className="employee-profile-image"
              />
            ) : (
              <div className="employee-initial">
                {profileData.name ? profileData.name.charAt(0) : 'A'}
              </div>
            )}
          </div>
          <div className="employee-stats">
            <div className="stat-item">
              <span className="stat-label">Total office days ({getCurrentMonthName()})</span>
              <span className="stat-value">{attendanceStats.totalWorkingDays}</span>
            </div>
            <div className="stat-item">
              <span className="stat-label">Attended days</span>
              <span className="stat-value">{attendanceStats.attendedDays}</span>
            </div>
            <div className="stat-item">
              <span className="stat-label">Unscheduled Absence</span>
              <span className="stat-value">{attendanceStats.unscheduledAbsence}</span>
            </div>
          </div>
        </div>

        <div className="top-performer-card">
          <div className="performer-content">
            <h2 className="performer-title">Top Performer of the Month</h2>
            <div className="performer-info">
              <div className="performer-badge">ABC</div>
              <div className="performer-role">Junior Web Developer</div>
            </div>
          </div>
          <div className="performer-photo-placeholder"></div>
        </div>
      </div>

      {/* Leave Summary and Appraisal */}
      <div className="middle-section">
        <div className="leave-summary-card">
          <h3>Leave Summary</h3>
          <div className="leave-types">
            <div className="leave-type">
              <span className="leave-count">05</span>
              <span className="leave-label">Annual Leave</span>
            </div>
            <div className="leave-type">
              <span className="leave-count">
                {leaveRequests.filter(req => req.type === 'sick' && req.status === 'Approved').length}
              </span>
              <span className="leave-label">Sick Leave</span>
            </div>
            <div className="leave-type">
              <span className="leave-count">
                {leaveRequests.filter(req => req.type === 'casual' && req.status === 'Approved').length}
              </span>
              <span className="leave-label">Casual Leave</span>
            </div>
            <div className="leave-type">
              <span className="leave-count">01</span>
              <span className="leave-label">Compof</span>
            </div>
          </div>
          <div className="leave-buttons">
            <button className="leave-btn primary" onClick={handleRequestLeave}>Request Leave</button>
            <button 
              className="leave-btn secondary" 
              onClick={handleTimeOff}
            >
              Time OFF
            </button>
          </div>
        </div>

        <div className="appraisal-card" onClick={handleAppraisal} style={{cursor: 'pointer'}}>
          <AppraisalProgress percentage={appraisalProgress} />
        </div>
      </div>

      {/* Bottom Section */}
      <div className="bottom-section">
        <div className="announcement-card">
          <h3>Company Announcement</h3>
          <div className="announcement-fields">
            <div className="field">
              <span className="field-label">Title:</span>
            </div>
            <div className="field">
              <span className="field-label">Date:</span>
            </div>
            <div className="field">
              <span className="field-label">Description:</span>
            </div>
            <div className="field">
              <span className="field-label">From:</span>
            </div>
          </div>
        </div>

        <div className="quick-access-section">
          <div className="quick-access-cards">
            <div className="quick-access-card" onClick={handleLeaveHistory} style={{cursor: 'pointer'}}>
              <div className="card-placeholder"></div>
              <span className="card-label">Leave history</span>
            </div>
            <div className="quick-access-card" onClick={handleAttendance} style={{cursor: 'pointer'}}>
              <div className="card-placeholder"></div>
              <span className="card-label">Attendance</span>
            </div>
          </div>
          
          {/* Thought for the Day Section */}
          <div className="thought-section">
            <div className="thought-card">
              <h3>Thought for the Day</h3>
              <div className="thought-input-container">
                <div className="thought-input">
                  <div className="input-icon"></div>
                  <input 
                    type="text" 
                    placeholder="Write a Message" 
                    className="thought-input-field"
                  />
                </div>
                <div className="thought-buttons">
                  <button className="upload-btn">Upload</button>
                  <button className="cancel-btn">Cancel</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <TimeOffPopup 
        isOpen={showTimeOffPopup} 
        onClose={handleCloseTimeOffPopup} 
      />
    </div>
  );
};

export default DashboardPage;
