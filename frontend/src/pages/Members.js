import React from 'react';
import './PageStyles.css';
import ProfileDropdown from '../components/ProfileDropdown';

const Members = () => {
  const members = [
    { name: 'Abhijeet', email: 'ceo@sumerudigital.com', role: 'CEO' },
    { name: 'Kiran', email: 'hr@sumerudigital.com', role: 'HR' },
    { name: 'Niharika', email: 'pm@sumerudigital.com', role: 'PM' },
    { name: 'Tushar', email: 'tushar@sumerudigital.com', role: 'Web Developer' },
    { name: 'Venkat', email: 'venkat@sumerudigital.com', role: 'Web Developer' },
    { name: 'Avinash', email: 'avinash@sumerudigital.com', role: 'Web Developer' },
    { name: 'Bharath', email: 'bharath@sumerudigital.com', role: 'Web Developer' },
    { name: 'Kaveri', email: 'kaveri@sumerudigital.com', role: 'Web Developer' },
    { name: 'Shreya', email: 'shreya@sumerudigital.com', role: 'Web Developer' },
    { name: 'Surbhi', email: 'surbhi@sumerudigital.com', role: 'Web Developer' },
    { name: 'Nivetha', email: 'nivetha@sumerudigital.com', role: 'PM' },
    { name: 'Saurav', email: 'saurav@sumerudigital.com', role: 'Web Developer' },
    { name: 'Chinmay', email: 'chinmay@sumerudigital.com', role: 'Web Developer' }
  ];

  return (
    <div className="page-container">
      <div className="members-header">
        <h1>Your Insights</h1>
        <div className="header-icons">
          <div className="notification-icon">
            🔔
          </div>
          <ProfileDropdown />
        </div>
      </div>
      
      <div className="members-table-container">
        <table className="members-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Mail id</th>
              <th>Role</th>
            </tr>
          </thead>
          <tbody>
            {members.map((member, index) => (
              <tr key={index} className={index % 2 === 0 ? 'even-row' : 'odd-row'}>
                <td>{member.name}</td>
                <td>{member.email}</td>
                <td>{member.role}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Members;
