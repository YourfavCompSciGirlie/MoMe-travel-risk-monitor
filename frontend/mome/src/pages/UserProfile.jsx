import React, { useState } from 'react';
import {
  FiUser,
  FiTruck,
  FiMapPin,
  FiLock,
  FiEdit,
  FiSave,
  FiEye,
  FiEyeOff,
  FiX
} from 'react-icons/fi';
import { FaCar } from 'react-icons/fa';
import './UserProfile.css';

const UserProfile = () => {
  const [profile, setProfile] = useState({
    name: 'John',
    surname: 'Doe',
    vehicle: 'Toyota',
    vehicleModel: 'Corolla',
    vehicleYear: '2020',
    area: 'Johannesburg',
  });

  const [password, setPassword] = useState({
    current: '',
    new: '',
    confirm: ''
  });

  const [errors, setErrors] = useState({});
  const [isEditing, setIsEditing] = useState(false);
  const [showPasswordForm, setShowPasswordForm] = useState(false);
  const [showPasswords, setShowPasswords] = useState({
    current: false,
    new: false,
    confirm: false
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfile({ ...profile, [name]: value });
  };

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPassword({ ...password, [name]: value });
  };

  const togglePasswordVisibility = (field) => {
    setShowPasswords({ ...showPasswords, [field]: !showPasswords[field] });
  };

  const validateProfile = () => {
    const newErrors = {};
    if (!profile.name) newErrors.name = 'Name is required';
    if (!profile.surname) newErrors.surname = 'Surname is required';
    if (!profile.vehicle) newErrors.vehicle = 'Vehicle is required';
    if (!profile.vehicleModel) newErrors.vehicleModel = 'Model is required';
    if (!profile.vehicleYear) newErrors.vehicleYear = 'Year is required';
    if (!profile.area) newErrors.area = 'Area is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validatePassword = () => {
    const newErrors = {};
    if (!password.current) newErrors.current = 'Current password is required';
    if (!password.new) newErrors.new = 'New password is required';
    else if (password.new.length < 6) newErrors.new = 'Password must be at least 6 characters';
    if (password.new !== password.confirm) newErrors.confirm = 'Passwords do not match';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSaveProfile = (e) => {
    e.preventDefault();
    if (validateProfile()) {
      setIsEditing(false);
    }
  };

  const handleChangePassword = (e) => {
    e.preventDefault();
    if (validatePassword()) {
      setShowPasswordForm(false);
      setPassword({ current: '', new: '', confirm: '' });
      alert('Password changed successfully!');
    }
  };

  return (
    <div className="profile-container">
      <div className="bg-bubbles">
        {[...Array(8)].map((_, i) => (
          <div 
            key={i}
            className={`bubble bubble-${i + 1}`}
            style={{
              animationDuration: `${15 + Math.random() * 10}s`,
              animationDelay: `${Math.random() * 5}s`
            }}
          ></div>
        ))}
      </div>

      <div className="profile-card">
        <div className="profile-header">
          <div className="profile-avatar">
            <FiUser size={40} />
          </div>
          <h2>User Profile</h2>
          <p>Manage your personal information and settings</p>
        </div>

        <form onSubmit={handleSaveProfile} className="profile-form">
          <div className="form-row">
            <div className={`form-group ${errors.name ? 'error' : ''}`}>
              <label>First Name</label>
              <div className="input-container">
                <FiUser className="input-icon" />
                {isEditing ? (
                  <input
                    type="text"
                    name="name"
                    value={profile.name}
                    onChange={handleInputChange}
                    placeholder="Enter your name"
                  />
                ) : (
                  <div className="profile-value">{profile.name}</div>
                )}
              </div>
              {errors.name && <span className="error-message">{errors.name}</span>}
            </div>

            <div className={`form-group ${errors.surname ? 'error' : ''}`}>
              <label>Last Name</label>
              <div className="input-container">
                <FiUser className="input-icon" />
                {isEditing ? (
                  <input
                    type="text"
                    name="surname"
                    value={profile.surname}
                    onChange={handleInputChange}
                    placeholder="Enter your surname"
                  />
                ) : (
                  <div className="profile-value">{profile.surname}</div>
                )}
              </div>
              {errors.surname && <span className="error-message">{errors.surname}</span>}
            </div>
          </div>

          <div className="form-row">
            <div className={`form-group ${errors.vehicle ? 'error' : ''}`}>
              <label>Vehicle Make</label>
              <div className="input-container">
                <FaCar className="input-icon" />
                {isEditing ? (
                  <input
                    type="text"
                    name="vehicle"
                    value={profile.vehicle}
                    onChange={handleInputChange}
                    placeholder="Enter vehicle make"
                  />
                ) : (
                  <div className="profile-value">{profile.vehicle}</div>
                )}
              </div>
              {errors.vehicle && <span className="error-message">{errors.vehicle}</span>}
            </div>

            <div className={`form-group ${errors.vehicleModel ? 'error' : ''}`}>
              <label>Vehicle Model</label>
              <div className="input-container">
                <FiTruck className="input-icon" />
                {isEditing ? (
                  <input
                    type="text"
                    name="vehicleModel"
                    value={profile.vehicleModel}
                    onChange={handleInputChange}
                    placeholder="Enter vehicle model"
                  />
                ) : (
                  <div className="profile-value">{profile.vehicleModel}</div>
                )}
              </div>
              {errors.vehicleModel && <span className="error-message">{errors.vehicleModel}</span>}
            </div>
          </div>

          <div className="form-row">
            <div className={`form-group ${errors.vehicleYear ? 'error' : ''}`}>
              <label>Year</label>
              <div className="input-container">
                <FiTruck className="input-icon" />
                {isEditing ? (
                  <input
                    type="text"
                    name="vehicleYear"
                    value={profile.vehicleYear}
                    onChange={handleInputChange}
                    placeholder="Enter vehicle year"
                  />
                ) : (
                  <div className="profile-value">{profile.vehicleYear}</div>
                )}
              </div>
              {errors.vehicleYear && <span className="error-message">{errors.vehicleYear}</span>}
            </div>

            <div className={`form-group ${errors.area ? 'error' : ''}`}>
              <label>Area of Residence</label>
              <div className="input-container">
                <FiMapPin className="input-icon" />
                {isEditing ? (
                  <input
                    type="text"
                    name="area"
                    value={profile.area}
                    onChange={handleInputChange}
                    placeholder="Enter your area"
                  />
                ) : (
                  <div className="profile-value">{profile.area}</div>
                )}
              </div>
              {errors.area && <span className="error-message">{errors.area}</span>}
            </div>
          </div>

          <div className="profile-actions">
            {!isEditing ? (
              <button
                type="button"
                className="edit-button"
                onClick={() => setIsEditing(true)}
              >
                <FiEdit /> Edit Profile
              </button>
            ) : (
              <div className="edit-actions">
                <button type="submit" className="save-button">
                  <FiSave /> Save Changes
                </button>
                <button
                  type="button"
                  className="cancel-button"
                  onClick={() => {
                    setIsEditing(false);
                    setErrors({});
                  }}
                >
                  <FiX /> Cancel
                </button>
              </div>
            )}
          </div>
        </form>

        {!showPasswordForm ? (
          <div className="password-section">
            <button
              className="change-password-button"
              onClick={() => setShowPasswordForm(true)}
            >
              <FiLock /> Change Password
            </button>
          </div>
        ) : (
          <form onSubmit={handleChangePassword} className="password-form">
            <h3>
              <FiLock className="form-icon" /> Change Password
            </h3>

            <div className={`form-group ${errors.current ? 'error' : ''}`}>
              <label>Current Password</label>
              <div className="input-container">
                <FiLock className="input-icon" />
                <input
                  type={showPasswords.current ? 'text' : 'password'}
                  name="current"
                  value={password.current}
                  onChange={handlePasswordChange}
                  placeholder="Enter current password"
                />
                <button
                  type="button"
                  className="password-toggle"
                  onClick={() => togglePasswordVisibility('current')}
                >
                  {showPasswords.current ? <FiEyeOff /> : <FiEye />}
                </button>
              </div>
              {errors.current && <span className="error-message">{errors.current}</span>}
            </div>

            <div className={`form-group ${errors.new ? 'error' : ''}`}>
              <label>New Password</label>
              <div className="input-container">
                <FiLock className="input-icon" />
                <input
                  type={showPasswords.new ? 'text' : 'password'}
                  name="new"
                  value={password.new}
                  onChange={handlePasswordChange}
                  placeholder="Enter new password"
                />
                <button
                  type="button"
                  className="password-toggle"
                  onClick={() => togglePasswordVisibility('new')}
                >
                  {showPasswords.new ? <FiEyeOff /> : <FiEye />}
                </button>
              </div>
              {errors.new && <span className="error-message">{errors.new}</span>}
            </div>

            <div className={`form-group ${errors.confirm ? 'error' : ''}`}>
              <label>Confirm Password</label>
              <div className="input-container">
                <FiLock className="input-icon" />
                <input
                  type={showPasswords.confirm ? 'text' : 'password'}
                  name="confirm"
                  value={password.confirm}
                  onChange={handlePasswordChange}
                  placeholder="Confirm new password"
                />
                <button
                  type="button"
                  className="password-toggle"
                  onClick={() => togglePasswordVisibility('confirm')}
                >
                  {showPasswords.confirm ? <FiEyeOff /> : <FiEye />}
                </button>
              </div>
              {errors.confirm && <span className="error-message">{errors.confirm}</span>}
            </div>

            <div className="password-form-actions">
              <button type="submit" className="save-button">
                <FiSave /> Update Password
              </button>
              <button
                type="button"
                className="cancel-button"
                onClick={() => {
                  setShowPasswordForm(false);
                  setErrors({});
                  setPassword({ current: '', new: '', confirm: '' });
                }}
              >
                <FiX /> Cancel
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default UserProfile;