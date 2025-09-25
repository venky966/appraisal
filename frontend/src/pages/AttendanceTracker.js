import React, { useState, useEffect } from 'react';
import './AttendanceTracker.css';
import { isTimeOffToday, canCheckInOut } from '../utils/timeOffUtils';

const AttendanceTracker = () => {
  const [activeTab, setActiveTab] = useState('Today');
  const [checkInTime, setCheckInTime] = useState('07:30 AM');
  const [checkOutTime, setCheckOutTime] = useState('07:00 PM');
  const [isCheckedIn, setIsCheckedIn] = useState(false);
  const [isCheckedOut, setIsCheckedOut] = useState(false);
  const [currentStatus, setCurrentStatus] = useState('ready');
  const [isTimeOff, setIsTimeOff] = useState(false);
  const [timeOffMessage, setTimeOffMessage] = useState('');

  // Check time off status on component mount
  useEffect(() => {
    const timeOffStatus = isTimeOffToday();
    setIsTimeOff(timeOffStatus);
    if (timeOffStatus) {
      setTimeOffMessage('You are on Time Off today. Check-in/Check-out is not available.');
    }
  }, []);

  const attendanceData = [
    { date: '1', inTime: '09:00 AM', outTime: '06:00 PM', duration: '9hr', status: 'Present' },
    { date: '2', inTime: '09:35 AM', outTime: '05:30 PM', duration: '8hr', status: 'Present' },
    { date: '12', inTime: '09:01 AM', outTime: '07:00 PM', duration: '10hr', status: 'Present' },
    { date: '13', inTime: '-', outTime: '-', duration: '0hr', status: 'Absent' },
    { date: 'Today', inTime: '09:00 AM', outTime: '07:00 PM', duration: '9hr', status: 'Present' }
  ];

  const handleCheckIn = () => {
    if (!canCheckInOut()) {
      setTimeOffMessage('Cannot check in - you are on Time Off today!');
      setTimeout(() => setTimeOffMessage(''), 3000);
      return;
    }
    
    if (currentStatus === 'ready') {
      const now = new Date();
      const timeString = now.toLocaleTimeString('en-US', { 
        hour: '2-digit', 
        minute: '2-digit',
        hour12: true 
      });
      setCheckInTime(timeString);
      setIsCheckedIn(true);
      setIsCheckedOut(false);
      setCurrentStatus('checked-in');
    }
  };

  const handleCheckOut = () => {
    if (!canCheckInOut()) {
      setTimeOffMessage('Cannot check out - you are on Time Off today!');
      setTimeout(() => setTimeOffMessage(''), 3000);
      return;
    }
    
    if (currentStatus === 'checked-in') {
      const now = new Date();
      const timeString = now.toLocaleTimeString('en-US', { 
        hour: '2-digit', 
        minute: '2-digit',
        hour12: true 
      });
      setCheckOutTime(timeString);
      setIsCheckedOut(true);
      setIsCheckedIn(false);
      setCurrentStatus('checked-out');
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
                <div className="status-time">{checkInTime}</div>
                <div className="status-date">20-09-2025</div>
              </div>
              
              <div className="check-out-status">
                <div className="status-dot red"></div>
                <div className="status-text">Check Out</div>
                <div className="status-time">{checkOutTime}</div>
                <div className="status-date">20-09-2025</div>
              </div>
            </div>
            
            <div className="action-buttons">
              <button 
                className={`check-in-btn ${currentStatus === 'ready' && !isTimeOff ? 'active' : 'disabled'}`}
                onClick={handleCheckIn}
                disabled={currentStatus !== 'ready' || isTimeOff}
              >
                Check In
              </button>
              <button 
                className={`check-out-btn ${currentStatus === 'checked-in' && !isTimeOff ? 'active' : 'disabled'}`}
                onClick={handleCheckOut}
                disabled={currentStatus !== 'checked-in' || isTimeOff}
              >
                Check Out
              </button>
            </div>
            
            {timeOffMessage && (
              <div className="time-off-message">
                {timeOffMessage}
              </div>
            )}
            
            <div className="request-correction">
              <a href="#request">Request Correction</a>
            </div>
          </div>

          <div className="attendance-history-panel">
            <div className="history-header">
              <h1>Attendance History</h1>
            </div>
            
            <div className="history-table">
              <table>
                <thead>
                  <tr>
                    <th>Date</th>
                    <th>In Time</th>
                    <th>Out Time</th>
                    <th>Duration</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {attendanceData.map((record, index) => (
                    <tr key={index}>
                      <td>{record.date}</td>
                      <td>{record.inTime}</td>
                      <td>{record.outTime}</td>
                      <td style={{ color: getStatusColor(record.status, record.duration, record.inTime) }}>
                        {record.duration}
                      </td>
                      <td style={{ color: getStatusColor(record.status, record.duration, record.inTime) }}>
                        {record.status}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AttendanceTracker;
