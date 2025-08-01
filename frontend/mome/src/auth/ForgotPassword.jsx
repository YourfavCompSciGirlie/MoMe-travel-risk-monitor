import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { FiAtSign, FiCheckCircle, FiAlertCircle, FiArrowLeft } from 'react-icons/fi';
import './ForgotPassword.css';

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const validateEmail = () => {
    if (!email) {
      setError('Email is required');
      return false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      setError('Please enter a valid email address');
      return false;
    }
    setError('');
    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateEmail()) {
      setIsLoading(true);
      // Simulate API call
      setTimeout(() => {
        setIsLoading(false);
        setIsSubmitted(true);
      }, 1500);
    }
  };

  const handleBlur = () => {
    setIsFocused(false);
    validateEmail();
  };

  return (
    <div className="forgot-password-container">
      <div className="bg-bubbles">
        <div className="bubble bubble-1"></div>
        <div className="bubble bubble-2"></div>
        <div className="bubble bubble-3"></div>
      </div>

      <div className="forgot-password-card">
        <button 
          className="back-button"
          onClick={() => navigate(-1)}
          aria-label="Go back"
        >
          <FiArrowLeft />
        </button>

        <div className="forgot-password-header">
          <h2>Forgot Password?</h2>
          <p>
            {isSubmitted 
              ? 'Check your email for further instructions'
              : 'Enter your email to reset your password'}
          </p>
        </div>

        {!isSubmitted ? (
          <form onSubmit={handleSubmit} className="forgot-password-form" noValidate>
            <div className={`form-group ${isFocused ? 'focused' : ''} ${error ? 'error' : ''}`}>
              <label>Email Address</label>
              <div className="input-wrapper">
                <FiAtSign className="input-icon" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (error) setError('');
                  }}
                  onFocus={() => setIsFocused(true)}
                  onBlur={handleBlur}
                  placeholder="Enter your email"
                  required
                  disabled={isLoading}
                />
              </div>
              {error && (
                <div className="error-message">
                  <FiAlertCircle className="error-icon" />
                  <span>{error}</span>
                </div>
              )}
            </div>

            <button 
              type="submit" 
              className="reset-button"
              disabled={isLoading}
            >
              {isLoading ? 'Sending...' : 'Reset Password'}
            </button>
          </form>
        ) : (
          <div className="success-message">
            <FiCheckCircle className="success-icon" />
            <p>We've sent password reset instructions to your email.</p>
            <p>Didn't receive the email? <button 
              type="button" 
              className="resend-link"
              onClick={() => setIsSubmitted(false)}
            >
              Resend
            </button></p>
          </div>
        )}

        <div className="forgot-password-footer">
          <p>
            Remember your password? <Link to="/login">Sign in</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;