import React, { useState, useEffect } from 'react';
import {
  FiMapPin, FiNavigation, FiAlertTriangle, FiClock, FiCalendar,
  FiChevronRight, FiCheck, FiRefreshCw, FiShield
} from 'react-icons/fi';
import { FaRoute, FaCar, FaExclamationTriangle } from 'react-icons/fa';
import { IoMdSnow } from 'react-icons/io';
import { FiWind, FiDroplet } from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';
import './RouteSimulationPage.css';

const RouteSimulation = () => {
  const [origin, setOrigin] = useState('');
  const [destination, setDestination] = useState('');
  const [routeData, setRouteData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [simulationComplete, setSimulationComplete] = useState(false);
  const [riskScore, setRiskScore] = useState(0);
  const [weatherAlerts, setWeatherAlerts] = useState([]);
  const [showAlternateRoute, setShowAlternateRoute] = useState(false);
  const [alternateRoute, setAlternateRoute] = useState(null);
  const [mapPreview, setMapPreview] = useState(null);

const GEOAPIFY_API_KEY = import.meta.env.VITE_GEOAPIFY_API_KEY;

  // Sample locations in South Africa for autocomplete suggestions
  const southAfricaLocations = [
    'Johannesburg, South Africa',
    'Cape Town, South Africa',
    'Durban, South Africa',
    'Pretoria, South Africa',
    'Port Elizabeth, South Africa',
    'Bloemfontein, South Africa',
    'East London, South Africa',
    'Pietermaritzburg, South Africa'
  ];

  const getRouteFromGeoapify = async (origin, destination, avoidWeather = false) => {
    try {
      // First geocode the origin and destination to get coordinates
      const geocodeOrigin = await fetch(
        `https://api.geoapify.com/v1/geocode/search?text=${encodeURIComponent(origin)}&apiKey=${GEOAPIFY_API_KEY}`
      );
      const originData = await geocodeOrigin.json();
      
      const geocodeDest = await fetch(
        `https://api.geoapify.com/v1/geocode/search?text=${encodeURIComponent(destination)}&apiKey=${GEOAPIFY_API_KEY}`
      );
      const destData = await geocodeDest.json();

      if (!originData.features.length || !destData.features.length) {
        throw new Error('Could not find location coordinates');
      }

      const originCoords = originData.features[0].geometry.coordinates;
      const destCoords = destData.features[0].geometry.coordinates;

      // Get route from Geoapify
      const waypoints = `${originCoords[1]},${originCoords[0]}|${destCoords[1]},${destCoords[0]}`;
      const response = await fetch(
        `https://api.geoapify.com/v1/routing?waypoints=${waypoints}&mode=drive&apiKey=${GEOAPIFY_API_KEY}`
      );
      const data = await response.json();

      if (!data.features || !data.features.length) {
        throw new Error('No route found');
      }

      // Process route data
      const route = data.features[0];
      const distance = (route.properties.distance / 1000).toFixed(1) + ' km';
      const duration = (route.properties.time / 60).toFixed(0) + ' mins';

      // Generate map preview URL
      const mapUrl = `https://maps.geoapify.com/v1/staticmap?style=osm-carto&width=600&height=400&zoom=12&center=lonlat:${originCoords[0]},${originCoords[1]}&marker=lonlat:${originCoords[0]},${originCoords[1]};color:%23ff0000;size:medium&marker=lonlat:${destCoords[0]},${destCoords[1]};color:%23ff0000;size:medium&apiKey=${GEOAPIFY_API_KEY}`;

      return {
        distance,
        duration,
        coordinates: [
          { lat: originCoords[1], lng: originCoords[0] },
          { lat: destCoords[1], lng: destCoords[0] }
        ],
        waypoints: [
          { lat: originCoords[1], lng: originCoords[0], name: origin },
          { lat: destCoords[1], lng: destCoords[0], name: destination }
        ],
        mapUrl
      };
    } catch (err) {
      console.error('Routing error:', err);
      throw err;
    }
  };

  const simulateRoute = async () => {
    if (!origin || !destination) {
      setError('Please enter both origin and destination');
      return;
    }

    setLoading(true);
    setError(null);
    
    try {
      const route = await getRouteFromGeoapify(origin, destination);
      setRouteData(route);
      setMapPreview(route.mapUrl);
      
      // Calculate a random risk score (0-100) based on distance
      const distanceKm = parseFloat(route.distance.split(' ')[0]);
      const baseRisk = Math.min(80, Math.max(20, distanceKm / 3));
      const calculatedRisk = Math.floor(baseRisk + (Math.random() * 20) - 10); // Add some variance
      setRiskScore(calculatedRisk);
      
      // Generate sample weather alerts based on distance
      const alerts = [];
      if (distanceKm > 50) alerts.push({ type: 'wind', location: 'Mid-route', severity: 'medium', time: 'Soon' });
      if (distanceKm > 100) alerts.push({ type: 'hail', location: 'Northern section', severity: 'low', time: 'Later' });
      if (distanceKm > 150) alerts.push({ type: 'flood', location: 'Coastal areas', severity: 'high', time: 'Afternoon' });
      
      setWeatherAlerts(alerts);
      setSimulationComplete(true);
    } catch (err) {
      setError('Failed to simulate route. Please check your locations and try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const findAlternateRoute = async () => {
    setLoading(true);
    try {
      const route = await getRouteFromGeoapify(origin, destination, true);
      setAlternateRoute(route);
      setShowAlternateRoute(true);
      
      // Calculate lower risk score for alternate route
      const distanceKm = parseFloat(route.distance.split(' ')[0]);
      const baseRisk = Math.min(60, Math.max(10, distanceKm / 4));
      const calculatedRisk = Math.floor(baseRisk + (Math.random() * 15) - 5);
      
      // Fewer weather alerts for alternate route
      const alerts = [];
      if (distanceKm > 100) alerts.push({ type: 'wind', location: 'Alternate section', severity: 'low', time: 'Evening' });
      
      setWeatherAlerts(alerts);
    } catch (err) {
      setError('Failed to find alternate route');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const acceptAlternateRoute = () => {
    setRouteData(alternateRoute);
    setMapPreview(alternateRoute.mapUrl);
    setShowAlternateRoute(false);
    
    // Update risk score for alternate route
    const distanceKm = parseFloat(alternateRoute.distance.split(' ')[0]);
    const baseRisk = Math.min(60, Math.max(10, distanceKm / 4));
    setRiskScore(Math.floor(baseRisk + (Math.random() * 15) - 5));
  };

  const resetSimulation = () => {
    setRouteData(null);
    setMapPreview(null);
    setRiskScore(0);
    setWeatherAlerts([]);
    setSimulationComplete(false);
    setShowAlternateRoute(false);
    setAlternateRoute(null);
  };

  const getRiskColor = (score) => {
    if (score < 30) return '#4CAF50'; // Green
    if (score < 60) return '#FFC107'; // Yellow
    return '#F44336'; // Red
  };

  const getAlertIcon = (type) => {
    switch (type) {
      case 'hail': return <IoMdSnow />;
      case 'wind': return <FiWind />;
      case 'flood': return <FiDroplet />;
      default: return <FiAlertTriangle />;
    }
  };

  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'high': return '#F44336';
      case 'medium': return '#FFC107';
      case 'low': return '#4CAF50';
      default: return '#9E9E9E';
    }
  };

  return (
    <div className="route-simulation-container">
      <div className="header">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="header-content"
        >
          <div className="route-icon">
            <FaRoute />
          </div>
          <h1 className="header-title">Route Simulation</h1>
          <p className="header-subtitle">Preview weather risks along your planned route in South Africa</p>
        </motion.div>
      </div>

      <div className="route-input-section">
        <div className="input-group">
          <div className="input-icon">
            <FiMapPin />
          </div>
          <input
            type="text"
            placeholder="Starting point (e.g. Johannesburg)"
            value={origin}
            onChange={(e) => setOrigin(e.target.value)}
            disabled={simulationComplete}
            list="sa-locations"
          />
        </div>

        <div className="input-group">
          <div className="input-icon">
            <FiNavigation />
          </div>
          <input
            type="text"
            placeholder="Destination (e.g. Cape Town)"
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
            disabled={simulationComplete}
            list="sa-locations"
          />
        </div>

        <datalist id="sa-locations">
          {southAfricaLocations.map((location, index) => (
            <option key={index} value={location} />
          ))}
        </datalist>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="simulate-btn"
          onClick={simulationComplete ? resetSimulation : simulateRoute}
          disabled={loading}
        >
          {loading ? (
            <FiRefreshCw className="spin" />
          ) : simulationComplete ? (
            'Reset Simulation'
          ) : (
            'Simulate Route'
          )}
        </motion.button>

        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="error-message"
          >
            <FiAlertTriangle /> {error}
          </motion.div>
        )}
      </div>

      {routeData && (
        <AnimatePresence>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="route-results"
          >
            <div className="map-container">
              {mapPreview && (
                <div className="map-preview">
                  <img 
                    src={mapPreview} 
                    alt="Route map" 
                    onError={(e) => {
                      e.target.onerror = null; 
                      e.target.src = 'https://maps.geoapify.com/v1/staticmap?style=osm-carto&width=600&height=400&zoom=5&center=lonlat:25,29&apiKey=' + GEOAPIFY_API_KEY;
                    }}
                  />
                  <div className="map-overlay">
                    <div className="origin-marker">
                      <FiMapPin /> Origin: {origin.split(',')[0]}
                    </div>
                    <div className="dest-marker">
                      <FiNavigation /> Destination: {destination.split(',')[0]}
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div className="route-summary">
              <div className="risk-score" style={{ backgroundColor: getRiskColor(riskScore) }}>
                <div className="score-value">{riskScore}</div>
                <div className="score-label">Risk Score</div>
              </div>

              <div className="route-details">
                <div className="detail-item">
                  <FaCar />
                  <span>{routeData.distance}</span>
                </div>
                <div className="detail-item">
                  <FiClock />
                  <span>{routeData.duration}</span>
                </div>
              </div>

              {!showAlternateRoute && (
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="alternate-route-btn"
                  onClick={findAlternateRoute}
                  disabled={loading}
                >
                  {loading ? (
                    <FiRefreshCw className="spin" />
                  ) : (
                    <>
                      <FiShield /> Suggest Safer Route
                    </>
                  )}
                </motion.button>
              )}
            </div>

            <div className="weather-alerts">
              <h3>
                <FiAlertTriangle /> Weather Alerts Along Route
              </h3>
              
              {weatherAlerts.length > 0 ? (
                <div className="alerts-list">
                  {weatherAlerts.map((alert, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="alert-item"
                    >
                      <div className="alert-icon" style={{ color: getSeverityColor(alert.severity) }}>
                        {getAlertIcon(alert.type)}
                      </div>
                      <div className="alert-details">
                        <div className="alert-type">
                          {alert.type.charAt(0).toUpperCase() + alert.type.slice(1)} Risk
                          <span className="alert-severity" style={{ backgroundColor: getSeverityColor(alert.severity) }}>
                            {alert.severity}
                          </span>
                        </div>
                        <div className="alert-location">Near {alert.location} • {alert.time}</div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              ) : (
                <div className="no-alerts">
                  <FiCheck /> No significant weather alerts detected
                </div>
              )}
            </div>

            {showAlternateRoute && alternateRoute && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="alternate-route-panel"
              >
                <h4>
                  <FaExclamationTriangle /> Alternate Route Available
                </h4>
                <div className="alternate-details">
                  <div className="alternate-map">
                    <img 
                      src={alternateRoute.mapUrl} 
                      alt="Alternate route" 
                      onError={(e) => {
                        e.target.onerror = null; 
                        e.target.src = 'https://maps.geoapify.com/v1/staticmap?style=osm-carto&width=300&height=200&zoom=5&center=lonlat:25,29&apiKey=' + GEOAPIFY_API_KEY;
                      }}
                    />
                  </div>
                  <div className="alternate-stats">
                    <p><strong>Distance:</strong> {alternateRoute.distance}</p>
                    <p><strong>Duration:</strong> {alternateRoute.duration}</p>
                    <p><strong>Estimated Risk:</strong> 
                      <span style={{ color: getRiskColor(riskScore - 15) }}> {riskScore - 15} (Lower)</span>
                    </p>
                  </div>
                </div>
                <div className="alternate-actions">
                  <button className="accept-alternate" onClick={acceptAlternateRoute}>
                    Use This Route
                  </button>
                  <button className="decline-alternate" onClick={() => setShowAlternateRoute(false)}>
                    Keep Original
                  </button>
                </div>
              </motion.div>
            )}
          </motion.div>
        </AnimatePresence>
      )}
    </div>
  );
};

export default RouteSimulation;