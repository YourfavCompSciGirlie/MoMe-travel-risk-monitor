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
import LiveRoute from "./pages/LiveRoute";
import Support from "./pages/Help";

// Landing Page
import LandingPage from './pages/Landing';

// Sidebar Component
import Sidebar from './components/Sidebar';

// Auth Check
const isAuthenticated = () => {
  return !!localStorage.getItem('token');
};

// Protected Wrapper
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
        <Route path="/landing" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />

        {/* Redirect root to landing */}
        <Route path="/" element={<Navigate to="/landing" />} />

        {/* Protected Routes with Sidebar */}
        <Route element={<ProtectedRoute />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/rewards" element={<RewardsPage />} />
          <Route path="/alerts" element={<AlertHistoryPage />} />
          <Route path="/simulate" element={<RouteSimulationPage />} />
          <Route path="/profile" element={<UserProfile />} />
          <Route path="/settings" element={<VehicleSettings />} />
          <Route path="/live-route" element={<LiveRoute />} />
          <Route path="/support" element={<Support />} />
        </Route>

        {/* 404 */}
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
