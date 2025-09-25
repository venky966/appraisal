import React from 'react';
import './PageStyles.css';

const Insights = () => {
  return (
    <div className="insights-page">
      <div className="header">
        <h1 className="title">Your Insights</h1>
        <div className="header-icons">
          <div className="icon bell">🔔</div>
          <div className="icon"></div>
        
        </div>
      </div>

      <div className="content">
        {/* Top Row */}
        <div className="top-row">
          {/* Left Column - My Monthly Appraisal */}
          <div className="left-column">
            <div className="appraisal-card">
              <h2 className="card-title">My Monthly Appraisal</h2>
              <div className="progress-container">
                <div className="progress-ring large">
                  <svg width="200" height="200" viewBox="0 0 140 140">
                    <circle
                      cx="70"
                      cy="70"
                      r="60"
                      fill="none"
                      stroke="#e5e7eb"
                      strokeWidth="8"
                    />
                    <circle
                      cx="70"
                      cy="70"
                      r="60"
                      fill="none"
                      stroke="url(#gradient1)"
                      strokeWidth="8"
                      strokeLinecap="round"
                      strokeDasharray="377"
                      strokeDashoffset="109"
                      transform="rotate(-90 70 70)"
                    />
                    <defs>
                      <linearGradient id="gradient1" x1="20%" y1="0%" x2="80%" y2="0%">
                        <stop offset="0%" stopColor="#ffd700" />
                        <stop offset="100%" stopColor="#4a90e2" />
                      </linearGradient>
                    </defs>
                  </svg>
                  <div className="progress-text">71%</div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Performance Metrics */}
          <div className="right-column">
            <div className="metric-card">
              <h3 className="metric-title">Punctuality</h3>
              <p className="metric-description">Your punctuality is excellent! Thank you for being a reliable and valuable member of our team.</p>
              <div className="progress-ring small">
                <svg width="110" height="110" viewBox="0 0 60 60">
                  <circle
                    cx="30"
                    cy="30"
                    r="24"
                    fill="none"
                    stroke="#e5e7eb"
                    strokeWidth="5"
                  />
                  <circle
                    cx="30"
                    cy="30"
                    r="24"
                    fill="none"
                    stroke="url(#gradient2)"
                    strokeWidth="5"
                    strokeLinecap="round"
                    strokeDasharray="151"
                    strokeDashoffset="38"
                    transform="rotate(-90 30 30)"
                  />
                  <defs>
                    <linearGradient id="gradient2" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#ffd700" />
                      <stop offset="100%" stopColor="#4a90e2" />
                    </linearGradient>
                  </defs>
                </svg>
                <div className="progress-text">75%</div>
              </div>
            </div>

            <div className="metric-card">
              <h3 className="metric-title">Teamwork</h3>
              <p className="metric-description">Fantastic teamwork! Your collaborative spirit and positive attitude are a great asset to the team.</p>
              <div className="progress-ring small">
                <svg width="110" height="110" viewBox="0 0 60 60">
                  <circle
                    cx="30"
                    cy="30"
                    r="24"
                    fill="none"
                    stroke="#e5e7eb"
                    strokeWidth="5"
                  />
                  <circle
                    cx="30"
                    cy="30"
                    r="24"
                    fill="none"
                    stroke="url(#gradient3)"
                    strokeWidth="5"
                    strokeLinecap="round"
                    strokeDasharray="151"
                    strokeDashoffset="38"
                    transform="rotate(-90 30 30)"
                  />
                  <defs>
                    <linearGradient id="gradient3" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#ffd700" />
                      <stop offset="100%" stopColor="#4a90e2" />
                    </linearGradient>
                  </defs>
                </svg>
                <div className="progress-text">75%</div>
              </div>
            </div>

            <div className="metric-card">
              <h3 className="metric-title">Attendance</h3>
              <p className="metric-description">Excellent attendance! Your reliability is highly valued and helps the entire team stay on track.</p>
              <div className="progress-ring small">
                <svg width="110" height="110" viewBox="0 0 60 60">
                  <circle
                    cx="30"
                    cy="30"
                    r="24"
                    fill="none"
                    stroke="#e5e7eb"
                    strokeWidth="5"
                  />
                  <circle
                    cx="30"
                    cy="30"
                    r="24"
                    fill="none"
                    stroke="url(#gradient4)"
                    strokeWidth="5"
                    strokeLinecap="round"
                    strokeDasharray="151"
                    strokeDashoffset="60"
                    transform="rotate(-90 30 30)"
                  />
                  <defs>
                    <linearGradient id="gradient4" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#ffd700" />
                      <stop offset="100%" stopColor="#4a90e2" />
                    </linearGradient>
                  </defs>
                </svg>
                <div className="progress-text">60%</div>
              </div>
            </div>

            <div className="metric-card">
              <h3 className="metric-title">Task Completion</h3>
              <p className="metric-description">Outstanding work on task completion! Your ability to manage your workload and deliver on time is a great example for the team.</p>
              <div className="progress-ring small">
                <svg width="110" height="110" viewBox="0 0 60 60">
                  <circle
                    cx="30"
                    cy="30"
                    r="24"
                    fill="none"
                    stroke="#e5e7eb"
                    strokeWidth="5"
                  />
                  <circle
                    cx="30"
                    cy="30"
                    r="24"
                    fill="none"
                    stroke="url(#gradient5)"
                    strokeWidth="5"
                    strokeLinecap="round"
                    strokeDasharray="151"
                    strokeDashoffset="38"
                    transform="rotate(-90 30 30)"
                  />
                  <defs>
                    <linearGradient id="gradient5" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#ffd700" />
                      <stop offset="100%" stopColor="#4a90e2" />
                    </linearGradient>
                  </defs>
                </svg>
                <div className="progress-text">75%</div>
              </div>
            </div>
          </div>
        </div>

        {/* Appraisal Review Section */}
        <div className="appraisal-review">
          <h3 className="section-title">Appraisal Review</h3>
          <div className="review-navigation">
            <button className="nav-arrow">‹</button>
            <div className="review-cards">
              <div className="review-card active">Appraisal Review January- 2025</div>
              <div className="review-card">Appraisal Review February- 2025</div>
              <div className="review-card">Appraisal Review March- 2025</div>
            </div>
            <button className="nav-arrow">›</button>
          </div>
        </div>

        {/* Bottom Row */}
        <div className="bottom-row">
          {/* Engagements */}
          <div className="engagements">
            <h3 className="section-title">Engagements</h3>
            <div className="engagement-list">
              <div className="engagement-item">
                <div className="engagement-title">You Wished Happy Birthday</div>
                <div className="engagement-subtitle">Happy Birthday XYZ</div>
                <div className="engagement-date">12 Sep 2025</div>
              </div>
              <div className="engagement-item">
                <div className="engagement-title">You Wished Happy Navaratri</div>
                <div className="engagement-subtitle">Happy Navarathri Guyz....</div>
                <div className="engagement-date">12 Sep 2025</div>
              </div>
             
            </div>
          </div>
          

          {/* Review Scores */}
          <div className="review-scores">
            <h3 className="section-title">Review</h3>
            <div className="scores-grid">
              <div className="score-card">
                <div className="score-ring">
                  <svg width="100" height="100" viewBox="0 0 60 60">
                    <circle
                      cx="30"
                      cy="30"
                      r="24"
                      fill="none"
                      stroke="#e5e7eb"
                      strokeWidth="5"
                    />
                    <circle
                      cx="30"
                      cy="30"
                      r="24"
                      fill="none"
                      stroke="url(#gradient6)"
                      strokeWidth="5"
                      strokeLinecap="round"
                      strokeDasharray="151"
                      strokeDashoffset="38"
                      transform="rotate(-90 30 30)"
                    />
                    <defs>
                      <linearGradient id="gradient6" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#ffd700" />
                        <stop offset="100%" stopColor="#4a90e2" />
                      </linearGradient>
                    </defs>
                  </svg>
                  <div className="score-text">4</div>
                </div>
                <div className="score-label">Self Review</div>
              </div>

              <div className="score-card">
                <div className="score-ring">
                  <svg width="140" height="140" viewBox="0 0 60 60">
                    <circle
                      cx="30"
                      cy="30"
                      r="24"
                      fill="none"
                      stroke="#e5e7eb"
                      strokeWidth="5"
                    />
                    <circle
                      cx="30"
                      cy="30"
                      r="24"
                      fill="none"
                      stroke="url(#gradient7)"
                      strokeWidth="5"
                      strokeLinecap="round"
                      strokeDasharray="151"
                      strokeDashoffset="60"
                      transform="rotate(-90 30 30)"
                    />
                    <defs>
                      <linearGradient id="gradient7" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#ffd700" />
                        <stop offset="100%" stopColor="#4a90e2" />
                      </linearGradient>
                    </defs>
                  </svg>
                  <div className="score-text">3</div>
                </div>
                <div className="score-label">Avg Review</div>
              </div>

              <div className="score-card">
                <div className="score-ring">
                  <svg width="90" height="90" viewBox="0 0 40 40">
                    <circle
                      cx="20"
                      cy="20"
                      r="16"
                      fill="none"
                      stroke="#e5e7eb"
                      strokeWidth="3"
                    />
                    <circle
                      cx="20"
                      cy="20"
                      r="16"
                      fill="none"
                      stroke="url(#gradient8)"
                      strokeWidth="3"
                      strokeLinecap="round"
                      strokeDasharray="100"
                      strokeDashoffset="40"
                      transform="rotate(-90 20 20)"
                    />
                    <defs>
                      <linearGradient id="gradient8" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#ffd700" />
                        <stop offset="100%" stopColor="#4a90e2" />
                      </linearGradient>
                    </defs>
                  </svg>
                  <div className="score-text">3</div>
                </div>
                <div className="score-label">PM Review</div>
                <div className="score-card">
                <div className="score-ring">
                  <svg width="90" height="90" viewBox="0 0 40 40">
                    <circle
                      cx="20"
                      cy="20"
                      r="16"
                      fill="none"
                      stroke="#e5e7eb"
                      strokeWidth="3"
                    />
                    <circle
                      cx="20"
                      cy="20"
                      r="16"
                      fill="none"
                      stroke="url(#gradient9)"
                      strokeWidth="3"
                      strokeLinecap="round"
                      strokeDasharray="100"
                      strokeDashoffset="60"
                      transform="rotate(-90 20 20)"
                    />
                    <defs>
                      <linearGradient id="gradient9" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#ffd700" />
                        <stop offset="100%" stopColor="#4a90e2" />
                      </linearGradient>
                    </defs>
                  </svg>
                  <div className="score-text">2</div>
                </div>
                <div className="score-label">CEO Review</div>
              </div>
              </div>

              
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Insights;
