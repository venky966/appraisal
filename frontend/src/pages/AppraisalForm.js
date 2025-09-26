import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './PageStyles.css';
import { getAppraisalForm, submitAppraisalForm } from '../utils/appraisalUtils';

const AppraisalForm = () => {
  const [formData, setFormData] = useState({
    taskManagement: '',
    qualityOfWork: '',
    punctuality: '',
    communication: '',
    problemSolving: '',
    initiative: '',
    teamwork: '',
    adaptability: '',
    resourceUtilization: '',
    goalAlignment: ''
  });
  const [formId, setFormId] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Get form ID from URL or use default
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get('id') || '1';
    setFormId(parseInt(id));
    
    // Load existing form data if available
    const existingForm = getAppraisalForm(id);
    if (existingForm && existingForm.formData) {
      setFormData(existingForm.formData);
    }
  }, []);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const result = submitAppraisalForm(formId, formData);
      if (result.success) {
        alert('Appraisal submitted successfully!');
        navigate('/appraisal');
      } else {
        alert('Failed to submit appraisal. Please try again.');
      }
    } catch (error) {
      alert('An error occurred. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    navigate('/appraisal');
  };

  const evaluationOptions = [
    'Does Not Meet Expectations',
    'Sometimes Meets Expectations / Needs Development',
    'Meets All Expectations',
    'Often Exceeds Expectations',
    'Consistently Exceeds Expectations'
  ];

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

  return (
    <div className="page-container">
      <div className="form-header">
        <button className="back-button" onClick={handleCancel}>
          ← Back
        </button>
      </div>
      <div className="appraisal-form-container">
        <h1>Appraisal Form February- 2025</h1>
        <p className="form-instruction">provide your self-evaluation.</p>
        
        <form onSubmit={handleSubmit} className="appraisal-form">
          {evaluationFields.map((field) => (
            <div key={field.key} className="form-field">
              <label className="field-label">{field.label}</label>
              <select
                className="form-select"
                value={formData[field.key]}
                onChange={(e) => handleInputChange(field.key, e.target.value)}
                required
              >
                <option value="">-Select option-</option>
                {evaluationOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>
          ))}
          
          <div className="form-actions">
            <button
              type="button"
              className="cancel-btn"
              onClick={handleCancel}
              disabled={isSubmitting}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="submit-btn"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Submitting...' : 'Submit Self Review'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AppraisalForm;
