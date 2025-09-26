import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './PageStyles.css';
import { getAppraisalForms, submitAppraisalForm } from '../utils/appraisalUtils';
import ProfileDropdown from '../components/ProfileDropdown';

const Appraisal = () => {
  const [appraisalForms, setAppraisalForms] = useState([]);
  const navigate = useNavigate();

  // Load appraisal forms data
  useEffect(() => {
    loadAppraisalForms();
  }, []);

  const loadAppraisalForms = () => {
    const forms = getAppraisalForms();
    if (forms.length === 0) {
      // Initialize with sample data if no forms exist
      const initialForms = [
        {
          id: 1,
          month: 'February',
          year: '2025',
          status: 'pending', // 'pending', 'submitted', 'reviewed'
          submittedDate: null,
          formData: null
        },
        {
          id: 2,
          month: 'January',
          year: '2025',
          status: 'submitted',
          submittedDate: '2025-01-15',
          formData: {
            taskManagement: 'Meets All Expectations',
            qualityOfWork: 'Often Exceeds Expectations',
            punctuality: 'Consistently Exceeds Expectations',
            communication: 'Meets All Expectations',
            problemSolving: 'Often Exceeds Expectations',
            initiative: 'Meets All Expectations',
            teamwork: 'Often Exceeds Expectations',
            adaptability: 'Meets All Expectations',
            resourceUtilization: 'Meets All Expectations',
            goalAlignment: 'Often Exceeds Expectations'
          }
        }
      ];
      setAppraisalForms(initialForms);
      localStorage.setItem('appraisalForms', JSON.stringify(initialForms));
    } else {
      setAppraisalForms(forms);
    }
  };

  const handleFormAction = (formId, action) => {
    if (action === 'submit') {
      // Navigate to form submission page
      navigate(`/appraisal-form?id=${formId}`);
    } else if (action === 'view') {
      // Navigate to view submitted form
      navigate(`/appraisal-view?id=${formId}`);
    }
  };

  const getButtonText = (status) => {
    switch (status) {
      case 'pending':
        return 'Submit Self Review';
      case 'submitted':
        return 'View';
      case 'reviewed':
        return 'View';
      default:
        return 'Submit Self Review';
    }
  };

  const getButtonClass = (status) => {
    switch (status) {
      case 'pending':
        return 'submit-btn';
      case 'submitted':
        return 'view-btn';
      case 'reviewed':
        return 'view-btn';
      default:
        return 'submit-btn';
    }
  };

  return (
    <div className="page-container">
      <div className="appraisal-header">
        <h1>Appraisal</h1>
        <div className="header-icons">
          <div className="notification-icon">
            🔔
          </div>
          <ProfileDropdown />
        </div>
      </div>
      
      <div className="appraisal-forms">
        {appraisalForms.map((form) => (
          <div key={form.id} className="appraisal-form-card">
            <div className="form-title">
              Appraisal Review {form.month}- {form.year}
            </div>
            <div className="form-status">
              {form.status === 'pending' && (
                <span className="status-pending">New Form - Action Required</span>
              )}
              {form.status === 'submitted' && (
                <span className="status-submitted">Submitted on {form.submittedDate}</span>
              )}
              {form.status === 'reviewed' && (
                <span className="status-reviewed">Reviewed by HR</span>
              )}
            </div>
            <button
              className={`form-action-btn ${getButtonClass(form.status)}`}
              onClick={() => handleFormAction(form.id, form.status === 'pending' ? 'submit' : 'view')}
            >
              {getButtonText(form.status)}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Appraisal;
