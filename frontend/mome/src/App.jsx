import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, Outlet } from 'react-router-dom';

// Auth Screens
import Login from './auth/Login';
import Signup from './auth/Signup';
import ForgotPassword from './auth/ForgotPassword';

// App Screens
import AboutPage from './pages/AboutPage';
import AlertHistoryPage from './pages/AlertHistoryPage';
import Dashboard from './pages/Dashboard';
import RewardsPage from './pages/RewardsPage';
import RouteSimulationPage from './pages/RouteSimulationPage';
import UserProfile from './pages/UserProfile';
import VehicleSettings from './pages/VehicleSettings';

// Sidebar Component
import Sidebar from './components/Sidebar'; // adjust path if needed

// Check if user is authenticated
const isAuthenticated = () => {
  return !!localStorage.getItem('token');
};

// Wraps protected routes with sidebar layout
const ProtectedRoute = () => {
  return isAuthenticated() ? (
    <div style={{ display: 'flex' }}>
      <Sidebar />
      <main style={{ marginLeft: '230px', padding: '2rem', flex: 1 }}>
        <Outlet />
      </main>
    </div>
  ) : (
    <Navigate to="/login" />
  );
};

const App = () => {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />

        {/* Redirect from root */}
        <Route path="/" element={<Navigate to={isAuthenticated() ? '/dashboard' : '/login'} />} />

        {/* Protected Routes with Sidebar Layout */}
        <Route element={<ProtectedRoute />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/rewards" element={<RewardsPage />} />
          <Route path="/alerts" element={<AlertHistoryPage />} />
          <Route path="/simulate" element={<RouteSimulationPage />} />
          <Route path="/profile" element={<UserProfile />} />
          <Route path="/settings" element={<VehicleSettings />} />
        </Route>

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
