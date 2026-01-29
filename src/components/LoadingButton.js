import React from 'react';
import '../styles/LoadingButton.css';

const LoadingButton = ({ 
  children, 
  loading = false, 
  disabled = false, 
  className = '', 
  onClick,
  ...props 
}) => {
  return (
    <button 
      className={`loading-btn ${className} ${loading ? 'loading' : ''}`}
      disabled={disabled || loading}
      onClick={onClick}
      {...props}
    >
      {loading && <span className="btn-spinner"></span>}
      <span className={loading ? 'btn-text-loading' : 'btn-text'}>
        {children}
      </span>
    </button>
  );
};

export default LoadingButton;