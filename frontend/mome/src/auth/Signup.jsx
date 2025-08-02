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
  const [message, setMessage] = useState('');

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/api/auth/register', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          surname: formData.surname,
          phone_number: formData.phone,
          email: formData.email,
          password: formData.password
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        setMessage(`Registration failed: ${result.message || result.error}`);
      } else {
        setMessage('Registration successful! Redirecting...');
        setTimeout(() => {
          navigate('/dashboard');
        }, 2000);
      }
    } catch (err) {
      console.error('Network or server error:', err);
      setMessage('Server error. Please try again later.');
    }
  };

  const handleBlur = (field) => {
    setIsFocused({ ...isFocused, [field]: false });
    validateForm();
  };

  const togglePasswordVisibility = (field) => {
    setShowPassword({ ...showPassword, [field]: !showPassword[field] });
  };

  // Styles
  const styles = {
    signupContainer: {
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
    bubble4: {
      width: '120px',
      height: '120px',
      top: '30%',
      right: '10%'
    },
    signupCard: {
      position: 'relative',
      width: '100%',
      maxWidth: '520px',
      background: 'rgba(255, 255, 255, 0.15)',
      borderRadius: '16px',
      boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)',
      padding: '40px',
      backdropFilter: 'blur(8px)',
      WebkitBackdropFilter: 'blur(8px)',
      border: '1px solid rgba(255, 255, 255, 0.2)',
      zIndex: 1
    },
    signupHeader: {
      textAlign: 'center',
      marginBottom: '32px'
    },
    signupHeaderH2: {
      color: '#FFFFFF',
      fontSize: '28px',
      fontWeight: 600,
      marginBottom: '8px'
    },
    signupHeaderP: {
      color: 'rgba(255, 255, 255, 0.8)',
      fontSize: '14px'
    },
    signupForm: {
      display: 'flex',
      flexDirection: 'column',
      gap: '20px'
    },
    formRow: {
      display: 'flex',
      gap: '20px'
    },
    formGroup: {
      position: 'relative',
      flex: 1
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
      backdropFilter: 'blur(5px)'
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
    passwordHints: {
      display: 'flex',
      flexWrap: 'wrap',
      gap: '8px',
      marginTop: '8px'
    },
    passwordHint: {
      fontSize: '12px',
      color: 'rgba(255, 255, 255, 0.6)'
    },
    passwordHintValid: {
      color: '#a2bd39'
    },
    formOptions: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      margin: '10px 0'
    },
    termsAgreement: {
      display: 'flex',
      alignItems: 'center',
      fontSize: '13px',
      color: 'rgba(255, 255, 255, 0.8)'
    },
    termsLink: {
      color: 'white',
      textDecoration: 'none',
      margin: '0 4px'
    },
    signupButton: {
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
    signupFooter: {
      textAlign: 'center',
      marginTop: '24px',
      paddingTop: '16px',
      borderTop: '1px solid rgba(255, 255, 255, 0.2)'
    },
    signupFooterP: {
      color: 'rgba(255, 255, 255, 0.7)',
      fontSize: '14px'
    },
    signupFooterA: {
      color: 'white',
      textDecoration: 'none',
      fontWeight: 500
    },
    message: {
      textAlign: 'center',
      margin: '10px 0',
      color: '#FFFFFF',
      fontSize: '14px'
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
    <div style={styles.signupContainer}>
      {/* Add the style tag for placeholder styling */}
      <style>{placeholderStyles}</style>
      
      <div style={styles.bgBubbles}>
        <div style={{...styles.bubble, ...styles.bubble1}}></div>
        <div style={{...styles.bubble, ...styles.bubble2}}></div>
        <div style={{...styles.bubble, ...styles.bubble3}}></div>
        <div style={{...styles.bubble, ...styles.bubble4}}></div>
      </div>

      <div style={styles.signupCard}>
        <div style={styles.signupHeader}>
          <h2 style={styles.signupHeaderH2}>Create an Account</h2>
          <p style={styles.signupHeaderP}>Join us today!</p>
        </div>

        {message && <div style={styles.message}>{message}</div>}

        <form onSubmit={handleSubmit} style={styles.signupForm} noValidate>
          <div style={styles.formRow}>
            <div style={styles.formGroup}>
              <label style={styles.formLabel}>Name</label>
              <div style={styles.inputWrapper}>
                <FiUser style={styles.inputIcon} />
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  onFocus={() => setIsFocused({ ...isFocused, name: true })}
                  onBlur={() => handleBlur('name')}
                  placeholder="Enter your name"
                  required
                  style={{
                    ...styles.inputField,
                    ...(isFocused.name ? styles.inputFieldFocused : {}),
                    ...(errors.name ? styles.inputFieldError : {})
                  }}
                />
              </div>
              {errors.name && (
                <div style={styles.errorMessage}>
                  <FiAlertCircle style={styles.errorIcon} />
                  <span>{errors.name}</span>
                </div>
              )}
            </div>

            <div style={styles.formGroup}>
              <label style={styles.formLabel}>Surname</label>
              <div style={styles.inputWrapper}>
                <FiUser style={styles.inputIcon} />
                <input
                  type="text"
                  name="surname"
                  value={formData.surname}
                  onChange={handleChange}
                  onFocus={() => setIsFocused({ ...isFocused, surname: true })}
                  onBlur={() => handleBlur('surname')}
                  placeholder="Enter your surname"
                  required
                  style={{
                    ...styles.inputField,
                    ...(isFocused.surname ? styles.inputFieldFocused : {}),
                    ...(errors.surname ? styles.inputFieldError : {})
                  }}
                />
              </div>
              {errors.surname && (
                <div style={styles.errorMessage}>
                  <FiAlertCircle style={styles.errorIcon} />
                  <span>{errors.surname}</span>
                </div>
              )}
            </div>
          </div>

          <div style={styles.formRow}>
            <div style={styles.formGroup}>
              <label style={styles.formLabel}>Phone Number</label>
              <div style={styles.inputWrapper}>
                <FiPhone style={styles.inputIcon} />
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  onFocus={() => setIsFocused({ ...isFocused, phone: true })}
                  onBlur={() => handleBlur('phone')}
                  placeholder="+27XXXXXXXXX"
                  required
                  style={{
                    ...styles.inputField,
                    ...(isFocused.phone ? styles.inputFieldFocused : {}),
                    ...(errors.phone ? styles.inputFieldError : {})
                  }}
                />
              </div>
              {errors.phone && (
                <div style={styles.errorMessage}>
                  <FiAlertCircle style={styles.errorIcon} />
                  <span>{errors.phone}</span>
                </div>
              )}
            </div>

            <div style={styles.formGroup}>
              <label style={styles.formLabel}>Email</label>
              <div style={styles.inputWrapper}>
                <FiAtSign style={styles.inputIcon} />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
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
          </div>

          <div style={styles.formRow}>
            <div style={styles.formGroup}>
              <label style={styles.formLabel}>Password</label>
              <div style={styles.inputWrapper}>
                <FiLock style={styles.inputIcon} />
                <input
                  type={showPassword.password ? 'text' : 'password'}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  onFocus={() => setIsFocused({ ...isFocused, password: true })}
                  onBlur={() => handleBlur('password')}
                  placeholder="Create a password"
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
                  onClick={() => togglePasswordVisibility('password')}
                  aria-label={showPassword.password ? 'Hide password' : 'Show password'}
                >
                  {showPassword.password ? <FiEyeOff /> : <FiEye />}
                </button>
              </div>
              {errors.password && (
                <div style={styles.errorMessage}>
                  <FiAlertCircle style={styles.errorIcon} />
                  <span>{errors.password}</span>
                </div>
              )}
              <div style={styles.passwordHints}>
                <span style={{
                  ...styles.passwordHint,
                  ...(formData.password.length >= 6 ? styles.passwordHintValid : {})
                }}>• At least 6 characters</span>
                <span style={{
                  ...styles.passwordHint,
                  ...(/(?=.*[a-z])/.test(formData.password) ? styles.passwordHintValid : {})
                }}>• Lowercase letter</span>
                <span style={{
                  ...styles.passwordHint,
                  ...(/(?=.*[A-Z])/.test(formData.password) ? styles.passwordHintValid : {})
                }}>• Uppercase letter</span>
                <span style={{
                  ...styles.passwordHint,
                  ...(/(?=.*\d)/.test(formData.password) ? styles.passwordHintValid : {})
                }}>• Number</span>
              </div>
            </div>

            <div style={styles.formGroup}>
              <label style={styles.formLabel}>Confirm Password</label>
              <div style={styles.inputWrapper}>
                <FiLock style={styles.inputIcon} />
                <input
                  type={showPassword.confirmPassword ? 'text' : 'password'}
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  onFocus={() => setIsFocused({ ...isFocused, confirmPassword: true })}
                  onBlur={() => handleBlur('confirmPassword')}
                  placeholder="Confirm your password"
                  required
                  style={{
                    ...styles.inputField,
                    ...(isFocused.confirmPassword ? styles.inputFieldFocused : {}),
                    ...(errors.confirmPassword ? styles.inputFieldError : {})
                  }}
                />
                <button
                  type="button"
                  style={styles.passwordToggle}
                  onClick={() => togglePasswordVisibility('confirmPassword')}
                  aria-label={showPassword.confirmPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword.confirmPassword ? <FiEyeOff /> : <FiEye />}
                </button>
              </div>
              {errors.confirmPassword && (
                <div style={styles.errorMessage}>
                  <FiAlertCircle style={styles.errorIcon} />
                  <span>{errors.confirmPassword}</span>
                </div>
              )}
            </div>
          </div>

          <div style={styles.formOptions}>
            <div style={styles.termsAgreement}>
              <input type="checkbox" id="terms" required />
              <label htmlFor="terms">I agree to the <Link to="/terms" style={styles.termsLink}>Terms of Service</Link> and <Link to="/privacy" style={styles.termsLink}>Privacy Policy</Link></label>
            </div>
          </div>

          <button type="submit" style={styles.signupButton}>
            Sign Up
          </button>
        </form>

        <div style={styles.signupFooter}>
          <p style={styles.signupFooterP}>
            Already have an account? <Link to="/login" style={styles.signupFooterA}>Sign in</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUp;