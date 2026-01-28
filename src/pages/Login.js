import React, { useState } from 'react';
import '../styles/Auth.css';

const Login = ({ onLogin, onClose, onSwitchToRegister }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simple validation
    if (formData.email && formData.password) {
      onLogin({
        name: formData.email.split('@')[0],
        email: formData.email
      });
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="auth-overlay">
      <div className="auth-modal">
        <button className="close-btn" onClick={onClose}>×</button>
        
        <div className="auth-header">
          <h2>Welcome Back</h2>
          <p>Sign in to your Ink & Leaf account</p>
        </div>

        <form onSubmit={handleSubmit} className="auth-form">
          <div className="form-group">
            <label>Email Address</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              required
            />
          </div>

          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password"
              required
            />
          </div>

          <button type="submit" className="auth-submit-btn">
            Sign In
          </button>
        </form>

        <div className="auth-footer">
          <p>
            Don't have an account?{' '}
            <button onClick={onSwitchToRegister} className="switch-auth-btn">
              Sign up here
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;