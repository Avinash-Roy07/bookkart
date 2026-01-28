import React, { useState } from 'react';
import { generateOTP, sendOTPEmail, storeOTP, verifyOTP } from '../services/emailService';
import '../styles/ProfilePages.css';

const Profile = () => {
  const user = localStorage.getItem('currentUser') || '';
  const [activeSection, setActiveSection] = useState('profile');
  const [isEditing, setIsEditing] = useState(false);
  const [showEmailOTP, setShowEmailOTP] = useState(false);
  const [emailOTP, setEmailOTP] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    firstName: 'abhi',
    lastName: 'raj',
    email: user || 'facthint@gmail.com',
    mobile: '+917369896771',
    gender: 'male'
  });

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleEmailEdit = async () => {
    if (!newEmail || newEmail === formData.email) {
      setError('Please enter a new email address');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(newEmail)) {
      setError('Please enter a valid email address');
      return;
    }

    setLoading(true);
    setError('');

    const otpCode = generateOTP();
    const emailResult = await sendOTPEmail(newEmail, otpCode);
    
    if (emailResult.success) {
      storeOTP(newEmail, otpCode);
      setShowEmailOTP(true);
      setError('');
    } else {
      setError(emailResult.message);
    }
    
    setLoading(false);
  };

  const handleEmailOTPVerify = () => {
    if (!emailOTP) {
      setError('Please enter the OTP');
      return;
    }

    const verificationResult = verifyOTP(newEmail, emailOTP);
    
    if (!verificationResult.success) {
      setError(verificationResult.message);
      return;
    }

    // Update email in formData and localStorage
    const oldEmail = formData.email;
    setFormData({ ...formData, email: newEmail });
    
    // Update registered users list
    const registeredUsers = JSON.parse(localStorage.getItem('registeredUsers') || '[]');
    const updatedUsers = registeredUsers.map(user => 
      user.email === oldEmail ? { ...user, email: newEmail } : user
    );
    localStorage.setItem('registeredUsers', JSON.stringify(updatedUsers));
    
    // Update current user
    localStorage.setItem('currentUser', newEmail);
    
    // Reset states
    setShowEmailOTP(false);
    setEmailOTP('');
    setNewEmail('');
    setError('');
    setIsEditing(false);
    
    alert('Email updated successfully! Please use your new email for future logins.');
  };

  const handleSave = () => {
    setIsEditing(false);
    setError('');
  };

  const renderContent = () => {
    switch(activeSection) {
      case 'profile':
        return (
          <div className="profile-content">
            <div className="profile-header">
              <h2>Personal Information</h2>
              <button className="edit-btn" onClick={() => isEditing ? handleSave() : setIsEditing(true)}>
                {isEditing ? 'Save' : 'Edit'}
              </button>
            </div>
            
            {error && <div className="error-message" style={{color: 'red', marginBottom: '15px'}}>{error}</div>}
            
            <div className="form-row">
              <div className="form-group">
                <label>First Name</label>
                <input 
                  type="text" 
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                  className="form-input"
                />
              </div>
              <div className="form-group">
                <label>Last Name</label>
                <input 
                  type="text" 
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                  className="form-input"
                />
              </div>
            </div>

            <div className="gender-section">
              <h3>Your Gender</h3>
              <div className="radio-group">
                <label className="radio-label">
                  <input 
                    type="radio" 
                    name="gender" 
                    value="male" 
                    checked={formData.gender === 'male'}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                  />
                  <span>Male</span>
                </label>
                <label className="radio-label">
                  <input 
                    type="radio" 
                    name="gender" 
                    value="female" 
                    checked={formData.gender === 'female'}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                  />
                  <span>Female</span>
                </label>
              </div>
            </div>

            <div className="contact-section">
              <div className="contact-item">
                <div className="contact-header">
                  <h3>Email Address</h3>
                  <button className="edit-link" onClick={() => setNewEmail(formData.email)}>Edit</button>
                </div>
                {!showEmailOTP ? (
                  <>
                    <input 
                      type="email" 
                      value={newEmail || formData.email}
                      onChange={(e) => setNewEmail(e.target.value)}
                      className="form-input"
                      placeholder="Enter new email"
                    />
                    <button 
                      className="verify-btn" 
                      onClick={handleEmailEdit}
                      disabled={loading}
                      style={{marginTop: '10px', padding: '8px 16px', background: '#2874f0', color: 'white', border: 'none', borderRadius: '4px'}}
                    >
                      {loading ? 'Sending OTP...' : 'Verify Email'}
                    </button>
                  </>
                ) : (
                  <>
                    <p>OTP sent to: {newEmail}</p>
                    <input 
                      type="text" 
                      placeholder="Enter OTP"
                      value={emailOTP}
                      onChange={(e) => setEmailOTP(e.target.value)}
                      className="form-input"
                      maxLength="6"
                    />
                    <button 
                      className="verify-btn" 
                      onClick={handleEmailOTPVerify}
                      style={{marginTop: '10px', padding: '8px 16px', background: '#2874f0', color: 'white', border: 'none', borderRadius: '4px'}}
                    >
                      Verify OTP
                    </button>
                  </>
                )}
              </div>

              <div className="contact-item">
                <div className="contact-header">
                  <h3>Mobile Number</h3>
                  <button className="edit-link">Edit</button>
                </div>
                <input 
                  type="tel" 
                  name="mobile"
                  value={formData.mobile}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                  className="form-input"
                />
              </div>
            </div>

            <div className="faq-section">
              <h3>FAQs</h3>
              <div className="faq-item">
                <h4>What happens when I update my email address (or mobile number)?</h4>
                <p>Your login email id (or mobile number) changes, likewise. You'll receive all your account related communication on your updated email address (or mobile number).</p>
              </div>
              <div className="faq-item">
                <h4>When will my BookKart account be updated with the new email address (or mobile number)?</h4>
                <p>It happens as soon as you confirm the verification code sent to your email (or mobile) and save the changes.</p>
              </div>
              <div className="faq-item">
                <h4>What happens to my existing BookKart account when I update my email address (or mobile number)?</h4>
                <p>Updating your email address (or mobile number) doesn't invalidate your account. Your account remains fully functional. You'll continue seeing your Order history, saved information and personal details.</p>
              </div>
              <div className="faq-item">
                <h4>Does my Seller account get affected when I update my email address?</h4>
                <p>BookKart has a 'single sign-on' policy. Any changes will reflect in your Seller account also.</p>
              </div>
            </div>

            <div className="account-actions">
              <button className="deactivate-btn">Deactivate Account</button>
              <button className="delete-btn">Delete Account</button>
            </div>
          </div>
        );
      case 'addresses':
        return <div className="section-content">Manage Addresses</div>;
      default:
        return <div className="section-content">Select a section</div>;
    }
  };

  return (
    <div className="profile-page-new">
      <div className="profile-container-new">
        <div className="sidebar">
          <div className="user-info">
            <div className="user-avatar">
              <div className="avatar-circle">
                <span>👤</span>
              </div>
            </div>
            <div className="user-details">
              <p className="greeting">Hello,</p>
              <h3 className="user-name">Abhi Raj</h3>
            </div>
          </div>

          <div className="menu-section">
            <div className="menu-item" onClick={() => setActiveSection('orders')}>
              <span className="menu-icon">📦</span>
              <span className="menu-text">MY ORDERS</span>
              <span className="menu-arrow">›</span>
            </div>
          </div>

          <div className="menu-section">
            <div className="menu-header">
              <span className="menu-icon">👤</span>
              <span className="menu-text">ACCOUNT SETTINGS</span>
            </div>
            <div className="submenu">
              <div 
                className={`submenu-item ${activeSection === 'profile' ? 'active' : ''}`}
                onClick={() => setActiveSection('profile')}
              >
                Profile Information
              </div>
              <div 
                className={`submenu-item ${activeSection === 'addresses' ? 'active' : ''}`}
                onClick={() => setActiveSection('addresses')}
              >
                Manage Addresses
              </div>
            </div>
          </div>

          <div className="menu-section">
            <div className="menu-item logout" onClick={() => window.location.href = '/'}>
              <span className="menu-icon">🚪</span>
              <span className="menu-text">Logout</span>
            </div>
          </div>

          <div className="frequently-visited">
            <h4>Frequently Visited:</h4>
            <div className="visited-links">
              <a href="#">Track Order</a>
              <a href="#">Help Center</a>
            </div>
          </div>
        </div>

        <div className="main-content">
          {renderContent()}
        </div>
      </div>
    </div>
  );
};

export default Profile;