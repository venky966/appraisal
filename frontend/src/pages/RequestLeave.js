import React, { useState } from 'react';
import './RequestLeave.css';
import FeedbackPopup from '../components/FeedbackPopup';

const RequestLeave = () => {
  const [formData, setFormData] = useState({
    employeeName: '',
    employeeId: '',
    subject: '',
    fromDate: '',
    toDate: '',
    duration: 'full',
    coverPerson: '',
    reason: '',
    notifyPeers: true
  });

  const [showFeedbackPopup, setShowFeedbackPopup] = useState(false);
  const [feedbackData, setFeedbackData] = useState({
    dateReceived: new Date().toISOString(),
    authority: 'Manager',
    feedback: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
  });

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Leave request submitted:', formData);
    alert('Leave request submitted successfully!');
  };

  const handleCancel = () => {
    console.log('Form cancelled');
    alert('Form cancelled');
  };

  const handleShowFeedback = () => {
    console.log('Button clicked, opening feedback popup');
    setShowFeedbackPopup(true);
  };

  const handleCloseFeedback = () => {
    console.log('Closing feedback popup');
    setShowFeedbackPopup(false);
  };

  // Debug log to see state
  console.log('showFeedbackPopup state:', showFeedbackPopup);

  return (
    <div className="request-leave-container">
      <div className="leave-form-container">
        <div className="form-header">
          <h2>Request Leave</h2>
          </div>
        
        <form className="leave-form" onSubmit={handleSubmit}>
          <div className="form-row">
            <div className="form-group">
              <label>Employee Name</label>
              <div className="input-with-icon">
                <input
                  type="text"
                  name="employeeName"
                  value={formData.employeeName}
                  onChange={handleInputChange}
                  placeholder="Enter employee name"
                />
             
              </div>
            </div>
            <div className="form-group">
              <label>Employee Id</label>
              <div className="input-with-icon">
                <input
                  type="text"
                  name="employeeId"
                  value={formData.employeeId}
                  onChange={handleInputChange}
                  placeholder="Enter employee ID"
                />
              </div>
            </div>
          </div>

         

          <div className="form-group">
            <label>Subject</label>
            <input
              type="text"
              name="subject"
              value={formData.subject}
              onChange={handleInputChange}
              placeholder="Enter subject"
            />
          </div>

          <div className="form-group">
            <label>Duration</label>
            <div className="duration-row">
              <div className="date-inputs">
                <div className="date-group">
                  <label>From</label>
                  <div className="input-with-icon">
                    <input
                      type="date"
                      name="fromDate"
                      value={formData.fromDate}
                      onChange={handleInputChange}
                    />
                    <span className="input-icon">📅</span>
                  </div>
                </div>
                <div className="date-group">
                  <label>To</label>
                  <div className="input-with-icon">
                    <input
                      type="date"
                      name="toDate"
                      value={formData.toDate}
                      onChange={handleInputChange}
                    />
                    <span className="input-icon">📅</span>
                  </div>
                </div>
              </div>
              
              <div className="duration-options">
                <label className="radio-option">
                  <input
                    type="radio"
                    name="duration"
                    value="full"
                    checked={formData.duration === 'full'}
                    onChange={handleInputChange}
                  />
                  <span className="radio-label">Full day</span>
                </label>
                <label className="radio-option">
                  <input
                    type="radio"
                    name="duration"
                    value="half"
                    checked={formData.duration === 'half'}
                    onChange={handleInputChange}
                  />
                  <span className="radio-label">Half day</span>
                </label>
              </div>
            </div>
          </div>

          <div className="form-group">
            <label>Who will cover for u?</label>
            <div className="input-with-icon">
              <input
                type="text"
                name="coverPerson"
                value={formData.coverPerson}
                onChange={handleInputChange}
                placeholder="Select colleague"
              />
              <span className="input-icon">+</span>
            </div>
          </div>

          <div className="form-group">
            <label>Duration (Reason for the leave)</label>
            <textarea
              name="reason"
              value={formData.reason}
              onChange={handleInputChange}
              placeholder="Reason for the leave"
              rows="4"
            />
          </div>

          <div className="form-actions">
            <div className="checkbox-group">
              <label className="checkbox-option">
                <input
                  type="checkbox"
                  name="notifyPeers"
                  checked={formData.notifyPeers}
                  onChange={handleInputChange}
                />
                <span className="checkbox-label">Notify Peers</span>
              </label>
            </div>
            
            <div className="button-group">
              <button type="button" className="cancel-btn" onClick={handleCancel}>
                Cancel
              </button>
              <button type="submit" className="submit-btn">
                Submit
              </button>
            </div>
          </div>
        </form>
      </div>
      
      <FeedbackPopup 
        isOpen={showFeedbackPopup}
        onClose={handleCloseFeedback}
        feedbackData={feedbackData}
      />
    </div>
  );
};

export default RequestLeave;