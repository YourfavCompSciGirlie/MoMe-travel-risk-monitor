import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  FiEye,
  FiEyeOff,
  FiUser,
  FiAtSign,
  FiPhone,
  FiLock,
  FiAlertCircle
} from 'react-icons/fi';
import './SignUp.css';

const SignUp = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    surname: '',
    phone: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [showPassword, setShowPassword] = useState({
    password: false,
    confirmPassword: false
  });
  const [errors, setErrors] = useState({
    name: '',
    surname: '',
    phone: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [isFocused, setIsFocused] = useState({
    name: false,
    surname: false,
    phone: false,
    email: false,
    password: false,
    confirmPassword: false
  });

  const validateForm = () => {
    let valid = true;
    const newErrors = {
      name: '',
      surname: '',
      phone: '',
      email: '',
      password: '',
      confirmPassword: ''
    };

    // Name validation
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
      valid = false;
    } else if (formData.name.length < 2) {
      newErrors.name = 'Name must be at least 2 characters';
      valid = false;
    }

    // Surname validation
    if (!formData.surname.trim()) {
      newErrors.surname = 'Surname is required';
      valid = false;
    } else if (formData.surname.length < 2) {
      newErrors.surname = 'Surname must be at least 2 characters';
      valid = false;
    }

    // Phone validation (South African format)
    if (!formData.phone) {
      newErrors.phone = 'Phone number is required';
      valid = false;
    } else if (!/^\+27[0-9]{9}$/.test(formData.phone)) {
      newErrors.phone = 'Please enter a valid SA phone number (+27XXXXXXXXX)';
      valid = false;
    }

    // Email validation
    if (!formData.email) {
      newErrors.email = 'Email is required';
      valid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
      valid = false;
    }

    // Password validation
    if (!formData.password) {
      newErrors.password = 'Password is required';
      valid = false;
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
      valid = false;
    } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(formData.password)) {
      newErrors.password = 'Password must contain uppercase, lowercase and number';
      valid = false;
    }

    // Confirm password validation
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
      valid = false;
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    // Format phone number as user types
    if (name === 'phone') {
      let formattedValue = value;
      // Auto-insert +27 if user starts typing without it
      if (value.length === 1 && value !== '+') {
        formattedValue = `+27${value}`;
      }
      // Ensure only numbers after +27
      if (value.length > 3) {
        formattedValue = `+27${value.substring(3).replace(/\D/g, '')}`;
      }
      setFormData({ ...formData, [name]: formattedValue });
    } else {
      setFormData({ ...formData, [name]: value });
    }
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors({ ...errors, [name]: '' });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      // Simulate signup
      localStorage.setItem('token', 'dummy_token');
      navigate('/dashboard');
    }
  };

  const handleBlur = (field) => {
    setIsFocused({ ...isFocused, [field]: false });
    validateForm();
  };

  const togglePasswordVisibility = (field) => {
    setShowPassword({ ...showPassword, [field]: !showPassword[field] });
  };

  return (
    <div className="signup-container">
      <div className="bg-bubbles">
        <div className="bubble bubble-1"></div>
        <div className="bubble bubble-2"></div>
        <div className="bubble bubble-3"></div>
        <div className="bubble bubble-4"></div>
      </div>

      <div className="signup-card">
        <div className="signup-header">
          <h2>Create an Account</h2>
          <p>Join us today!</p>
        </div>

        <form onSubmit={handleSubmit} className="signup-form" noValidate>
          <div className="form-row">
            <div className={`form-group ${isFocused.name ? 'focused' : ''} ${errors.name ? 'error' : ''}`}>
              <label>Name</label>
              <div className="input-wrapper">
                <FiUser className="input-icon" />
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  onFocus={() => setIsFocused({ ...isFocused, name: true })}
                  onBlur={() => handleBlur('name')}
                  placeholder="Enter your name"
                  required
                />
              </div>
              {errors.name && (
                <div className="error-message">
                  <FiAlertCircle className="error-icon" />
                  <span>{errors.name}</span>
                </div>
              )}
            </div>

            <div className={`form-group ${isFocused.surname ? 'focused' : ''} ${errors.surname ? 'error' : ''}`}>
              <label>Surname</label>
              <div className="input-wrapper">
                <FiUser className="input-icon" />
                <input
                  type="text"
                  name="surname"
                  value={formData.surname}
                  onChange={handleChange}
                  onFocus={() => setIsFocused({ ...isFocused, surname: true })}
                  onBlur={() => handleBlur('surname')}
                  placeholder="Enter your surname"
                  required
                />
              </div>
              {errors.surname && (
                <div className="error-message">
                  <FiAlertCircle className="error-icon" />
                  <span>{errors.surname}</span>
                </div>
              )}
            </div>
          </div>

          <div className="form-row">
            <div className={`form-group ${isFocused.phone ? 'focused' : ''} ${errors.phone ? 'error' : ''}`}>
              <label>Phone Number</label>
              <div className="input-wrapper">
                <FiPhone className="input-icon" />
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  onFocus={() => setIsFocused({ ...isFocused, phone: true })}
                  onBlur={() => handleBlur('phone')}
                  placeholder="+27XXXXXXXXX"
                  required
                />
              </div>
              {errors.phone && (
                <div className="error-message">
                  <FiAlertCircle className="error-icon" />
                  <span>{errors.phone}</span>
                </div>
              )}
            </div>

            <div className={`form-group ${isFocused.email ? 'focused' : ''} ${errors.email ? 'error' : ''}`}>
              <label>Email</label>
              <div className="input-wrapper">
                <FiAtSign className="input-icon" />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
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
          </div>

          <div className="form-row">
            <div className={`form-group ${isFocused.password ? 'focused' : ''} ${errors.password ? 'error' : ''}`}>
              <label>Password</label>
              <div className="input-wrapper">
                <FiLock className="input-icon" />
                <input
                  type={showPassword.password ? 'text' : 'password'}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  onFocus={() => setIsFocused({ ...isFocused, password: true })}
                  onBlur={() => handleBlur('password')}
                  placeholder="Create a password"
                  required
                />
                <button
                  type="button"
                  className="password-toggle"
                  onClick={() => togglePasswordVisibility('password')}
                  aria-label={showPassword.password ? 'Hide password' : 'Show password'}
                >
                  {showPassword.password ? <FiEyeOff /> : <FiEye />}
                </button>
              </div>
              {errors.password && (
                <div className="error-message">
                  <FiAlertCircle className="error-icon" />
                  <span>{errors.password}</span>
                </div>
              )}
              <div className="password-hints">
                <span className={formData.password.length >= 6 ? 'valid' : ''}>• At least 6 characters</span>
                <span className={/(?=.*[a-z])/.test(formData.password) ? 'valid' : ''}>• Lowercase letter</span>
                <span className={/(?=.*[A-Z])/.test(formData.password) ? 'valid' : ''}>• Uppercase letter</span>
                <span className={/(?=.*\d)/.test(formData.password) ? 'valid' : ''}>• Number</span>
              </div>
            </div>

            <div className={`form-group ${isFocused.confirmPassword ? 'focused' : ''} ${errors.confirmPassword ? 'error' : ''}`}>
              <label>Confirm Password</label>
              <div className="input-wrapper">
                <FiLock className="input-icon" />
                <input
                  type={showPassword.confirmPassword ? 'text' : 'password'}
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  onFocus={() => setIsFocused({ ...isFocused, confirmPassword: true })}
                  onBlur={() => handleBlur('confirmPassword')}
                  placeholder="Confirm your password"
                  required
                />
                <button
                  type="button"
                  className="password-toggle"
                  onClick={() => togglePasswordVisibility('confirmPassword')}
                  aria-label={showPassword.confirmPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword.confirmPassword ? <FiEyeOff /> : <FiEye />}
                </button>
              </div>
              {errors.confirmPassword && (
                <div className="error-message">
                  <FiAlertCircle className="error-icon" />
                  <span>{errors.confirmPassword}</span>
                </div>
              )}
            </div>
          </div>

          <div className="form-options">
            <div className="terms-agreement">
              <input type="checkbox" id="terms" required />
              <label htmlFor="terms">I agree to the <Link to="/terms">Terms of Service</Link> and <Link to="/privacy">Privacy Policy</Link></label>
            </div>
          </div>

          <button type="submit" className="signup-button">
            Sign Up
          </button>
        </form>

        <div className="signup-footer">
          <p>
            Already have an account? <Link to="/login">Sign in</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUp;