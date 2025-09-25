import React, { useState } from 'react';
import './TimeOffPopup.css';

const TimeOffPopup = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    timeOffType: '',
    duration: '',
    fromTime: '',
    toTime: '',
    requestTo: '',
    coveringEmployee: '',
    description: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Create leave request object
    const leaveRequest = {
      id: Date.now(),
      type: formData.timeOffType,
      duration: formData.duration,
      fromTime: formData.fromTime,
      toTime: formData.toTime,
      requestTo: formData.requestTo,
      coveringEmployee: formData.coveringEmployee,
      description: formData.description,
      date: new Date().toISOString(),
      status: 'Pending'
    };

    // Save to localStorage
    const existingRequests = JSON.parse(localStorage.getItem('leaveRequests') || '[]');
    existingRequests.push(leaveRequest);
    localStorage.setItem('leaveRequests', JSON.stringify(existingRequests));

    console.log('Time Off Request:', leaveRequest);
    alert('Time Off request submitted successfully!');
    onClose();
  };

  const handleClose = () => {
    setFormData({
      timeOffType: '',
      duration: '',
      fromTime: '',
      toTime: '',
      requestTo: '',
      coveringEmployee: '',
      description: ''
    });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="timeoff-overlay">
      <div className="timeoff-popup">
        <div className="timeoff-header">
          <h2>Time Off Request</h2>
          <button className="timeoff-close" onClick={handleClose}>×</button>
        </div>
        
        <form className="timeoff-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="timeOffType">Time Off Type</label>
            <select 
              id="timeOffType"
              name="timeOffType"
              value={formData.timeOffType}
              onChange={handleInputChange}
              required
            >
              <option value="">Select Time Off Type</option>
              <option value="casual">Casual Leave</option>
              <option value="sick">Sick Leave</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="duration">Estimation</label>
            <select 
              id="duration"
              name="duration"
              value={formData.duration}
              onChange={handleInputChange}
              required
            >
              <option value="">Select Estimation</option>
              <option value="hours">Hours</option>
              <option value="half-day">Half Day</option>
            </select>
          </div>

          {formData.duration === 'hours' && (
            <div className="time-range-group">
              <div className="form-group">
                <label htmlFor="fromTime">From Time</label>
                <input
                  type="time"
                  id="fromTime"
                  name="fromTime"
                  value={formData.fromTime}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="toTime">To Time</label>
                <input
                  type="time"
                  id="toTime"
                  name="toTime"
                  value={formData.toTime}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>
          )}

          <div className="form-group">
            <label htmlFor="requestTo">Request To</label>
            <select 
              id="requestTo"
              name="requestTo"
              value={formData.requestTo}
              onChange={handleInputChange}
              required
            >
              <option value="">Select Request To</option>
              <option value="hr">HR Manager</option>
              <option value="project-manager">Project Manager</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="coveringEmployee">Who Covers Your Work</label>
            <input
              type="text"
              id="coveringEmployee"
              name="coveringEmployee"
              value={formData.coveringEmployee}
              onChange={handleInputChange}
              placeholder="Enter employee name"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="description">Description</label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              placeholder="Enter reason for time off"
              rows="4"
              required
            />
          </div>

          <div className="form-actions">
            <button type="button" className="cancel-btn" onClick={handleClose}>
              Cancel
            </button>
            <button type="submit" className="submit-btn">
              Submit Request
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TimeOffPopup;
