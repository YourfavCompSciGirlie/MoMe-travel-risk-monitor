import React, { useState } from 'react';
import {
  FiMapPin, FiWind, FiDroplet, FiFilter, FiChevronDown,
  FiChevronLeft, FiChevronRight, FiNavigation
} from 'react-icons/fi';
import './Dashboard.css';

function Dashboard() {
  const [voiceMode, setVoiceMode] = useState(false);
  const [isSimulating, setIsSimulating] = useState(false);
  const [alertFilter, setAlertFilter] = useState('all');
  const [showFilterDropdown, setShowFilterDropdown] = useState(false);

  const toggleVoiceMode = () => {
    setVoiceMode(!voiceMode);
  };

  const simulateRoute = () => {
    setIsSimulating(true);
    setTimeout(() => setIsSimulating(false), 2000);
  };

  // simulation for the routes
  const RouteSimulation = () => {
    const [isSimulating, setIsSimulating] = useState(false);
    const [progress, setProgress] = useState(0);

    const simulateRoute = () => {
      setIsSimulating(true);
      setProgress(0);

      // Mock simulation progress
      const interval = setInterval(() => {
        setProgress(prev => {
          if (prev >= 100) {
            clearInterval(interval);
            setIsSimulating(false);
            return 0;
          }
          return prev + 10;
        });
      }, 300)
    }
  }

  const filteredAlerts = [
    {
      id: 1,
      type: 'critical',
      title: 'Flight Hijacking Alert',
      description: 'Potential hijacking reported on flight BA247',
      category: 'HIJACKING',
      time: 'Just now'
    },
    {
      id: 2,
      type: 'critical',
      title: 'Severe Weather Warning',
      description: 'Hurricane warning for Caribbean destinations',
      category: 'WEATHER',
      time: '5 min ago'
    },
    {
      id: 3,
      type: 'warning',
      title: 'Airport Disruptions',
      description: 'Major delays at JFK due to staff strikes',
      category: 'TRAVEL',
      time: '23 min ago'
    },
    {
      id: 4,
      type: 'resolved',
      title: 'Resolved: Border Closure',
      description: 'Canada-US border reopening after security alert',
      category: 'TRAVEL',
      time: '1 hour ago'
    },
    {
      id: 5,
      type: 'info',
      title: 'Travel Advisory Update',
      description: 'New visa requirements for Schengen zone',
      category: 'TRAVEL',
      time: '2 hours ago'
    }
  ].filter(alert =>
    alertFilter === 'all' ||
    alert.type === alertFilter ||
    (alertFilter === 'high' && alert.type === 'critical') ||
    (alertFilter === 'moderate' && alert.type === 'warning') ||
    (alertFilter === 'low' && (alert.type === 'info' || alert.type === 'resolved'))
  );

  const riskLevel = (score) => {
    if (score >= 80) return { level: 'High', color: 'var(--error)', bg: 'rgba(255, 107, 107, 0.1)' };
    if (score >= 50) return { level: 'Moderate', color: 'var(--warning)', bg: 'rgba(255, 179, 71, 0.1)' };
    return { level: 'Low', color: 'var(--accent-green)', bg: 'rgba(162, 189, 57, 0.1)' };
  };

  const currentRisk = riskLevel(72);

  return (
    <div className="dashboard-container">
      {/* Weather Section */}
      <div className="weather-section">
        {/* Current Weather Card */}
        <div className="current-weather-card">
          <div className="weather-background sunny"></div>
          <div className="weather-content">
            <div className="weather-header">
              <div className="location">
                <FiMapPin className="location-icon" />
                <div>
                  <p className="location-label">MY LOCATION</p>
                  <h2 className="location-name">Centurion</h2>
                </div>
              </div>
            </div>

            <div className="weather-main">
              <div className="temperature-main">
                <span className="temp-value">8°</span>
                <span className="temp-feels">Feels Like: 5°</span>
                <span className="temp-range">High: 20° Low: 6°</span>
              </div>

              <div className="weather-details">
                <p className="weather-description">
                  Partly cloudy conditions expected around 08:00. Wind gusts up to 17 km/h are making the temperature feel like 5°.
                </p>

                <div className="weather-stats">
                  <div className="stat-item">
                    <FiWind className="stat-icon" />
                    <span>17 km/h</span>
                  </div>
                  <div className="stat-item">
                    <FiDroplet className="stat-icon" />
                    <span>65%</span>
                  </div>
                </div>

                <div className="hourly-forecast">
                  <div className="hourly-header">
                    <span>Now</span>
                    <span>00</span>
                    <span>01</span>
                    <span>02</span>
                    <span>03</span>
                    <span>04</span>
                    <span>05</span>
                  </div>
                  <div className="hourly-icons">
                    <span>☀️</span>
                    <span>🌤️</span>
                    <span>🌤️</span>
                    <span>🌙</span>
                    <span>🌙</span>
                    <span>🌙</span>
                    <span>🌙</span>
                  </div>
                  <div className="hourly-temps">
                    <span>8°</span>
                    <span>8°</span>
                    <span>7°</span>
                    <span>6°</span>
                    <span>5°</span>
                    <span>4°</span>
                    <span>4°</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 3-Day Forecast Panel */}
        <div className="forecast-panel">
          <div className="forecast-background sunny"></div>
          <div className="forecast-content">
            <h3>3-DAY FORECAST</h3>
            <div className="forecast-days">
              <div className="forecast-day">
                <p>Today</p>
                <div className="weather-icon">☀️</div>
                <div className="day-temps">
                  <span>6°</span>
                  <span>20°</span>
                </div>
              </div>
              <div className="forecast-day">
                <p>Sat</p>
                <div className="weather-icon">⛅</div>
                <div className="day-temps">
                  <span>4°</span>
                  <span>17°</span>
                </div>
              </div>
              <div className="forecast-day">
                <p>Sun</p>
                <div className="weather-icon">🌧️</div>
                <div className="day-temps">
                  <span>6°</span>
                  <span>19°</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="main-grid">
        {/* Map Section */}
        <div className="map-card">
          <div className="map-container">
            <div className="map-overlay">
              <div className="map-current-location">
                <FiMapPin className="current-location-icon" />
                <span>Current Location</span>
              </div>
            </div>
          </div>
        </div>

        {/* Three Cards Row */}
        <div className="cards-row">
          {/* Route Simulation */}
          <div className="simulation-card">
            <h3>Route Simulation</h3>
            <button
              className={`simulate-btn ${isSimulating ? 'simulating' : ''}`}
              onClick={simulateRoute}
              disabled={isSimulating}
            >
              <FiNavigation className="simulate-icon" />
              {isSimulating ? 'Simulating...' : 'Simulate Route'}
            </button>

            {isSimulating && (
              <div className="simulation-progress">
                <div
                  className="progress-bar"
                  style={{ width: `${progress}%` }}
                ></div>
              </div>
            )}

            <div className="simulation-stats">
              <div className="stat-box">
                <span className="stat-value">12</span>
                <span className="stat-label">Routes Tested</span>
              </div>
              <div className="stat-box">
                <span className="stat-value">85%</span>
                <span className="stat-label">Accuracy</span>
              </div>
            </div>
          </div>

          {/* Risk Score */}
          <div className="risk-card">
            <h3>Travel Risk Score</h3>
            <div className="risk-circle" style={{ backgroundColor: currentRisk.bg }}>
              <div className="risk-value-container">
                <span className="risk-value">72</span>
                <span className="risk-level" style={{ color: currentRisk.color }}>
                  {currentRisk.level}
                </span>
              </div>
            </div>
            <div className="risk-factors">
              <div className="factor">
                <span>Weather</span>
                <div className="factor-bar">
                  <div
                    className="factor-progress"
                    style={{
                      width: '25%',
                      backgroundColor: 'var(--accent-green)' // Matches first segment
                    }}
                  ></div>
                </div>
              </div>
              <div className="factor">
                <span>Traffic</span>
                <div className="factor-bar">
                  <div
                    className="factor-progress"
                    style={{
                      width: '50%',
                      backgroundColor: 'var(--warning)' // Matches middle segment
                    }}
                  ></div>
                </div>
              </div>
              <div className="factor">
                <span>Roads</span>
                <div className="factor-bar">
                  <div
                    className="factor-progress"
                    style={{
                      width: '25%',
                      backgroundColor: 'var(--error)' // Matches last segment
                    }}
                  ></div>
                </div>
              </div>
            </div>
          </div>

          {/* Risk Trend */}
          <div className="trend-card">
            <div className="trend-header">
              <h3>Risk Trend Analysis</h3>
              <span className="time-period">Last 5 Days</span>
            </div>

            <div className="trend-chart">
              {/* X-axis labels */}
              <div className="chart-labels-x">
                <span>Mon</span>
                <span>Tue</span>
                <span>Wed</span>
                <span>Thu</span>
                <span>Fri</span>
              </div>

              {/* Y-axis labels */}
              <div className="chart-labels-y">
                <span>100</span>
                <span>75</span>
                <span>50</span>
                <span>25</span>
                <span>0</span>
              </div>

              {/* Chart grid and line */}
              <div className="chart-grid">
                <div className="chart-line">
                  {/* Data points with visual connectors */}
                  <div className="data-point" style={{ left: '10%', bottom: '30%' }}>
                    <div className="point-value">68</div>
                    <div className="point-connector"></div>
                    <div className="point-dot weather"></div>
                  </div>
                  <div className="data-point" style={{ left: '30%', bottom: '50%' }}>
                    <div className="point-value">72</div>
                    <div className="point-connector"></div>
                    <div className="point-dot traffic"></div>
                  </div>
                  <div className="data-point" style={{ left: '50%', bottom: '70%' }}>
                    <div className="point-value">78</div>
                    <div className="point-connector"></div>
                    <div className="point-dot weather"></div>
                  </div>
                  <div className="data-point" style={{ left: '70%', bottom: '40%' }}>
                    <div className="point-value">65</div>
                    <div className="point-connector"></div>
                    <div className="point-dot traffic"></div>
                  </div>
                  <div className="data-point" style={{ left: '90%', bottom: '60%' }}>
                    <div className="point-value">70</div>
                    <div className="point-connector"></div>
                    <div className="point-dot weather"></div>
                  </div>
                </div>
              </div>
            </div>

            <div className="chart-legend">
              <div className="legend-item">
                <span className="legend-color weather"></span>
                <span>Weather Risk</span>
              </div>
              <div className="legend-item">
                <span className="legend-color traffic"></span>
                <span>Traffic Risk</span>
              </div>
              <div className="trend-summary">
                <span className="trend-indicator up"></span>
                <span>12% increase from last week</span>
              </div>
            </div>
          </div>
        </div>

        {/* Alerts Section */}
        <div className="alerts-card">
          <div className="alerts-header">
            <h3>Today's Travel Alerts</h3>
            <div className="alerts-controls">
              <div className="alerts-summary">
                <span className="total-alerts">{filteredAlerts.length} Alerts</span>
                <span className="critical-alerts">
                  {filteredAlerts.filter(a => a.type === 'critical').length} Critical
                </span>
              </div>
              <div className="filter-dropdown">
                <button
                  className="filter-btn"
                  onClick={() => setShowFilterDropdown(!showFilterDropdown)}
                >
                  <FiFilter />
                  <span>Filter</span>
                  <FiChevronDown className={`dropdown-icon ${showFilterDropdown ? 'open' : ''}`} />
                </button>
                {showFilterDropdown && (
                  <div className="dropdown-menu">
                    <button
                      className={alertFilter === 'all' ? 'active' : ''}
                      onClick={() => {
                        setAlertFilter('all');
                        setShowFilterDropdown(false);
                      }}
                    >
                      All Alerts
                    </button>
                    <button
                      className={alertFilter === 'high' ? 'active' : ''}
                      onClick={() => {
                        setAlertFilter('high');
                        setShowFilterDropdown(false);
                      }}
                    >
                      High Risk
                    </button>
                    <button
                      className={alertFilter === 'moderate' ? 'active' : ''}
                      onClick={() => {
                        setAlertFilter('moderate');
                        setShowFilterDropdown(false);
                      }}
                    >
                      Moderate Risk
                    </button>
                    <button
                      className={alertFilter === 'low' ? 'active' : ''}
                      onClick={() => {
                        setAlertFilter('low');
                        setShowFilterDropdown(false);
                      }}
                    >
                      Low Risk
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="alerts-list">
            {filteredAlerts.map(alert => (
              <div key={alert.id} className={`alert-item ${alert.type}`}>
                <div className="alert-icon">
                  {alert.type === 'critical' && '⚠️'}
                  {alert.type === 'warning' && '⚠️'}
                  {alert.type === 'resolved' && '✓'}
                  {alert.type === 'info' && 'ℹ️'}
                </div>
                <div className="alert-content">
                  <h4>{alert.title}</h4>
                  <p>{alert.description}</p>
                  <div className="alert-meta">
                    <span className={`category-${alert.category.toLowerCase()}`}>
                      {alert.category === 'WEATHER' && '🌦️ Weather'}
                      {alert.category === 'TRAVEL' && '✈️ Travel'}
                      {alert.category === 'HIJACKING' && '🚨 Hijacking'}
                    </span>
                    <span>{alert.time}</span>
                  </div>
                </div>
              </div>
            ))}

            {filteredAlerts.length === 0 && (
              <div className="no-alerts">
                <p>No alerts match the current filter</p>
              </div>
            )}
          </div>

          <div className="alerts-footer">
            <span>Showing {filteredAlerts.length} of 5 alerts</span>
            <div className="pagination">
              <button className="page-btn"><FiChevronLeft />1</button>
              <button className="page-btn"><FiChevronRight />2</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;