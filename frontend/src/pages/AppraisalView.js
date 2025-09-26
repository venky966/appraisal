import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './PageStyles.css';
import { getAppraisalForm } from '../utils/appraisalUtils';

const AppraisalView = () => {
  const [formData, setFormData] = useState(null);
  const [formId, setFormId] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Get form ID from URL
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get('id') || '2';
    setFormId(parseInt(id));
    
    // Load form data
    const form = getAppraisalForm(id);
    if (form && form.formData) {
      setFormData(form.formData);
    }
    setLoading(false);
  }, []);

  const handleBack = () => {
    navigate('/appraisal');
  };

  const evaluationFields = [
    { key: 'taskManagement', label: 'Task Management' },
    { key: 'qualityOfWork', label: 'Quality of Work' },
    { key: 'punctuality', label: 'Punctuality' },
    { key: 'communication', label: 'Communication' },
    { key: 'problemSolving', label: 'Problem Solving' },
    { key: 'initiative', label: 'Initiative/Proactiveness' },
    { key: 'teamwork', label: 'Teamwork' },
    { key: 'adaptability', label: 'Adaptability' },
    { key: 'resourceUtilization', label: 'Resource Utilization' },
    { key: 'goalAlignment', label: 'Goal Alignment' }
  ];

  if (loading) {
    return (
      <div className="page-container">
        <div className="loading">Loading...</div>
      </div>
    );
  }

  if (!formData) {
    return (
      <div className="page-container">
        <div className="error">No appraisal data found.</div>
      </div>
    );
  }

  return (
    <div className="page-container">
      <div className="form-header">
      <button className="back-button" onClick={handleBack}>
          ← Back
        </button>
      </div>
      <div className="appraisal-view-container">
        <h1>Appraisal Form January- 2025</h1>
        <p className="view-instruction">Your submitted self-evaluation.</p>
        
        <div className="appraisal-view">
          {evaluationFields.map((field) => (
            <div key={field.key} className="view-field">
              <label className="field-label">{field.label}</label>
              <div className="view-value">
                {formData[field.key] || 'Not specified'}
              </div>
            </div>
          ))}
          
          <div className="view-actions">
            <button
              className="back-btn"
              onClick={handleBack}
            >
              Back to Appraisal
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AppraisalView;
