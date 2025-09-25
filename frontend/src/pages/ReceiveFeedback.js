import React, { useState } from "react";
import FeedbackPopup from '../components/FeedbackPopup';
import "./FeedbackReceived.css";

const FeedbackReceived = () => {
  const [selectedFilter, setSelectedFilter] = useState("All");
  const [showFilter, setShowFilter] = useState(false);
  const [showFeedbackPopup, setShowFeedbackPopup] = useState(false);
  const [selectedFeedback, setSelectedFeedback] = useState(null);

  const data = [
    { 
      month: "October", 
      year: 2023, 
      authority: "Manager",
      dateReceived: "2023-10-20",
      feedback: "Great work on the project delivery. Your attention to detail and communication skills have improved significantly. Keep up the excellent work!"
    },
    { 
      month: "February", 
      year: 2024, 
      authority: "Manager",
      dateReceived: "2024-02-15",
      feedback: "Outstanding performance this month. Your leadership skills are developing well. Continue to mentor junior team members."
    },
    { 
      month: "April", 
      year: 2024, 
      authority: "HR",
      dateReceived: "2024-04-10",
      feedback: "Excellent collaboration with cross-functional teams. Your adaptability and problem-solving approach are commendable."
    },
    { 
      month: "August", 
      year: 2024, 
      authority: "Manager",
      dateReceived: "2024-08-25",
      feedback: "Strong technical skills demonstrated in the recent project. Your code quality and documentation have improved significantly."
    },
    { 
      month: "September", 
      year: 2024, 
      authority: "HR",
      dateReceived: "2024-09-12",
      feedback: "Great initiative in organizing team building activities. Your interpersonal skills contribute positively to team morale."
    },
    { 
      month: "January", 
      year: 2025, 
      authority: "Manager",
      dateReceived: "2025-01-08",
      feedback: "Excellent start to the year. Your strategic thinking and planning skills are evident in the recent project proposals."
    },
    { 
      month: "March", 
      year: 2025, 
      authority: "Manager",
      dateReceived: "2025-03-15",
      feedback: "Consistent high-quality deliverables. Your time management and prioritization skills have improved remarkably."
    },
    { 
      month: "June", 
      year: 2025, 
      authority: "HR",
      dateReceived: "2025-06-20",
      feedback: "Outstanding contribution to the company culture initiatives. Your positive attitude and professionalism set a great example."
    },
  ];

  // Filter data based on selected filter
  const filteredData = data.filter(item => {
    if (selectedFilter === "All") return true;
    return item.authority === selectedFilter;
  });

  const filterOptions = ["All", "Manager", "HR"];

  const handleRowClick = (feedback) => {
    setSelectedFeedback(feedback);
    setShowFeedbackPopup(true);
  };

  const handleClosePopup = () => {
    setShowFeedbackPopup(false);
    setSelectedFeedback(null);
  };

  return (
    <div className="feedback-card">
      {/* Header bar */}
      <div className="feedback-header">
        <span className="feedback-title">Feedback Received</span>
        <div className="header-actions">
          <div className="notification-icon">🔔</div>
          <div className="profile-placeholder"></div>
        </div>
      </div>

      {/* Filter Section */}
      <div className="filter-section">
        <div className="filter-container">
        
          <button 
            className="filter-button" 
            onClick={() => setShowFilter(!showFilter)}
          >
            🔽
          </button>
          {showFilter && (
            <div className="filter-dropdown">
             
              {filterOptions.map((option) => (
                <button
                  key={option}
                  className={`filter-option ${
                    selectedFilter === option ? "active" : ""
                  }`}
                  onClick={() => {
                    setSelectedFilter(option);
                    setShowFilter(false);
                  }}
                >
                  {option === "All" ? "All" : option}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Table */}
      <table className="feedback-table">
        <thead>
          <tr>
            <th>Month</th>
            <th>Year</th>
            <th>Authority</th>
          </tr>
        </thead>
        <tbody>
          {filteredData.map((item, idx) => (
            <tr 
              key={idx} 
              className="feedback-table-row"
              onClick={() => handleRowClick(item)}
              style={{ cursor: 'pointer' }}
            >
              <td>{item.month}</td>
              <td>{item.year}</td>
              <td>{item.authority}</td>
            </tr>
          ))}
        </tbody>
      </table>
      
      <FeedbackPopup 
        isOpen={showFeedbackPopup}
        onClose={handleClosePopup}
        feedbackData={selectedFeedback}
      />
    </div>
  );
};

export default FeedbackReceived;
