import React, { useState, useEffect, useRef } from 'react';
import './LiveRoute.css';

const LiveRoute = () => {
  const [voiceAlertsEnabled, setVoiceAlertsEnabled] = useState(true);
  const [currentAlerts, setCurrentAlerts] = useState([]);
  const [isMinimized, setIsMinimized] = useState(false);
  const [userLocation, setUserLocation] = useState(null);
  const [routePath, setRoutePath] = useState([]);
  const [estimatedArrival, setEstimatedArrival] = useState('--:--');
  const [distanceRemaining, setDistanceRemaining] = useState('-- km');
  const mapRef = useRef(null);
  const GEOAPIFY_API_KEY = 'c58ea4effaee4dc4aec1ff3b865de50b'; // In LiveRoute.js

  // Enhanced alerts data with risk factors
  const riskFactors = {
    security: [
      { id: 1, type: 'hijacking', message: 'High hijacking risk zone ahead (next 2km)', severity: 'critical', location: { lat: -26.2041, lng: 28.0473 }, radius: 500 },
      { id: 2, type: 'theft', message: 'Vehicle break-in hotspot reported in this area', severity: 'high', location: { lat: -26.2050, lng: 28.0480 }, radius: 300 }
    ],
    weather: [
      { id: 3, type: 'heavy-rain', message: 'Heavy rainfall expected (25mm/h) - reduced visibility', severity: 'high', location: { lat: -26.2035, lng: 28.0465 }, radius: 2000 },
      { id: 4, type: 'hail', message: 'Hailstorm warning - seek shelter if possible', severity: 'critical', location: { lat: -26.2045, lng: 28.0475 }, radius: 1500 },
      { id: 5, type: 'fog', message: 'Dense fog patch (visibility < 100m)', severity: 'medium', location: { lat: -26.2040, lng: 28.0485 }, radius: 1000 }
    ],
    traffic: [
      { id: 6, type: 'congestion', message: 'Severe traffic congestion (30min delay)', severity: 'medium', location: { lat: -26.2030, lng: 28.0470 }, radius: 1000 },
      { id: 7, type: 'road-closure', message: 'Temporary road closure - detour active', severity: 'high', location: { lat: -26.2048, lng: 28.0460 }, radius: 800 },
      { id: 8, type: 'accident', message: 'Multi-vehicle accident reported ahead', severity: 'high', location: { lat: -26.2038, lng: 28.0478 }, radius: 500 }
    ],
    road: [
      { id: 9, type: 'potholes', message: 'Multiple deep potholes reported', severity: 'low', location: { lat: -26.2043, lng: 28.0468 }, radius: 400 },
      { id: 10, type: 'flooding', message: 'Road flooding - avoid if possible', severity: 'high', location: { lat: -26.2032, lng: 28.0472 }, radius: 600 }
    ]
  };

  // Check if user is approaching any risk zones
  const checkRiskZones = (location) => {
    const newAlerts = [];

    Object.values(riskFactors).forEach(category => {
      category.forEach(alert => {
        if (isInRadius(location, alert.location, alert.radius)) {
          newAlerts.push(alert);
        }
      });
    });

    if (newAlerts.length > 0) {
      setCurrentAlerts(newAlerts);

      if (voiceAlertsEnabled) {
        const alertMessages = newAlerts.map(a => a.message).join('. ');
        const utterance = new SpeechSynthesisUtterance(`Warning: ${alertMessages}`);
        window.speechSynthesis.speak(utterance);
      }
    } else if (currentAlerts.length > 0) {
      setCurrentAlerts([]);
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

  // Simulate route progress
  const simulateRouteProgress = () => {
    // This would normally come from your routing API
    const simulatedPath = [
      { lat: -26.2041, lng: 28.0473, timestamp: Date.now() + 10000 },
      { lat: -26.2045, lng: 28.0475, timestamp: Date.now() + 20000 },
      { lat: -26.2050, lng: 28.0480, timestamp: Date.now() + 30000 }
    ];
    setRoutePath(simulatedPath);
    setEstimatedArrival('14:25');
    setDistanceRemaining('8.5 km');
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

          // Update map focus
          // Update this part in your useEffect where you update the map:
          if (mapRef.current) {
            const center = `lonlat:${newLocation.lng},${newLocation.lat}`;
            mapRef.current.src = `https://maps.geoapify.com/v1/staticmap?style=osm-carto&width=800&height=600&center=${center}&zoom=15&marker=${center};color:%23ff0000;size:medium&apiKey=${GEOAPIFY_API_KEY}`;
          }

          // And update your iframe component:
          <iframe
            ref={mapRef}
            title="Live Map"
            width="100%"
            height="100%"
            frameBorder="0"
            style={{ border: 0 }}
            src={userLocation ?
              `https://maps.geoapify.com/v1/staticmap?style=osm-carto&width=800&height=600&center=lonlat:${userLocation.lng},${userLocation.lat}&zoom=15&marker=lonlat:${userLocation.lng},${userLocation.lat};color:%23ff0000;size:medium&apiKey=${GEOAPIFY_API_KEY}`
              : ''}
            allowFullScreen
          ></iframe>
        },
        (error) => {
          console.error('Error getting location:', error);
        },
        { enableHighAccuracy: true, maximumAge: 10000, timeout: 5000 }
      );

      return () => navigator.geolocation.clearWatch(watchId);
    }
  }, []);

  const handleReroute = () => {
    alert('Finding safer alternative route...');
    // In a real app, this would trigger a new route calculation
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

  return (
    <div className="live-route-container">
      {/* Header with trip info */}
      <div className="trip-header">
        <div className="trip-metrics">
          <div className="metric">
            <span className="label">ETA</span>
            <span className="value">{estimatedArrival}</span>
          </div>
          <div className="metric">
            <span className="label">Distance</span>
            <span className="value">{distanceRemaining}</span>
          </div>
        </div>
        <div className="trip-actions">
          <button className="voice-control">
            <input
              type="checkbox"
              id="voiceToggle"
              checked={voiceAlertsEnabled}
              onChange={() => setVoiceAlertsEnabled(!voiceAlertsEnabled)}
            />
            <label htmlFor="voiceToggle">
              {voiceAlertsEnabled ? '🔊 Voice On' : '🔇 Voice Off'}
            </label>
          </button>
          <button className="cancel-btn" onClick={handleCancelTrip}>
            Cancel Trip
          </button>
        </div>
      </div>

      {/* Geoapify Map */}
      <div className="map-container">
        {userLocation ? (
          <iframe
            ref={mapRef}
            title="Live Map"
            width="100%"
            height="100%"
            frameBorder="0"
            style={{ border: 0 }}
            src={`https://maps.geoapify.com/v1/tile/carto/{z}/{x}/{y}.png?&apiKey=c58ea4effaee4dc4aec1ff3b865de50b`}
            allowFullScreen
          ></iframe>
        ) : (
          <div className="map-loading">
            <div className="spinner"></div>
            <p>Acquiring your location...</p>
          </div>
        )}
      </div>

      {/* Alert Cards */}
      <div className={`alerts-container ${isMinimized ? 'minimized' : ''}`}>
        <div className="alerts-header" onClick={() => setIsMinimized(!isMinimized)}>
          <h3>ROUTE ALERTS ({currentAlerts.length})</h3>
          <button className="minimize-btn">
            {isMinimized ? '↑' : '↓'}
          </button>
        </div>

        {!isMinimized && (
          <div className="alerts-list">
            {currentAlerts.length > 0 ? (
              currentAlerts.map(alert => (
                <div key={alert.id} className={`alert-card ${getSeverityClass(alert.severity)}`}>
                  <div className="alert-icon">
                    {alert.type === 'hijacking' && '🚨'}
                    {alert.type === 'theft' && '⚠️'}
                    {alert.type === 'heavy-rain' && '🌧️'}
                    {alert.type === 'hail' && '🌨️'}
                    {alert.type === 'fog' && '🌫️'}
                    {alert.type === 'congestion' && '🚗💨'}
                    {alert.type === 'road-closure' && '🚧'}
                    {alert.type === 'accident' && '🚑'}
                    {alert.type === 'potholes' && '🕳️'}
                    {alert.type === 'flooding' && '🌊'}
                  </div>
                  <div className="alert-content">
                    <h4>{alert.type.replace('-', ' ').toUpperCase()}</h4>
                    <p>{alert.message}</p>
                    <div className="alert-actions">
                      <button onClick={handleReroute}>Reroute</button>
                      <button onClick={() => handleDismissAlert(alert.id)}>Dismiss</button>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="no-alerts">
                <p>No active alerts on your route</p>
                <small>All clear for now - safe travels!</small>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Risk Legend */}
      <div className="risk-legend">
        <div className="legend-item">
          <span className="critical-dot"></span> Critical
        </div>
        <div className="legend-item">
          <span className="high-dot"></span> High
        </div>
        <div className="legend-item">
          <span className="medium-dot"></span> Medium
        </div>
        <div className="legend-item">
          <span className="low-dot"></span> Low
        </div>
      </div>
    </div>
  );
};

export default LiveRoute;