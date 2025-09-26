import React from "react";
import "./SendFeedback.css"; // import the CSS file
import ProfileDropdown from '../components/ProfileDropdown';

export default function SendFeedback() {
  return (
    <div className="feedback-container">
      {/* Header */}
      <div className="feedback-header">
        <h2 className="feedback-title">Send Anonymous Feedback</h2>
        <div className="header-actions">
          <div className="feedback-bell">🔔</div>
          <ProfileDropdown />
        </div>
      </div>

      <p className="feedback-subtitle">Share your anonymous feedback</p>

      {/* Select Employee */}
      <label className="feedback-label">Select the Employee</label>
      <select className="feedback-select">
        <option value="">-- Select Employee --</option>
        <option value="emp1">Employee 1</option>
        <option value="emp2">Employee 2</option>
      </select>

      {/* Reason */}
      <label className="feedback-label">Reason</label>
      <textarea
        className="feedback-textarea"
        rows={4}
        placeholder="Reason for the leave"
      ></textarea>

      {/* Select Authority */}
      <label className="feedback-label">Select Authority</label>
      <select className="feedback-select">
        <option value="">-- Select Authority --</option>
        <option value="auth1">Manager</option>
        <option value="auth2">HR</option>
      </select>

      {/* Submit Button */}
      <button className="feedback-button">Submit Feedback</button>
    </div>
  );
}
