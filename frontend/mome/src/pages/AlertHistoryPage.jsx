import React, { useState } from 'react';
import { 
  FiAlertTriangle, 
  FiFilter, 
  FiMapPin, 
  FiCalendar, 
  FiChevronDown, 
  FiChevronUp, 
  FiShare2, 
  FiInfo,
  FiX
} from 'react-icons/fi';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import './AlertsHistory.css';

// Proper ES Module imports for marker icons
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

// Fix for default marker icons in Leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

const AlertsHistory = () => {
  const [expandedAlert, setExpandedAlert] = useState(null);
  const [filter, setFilter] = useState('all');
  const [showFilters, setShowFilters] = useState(false);
  const [selectedAlert, setSelectedAlert] = useState(null);

  const alerts = [
    {
      id: 1,
      type: 'hail',
      message: 'Severe hail warning in your area',
      timestamp: '2023-06-15T14:30:00',
      location: 'Downtown District',
      coordinates: { lat: 40.7128, lng: -74.0060 },
      severity: 'high'
    },
    {
      id: 2,
      type: 'rain',
      message: 'Heavy rainfall expected tonight',
      timestamp: '2023-06-14T18:45:00',
      location: 'North Suburbs',
      coordinates: { lat: 40.8128, lng: -74.1060 },
      severity: 'medium'
    },
    {
      id: 3,
      type: 'wind',
      message: 'Strong winds detected nearby',
      timestamp: '2023-06-12T09:15:00',
      location: 'Eastside Neighborhood',
      coordinates: { lat: 40.7128, lng: -73.9060 },
      severity: 'medium'
    },
    {
      id: 4,
      type: 'flood',
      message: 'Potential flooding in low-lying areas',
      timestamp: '2023-06-10T22:00:00',
      location: 'Riverside',
      coordinates: { lat: 40.6128, lng: -74.0060 },
      severity: 'high'
    },
  ];

  const alertTypes = [
    { id: 'all', name: 'All Alerts' },
    { id: 'hail', name: 'Hail' },
    { id: 'rain', name: 'Rain' },
    { id: 'wind', name: 'Wind' },
    { id: 'flood', name: 'Flood' },
  ];

  const filteredAlerts = filter === 'all' 
    ? alerts 
    : alerts.filter(alert => alert.type === filter);

  const toggleExpand = (id) => {
    setExpandedAlert(expandedAlert === id ? null : id);
  };

  const formatDate = (dateString) => {
    const options = { 
      month: 'short', 
      day: 'numeric',
      hour: '2-digit', 
      minute: '2-digit' 
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const getAlertIcon = (type) => {
    return <FiAlertTriangle className={`alert-icon ${type}`} />;
  };

  const getSeverityColor = (severity) => {
    return severity === 'high' ? 'var(--danger-color)' : 'var(--primary-light)';
  };

  const getMarkerColor = (severity) => {
    return severity === 'high' ? 'red' : 'orange';
  };

  const createCustomIcon = (severity) => {
    return new L.Icon({
      iconUrl: `https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-${getMarkerColor(severity)}.png`,
      shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
      shadowSize: [41, 41]
    });
  };

  return (
    <div className="alerts-container">
      <div className="alerts-card">
        <div className="alerts-header">
          <h1>Alert History</h1>
          <p className="subtitle">Review past weather notifications</p>
        </div>

        <div className="filters-section">
          <button 
            className="filter-toggle"
            onClick={() => setShowFilters(!showFilters)}
          >
            <FiFilter className="filter-icon" />
            {alertTypes.find(t => t.id === filter)?.name || 'Filter'}
            {showFilters ? <FiChevronUp /> : <FiChevronDown />}
          </button>

          {showFilters && (
            <div className="filter-options">
              {alertTypes.map(type => (
                <button
                  key={type.id}
                  className={`filter-option ${filter === type.id ? 'active' : ''}`}
                  onClick={() => {
                    setFilter(type.id);
                    setShowFilters(false);
                  }}
                >
                  {type.name}
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="alerts-list">
          {filteredAlerts.length === 0 ? (
            <div className="no-alerts">
              <p>No alerts match your current filter</p>
            </div>
          ) : (
            filteredAlerts.map(alert => (
              <div 
                key={alert.id} 
                className={`alert-item ${alert.severity} ${expandedAlert === alert.id ? 'expanded' : ''}`}
                onClick={() => {
                  toggleExpand(alert.id);
                  setSelectedAlert(alert);
                }}
              >
                <div className="alert-summary">
                  {getAlertIcon(alert.type)}
                  <div className="alert-content">
                    <h3>{alert.message}</h3>
                    <div className="alert-meta">
                      <span className="alert-location">
                        <FiMapPin size={14} /> {alert.location}
                      </span>
                      <span className="alert-time">
                        <FiCalendar size={14} /> {formatDate(alert.timestamp)}
                      </span>
                    </div>
                  </div>
                  <div className="alert-toggle">
                    {expandedAlert === alert.id ? <FiChevronUp /> : <FiChevronDown />}
                  </div>
                </div>

                {expandedAlert === alert.id && (
                  <div className="alert-details">
                    <div className="map-snippet">
                      <MapContainer
                        center={[alert.coordinates.lat, alert.coordinates.lng]}
                        zoom={12}
                        scrollWheelZoom={false}
                        style={{ height: '200px', width: '100%', borderRadius: '8px' }}
                      >
                        <TileLayer
                          url={`https://maps.geoapify.com/v1/tile/carto/{z}/{x}/{y}.png?&apiKey=cffc724f3d5f4608bea5c1fef4afbc3e`}
                          attribution='Powered by <a href="https://www.geoapify.com/" target="_blank">Geoapify</a> | © OpenStreetMap contributors'
                        />
                        <Marker 
                          position={[alert.coordinates.lat, alert.coordinates.lng]}
                          icon={createCustomIcon(alert.severity)}
                        >
                          <Popup>{alert.message}</Popup>
                        </Marker>
                      </MapContainer>
                    </div>
                    <div className="alert-actions">
                      <button 
                        className="details-button"
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedAlert(alert);
                        }}
                      >
                        <FiInfo size={16} /> Details
                      </button>
                      <button className="share-button">
                        <FiShare2 size={16} /> Share
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      </div>

      {selectedAlert && (
        <div className="modal-overlay">
          <div className="modal-content">
            <button 
              className="modal-close"
              onClick={() => setSelectedAlert(null)}
            >
              <FiX />
            </button>
            
            <div 
              className="modal-badge"
              style={{ backgroundColor: getSeverityColor(selectedAlert.severity) }}
            >
              {getAlertIcon(selectedAlert.type)}
            </div>
            
            <h2>{selectedAlert.message}</h2>
            <div className="badge-description">
              <p><strong>Location:</strong> {selectedAlert.location}</p>
              <p><strong>Time:</strong> {formatDate(selectedAlert.timestamp)}</p>
              <p><strong>Coordinates:</strong> {selectedAlert.coordinates.lat.toFixed(4)}, {selectedAlert.coordinates.lng.toFixed(4)}</p>
            </div>
            
            <div className="modal-map">
              <MapContainer
                center={[selectedAlert.coordinates.lat, selectedAlert.coordinates.lng]}
                zoom={12}
                scrollWheelZoom={true}
                style={{ height: '300px', width: '100%', borderRadius: '8px' }}
              >
                <TileLayer
                  url={`https://maps.geoapify.com/v1/tile/carto/{z}/{x}/{y}.png?&apiKey=cffc724f3d5f4608bea5c1fef4afbc3e`}
                  attribution='Powered by <a href="https://www.geoapify.com/" target="_blank">Geoapify</a> | © OpenStreetMap contributors'
                />
                <Marker 
                  position={[selectedAlert.coordinates.lat, selectedAlert.coordinates.lng]}
                  icon={createCustomIcon(selectedAlert.severity)}
                >
                  <Popup>{selectedAlert.message}</Popup>
                </Marker>
              </MapContainer>
            </div>
            
            <div className={`alert-info ${selectedAlert.severity}`}>
              {selectedAlert.severity === 'high' ? (
                <span>High Severity Alert</span>
              ) : (
                <span>Medium Severity Alert</span>
              )}
            </div>
            
            <button 
              className="modal-close-btn"
              onClick={() => setSelectedAlert(null)}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AlertsHistory;
