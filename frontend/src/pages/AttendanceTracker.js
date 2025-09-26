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
  const [selectedMonth, setSelectedMonth] = useState('');
  const [monthHistory, setMonthHistory] = useState([]);
  const [availableMonths, setAvailableMonths] = useState([]);

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
    
    // Load available months for history
    loadAvailableMonths();
    
    // Load historical data for History tab
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
      
      // Find the first check-in and last check-out for the day
      let firstCheckIn = null;
      let lastCheckOut = null;
      
      if (record.sessions && record.sessions.length > 0) {
        // Get first check-in
        const firstSession = record.sessions.find(session => session.checkIn);
        if (firstSession) {
          firstCheckIn = new Date(firstSession.checkIn);
        }
        
        // Get last check-out (only if it exists)
        const sessionsWithCheckOut = record.sessions.filter(session => session.checkOut);
        if (sessionsWithCheckOut.length > 0) {
          const lastSession = sessionsWithCheckOut[sessionsWithCheckOut.length - 1];
          lastCheckOut = new Date(lastSession.checkOut);
        }
      }
      
      return {
        date: recordDate.getDate().toString(),
        inTime: firstCheckIn ? 
          firstCheckIn.toLocaleTimeString('en-US', {
            hour: '2-digit',
            minute: '2-digit',
            hour12: true
          }) : '-',
        outTime: lastCheckOut ? 
          lastCheckOut.toLocaleTimeString('en-US', {
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

  const loadAvailableMonths = () => {
    const attendanceData = getAttendanceData();
    const months = new Set();
    
    attendanceData.forEach(record => {
      const recordDate = new Date(record.date);
      const monthKey = `${recordDate.getFullYear()}-${String(recordDate.getMonth() + 1).padStart(2, '0')}`;
      const monthName = recordDate.toLocaleString('default', { month: 'long', year: 'numeric' });
      months.add(JSON.stringify({ key: monthKey, name: monthName }));
    });
    
    const monthsArray = Array.from(months).map(month => JSON.parse(month));
    setAvailableMonths(monthsArray.sort((a, b) => b.key.localeCompare(a.key)));
  };

  const loadMonthHistory = (monthKey) => {
    const attendanceData = getAttendanceData();
    const [year, month] = monthKey.split('-');
    
    const monthData = attendanceData.filter(record => {
      const recordDate = new Date(record.date);
      return recordDate.getFullYear() == year && recordDate.getMonth() == (month - 1);
    });
    
    const formattedMonthHistory = monthData.map(record => {
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
      
      // Find the first check-in and last check-out for the day
      let firstCheckIn = null;
      let lastCheckOut = null;
      
      if (record.sessions && record.sessions.length > 0) {
        // Get first check-in
        const firstSession = record.sessions.find(session => session.checkIn);
        if (firstSession) {
          firstCheckIn = new Date(firstSession.checkIn);
        }
        
        // Get last check-out (only if it exists)
        const sessionsWithCheckOut = record.sessions.filter(session => session.checkOut);
        if (sessionsWithCheckOut.length > 0) {
          const lastSession = sessionsWithCheckOut[sessionsWithCheckOut.length - 1];
          lastCheckOut = new Date(lastSession.checkOut);
        }
      }
      
      return {
        date: recordDate.getDate().toString(),
        inTime: firstCheckIn ? 
          firstCheckIn.toLocaleTimeString('en-US', {
            hour: '2-digit',
            minute: '2-digit',
            hour12: true
          }) : '-',
        outTime: lastCheckOut ? 
          lastCheckOut.toLocaleTimeString('en-US', {
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
    
    setMonthHistory(formattedMonthHistory);
  };

  const handleMonthSelect = (monthKey) => {
    setSelectedMonth(monthKey);
    loadMonthHistory(monthKey);
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
        setIsCheckedOut(false);
        setCurrentStatus('checked-in');
        // Update session status immediately
        setSessionStatus({ status: 'checked-in', canCheckIn: false, canCheckOut: true });
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
        setIsCheckedIn(false);
        setCurrentStatus('ready');
        // Update session status immediately
        setSessionStatus({ status: 'ready', canCheckIn: true, canCheckOut: false });
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
            className={`tab ${activeTab === 'History' ? 'active' : ''}`}
            onClick={() => setActiveTab('History')}
          >
            History
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
              <h1>{activeTab === 'Today' ? 'Today\'s Sessions' : 'Attendance History'}</h1>
            </div>
            
            {activeTab === 'Today' ? (
              <div className="today-sessions">
                {todaySessions.length > 0 ? (
                  <div className="sessions-list">
                    {todaySessions.map((session, index) => (
                      <div key={session.sessionId} className="session-item">
                        <div className="session-number">Session {index + 1}</div>
                        <div className="session-date">
                          <span className="label">Date:</span>
                          <span className="time">{new Date().toLocaleDateString('en-GB')}</span>
                        </div>
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
              <div className="history-content">
                <div className="month-selector">
                  <h3>Select Month:</h3>
                  <div className="month-buttons">
                    {availableMonths.map((month) => (
                      <button
                        key={month.key}
                        className={`month-btn ${selectedMonth === month.key ? 'active' : ''}`}
                        onClick={() => handleMonthSelect(month.key)}
                      >
                        {month.name}
                      </button>
                    ))}
                  </div>
                </div>
                
                {selectedMonth && (
                  <div className="month-history">
                    <h3>Attendance for {availableMonths.find(m => m.key === selectedMonth)?.name}</h3>
                    {monthHistory.length > 0 ? (
                      <div className="history-table">
                        <table>
                          <thead>
                            <tr>
                              <th>Date</th>
                              <th>Check In</th>
                              <th>Check Out</th>
                              <th>Duration</th>
                              <th>Status</th>
                            </tr>
                          </thead>
                          <tbody>
                            {monthHistory.map((record, index) => (
                              <tr key={index}>
                                <td>{record.date}</td>
                                <td>{record.inTime}</td>
                                <td>{record.outTime}</td>
                                <td>{record.duration}</td>
                                <td style={{ color: record.status === 'Present' ? '#28a745' : '#dc3545' }}>
                                  {record.status}
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    ) : (
                      <div className="no-data">
                        <p>No attendance data found for this month</p>
                      </div>
                    )}
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
