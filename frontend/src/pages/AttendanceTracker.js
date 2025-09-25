import React, { useState, useEffect } from 'react';
import './AttendanceTracker.css';
import { 
  recordCheckIn, 
  recordCheckOut, 
  getAttendanceData, 
  getCurrentSessionStatus,
  getTotalHoursWorkedToday,
  getTodaySessions,
  getYesterdayAttendance
} from '../utils/attendanceUtils';

const AttendanceTracker = () => {
  const [activeTab, setActiveTab] = useState('Today');
  const [checkInTime, setCheckInTime] = useState('');
  const [checkOutTime, setCheckOutTime] = useState('');
  const [isCheckedIn, setIsCheckedIn] = useState(false);
  const [isCheckedOut, setIsCheckedOut] = useState(false);
  const [currentStatus, setCurrentStatus] = useState('ready');
  const [attendanceHistory, setAttendanceHistory] = useState([]);
  const [todayAttendance, setTodayAttendance] = useState(null);
  const [todaySessions, setTodaySessions] = useState([]);
  const [totalHoursToday, setTotalHoursToday] = useState(0);
  const [yesterdayData, setYesterdayData] = useState(null);
  const [sessionStatus, setSessionStatus] = useState({ status: 'ready', canCheckIn: true, canCheckOut: false });

  // Load attendance data on component mount
  useEffect(() => {
    loadAttendanceData();
  }, []);

  const loadAttendanceData = () => {
    // Get current session status
    const currentStatus = getCurrentSessionStatus();
    setSessionStatus(currentStatus);
    
    // Get today's sessions
    const sessions = getTodaySessions();
    setTodaySessions(sessions);
    
    // Get total hours worked today
    const totalHours = getTotalHoursWorkedToday();
    setTotalHoursToday(totalHours);
    
    // Get yesterday's data
    const yesterday = getYesterdayAttendance();
    setYesterdayData(yesterday);
    
    // Set latest check-in/check-out times for display
    if (sessions.length > 0) {
      const latestSession = sessions[sessions.length - 1];
      setCheckInTime(latestSession.checkIn || '');
      setCheckOutTime(latestSession.checkOut || '');
    }
    
    // Load historical data for Previous tab
    const attendanceData = getAttendanceData();
    const formattedHistory = attendanceData.map(record => {
      const recordDate = new Date(record.date);
      
      // Calculate total hours for the day
      let totalDayHours = 0;
      if (record.sessions) {
        record.sessions.forEach(session => {
          if (session.checkIn && session.checkOut) {
            const checkIn = new Date(session.checkIn);
            const checkOut = new Date(session.checkOut);
            const diffMs = checkOut - checkIn;
            const diffHours = diffMs / (1000 * 60 * 60);
            totalDayHours += diffHours;
          }
        });
      }
      
      return {
        date: recordDate.getDate().toString(),
        inTime: record.sessions && record.sessions.length > 0 ? 
          new Date(record.sessions[0].checkIn).toLocaleTimeString('en-US', {
            hour: '2-digit',
            minute: '2-digit',
            hour12: true
          }) : '-',
        outTime: record.sessions && record.sessions.length > 0 ? 
          new Date(record.sessions[record.sessions.length - 1].checkOut).toLocaleTimeString('en-US', {
            hour: '2-digit',
            minute: '2-digit',
            hour12: true
          }) : '-',
        duration: `${Math.round(totalDayHours * 100) / 100}hr`,
        status: record.status || 'Present',
        fullDate: record.date,
        sessions: record.sessions || []
      };
    });
    
    setAttendanceHistory(formattedHistory);
  };

  const handleCheckIn = () => {
    if (sessionStatus.canCheckIn) {
      const now = new Date();
      const timeString = now.toLocaleTimeString('en-US', { 
        hour: '2-digit', 
        minute: '2-digit',
        hour12: true 
      });
      
      // Record check-in in attendance system
      const result = recordCheckIn();
      if (result.success) {
        setCheckInTime(timeString);
        setIsCheckedIn(true);
        setCurrentStatus('checked-in');
        alert('Check-in recorded successfully!');
        // Reload attendance data to update the display
        loadAttendanceData();
      } else {
        alert('Unable to record check-in!');
      }
    }
  };

  const handleCheckOut = () => {
    if (sessionStatus.canCheckOut) {
      const now = new Date();
      const timeString = now.toLocaleTimeString('en-US', { 
        hour: '2-digit', 
        minute: '2-digit',
        hour12: true 
      });
      
      // Record check-out in attendance system
      const result = recordCheckOut();
      if (result.success) {
        setCheckOutTime(timeString);
        setIsCheckedOut(true);
        setCurrentStatus('ready');
        alert('Check-out recorded successfully!');
        // Reload attendance data to update the display
        loadAttendanceData();
      } else {
        alert(result.message || 'Unable to record check-out!');
      }
    }
  };

  // ✅ Color logic based on duration and check-in time
  const getStatusColor = (status, duration, inTime) => {
    const hours = parseInt(duration);   // extract number from "9hr"
    const checkIn = inTime && inTime !== '-' ? inTime.trim() : null;

    // If Absent → red
    if (status === 'Absent' || hours === 0) return '#dc3545';

    // Determine if late check-in (later than 09:00 AM)
    let isLate = false;
    if (checkIn) {
      const [time, modifier] = checkIn.split(' '); // "09:35", "AM"
      let [hh, mm] = time.split(':');
      hh = parseInt(hh, 10);
      mm = parseInt(mm, 10);

      if (modifier === 'PM' && hh !== 12) hh += 12;
      if (modifier === 'AM' && hh === 12) hh = 0;

      // check if later than 9:00 AM
      if (hh > 9 || (hh === 9 && mm > 0)) {
        isLate = true;
      }
    }

    // Duration < 9 hr OR late check-in → yellow
    if (hours < 9 || isLate) return '#ffc107';

    // Otherwise duration ≥ 9 hr and check-in at exactly 09:00 AM → green
    return '#28a745';
  };

  return (
    <div className="app-container">
      <div className="main-content">
        <div className="attendance-header">
          <h1>Attendance Tracker</h1>
        </div>
        
        <div className="attendance-tabs">
          <button 
            className={`tab ${activeTab === 'Today' ? 'active' : ''}`}
            onClick={() => setActiveTab('Today')}
          >
            Today
          </button>
          <button 
            className={`tab ${activeTab === 'Previous' ? 'active' : ''}`}
            onClick={() => setActiveTab('Previous')}
          >
            Previous
          </button>
          
        </div>

        <div className="attendance-content">
          <div className="daily-status-panel">
            <div className="clock-section">
              <h1 className="attendance-name">Your Daily Status</h1>
              <div className="clock-icon">🕐</div>
            </div>
            
            <div className="check-status">
              <div className="check-in-status">
                <div className="status-dot green"></div>
                <div className="status-text">Check In</div>
                <div className="status-time">{checkInTime || 'Not checked in'}</div>
                <div className="status-date">{new Date().toLocaleDateString('en-GB')}</div>
              </div>
              
              <div className="check-out-status">
                <div className="status-dot red"></div>
                <div className="status-text">Check Out</div>
                <div className="status-time">{checkOutTime || 'Not checked out'}</div>
                <div className="status-date">{new Date().toLocaleDateString('en-GB')}</div>
              </div>
            </div>
            
            <div className="action-buttons">
              <button 
                className={`check-in-btn ${sessionStatus.canCheckIn ? 'active' : 'disabled'}`}
                onClick={handleCheckIn}
                disabled={!sessionStatus.canCheckIn}
              >
                CHECK IN
              </button>
              <button 
                className={`check-out-btn ${sessionStatus.canCheckOut ? 'active' : 'disabled'}`}
                onClick={handleCheckOut}
                disabled={!sessionStatus.canCheckOut}
              >
                CHECK OUT
              </button>
            </div>
            
            <div className="total-hours">
              <h4>Total Hours Today: {totalHoursToday}hr</h4>
            </div>
            
            <div className="request-correction">
              <a href="#request">Request Correction</a>
            </div>
          </div>

          <div className="attendance-history-panel">
            <div className="history-header">
              <h1>{activeTab === 'Today' ? 'Today\'s Sessions' : 'Yesterday\'s History'}</h1>
            </div>
            
            {activeTab === 'Today' ? (
              <div className="today-sessions">
                {todaySessions.length > 0 ? (
                  <div className="sessions-list">
                    {todaySessions.map((session, index) => (
                      <div key={session.sessionId} className="session-item">
                        <div className="session-number">Session {index + 1}</div>
                        <div className="session-times">
                          <div className="session-checkin">
                            <span className="label">Check In:</span>
                            <span className="time">{session.checkIn || 'Not checked in'}</span>
                          </div>
                          <div className="session-checkout">
                            <span className="label">Check Out:</span>
                            <span className="time">{session.checkOut || 'Not checked out'}</span>
                          </div>
                          {session.duration > 0 && (
                            <div className="session-duration">
                              <span className="label">Duration:</span>
                              <span className="time">{session.duration}hr</span>
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="no-sessions">
                    <p>No sessions recorded today</p>
                  </div>
                )}
              </div>
            ) : (
              <div className="yesterday-history">
                {yesterdayData ? (
                  <div className="yesterday-info">
                    <div className="yesterday-summary">
                      <h3>Yesterday's Summary</h3>
                      <p><strong>Total Hours:</strong> {yesterdayData.totalHours}hr</p>
                      <p><strong>Status:</strong> {yesterdayData.status}</p>
                    </div>
                    <div className="yesterday-sessions">
                      <h4>Sessions:</h4>
                      {yesterdayData.sessions.map((session, index) => (
                        <div key={session.sessionId} className="session-item">
                          <div className="session-number">Session {index + 1}</div>
                          <div className="session-times">
                            <div className="session-checkin">
                              <span className="label">Check In:</span>
                              <span className="time">
                                {new Date(session.checkIn).toLocaleTimeString('en-US', {
                                  hour: '2-digit',
                                  minute: '2-digit',
                                  hour12: true
                                })}
                              </span>
                            </div>
                            <div className="session-checkout">
                              <span className="label">Check Out:</span>
                              <span className="time">
                                {session.checkOut ? new Date(session.checkOut).toLocaleTimeString('en-US', {
                                  hour: '2-digit',
                                  minute: '2-digit',
                                  hour12: true
                                }) : 'Not checked out'}
                              </span>
                            </div>
                            {session.checkIn && session.checkOut && (
                              <div className="session-duration">
                                <span className="label">Duration:</span>
                                <span className="time">
                                  {Math.round(((new Date(session.checkOut) - new Date(session.checkIn)) / (1000 * 60 * 60)) * 100) / 100}hr
                                </span>
                              </div>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div className="no-yesterday-data">
                    <p>No attendance data for yesterday</p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AttendanceTracker;
