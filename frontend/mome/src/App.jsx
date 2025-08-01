// App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

// Auth Pages
import Login from './auth/Login';
import Signup from './auth/Signup';
import ForgotPassword from './auth/ForgotPassword';

// App Pages
import AboutPage from './pages/AboutPage';
import AlertHistoryPage from './pages/AlertHistoryPage';
import Dashboard from './pages/Dashboard';
import RewardsPage from './pages/RewardsPage';
import RouteSimulationPage from './pages/RouteSimulationPage';
import UserProfile from './pages/UserProfile';
import VehicleSettings from './pages/VehicleSettings';


const App = () => {
  const isAuthenticated = () => {
    return !!localStorage.getItem('token'); // Replace with real auth check
  };

  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route
          path="/"
          element={<Navigate to={isAuthenticated() ? '/dashboard' : '/login'} />}
        />

        {/* Protected Routes */}
        {isAuthenticated() && (
          <>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/rewards" element={<RewardsPage />} />
            <Route path="/alerts" element={<AlertHistoryPage />} />
            <Route path="/simulate" element={<RouteSimulationPage />} />
            <Route path="/profile" element={<UserProfile />} />
            <Route path="/settings" element={<VehicleSettings />} />
          </>
        )}

        {/* 404 Fallback */}
        <Route
          path="*"
          element={
            <div style={{ padding: '2rem', textAlign: 'center' }}>
              <h2>404: Page Not Found</h2>
            </div>
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
