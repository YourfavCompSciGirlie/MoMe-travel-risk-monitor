// App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

// Auth Pages
import Login from './auth/Login';

// Pages
import AboutPage from './pages/AboutPage';
import AlertHistoryPage from './pages/AlertHistoryPage';
import Dashboard from './pages/Dashboard';
import RewardsPage from './pages/RewardsPage';
import RouteSimulationPage from './pages/RouteSimulationPage';
import UserProfile from './pages/UserProfile';
import VehicleSettings from './pages/VehicleSettings';


const App = () => {
  const isAuthenticated = () => {
    // Basic mock authentication check – replace with real logic
    return !!localStorage.getItem('token');
  };

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Navigate to={isAuthenticated() ? "/dashboard" : "/login"} />} />

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

        {/* Fallback for 404 */}
        <Route path="*" element={<h2 style={{ textAlign: 'center', marginTop: '20px' }}>404: Page Not Found</h2>} />
      </Routes>
    </Router>
  );
};

export default App;
