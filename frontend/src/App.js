import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Dashboard from './components/Dashboard';
import DashboardPage from './pages/DashboardPage';
import Insights from './pages/Insights';
import Members from './pages/Members';
import Appraisal from './pages/Appraisal';
import RequestLeave from './pages/RequestLeave';
import TimeOff from './pages/TimeOff';
import LeaveHistory from './pages/LeaveHistory';
import AttendanceTracker from './pages/AttendanceTracker';
import ProfilePage from './pages/ProfilePage';

// add your feedback subpages
import SendFeedback from './pages/SendFeedback';
import ReceiveFeedback from './pages/ReceiveFeedback';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Dashboard />}>
            <Route index element={<DashboardPage />} />
            <Route path="dashboard" element={<DashboardPage />} />
            <Route path="insights" element={<Insights />} />
            
            {/* Feedback parent with nested routes */}
            <Route path="feedback">
              <Route path="send" element={<SendFeedback />} />
              <Route path="receive" element={<ReceiveFeedback />} />
            </Route>
            
            <Route path="members" element={<Members />} />
            <Route path="appraisal" element={<Appraisal />} />
            <Route path="request-leave" element={<RequestLeave />} />
            <Route path="time-off" element={<TimeOff />} />
            <Route path="leave-history" element={<LeaveHistory />} />
            <Route path="attendance-tracker" element={<AttendanceTracker />} />
            <Route path="profile" element={<ProfilePage />} />
          </Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
