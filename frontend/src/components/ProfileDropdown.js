import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import './ProfileDropdown.css';

const ProfileDropdown = () => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [profileData, setProfileData] = useState({
    empId: 'EMP001',
    name: 'ABC',
    email: 'abc@company.com',
    role: 'Junior Web Developer',
    profileImage: ''
  });
  const dropdownRef = useRef(null);

  // Load profile data from localStorage
  useEffect(() => {
    const savedProfile = localStorage.getItem('employeeProfile');
    if (savedProfile) {
      const parsedProfile = JSON.parse(savedProfile);
      setProfileData(prev => ({
        ...prev,
        ...parsedProfile
      }));
    }
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleProfileClick = () => {
    setIsOpen(!isOpen);
  };

  const handleEditProfile = () => {
    setIsOpen(false);
    // Check if we're currently on the appraisal page
    const currentPath = window.location.pathname;
    if (currentPath.includes('/appraisal')) {
      localStorage.setItem('fromAppraisal', 'true');
    }
    navigate('/profile');
  };

  const handleLogout = () => {
    // Clear any stored data
    localStorage.removeItem('leaveRequests');
    localStorage.removeItem('employeeProfile');
    // Navigate to login or home page
    navigate('/');
  };

  return (
    <div className="profile-dropdown-container" ref={dropdownRef}>
      <div className="profile-trigger" onClick={handleProfileClick}>
        {profileData.profileImage ? (
          <img 
            src={profileData.profileImage} 
            alt="Profile" 
            className="profile-image"
          />
        ) : (
          <div className="profile-initial">{profileData.name.charAt(0)}</div>
        )}
      </div>
      
      {isOpen && (
        <div className="profile-dropdown">
          <div className="profile-header">
            <div className="profile-info">
              <div className="profile-name">{profileData.name}</div>
              <div className="profile-role">{profileData.role}</div>
              <div className="profile-id">{profileData.empId}</div>
              <div className="profile-email">{profileData.email}</div>
            </div>
          </div>
          
          <div className="profile-actions">
            <button className="edit-profile-btn" onClick={handleEditProfile}>
              Edit Profile
            </button>
            <button className="logout-btn" onClick={handleLogout}>
              Logout
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfileDropdown;
