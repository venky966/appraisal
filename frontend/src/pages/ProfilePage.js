import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './ProfilePage.css';

const ProfilePage = () => {
  const navigate = useNavigate();
  const [profileData, setProfileData] = useState({
    empId: 'EMP001',
    name: 'ABC',
    email: 'abc@company.com',
    phone: '',
    address: '',
    department: 'IT',
    position: 'Junior Web Developer',
    joiningDate: '',
    emergencyContact: '',
    bloodGroup: '',
    dateOfBirth: '',
    profileImage: '',
    // Education details
    highestQualification: '',
    degree: '',
    university: '',
    graduationYear: '',
    cgpa: '',
    additionalEducation: ''
  });

  const [isEditing, setIsEditing] = useState(false);

  // Load profile data from localStorage on component mount
  useEffect(() => {
    const savedProfile = localStorage.getItem('employeeProfile');
    if (savedProfile) {
      setProfileData(JSON.parse(savedProfile));
    }
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfileData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setProfileData(prev => ({
          ...prev,
          profileImage: event.target.result
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = () => {
    // Save profile data to localStorage
    localStorage.setItem('employeeProfile', JSON.stringify(profileData));
    setIsEditing(false);
    alert('Profile updated successfully!');
  };

  const handleCancel = () => {
    // Reload original data
    const savedProfile = localStorage.getItem('employeeProfile');
    if (savedProfile) {
      setProfileData(JSON.parse(savedProfile));
    }
    setIsEditing(false);
  };

  const handleBack = () => {
    // Prefer real browser back navigation
    const fromAppraisal = localStorage.getItem('fromAppraisal');
    if (fromAppraisal) {
      localStorage.removeItem('fromAppraisal');
    }

    if (window.history && window.history.length > 2) {
      navigate(-1);
      return;
    }

    // Fallbacks if no history
    if (fromAppraisal === 'true') {
      navigate('/appraisal');
    } else {
      navigate('/dashboard');
    }
  };

  return (
    <div className="profile-page">
      <div className="profile-header">
        <button className="back-btn" onClick={handleBack}>
          ← Back
        </button>
        <h1>Employee Profile</h1>
        <div className="profile-actions">
          {!isEditing ? (
            <button className="edit-btn" onClick={() => setIsEditing(true)}>
              Edit Profile
            </button>
          ) : (
            <div className="edit-actions">
              <button className="save-btn" onClick={handleSave}>
                Save Changes
              </button>
              <button className="cancel-btn" onClick={handleCancel}>
                Cancel
              </button>
            </div>
          )}
        </div>
      </div>

      <div className="profile-content">
        <div className="profile-section">
          <h2>Profile Image</h2>
          <div className="image-upload-section">
            <div className="current-image">
              {profileData.profileImage ? (
                <img 
                  src={profileData.profileImage} 
                  alt="Profile" 
                  className="profile-image"
                />
              ) : (
                <div className="image-placeholder">
                  <span>No Image</span>
                </div>
              )}
            </div>
            <div className="image-upload-controls">
              <input
                type="file"
                id="profileImage"
                accept="image/*"
                onChange={handleImageUpload}
                disabled={!isEditing}
                style={{ display: 'none' }}
              />
              <label 
                htmlFor="profileImage" 
                className={`upload-btn ${!isEditing ? 'disabled' : ''}`}
              >
                {profileData.profileImage ? 'Change Image' : 'Upload Image'}
              </label>
              {profileData.profileImage && isEditing && (
                <button 
                  className="remove-image-btn"
                  onClick={() => setProfileData(prev => ({ ...prev, profileImage: '' }))}
                >
                  Remove Image
                </button>
              )}
            </div>
          </div>
        </div>

        <div className="profile-section">
          <h2>Personal Information</h2>
          <div className="form-grid">
            <div className="form-group">
              <label htmlFor="empId">Employee ID</label>
              <input
                type="text"
                id="empId"
                name="empId"
                value={profileData.empId}
                onChange={handleInputChange}
                disabled
                className="readonly-field"
              />
            </div>

            <div className="form-group">
              <label htmlFor="name">Full Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={profileData.name}
                onChange={handleInputChange}
                disabled={!isEditing}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={profileData.email}
                disabled
                className="readonly-field"
                title="Email is provided by HR and cannot be changed"
              />
            </div>

            <div className="form-group">
              <label htmlFor="phone">Phone Number</label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={profileData.phone}
                onChange={handleInputChange}
                disabled={!isEditing}
                placeholder="Enter phone number"
              />
            </div>

            <div className="form-group">
              <label htmlFor="dateOfBirth">Date of Birth</label>
              <input
                type="date"
                id="dateOfBirth"
                name="dateOfBirth"
                value={profileData.dateOfBirth}
                onChange={handleInputChange}
                disabled={!isEditing}
              />
            </div>

            <div className="form-group">
              <label htmlFor="bloodGroup">Blood Group</label>
              <select
                id="bloodGroup"
                name="bloodGroup"
                value={profileData.bloodGroup}
                onChange={handleInputChange}
                disabled={!isEditing}
              >
                <option value="">Select Blood Group</option>
                <option value="A+">A+</option>
                <option value="A-">A-</option>
                <option value="B+">B+</option>
                <option value="B-">B-</option>
                <option value="AB+">AB+</option>
                <option value="AB-">AB-</option>
                <option value="O+">O+</option>
                <option value="O-">O-</option>
              </select>
            </div>
          </div>
        </div>

        <div className="profile-section">
          <h2>Work Information</h2>
          <div className="form-grid">
            <div className="form-group">
              <label htmlFor="department">Department</label>
              <input
                type="text"
                id="department"
                name="department"
                value={profileData.department}
                onChange={handleInputChange}
                disabled={!isEditing}
              />
            </div>

            <div className="form-group">
              <label htmlFor="position">Position</label>
              <input
                type="text"
                id="position"
                name="position"
                value={profileData.position}
                onChange={handleInputChange}
                disabled={!isEditing}
              />
            </div>

            <div className="form-group">
              <label htmlFor="joiningDate">Joining Date</label>
              <input
                type="date"
                id="joiningDate"
                name="joiningDate"
                value={profileData.joiningDate}
                onChange={handleInputChange}
                disabled={!isEditing}
              />
            </div>
          </div>
        </div>

        <div className="profile-section">
          <h2>Contact Information</h2>
          <div className="form-grid">
            <div className="form-group full-width">
              <label htmlFor="address">Address</label>
              <textarea
                id="address"
                name="address"
                value={profileData.address}
                onChange={handleInputChange}
                disabled={!isEditing}
                placeholder="Enter your address"
                rows="3"
              />
            </div>

            <div className="form-group">
              <label htmlFor="emergencyContact">Emergency Contact</label>
              <input
                type="tel"
                id="emergencyContact"
                name="emergencyContact"
                value={profileData.emergencyContact}
                onChange={handleInputChange}
                disabled={!isEditing}
                placeholder="Emergency contact number"
              />
            </div>
          </div>
        </div>

        <div className="profile-section">
          <h2>Education Details</h2>
          <div className="form-grid">
            <div className="form-group">
              <label htmlFor="highestQualification">Highest Qualification</label>
              <select
                id="highestQualification"
                name="highestQualification"
                value={profileData.highestQualification}
                onChange={handleInputChange}
                disabled={!isEditing}
              >
                <option value="">Select Qualification</option>
                <option value="high-school">High School</option>
                <option value="diploma">Diploma</option>
                <option value="bachelor">Bachelor's Degree</option>
                <option value="master">Master's Degree</option>
                <option value="phd">PhD</option>
                <option value="other">Other</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="degree">Degree/Field of Study</label>
              <input
                type="text"
                id="degree"
                name="degree"
                value={profileData.degree}
                onChange={handleInputChange}
                disabled={!isEditing}
                placeholder="e.g., Computer Science, Engineering"
              />
            </div>

            <div className="form-group">
              <label htmlFor="university">University/Institution</label>
              <input
                type="text"
                id="university"
                name="university"
                value={profileData.university}
                onChange={handleInputChange}
                disabled={!isEditing}
                placeholder="University or Institution name"
              />
            </div>

            <div className="form-group">
              <label htmlFor="graduationYear">Graduation Year</label>
              <input
                type="number"
                id="graduationYear"
                name="graduationYear"
                value={profileData.graduationYear}
                onChange={handleInputChange}
                disabled={!isEditing}
                placeholder="e.g., 2020"
                min="1950"
                max="2030"
              />
            </div>

            <div className="form-group">
              <label htmlFor="cgpa">CGPA/GPA</label>
              <input
                type="text"
                id="cgpa"
                name="cgpa"
                value={profileData.cgpa}
                onChange={handleInputChange}
                disabled={!isEditing}
                placeholder="e.g., 3.5/4.0 or 8.5/10"
              />
            </div>

            <div className="form-group full-width">
              <label htmlFor="additionalEducation">Additional Education/Certifications</label>
              <textarea
                id="additionalEducation"
                name="additionalEducation"
                value={profileData.additionalEducation}
                onChange={handleInputChange}
                disabled={!isEditing}
                placeholder="List any additional certifications, courses, or training"
                rows="3"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
