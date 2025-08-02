import React, { useState, useEffect, useRef } from 'react';
import './LiveRoute.css';

const LiveRoute = () => {
  const [voiceAlertsEnabled, setVoiceAlertsEnabled] = useState(true);
  const [currentAlerts, setCurrentAlerts] = useState([]);
  const [isMinimized, setIsMinimized] = useState(false);
  const [userLocation, setUserLocation] = useState(null);
  const [routePath, setRoutePath] = useState([]);
  const [estimatedArrival, setEstimatedArrival] = useState('14:25');
  const [distanceRemaining, setDistanceRemaining] = useState('8.5 km');
  const [activeTab, setActiveTab] = useState('alerts');
  const mapRef = useRef(null);
  const GEOAPIFY_API_KEY = 'c58ea4effaee4dc4aec1ff3b865de50b';

  // All possible South Africa-specific alerts
  const allRiskFactors = {
    security: [
      { 
        id: 1, 
        type: 'hijacking', 
        message: 'High hijacking risk reported in Alexandra township (next 1.5km) - avoid stopping', 
        severity: 'critical', 
        location: { lat: -26.1033, lng: 28.0874 }, 
        radius: 800, 
        time: '5 min ago',
        advice: 'Keep windows closed and doors locked. Avoid stopping at traffic lights if safe to do so.'
      },
      { 
        id: 2, 
        type: 'theft', 
        message: 'Smash-and-grab hotspot reported on M1 highway near Grayston Drive', 
        severity: 'high', 
        location: { lat: -26.0987, lng: 28.0543 }, 
        radius: 500, 
        time: '15 min ago',
        advice: 'Remove valuables from sight and keep bags on the floor.'
      },
      { 
        id: 3, 
        type: 'hijacking', 
        message: 'Carjacking incidents reported near Noord Street taxi rank', 
        severity: 'critical', 
        location: { lat: -26.2041, lng: 28.0400 }, 
        radius: 1000, 
        time: 'Just now',
        advice: 'Consider alternative route via Bree Street. Be extremely vigilant.'
      }
    ],
    weather: [
      { 
        id: 4, 
        type: 'heavy-rain', 
        message: 'Severe thunderstorms with 40mm rainfall expected in Johannesburg CBD', 
        severity: 'high', 
        location: { lat: -26.2041, lng: 28.0473 }, 
        radius: 5000, 
        time: '20 min ago',
        advice: 'Reduce speed. Possible flash flooding in low-lying areas.'
      },
      { 
        id: 5, 
        type: 'hail', 
        message: 'Golf ball-sized hail reported approaching Sandton area', 
        severity: 'critical', 
        location: { lat: -26.1070, lng: 28.0567 }, 
        radius: 3000, 
        time: '10 min ago',
        advice: 'Seek covered parking immediately if possible. Hail causing vehicle damage.'
      },
      { 
        id: 6, 
        type: 'fog', 
        message: 'Dense fog bank reducing visibility to <50m on N1 near Centurion', 
        severity: 'medium', 
        location: { lat: -25.8603, lng: 28.1894 }, 
        radius: 4000, 
        time: '30 min ago',
        advice: 'Use fog lights and maintain safe following distance.'
      },
      { 
        id: 7, 
        type: 'heatwave', 
        message: 'Extreme heat warning (38°C) - road surface temperatures reaching 55°C', 
        severity: 'medium', 
        location: { lat: -26.2041, lng: 28.0473 }, 
        radius: 10000, 
        time: '1 hour ago',
        advice: 'Check tire pressure. Carry extra water in case of breakdown.'
      }
    ],
    traffic: [
      { 
        id: 8, 
        type: 'protest', 
        message: 'Service delivery protest blocking R55 near Soshanguve', 
        severity: 'high', 
        location: { lat: -25.5146, lng: 28.0944 }, 
        radius: 2000, 
        time: '45 min ago',
        advice: 'Avoid area. Protesters reported burning tires.'
      },
      { 
        id: 9, 
        type: 'accident', 
        message: 'Multi-vehicle pileup on N3 southbound near Gillooly\'s Interchange', 
        severity: 'high', 
        location: { lat: -26.1763, lng: 28.1492 }, 
        radius: 3000, 
        time: 'Just now',
        advice: 'Major delays expected. Consider alternative route via M2.'
      },
      { 
        id: 10, 
        type: 'road-closure', 
        message: 'Emergency roadworks on M1 between Empire Road and Oxford Road', 
        severity: 'medium', 
        location: { lat: -26.1804, lng: 28.0207 }, 
        radius: 1500, 
        time: '1 hour ago',
        advice: 'Left lane closed. Expect 20-minute delays.'
      }
    ],
    road: [
      { 
        id: 11, 
        type: 'potholes', 
        message: 'Severe potholes reported on R24 towards OR Tambo Airport', 
        severity: 'medium', 
        location: { lat: -26.1369, lng: 28.2416 }, 
        radius: 3000, 
        time: '2 hours ago',
        advice: 'Reduce speed, especially in right lane where deepest potholes are reported.'
      },
      { 
        id: 12, 
        type: 'flooding', 
        message: 'Flash flooding on William Nicol Drive near Fourways', 
        severity: 'high', 
        location: { lat: -26.0369, lng: 28.0134 }, 
        radius: 800, 
        time: '15 min ago',
        advice: 'Do not attempt to cross flooded roads. Turn around.'
      },
      { 
        id: 13, 
        type: 'animals', 
        message: 'Livestock crossing on R562 near Diepsloot', 
        severity: 'medium', 
        location: { lat: -25.9332, lng: 27.9841 }, 
        radius: 2000, 
        time: 'Just now',
        advice: 'Reduce speed. Cattle frequently crossing this stretch at dusk.'
      }
    ]
  };

  // Function to get random subset of alerts
  const getRandomAlerts = () => {
    const randomAlerts = [];
    
    // Get 1-2 random alerts from each category
    Object.keys(allRiskFactors).forEach(category => {
      const alerts = allRiskFactors[category];
      const count = Math.floor(Math.random() * 2) + 1; // 1 or 2 alerts
      const shuffled = [...alerts].sort(() => 0.5 - Math.random());
      randomAlerts.push(...shuffled.slice(0, count));
    });
    
    // Shuffle all selected alerts and limit to 3-5 total
    return randomAlerts.sort(() => 0.5 - Math.random())
                      .slice(0, Math.floor(Math.random() * 3) + 3); // 3-5 alerts
  };

  // Initialize with random alerts
  useEffect(() => {
    setCurrentAlerts(getRandomAlerts());
  }, []);

  // Check if user is approaching any risk zones
  const checkRiskZones = (location) => {
    const newAlerts = [];

    Object.values(allRiskFactors).forEach(category => {
      category.forEach(alert => {
        if (isInRadius(location, alert.location, alert.radius)) {
          newAlerts.push(alert);
        }
      });
    });

    if (newAlerts.length > 0) {
      setCurrentAlerts(prev => [...prev, ...newAlerts]);

      if (voiceAlertsEnabled) {
        const alertMessages = newAlerts.map(a => a.message).join('. ');
        const utterance = new SpeechSynthesisUtterance(`Warning: ${alertMessages}`);
        window.speechSynthesis.speak(utterance);
      }
    }
  };

  // Helper function to check if location is within radius
  const isInRadius = (loc1, loc2, radius) => {
    if (!loc1 || !loc2) return false;
    const R = 6371; // Earth's radius in km
    const dLat = (loc2.lat - loc1.lat) * Math.PI / 180;
    const dLon = (loc2.lng - loc1.lng) * Math.PI / 180;
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(loc1.lat * Math.PI / 180) * Math.cos(loc2.lat * Math.PI / 180) *
      Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c * 1000; // Distance in meters
    return distance <= radius;
  };

  // Simulate route progress through Johannesburg
  const simulateRouteProgress = () => {
    const simulatedPath = [
      { lat: -26.2041, lng: 28.0473, timestamp: Date.now() + 10000 },  // Johannesburg CBD
      { lat: -26.1070, lng: 28.0567, timestamp: Date.now() + 20000 },  // Sandton
      { lat: -26.0369, lng: 28.0134, timestamp: Date.now() + 30000 }   // Fourways
    ];
    setRoutePath(simulatedPath);
  };

  // Get user location and update map
  useEffect(() => {
    simulateRouteProgress();

    if (navigator.geolocation) {
      const watchId = navigator.geolocation.watchPosition(
        (position) => {
          const newLocation = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };
          setUserLocation(newLocation);
          checkRiskZones(newLocation);

          if (mapRef.current) {
            const center = `lonlat:${newLocation.lng},${newLocation.lat}`;
            mapRef.current.src = `https://maps.geoapify.com/v1/staticmap?style=osm-carto&width=1200&height=800&center=${center}&zoom=15&marker=${center};color:%23ff0000;size:medium&apiKey=${GEOAPIFY_API_KEY}`;
          }
        },
        (error) => {
          console.error('Error getting location:', error);
          // Default to Johannesburg coordinates if geolocation fails
          const jhbLocation = { lat: -26.2041, lng: 28.0473 };
          setUserLocation(jhbLocation);
          checkRiskZones(jhbLocation);
        },
        { enableHighAccuracy: true, maximumAge: 10000, timeout: 5000 }
      );

      return () => navigator.geolocation.clearWatch(watchId);
    } else {
      // Default to Johannesburg coordinates if geolocation not supported
      const jhbLocation = { lat: -26.2041, lng: 28.0473 };
      setUserLocation(jhbLocation);
      checkRiskZones(jhbLocation);
    }
  }, []);

  const handleReroute = () => {
    alert('Finding safer alternative route...');
  };

  const handleCancelTrip = () => {
    if (window.confirm('Are you sure you want to cancel this trip?')) {
      alert('Trip cancelled - stay safe!');
      window.location.href = '/dashboard';
    }
  };

  const handleDismissAlert = (id) => {
    setCurrentAlerts(currentAlerts.filter(alert => alert.id !== id));
  };

  const getSeverityClass = (severity) => {
    switch (severity) {
      case 'critical': return 'critical';
      case 'high': return 'high';
      case 'medium': return 'medium';
      default: return 'low';
    }
  };

  const getAlertIcon = (type) => {
    const icons = {
      'hijacking': '🚨',
      'theft': '👜',
      'heavy-rain': '🌧️',
      'hail': '🧊',
      'fog': '🌫️',
      'protest': '✊',
      'road-closure': '🚧',
      'accident': '🚑',
      'potholes': '🕳️',
      'flooding': '🌊',
      'heatwave': '🔥',
      'animals': '🐄'
    };
    return icons[type] || '⚠️';
  };

  return (
    <div className="live-route-container">
      {/* Header with trip info */}
      <div className="trip-header">
        <div className="header-content">
          <div className="trip-metrics">
            <div className="metric">
              <span className="label">ETA</span>
              <span className="value">{estimatedArrival}</span>
            </div>
            <div className="metric">
              <span className="label">Distance</span>
              <span className="value">{distanceRemaining}</span>
            </div>
            <div className="metric">
              <span className="label">Alerts</span>
              <span className="value">{currentAlerts.length}</span>
            </div>
          </div>
          <div className="trip-actions">
            <button 
              className={`voice-control ${voiceAlertsEnabled ? 'active' : ''}`}
              onClick={() => setVoiceAlertsEnabled(!voiceAlertsEnabled)}
            >
              {voiceAlertsEnabled ? (
                <>
                  <span className="icon">🔊</span>
                  <span className="text">Voice On</span>
                </>
              ) : (
                <>
                  <span className="icon">🔇</span>
                  <span className="text">Voice Off</span>
                </>
              )}
            </button>
            <button className="cancel-btn" onClick={handleCancelTrip}>
              Cancel Trip
            </button>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="main-content">
        {/* Map Container */}
        <div className="map-container">
          {userLocation ? (
            <iframe
              ref={mapRef}
              title="Live Map"
              width="100%"
              height="100%"
              frameBorder="0"
              style={{ border: 0 }}
              src={`https://maps.geoapify.com/v1/staticmap?style=osm-carto&width=1200&height=800&center=lonlat:${userLocation.lng},${userLocation.lat}&zoom=15&marker=lonlat:${userLocation.lng},${userLocation.lat};color:%23ff0000;size:medium&apiKey=${GEOAPIFY_API_KEY}`}
              allowFullScreen
            ></iframe>
          ) : (
            <div className="map-loading">
              <div className="spinner"></div>
              <p>Acquiring your location...</p>
            </div>
          )}
        </div>

        {/* Side Panel */}
        <div className={`side-panel ${isMinimized ? 'minimized' : ''}`}>
          <div className="panel-header" onClick={() => setIsMinimized(!isMinimized)}>
            <div className="tabs">
              <button 
                className={`tab ${activeTab === 'alerts' ? 'active' : ''}`}
                onClick={(e) => { e.stopPropagation(); setActiveTab('alerts'); }}
              >
                Alerts ({currentAlerts.length})
              </button>
              <button 
                className={`tab ${activeTab === 'route' ? 'active' : ''}`}
                onClick={(e) => { e.stopPropagation(); setActiveTab('route'); }}
              >
                Route Details
              </button>
            </div>
            <button className="minimize-btn">
              {isMinimized ? '→' : '←'}
            </button>
          </div>

          {!isMinimized && (
            <div className="panel-content">
              {activeTab === 'alerts' ? (
                <div className="alerts-list">
                  {currentAlerts.length > 0 ? (
                    currentAlerts.map(alert => (
                      <div key={alert.id} className={`alert-card ${getSeverityClass(alert.severity)}`}>
                        <div className="alert-icon">
                          {getAlertIcon(alert.type)}
                        </div>
                        <div className="alert-content">
                          <div className="alert-header">
                            <h4>{alert.type.replace('-', ' ').toUpperCase()}</h4>
                            <span className="alert-time">{alert.time}</span>
                          </div>
                          <p>{alert.message}</p>
                          <div className="alert-advice">
                            <strong>Safety Advice:</strong> {alert.advice}
                          </div>
                          <div className="alert-actions">
                            <button 
                              className="reroute-btn"
                              onClick={handleReroute}
                            >
                              Reroute
                            </button>
                            <button 
                              className="dismiss-btn"
                              onClick={() => handleDismissAlert(alert.id)}
                            >
                              Dismiss
                            </button>
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="no-alerts">
                      <div className="icon">✅</div>
                      <h4>No active alerts</h4>
                      <p>Your route is clear for now</p>
                    </div>
                  )}
                </div>
              ) : (
                <div className="route-details">
                  <h3>Route Summary</h3>
                  <div className="route-stats">
                    <div className="stat">
                      <span className="label">Distance</span>
                      <span className="value">{distanceRemaining}</span>
                    </div>
                    <div className="stat">
                      <span className="label">Estimated Time</span>
                      <span className="value">45 min</span>
                    </div>
                    <div className="stat">
                      <span className="label">Arrival</span>
                      <span className="value">{estimatedArrival}</span>
                    </div>
                  </div>
                  <div className="route-steps">
                    <h4>Directions</h4>
                    <ol>
                      <li>Continue on M1 North for 5.2 km</li>
                      <li>Take exit 14 toward Sandton/Rivonia Road</li>
                      <li>Merge onto Rivonia Road</li>
                      <li>Turn right onto William Nicol Drive</li>
                    </ol>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Risk Legend */}
      <div className="risk-legend">
        <div className="legend-title">Alert Severity:</div>
        <div className="legend-items">
          <div className="legend-item">
            <span className="dot critical"></span>
            <span>Critical</span>
          </div>
          <div className="legend-item">
            <span className="dot high"></span>
            <span>High</span>
          </div>
          <div className="legend-item">
            <span className="dot medium"></span>
            <span>Medium</span>
          </div>
          <div className="legend-item">
            <span className="dot low"></span>
            <span>Low</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LiveRoute;