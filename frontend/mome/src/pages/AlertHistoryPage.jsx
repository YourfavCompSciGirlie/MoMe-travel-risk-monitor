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
      message: 'Severe hail warning in Johannesburg',
      timestamp: '2023-11-15T14:30:00',
      location: 'Sandton, Gauteng',
      coordinates: { lat: -26.1076, lng: 28.0567 },
      severity: 'high',
      description: 'Large hailstones expected with possible damage to vehicles and property.'
    },
    {
      id: 2,
      type: 'rain',
      message: 'Heavy rainfall expected in Cape Town',
      timestamp: '2023-11-14T18:45:00',
      location: 'City Bowl, Western Cape',
      coordinates: { lat: -33.9249, lng: 18.4241 },
      severity: 'medium',
      description: 'Persistent rainfall may cause localized flooding in low-lying areas.'
    },
    {
      id: 3,
      type: 'wind',
      message: 'Strong winds detected in Durban',
      timestamp: '2023-11-12T09:15:00',
      location: 'Umhlanga, KwaZulu-Natal',
      coordinates: { lat: -29.7167, lng: 31.0667 },
      severity: 'medium',
      description: 'Gale force winds may cause disruption to coastal activities.'
    },
    {
      id: 4,
      type: 'flood',
      message: 'Flood warning for Limpopo Valley',
      timestamp: '2023-11-10T22:00:00',
      location: 'Polokwane, Limpopo',
      coordinates: { lat: -23.8965, lng: 29.4486 },
      severity: 'high',
      description: 'River levels rising rapidly after heavy upstream rainfall.'
    },
    {
      id: 5,
      type: 'fire',
      message: 'Wildfire risk in Western Cape',
      timestamp: '2023-11-08T11:20:00',
      location: 'Stellenbosch, Western Cape',
      coordinates: { lat: -33.9321, lng: 18.8602 },
      severity: 'high',
      description: 'Extreme fire danger due to high temperatures and strong winds.'
    },
  ];

  const alertTypes = [
    { id: 'all', name: 'All Alerts' },
    { id: 'hail', name: 'Hail' },
    { id: 'rain', name: 'Rain' },
    { id: 'wind', name: 'Wind' },
    { id: 'flood', name: 'Flood' },
    { id: 'fire', name: 'Fire' },
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
      minute: '2-digit',
      timeZone: 'Africa/Johannesburg'
    };
    return new Date(dateString).toLocaleDateString('en-ZA', options);
  };

  const getAlertIcon = (type) => {
    return <FiAlertTriangle className={`alert-icon ${type}`} />;
  };

  const getSeverityColor = (severity) => {
    return severity === 'high' ? '#dc2626' : '#2563eb';
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

  const handleShare = async (alert) => {
    try {
      const shareData = {
        title: `Weather Alert: ${alert.type.toUpperCase()}`,
        text: `${alert.message} in ${alert.location}`,
        url: `https://maps.google.com/?q=${alert.coordinates.lat},${alert.coordinates.lng}`
      };
      
      if (navigator.share) {
        await navigator.share(shareData);
      } else {
        // Fallback for browsers that don't support Web Share API
        navigator.clipboard.writeText(`${shareData.text} - ${shareData.url}`);
        alert('Alert details copied to clipboard');
      }
    } catch (err) {
      console.error('Error sharing:', err);
    }
  };

  return (
    <div className="alerts-container">
      <div className="alerts-card">
        <div className="alerts-header">
          <h1>South African Weather Alerts</h1>
          <p className="subtitle">Recent weather warnings and advisories</p>
        </div>

        <div className="filters-section">
          <button 
            className="filter-toggle"
            onClick={() => setShowFilters(!showFilters)}
            aria-expanded={showFilters}
            aria-label="Filter alerts"
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
                  aria-label={`Filter by ${type.name}`}
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
              <p>No weather alerts for your selected filter</p>
            </div>
          ) : (
            filteredAlerts.map(alert => (
              <div 
                key={alert.id} 
                className={`alert-item ${alert.severity} ${expandedAlert === alert.id ? 'expanded' : ''}`}
                onClick={() => toggleExpand(alert.id)}
                role="button"
                tabIndex={0}
                aria-expanded={expandedAlert === alert.id}
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
                        zoom={11}
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
                        aria-label="View alert details"
                      >
                        <FiInfo size={16} /> Details
                      </button>
                      <button 
                        className="share-button"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleShare(alert);
                        }}
                        aria-label="Share alert"
                      >
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
        <div className="modal-overlay" onClick={() => setSelectedAlert(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button 
              className="modal-close"
              onClick={() => setSelectedAlert(null)}
              aria-label="Close modal"
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
              <p><strong>Time:</strong> {formatDate(selectedAlert.timestamp)} SAST</p>
              <p><strong>Coordinates:</strong> {selectedAlert.coordinates.lat.toFixed(4)}, {selectedAlert.coordinates.lng.toFixed(4)}</p>
              <p><strong>Details:</strong> {selectedAlert.description}</p>
            </div>
            
            <div className="modal-map">
              <MapContainer
                center={[selectedAlert.coordinates.lat, selectedAlert.coordinates.lng]}
                zoom={11}
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
                <span>⚠️ High Severity Alert - Take immediate precautions</span>
              ) : (
                <span>ℹ️ Medium Severity Alert - Stay informed</span>
              )}
            </div>
            
            <button 
              className="modal-close-btn"
              onClick={() => setSelectedAlert(null)}
              aria-label="Close modal"
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