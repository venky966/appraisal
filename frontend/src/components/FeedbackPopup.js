import React from 'react';
import './FeedbackPopup.css';

const FeedbackPopup = ({ isOpen, onClose, feedbackData }) => {
  console.log('FeedbackPopup render - isOpen:', isOpen);
  if (!isOpen) return null;

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric', 
      year: 'numeric' 
    });
  };

  return (
    <div className="feedback-popup-overlay" style={{zIndex: 9999, position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.8)'}}>
      <div className="feedback-popup-container" style={{backgroundColor: 'white', padding: '20px', borderRadius: '8px', maxWidth: '500px', margin: '50px auto'}}>
        <div className="feedback-popup-header">
          <h3>feedback popup MANAGER</h3>
        </div>
        
        <div className="feedback-card">
          <div className="feedback-title">Feedback Received!</div>
          
          <div className="feedback-date-badge">
            {formatDate(feedbackData?.dateReceived || new Date())}
          </div>
          
          <div className="feedback-details">
            <div className="feedback-authority">
              Authority: {feedbackData?.authority || 'Manager'}
            </div>
            
            <div className="feedback-label">Feedback:</div>
            
            <div className="feedback-content">
              {feedbackData?.feedback || 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'}
            </div>
          </div>
          
          <div className="feedback-actions">
            <button className="cancel-button" onClick={onClose}>
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeedbackPopup;
