import React from 'react';
import '../styles/ProfilePages.css';

const Settings = () => {
  return (
    <div className="profile-page">
      <div className="profile-container">
        <h1>Settings</h1>
        <div className="settings-options">
          <div className="setting-item">
            <h3>Account Settings</h3>
            <p>Manage your account preferences</p>
          </div>
          <div className="setting-item">
            <h3>Privacy Settings</h3>
            <p>Control your privacy options</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;