import React, { useState } from 'react';
import { 
  FiHome, 
  FiMap, 
  FiAlertTriangle, 
  FiAward, 
  FiUser, 
  FiSettings, 
  FiLogOut,
  FiHelpCircle,
  FiChevronLeft,
  FiChevronRight
} from 'react-icons/fi';
import { NavLink } from 'react-router-dom';
import './Dashboard.css';

function Dashboard() {
  const [voiceMode, setVoiceMode] = useState(false);
  const [isSimulating, setIsSimulating] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  
  const toggleVoiceMode = () => {
    setVoiceMode(!voiceMode);
  };

  const simulateRoute = () => {
    setIsSimulating(true);
    setTimeout(() => setIsSimulating(false), 2000);
  };

  const toggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };

  const navItems = [
    { path: "/dashboard", icon: <FiHome />, label: "Dashboard" },
    { path: "/simulate", icon: <FiMap />, label: "Route Simulation" },
    { path: "/alerts", icon: <FiAlertTriangle />, label: "Alerts History" },
    { path: "/rewards", icon: <FiAward />, label: "Rewards" },
    { path: "/profile", icon: <FiUser />, label: "User Profile" },
    { path: "/settings", icon: <FiSettings />, label: "Vehicle Settings" },
    { path: "/about", icon: <FiHelpCircle />, label: "About" },
  ];

  const handleLogout = () => {
    localStorage.removeItem('token');
    window.location.href = '/login';
  };

  return (
    <div className="dashboard-container">
      {/* Side Navigation Bar */}
      <aside className={`sidebar ${sidebarCollapsed ? 'collapsed' : ''}`}>
        <div className="sidebar-header">
          {!sidebarCollapsed && <h2>MoMe Navigation</h2>}
          <button className="collapse-toggle" onClick={toggleSidebar}>
            {sidebarCollapsed ? <FiChevronRight /> : <FiChevronLeft />}
          </button>
        </div>
        
        <nav className="sidebar-nav">
          <ul>
            {navItems.map((item, index) => (
              <li key={index}>
                <NavLink 
                  to={item.path} 
                  className={({ isActive }) => 
                    isActive ? 'nav-item active' : 'nav-item'
                  }
                >
                  <span className="nav-icon">{item.icon}</span>
                  {!sidebarCollapsed && <span className="nav-label">{item.label}</span>}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        <div className="sidebar-footer">
          <button className="logout-btn" onClick={handleLogout}>
            <span className="nav-icon"><FiLogOut /></span>
            {!sidebarCollapsed && <span className="nav-label">Logout</span>}
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className={`main-content ${sidebarCollapsed ? 'collapsed' : ''}`}>
        <header className="dashboard-header">
          <div className="header-title">
            <h1>MoMe Dashboard</h1>
            <p className="subtitle">Mobility & Meteorological Early-warning System</p>
          </div>
          <button 
            className={`voice-toggle ${voiceMode ? 'active' : ''}`}
            onClick={toggleVoiceMode}
          >
            {voiceMode ? '🎤 Voice Mode ON' : '🎤 Voice Mode OFF'}
          </button>
        </header>

        <div className="dashboard-grid">
          {/* Map & Weather Card */}
          <section className="dashboard-card glossy map-weather">
            <div className="card-header">
              <h2>Current Location & Weather</h2>
              <span className="status-badge">Live</span>
            </div>
            <div className="map-container">
              <div className="map-placeholder">
                <div className="mini-map"></div>
                <div className="map-overlay">
                  <span className="location-marker">📍</span>
                </div>
              </div>
              <div className="weather-info">
                <div className="weather-icon">☀️</div>
                <div className="weather-details">
                  <p className="temperature">26°C</p>
                  <p className="condition">Sunny</p>
                  <p className="location">Pretoria, Gauteng</p>
                </div>
              </div>
            </div>
          </section>

          {/* Alerts Card */}
          <section className="dashboard-card glossy alerts">
            <div className="card-header">
              <h2>Today's Alerts</h2>
              <span className="alert-count">2</span>
            </div>
            <div className="alert-list">
              <div className="alert-item critical">
                <div className="alert-icon">⚠️</div>
                <div className="alert-content">
                  <h3>Hailstorm Warning</h3>
                  <p>Near Pretoria at 3PM</p>
                  <span className="alert-time">Today · 3:00 PM</span>
                </div>
              </div>
              <div className="alert-item warning">
                <div className="alert-icon">💨</div>
                <div className="alert-content">
                  <h3>High Winds</h3>
                  <p>Expected in Johannesburg</p>
                  <span className="alert-time">Today · 5:30 PM</span>
                </div>
              </div>
            </div>
            <NavLink to="/alerts" className="view-all-btn">View All Alerts →</NavLink>
          </section>

          {/* Simulation Card */}
          <section className="dashboard-card glossy simulate">
            <h2>Route Simulation</h2>
            <p className="card-description">Test potential routes against weather conditions</p>
            <NavLink 
              to="/simulate"
              className={`simulate-btn ${isSimulating ? 'simulating' : ''}`}
              onClick={simulateRoute}
            >
              {isSimulating ? 'Simulating...' : '🧭 Simulate Route'}
            </NavLink>
            {isSimulating && (
              <div className="simulation-progress">
                <div className="progress-bar"></div>
              </div>
            )}
            <div className="simulation-stats">
              <div className="stat-item">
                <span className="stat-value">12</span>
                <span className="stat-label">Routes Tested</span>
              </div>
              <div className="stat-item">
                <span className="stat-value">85%</span>
                <span className="stat-label">Accuracy</span>
              </div>
            </div>
          </section>

          {/* Risk Score Card */}
          <section className="dashboard-card glossy risk-score">
            <h2>Travel Risk Score</h2>
            <div className="risk-preview">
              <div className="score-circle">
                <span className="score">72</span>
                <span className="score-label">/100</span>
              </div>
              <p className="risk-level">Moderate Risk</p>
              <div className="risk-factors">
                <div className="factor">
                  <span className="factor-label">Weather</span>
                  <div className="factor-bar">
                    <div className="factor-progress weather" style={{ width: '65%' }}></div>
                  </div>
                </div>
                <div className="factor">
                  <span className="factor-label">Traffic</span>
                  <div className="factor-bar">
                    <div className="factor-progress traffic" style={{ width: '40%' }}></div>
                  </div>
                </div>
                <div className="factor">
                  <span className="factor-label">Roads</span>
                  <div className="factor-bar">
                    <div className="factor-progress roads" style={{ width: '30%' }}></div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}

export default Dashboard;