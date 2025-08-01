import React, { useState, useEffect } from 'react';
import './LiveRoute.css';

const LiveRoute = () => {
  const [voiceAlertsEnabled, setVoiceAlertsEnabled] = useState(true);
  const [currentAlert, setCurrentAlert] = useState(null);
  const [isMinimized, setIsMinimized] = useState(false);
  const [userLocation, setUserLocation] = useState(null);

  // Mock alerts data
  const mockAlerts = [
    { id: 1, type: 'accident', message: 'Accident reported 500m ahead', severity: 'high' },
    { id: 2, type: 'congestion', message: 'Heavy traffic detected on your route', severity: 'medium' },
    { id: 3, type: 'hazard', message: 'Road work ahead', severity: 'low' },
  ];

  // Simulate receiving alerts
  useEffect(() => {
    const alertInterval = setInterval(() => {
      if (mockAlerts.length > 0) {
        const randomAlert = mockAlerts[Math.floor(Math.random() * mockAlerts.length)];
        setCurrentAlert(randomAlert);
        
        // Speak alert if voice is enabled
        if (voiceAlertsEnabled) {
          const utterance = new SpeechSynthesisUtterance(randomAlert.message);
          window.speechSynthesis.speak(utterance);
        }
      }
    }, 15000); // Every 15 seconds

    return () => clearInterval(alertInterval);
  }, [voiceAlertsEnabled]);

  // Get user location
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.watchPosition(
        (position) => {
          setUserLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
        },
        (error) => {
          console.error('Error getting location:', error);
        },
        { enableHighAccuracy: true }
      );
    }
  }, []);

  const handleReroute = () => {
    // Reroute logic would go here
    alert('Finding alternative route...');
  };

  const handleCancelTrip = () => {
    // Cancel trip logic would go here
    alert('Trip cancelled');
    window.location.href = '/dashboard';
  };

  return (
    <div className="live-route-container">
      {/* Fullscreen Map */}
      <div className="map-container">
        {userLocation ? (
          <iframe
            title="Live Map"
            width="100%"
            height="100%"
            frameBorder="0"
            style={{ border: 0 }}
            src={`https://www.google.com/maps/embed/v1/view?key=YOUR_API_KEY&center=${userLocation.lat},${userLocation.lng}&zoom=15`}
            allowFullScreen
          ></iframe>
        ) : (
          <div className="map-loading">Loading map...</div>
        )}
      </div>

      {/* Alert Card */}
      {currentAlert && (
        <div className={`alert-card ${isMinimized ? 'minimized' : ''} ${currentAlert.severity}`}>
          <div className="alert-header" onClick={() => setIsMinimized(!isMinimized)}>
            <h3>{currentAlert.type.toUpperCase()}</h3>
            <button className="minimize-btn">
              {isMinimized ? '+' : '-'}
            </button>
          </div>
          {!isMinimized && (
            <div className="alert-body">
              <p>{currentAlert.message}</p>
              <div className="alert-actions">
                <button onClick={handleReroute}>Reroute</button>
                <button onClick={handleCancelTrip}>Cancel Trip</button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Voice Controls */}
      <div className="voice-controls">
        <label>
          <input
            type="checkbox"
            checked={voiceAlertsEnabled}
            onChange={() => setVoiceAlertsEnabled(!voiceAlertsEnabled)}
          />
          Voice Alerts
        </label>
      </div>
    </div>
  );
};

export default LiveRoute;