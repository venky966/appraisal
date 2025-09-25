import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './DashboardPage.css';
import AppraisalProgress from '../components/AppraisalProgress';
import { getInsightsAppraisalProgress } from '../utils/insightsData';

const DashboardPage = () => {
  const navigate = useNavigate();
  const [timeOffDays, setTimeOffDays] = useState([]);
  const [isTimeOffToday, setIsTimeOffToday] = useState(false);
  const [timeOffMessage, setTimeOffMessage] = useState('');
  const [appraisalProgress, setAppraisalProgress] = useState(71);

  const handleRequestLeave = () => {
    navigate('/request-leave');
  };

  // Load time off days from localStorage on component mount
  useEffect(() => {
    const savedTimeOffDays = localStorage.getItem('timeOffDays');
    if (savedTimeOffDays) {
      const parsedDays = JSON.parse(savedTimeOffDays);
      setTimeOffDays(parsedDays);
      
      // Check if today is a time off day
      const today = new Date().toDateString();
      const isTodayTimeOff = parsedDays.some(day => day.date === today);
      setIsTimeOffToday(isTodayTimeOff);
    }
  }, []);

  // Read appraisal progress from Insights page structure
  useEffect(() => {
    // Get the same percentage that Insights page shows
    const insightsProgress = getInsightsAppraisalProgress();
    setAppraisalProgress(insightsProgress);
  }, []);

  // Keep appraisal progress at 71% to match Insights page
  // This should be the same percentage shown in the Insights page

  const handleTimeOff = () => {
    const today = new Date();
    const todayString = today.toDateString();
    const timeOffRecord = {
      date: todayString,
      timestamp: today.toISOString(),
      type: 'Time Off',
      status: 'Active'
    };

    // Check if today is already marked as time off
    const isAlreadyTimeOff = timeOffDays.some(day => day.date === todayString);
    
    if (isAlreadyTimeOff) {
      setTimeOffMessage('You have already marked today as Time Off!');
      setTimeout(() => setTimeOffMessage(''), 3000);
      return;
    }

    // Add to time off days
    const updatedTimeOffDays = [...timeOffDays, timeOffRecord];
    setTimeOffDays(updatedTimeOffDays);
    setIsTimeOffToday(true);
    
    // Save to localStorage (simulating database)
    localStorage.setItem('timeOffDays', JSON.stringify(updatedTimeOffDays));
    
    setTimeOffMessage('Time Off marked for today! You cannot check in/out today.');
    setTimeout(() => setTimeOffMessage(''), 3000);
  };

  const handleAppraisal = () => {
    navigate('/appraisal');
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
        <h1>Good Morning, XYZ!</h1>
        <div className="header-actions">
          <div className="notification-icon">🔔</div>
          <div className="profile-placeholder"></div>
        </div>
      </div>

      {/* Employee Overview and Top Performer */}
      <div className="top-section">
        <div className="employee-overview-card">
          <div className="employee-photo-placeholder"></div>
          <div className="employee-stats">
            <div className="stat-item">
              <span className="stat-label">Total office days</span>
              <span className="stat-value">26</span>
            </div>
            <div className="stat-item">
              <span className="stat-label">Attended days</span>
              <span className="stat-value">21</span>
            </div>
            <div className="stat-item">
              <span className="stat-label">Unscheduled Absence</span>
              <span className="stat-value">05</span>
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
              <span className="leave-count">01</span>
              <span className="leave-label">Sick Leave</span>
            </div>
            <div className="leave-type">
              <span className="leave-count">03</span>
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
              className={`leave-btn secondary ${isTimeOffToday ? 'time-off-active' : ''}`} 
              onClick={handleTimeOff}
              disabled={isTimeOffToday}
            >
              {isTimeOffToday ? 'Time OFF (Active)' : 'Time OFF'}
            </button>
          </div>
          {timeOffMessage && (
            <div className="time-off-message">
              {timeOffMessage}
            </div>
          )}
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
    </div>
  );
};

export default DashboardPage;
