import React from 'react';
import './AppraisalProgress.css';

const AppraisalProgress = ({ percentage = 71 }) => {
  // Calculate stroke dash offset to match Insights page (71% = 109 offset)
  const circumference = 377; // Same as Insights page
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  return (
    <div className="appraisal-progress-container">
      <div className="appraisal-progress-title">Appraisal of this Month</div>
      <div className="progress-circle-wrapper">
        <svg width="200" height="200" viewBox="0 0 140 140">
          {/* Background circle */}
          <circle
            cx="70"
            cy="70"
            r="60"
            fill="none"
            stroke="#e5e7eb"
            strokeWidth="8"
          />
          {/* Progress circle - exactly like Insights page */}
          <circle
            cx="70"
            cy="70"
            r="60"
            fill="none"
            stroke="url(#gradient1)"
            strokeWidth="8"
            strokeLinecap="round"
            strokeDasharray="377"
            strokeDashoffset={strokeDashoffset}
            transform="rotate(-90 70 70)"
          />
          {/* Gradient definition - exactly like Insights page */}
          <defs>
            <linearGradient id="gradient1" x1="20%" y1="0%" x2="80%" y2="0%">
              <stop offset="0%" stopColor="#ffd700" />
              <stop offset="100%" stopColor="#4a90e2" />
            </linearGradient>
          </defs>
        </svg>
        <div className="progress-text">
          <span className="progress-percentage">{percentage}%</span>
        </div>
      </div>
    </div>
  );
};

export default AppraisalProgress;
