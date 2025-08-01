import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  FiEye,
  FiEyeOff,
  FiAtSign,
  FiLock,
  FiAlertCircle
} from 'react-icons/fi';
import './Login.css';

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({ email: '', password: '' });
  const [isFocused, setIsFocused] = useState({
    email: false,
    password: false
  });

  const validateForm = () => {
    let valid = true;
    const newErrors = { email: '', password: '' };

    if (!email) {
      newErrors.email = 'Email is required';
      valid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Email is invalid';
      valid = false;
    }

    if (!password) {
      newErrors.password = 'Password is required';
      valid = false;
    } else if (password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      // Simulate login
      localStorage.setItem('token', 'dummy_token');
      navigate('/dashboard');
    }
  };

  const handleBlur = (field) => {
    setIsFocused({ ...isFocused, [field]: false });
    validateForm();
  };

  return (
    <div className="login-container">
      <div className="bg-bubbles">
        <div className="bubble bubble-1"></div>
        <div className="bubble bubble-2"></div>
        <div className="bubble bubble-3"></div>
      </div>

      <div className="login-card">
        <div className="login-header">
          <h2>Welcome Back</h2>
          <p>Please enter your credentials</p>
        </div>

        <form onSubmit={handleSubmit} className="login-form" noValidate>
          <div className={`form-group ${isFocused.email ? 'focused' : ''} ${errors.email ? 'error' : ''}`}>
            <label>Email</label>
            <div className="input-wrapper">
              <FiAtSign className="input-icon" />
              <input
                type="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (errors.email) setErrors({ ...errors, email: '' });
                }}
                onFocus={() => setIsFocused({ ...isFocused, email: true })}
                onBlur={() => handleBlur('email')}
                placeholder="Enter your email"
                required
              />
            </div>
            {errors.email && (
              <div className="error-message">
                <FiAlertCircle className="error-icon" />
                <span>{errors.email}</span>
              </div>
            )}
          </div>

          <div className={`form-group ${isFocused.password ? 'focused' : ''} ${errors.password ? 'error' : ''}`}>
            <label>Password</label>
            <div className="input-wrapper">
              <FiLock className="input-icon" />
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  if (errors.password) setErrors({ ...errors, password: '' });
                }}
                onFocus={() => setIsFocused({ ...isFocused, password: true })}
                onBlur={() => handleBlur('password')}
                placeholder="Enter your password"
                required
              />
              <button
                type="button"
                className="password-toggle"
                onClick={() => setShowPassword(!showPassword)}
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? <FiEyeOff /> : <FiEye />}
              </button>
            </div>
            {errors.password && (
              <div className="error-message">
                <FiAlertCircle className="error-icon" />
                <span>{errors.password}</span>
              </div>
            )}
          </div>

          <div className="form-options">
            <div className="remember-me">
              <input type="checkbox" id="remember" />
              <label htmlFor="remember">Remember me</label>
            </div>
            <Link to="/forgot-password" className="forgot-password">
              Forgot password?
            </Link>
          </div>

          <button type="submit" className="login-button">
            Sign In
          </button>
        </form>

        <div className="login-footer">
          <p>
            Don't have an account? <Link to="/signup">Sign up</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
