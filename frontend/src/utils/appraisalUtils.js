// Appraisal utilities for managing appraisal forms and submissions

// Get all appraisal forms
export const getAppraisalForms = () => {
  const forms = localStorage.getItem('appraisalForms');
  return forms ? JSON.parse(forms) : [];
};

// Save appraisal forms
export const saveAppraisalForms = (forms) => {
  localStorage.setItem('appraisalForms', JSON.stringify(forms));
};

// Get a specific appraisal form by ID
export const getAppraisalForm = (formId) => {
  const forms = getAppraisalForms();
  return forms.find(form => form.id === parseInt(formId));
};

// Update appraisal form status
export const updateAppraisalFormStatus = (formId, status, formData = null) => {
  const forms = getAppraisalForms();
  const formIndex = forms.findIndex(form => form.id === parseInt(formId));
  
  if (formIndex !== -1) {
    forms[formIndex].status = status;
    if (status === 'submitted') {
      forms[formIndex].submittedDate = new Date().toISOString().split('T')[0];
      forms[formIndex].formData = formData;
    }
    saveAppraisalForms(forms);
    return { success: true };
  }
  
  return { success: false, message: 'Form not found' };
};

// Submit appraisal form
export const submitAppraisalForm = (formId, formData) => {
  return updateAppraisalFormStatus(formId, 'submitted', formData);
};

// Mark form as reviewed by HR
export const markFormAsReviewed = (formId) => {
  return updateAppraisalFormStatus(formId, 'reviewed');
};

// Create new appraisal form (for HR)
export const createAppraisalForm = (month, year) => {
  const forms = getAppraisalForms();
  const newForm = {
    id: Date.now(),
    month,
    year,
    status: 'pending',
    submittedDate: null,
    formData: null
  };
  
  forms.push(newForm);
  saveAppraisalForms(forms);
  return { success: true, formId: newForm.id };
};

// Get forms by status
export const getFormsByStatus = (status) => {
  const forms = getAppraisalForms();
  return forms.filter(form => form.status === status);
};

// Get pending forms (for employees)
export const getPendingForms = () => {
  return getFormsByStatus('pending');
};

// Get submitted forms (for HR review)
export const getSubmittedForms = () => {
  return getFormsByStatus('submitted');
};

// Get reviewed forms (completed)
export const getReviewedForms = () => {
  return getFormsByStatus('reviewed');
};
