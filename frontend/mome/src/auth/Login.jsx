import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  FiEye,
  FiEyeOff,
  FiAtSign,
  FiLock,
  FiAlertCircle
} from 'react-icons/fi';

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

  // Styles
  const styles = {
    loginContainer: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #10367D 0%, #1a4b9d 100%)',
      padding: '20px',
      position: 'relative',
      overflow: 'hidden'
    },
    bgBubbles: {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      zIndex: 0
    },
    bubble: {
      position: 'absolute',
      borderRadius: '50%',
      background: 'rgba(255, 255, 255, 0.1)',
      backdropFilter: 'blur(5px)'
    },
    bubble1: {
      width: '150px',
      height: '150px',
      top: '20%',
      left: '10%'
    },
    bubble2: {
      width: '250px',
      height: '250px',
      bottom: '10%',
      right: '15%'
    },
    bubble3: {
      width: '80px',
      height: '80px',
      top: '60%',
      left: '70%'
    },
    loginCard: {
      position: 'relative',
      width: '100%',
      maxWidth: '420px',
      background: 'rgba(255, 255, 255, 0.15)',
      borderRadius: '16px',
      boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)',
      padding: '40px',
      backdropFilter: 'blur(8px)',
      WebkitBackdropFilter: 'blur(8px)',
      border: '1px solid rgba(255, 255, 255, 0.2)',
      zIndex: 1
    },
    loginHeader: {
      textAlign: 'center',
      marginBottom: '32px'
    },
    loginHeaderH2: {
      color: '#FFFFFF',
      fontSize: '28px',
      fontWeight: 600,
      marginBottom: '8px'
    },
    loginHeaderP: {
      color: 'rgba(255, 255, 255, 0.8)',
      fontSize: '14px'
    },
    loginForm: {
      display: 'flex',
      flexDirection: 'column',
      gap: '20px'
    },
    formGroup: {
      position: 'relative'
    },
    formLabel: {
      display: 'block',
      marginBottom: '8px',
      color: 'rgba(255, 255, 255, 0.9)',
      fontSize: '14px',
      fontWeight: 500
    },
    inputWrapper: {
      position: 'relative',
      display: 'flex',
      alignItems: 'center'
    },
    inputIcon: {
      position: 'absolute',
      left: '16px',
      top: '50%',
      transform: 'translateY(-50%)',
      color: '#FFFFFF',
      fontSize: '18px',
      opacity: 0.8,
      pointerEvents: 'none'
    },
    inputField: {
      width: '100%',
      padding: '14px 44px 14px 44px',
      border: '1px solid rgba(255, 255, 255, 0.3)',
      borderRadius: '8px',
      fontSize: '14px',
      color: '#FFFFFF',
      transition: 'all 0.3s ease',
      background: 'rgba(255, 255, 255, 0.1)',
      backdropFilter: 'blur(5px)',
      // Add placeholder styling
      '::placeholder': {
        color: 'rgba(255, 255, 255, 0.7)',
        opacity: 1
      },
      ':-ms-input-placeholder': {
        color: 'rgba(255, 255, 255, 0.7)'
      },
      '::-ms-input-placeholder': {
        color: 'rgba(255, 255, 255, 0.7)'
      }
    },
    inputFieldError: {
      borderColor: '#FF6B6B',
      paddingRight: '44px'
    },
    inputFieldFocused: {
      outline: 'none',
      borderColor: '#a2bd39',
      boxShadow: '0 0 0 3px rgba(165, 206, 0, 0.2)',
      background: 'rgba(255, 255, 255, 0.2)'
    },
    passwordToggle: {
      position: 'absolute',
      right: '16px',
      top: '50%',
      transform: 'translateY(-50%)',
      background: 'none',
      border: 'none',
      color: '#FFFFFF',
      opacity: 0.7,
      cursor: 'pointer',
      fontSize: '18px',
      padding: 0,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    },
    errorMessage: {
      display: 'flex',
      alignItems: 'center',
      marginTop: '8px',
      color: '#FF6B6B',
      fontSize: '12px',
      fontWeight: 500
    },
    errorIcon: {
      marginRight: '6px',
      fontSize: '14px',
      color: '#FF6B6B'
    },
    formOptions: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      margin: '10px 0'
    },
    rememberMe: {
      display: 'flex',
      alignItems: 'center'
    },
    rememberMeLabel: {
      color: 'rgba(255, 255, 255, 0.8)',
      fontSize: '13px'
    },
    forgotPassword: {
      color: 'white',
      fontSize: '13px',
      textDecoration: 'none',
      transition: 'color 0.2s'
    },
    loginButton: {
      width: '100%',
      padding: '14px',
      backgroundColor: '#a2bd39',
      color: 'white',
      border: 'none',
      borderRadius: '8px',
      fontSize: '16px',
      fontWeight: 600,
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      marginTop: '10px'
    },
    loginFooter: {
      textAlign: 'center',
      marginTop: '24px',
      paddingTop: '16px',
      borderTop: '1px solid rgba(255, 255, 255, 0.2)'
    },
    loginFooterP: {
      color: 'rgba(255, 255, 255, 0.7)',
      fontSize: '14px'
    },
    loginFooterA: {
      color: 'white',
      textDecoration: 'none',
      fontWeight: 500
    }
  };

  // Since inline styles don't support pseudo-elements like ::placeholder,
  // we'll create a style tag for the placeholder styles
  const placeholderStyles = `
    input::placeholder {
      color: rgba(255, 255, 255, 0.7) !important;
    }
    input:-ms-input-placeholder {
      color: rgba(255, 255, 255, 0.7) !important;
    }
    input::-ms-input-placeholder {
      color: rgba(255, 255, 255, 0.7) !important;
    }
  `;

  return (
    <div style={styles.loginContainer}>
      {/* Add the style tag for placeholder styling */}
      <style>{placeholderStyles}</style>
      
      <div style={styles.bgBubbles}>
        <div style={{...styles.bubble, ...styles.bubble1}}></div>
        <div style={{...styles.bubble, ...styles.bubble2}}></div>
        <div style={{...styles.bubble, ...styles.bubble3}}></div>
      </div>

      <div style={styles.loginCard}>
        <div style={styles.loginHeader}>
          <h2 style={styles.loginHeaderH2}>Welcome Back</h2>
          <p style={styles.loginHeaderP}>Please enter your credentials</p>
        </div>

        <form onSubmit={handleSubmit} style={styles.loginForm} noValidate>
          <div style={styles.formGroup}>
            <label style={styles.formLabel}>Email</label>
            <div style={styles.inputWrapper}>
              <FiAtSign style={styles.inputIcon} />
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
                style={{
                  ...styles.inputField,
                  ...(isFocused.email ? styles.inputFieldFocused : {}),
                  ...(errors.email ? styles.inputFieldError : {})
                }}
              />
            </div>
            {errors.email && (
              <div style={styles.errorMessage}>
                <FiAlertCircle style={styles.errorIcon} />
                <span>{errors.email}</span>
              </div>
            )}
          </div>

          <div style={styles.formGroup}>
            <label style={styles.formLabel}>Password</label>
            <div style={styles.inputWrapper}>
              <FiLock style={styles.inputIcon} />
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
                style={{
                  ...styles.inputField,
                  ...(isFocused.password ? styles.inputFieldFocused : {}),
                  ...(errors.password ? styles.inputFieldError : {})
                }}
              />
              <button
                type="button"
                style={styles.passwordToggle}
                onClick={() => setShowPassword(!showPassword)}
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? <FiEyeOff /> : <FiEye />}
              </button>
            </div>
            {errors.password && (
              <div style={styles.errorMessage}>
                <FiAlertCircle style={styles.errorIcon} />
                <span>{errors.password}</span>
              </div>
            )}
          </div>

          <div style={styles.formOptions}>
            <div style={styles.rememberMe}>
              <input type="checkbox" id="remember" />
              <label htmlFor="remember" style={styles.rememberMeLabel}>Remember me</label>
            </div>
            <Link to="/forgot-password" style={styles.forgotPassword}>
              Forgot password?
            </Link>
          </div>

          <button type="submit" style={styles.loginButton}>
            Sign In
          </button>
        </form>

        <div style={styles.loginFooter}>
          <p style={styles.loginFooterP}>
            Don't have an account? <Link to="/signup" style={styles.loginFooterA}>Sign up</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;