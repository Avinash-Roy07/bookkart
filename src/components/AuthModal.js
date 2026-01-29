import React, { useState } from 'react';
import { generateOTP, sendOTPEmail, storeOTP, verifyOTP } from '../services/emailService';
import '../styles/AuthModal.css';

const AuthModal = ({ isOpen, onClose, onLogin }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [showOtp, setShowOtp] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleEmailSubmit = async () => {
    if (!email) {
      setError('Please enter your email address');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError('Please enter a valid email address');
      return;
    }

    setLoading(true);
    setError('');

    if (isLogin) {
      const registeredUsers = JSON.parse(localStorage.getItem('registeredUsers') || '[]');
      const userExists = registeredUsers.some(user => user.email === email);
      
      if (!userExists) {
        setError('Email not registered. Please register first.');
        setLoading(false);
        return;
      }
    } else {
      const registeredUsers = JSON.parse(localStorage.getItem('registeredUsers') || '[]');
      const userExists = registeredUsers.some(user => user.email === email);
      
      if (userExists) {
        setError('Email already registered. Please login instead.');
        setLoading(false);
        return;
      }
    }

    const otpCode = generateOTP();
    const emailResult = await sendOTPEmail(email, otpCode);
    
    if (!emailResult.success) {
      setError(emailResult.message);
      setLoading(false);
      return;
    }
    
    storeOTP(email, otpCode);
    setShowOtp(true);
    setError('');
    setLoading(false);
  };

  const handleOtpSubmit = () => {
    if (!otp) {
      setError('Please enter the OTP');
      return;
    }

    // Verify real OTP
    const verificationResult = verifyOTP(email, otp);
    
    if (!verificationResult.success) {
      setError(verificationResult.message);
      return;
    }

    // Handle successful authentication
    if (isLogin) {
      localStorage.setItem('currentUser', email);
      onLogin(email);
    } else {
      const registeredUsers = JSON.parse(localStorage.getItem('registeredUsers') || '[]');
      registeredUsers.push({ email, registeredAt: new Date().toISOString() });
      localStorage.setItem('registeredUsers', JSON.stringify(registeredUsers));
      localStorage.setItem('currentUser', email);
      onLogin(email);
    }

    onClose();
    resetForm();
  };

  const resetForm = () => {
    setEmail('');
    setOtp('');
    setShowOtp(false);
    setError('');
    setLoading(false);
  };

  const handleClose = () => {
    onClose();
    resetForm();
  };

  const switchMode = () => {
    setIsLogin(!isLogin);
    resetForm();
  };

  return (
    <div className="auth-modal-overlay">
      <div className="auth-modal">
        <button className="close-btn" onClick={handleClose}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
        
        <div className="auth-content">
          <div className="auth-left">
            <h2>{isLogin ? 'Login' : 'Looks like you\'re new here!'}</h2>
            <p>
              {isLogin 
                ? 'Get access to your Orders, Wishlist and Recommendations' 
                : 'Sign up with your email to get started'
              }
            </p>
            <div className="auth-illustration">
              <div className="illustration-items">
                <div className="item laptop"></div>
                <div className="item heart"></div>
                <div className="item bag"></div>
                <div className="item star"></div>
              </div>
            </div>
          </div>

          <div className="auth-right">
            {!showOtp ? (
              <>
                <input
                  type="email"
                  placeholder="Enter Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="auth-input"
                />
                
                {error && <div className="error-message">{error}</div>}
                
                <p className="terms-text">
                  By continuing, you agree to BookKart's <a href="#">Terms of Use</a> and <a href="#">Privacy Policy</a>.
                </p>
                
                <button 
                  className="auth-btn primary"
                  onClick={handleEmailSubmit}
                  disabled={loading}
                >
                  {loading ? 'Sending OTP...' : 'Request OTP'}
                </button>
                
                <button className="auth-btn secondary" onClick={switchMode}>
                  {isLogin ? 'New to BookKart? Create an account' : 'Existing User? Log in'}
                </button>
              </>
            ) : (
              <>
                <div className="otp-section">
                  <div className="email-display">
                    <span>Email</span>
                    <span>{email}</span>
                    <button onClick={() => setShowOtp(false)}>Change?</button>
                  </div>
                  
                  <div className="otp-info">
                    <span>OTP sent to Email</span>
                    <button onClick={handleEmailSubmit} disabled={loading}>
                      {loading ? 'Sending...' : 'Resend?'}
                    </button>
                  </div>
                  
                  <input
                    type="text"
                    placeholder="Enter OTP"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    className="auth-input"
                    maxLength="6"
                  />
                  
                  {error && <div className="error-message">{error}</div>}
                  
                  <button className="auth-btn primary" onClick={handleOtpSubmit}>
                    {isLogin ? 'Login' : 'Signup'}
                  </button>
                  
                  <button className="auth-btn secondary" onClick={switchMode}>
                    {isLogin ? 'New to BookKart? Create an account' : 'Existing User? Log in'}
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthModal;