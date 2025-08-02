import React, { useState } from 'react';
import {
  FiChevronDown, FiCheck, FiPlus, FiStar, FiChevronRight, FiAlertTriangle, FiWind, FiDroplet
} from 'react-icons/fi';
import {
  FaCar, FaTruck, FaMotorcycle, FaShieldAlt, FaCarSide, FaTruckPickup, FaShuttleVan, FaTrashAlt,
  FaEye,
  FaTrash
} from 'react-icons/fa';
import { IoMdSnow } from 'react-icons/io';
import { motion, AnimatePresence } from 'framer-motion';
import './VehicleSettings.css';

const VehicleSettings = () => {
  const [vehicles, setVehicles] = useState([
    {
      id: 1,
      make: 'Toyota',
      model: 'Corolla',
      year: '2020',
      type: 'sedan',
      isDefault: true,
      sensitivity: { hail: 'medium', wind: 'high', flood: 'low' }
    },
    {
      id: 2,
      make: 'Ford',
      model: 'Ranger',
      year: '2018',
      type: 'truck',
      isDefault: false,
      sensitivity: { hail: 'high', wind: 'medium', flood: 'medium' }
    }
  ]);

  const [showAddForm, setShowAddForm] = useState(false);
  const [newVehicle, setNewVehicle] = useState({
    make: '',
    model: '',
    year: '',
    type: '',
    sensitivity: {
      hail: 'medium',
      wind: 'medium',
      flood: 'medium'
    }
  });

  const [expandedVehicle, setExpandedVehicle] = useState(null);

  const vehicleTypes = [
    { value: 'sedan', label: 'Sedan', icon: <FaCarSide /> },
    { value: 'suv', label: 'SUV', icon: <FaCar /> },
    { value: 'truck', label: 'Truck', icon: <FaTruckPickup /> },
    { value: 'hatchback', label: 'Hatchback', icon: <FaCar /> },
    { value: 'coupe', label: 'Coupe', icon: <FaCar /> },
    { value: 'convertible', label: 'Convertible', icon: <FaCar /> },
    { value: 'motorcycle', label: 'Motorcycle', icon: <FaMotorcycle /> },
    { value: 'van', label: 'Van', icon: <FaShuttleVan /> }
  ];

  const sensitivityOptions = [
    { value: 'low', label: 'Low', icon: <FiChevronRight size={12} /> },
    { value: 'medium', label: 'Medium', icon: <FiChevronRight size={14} /> },
    { value: 'high', label: 'High', icon: <FiChevronRight size={16} /> }
  ];

  const alertTypes = [
    { key: 'hail', label: 'Hail Damage', icon: <IoMdSnow /> },
    { key: 'wind', label: 'High Winds', icon: <FiWind /> },
    { key: 'flood', label: 'Flood Risk', icon: <FiDroplet /> }
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewVehicle({ ...newVehicle, [name]: value });
  };

  const handleSensitivityChange = (vehicleId, alertType, value) => {
    if (vehicleId === 'new') {
      setNewVehicle({
        ...newVehicle,
        sensitivity: {
          ...newVehicle.sensitivity,
          [alertType]: value
        }
      });
    } else {
      setVehicles(vehicles.map(vehicle =>
        vehicle.id === vehicleId
          ? {
              ...vehicle,
              sensitivity: {
                ...vehicle.sensitivity,
                [alertType]: value
              }
            }
          : vehicle
      ));
    }
  };

  const handleAddVehicle = () => {
    if (!newVehicle.make || !newVehicle.model || !newVehicle.year || !newVehicle.type) {
      alert('Please fill in all required fields');
      return;
    }

    const vehicleToAdd = {
      ...newVehicle,
      id: Date.now(),
      isDefault: vehicles.length === 0
    };

    setVehicles([...vehicles, vehicleToAdd]);
    setNewVehicle({
      make: '',
      model: '',
      year: '',
      type: '',
      sensitivity: {
        hail: 'medium',
        wind: 'medium',
        flood: 'medium'
      }
    });
    setShowAddForm(false);
  };

  const handleSetDefault = (id) => {
    setVehicles(vehicles.map(vehicle => ({
      ...vehicle,
      isDefault: vehicle.id === id
    })));
  };

  const handleDeleteVehicle = (id) => {
    const target = vehicles.find(v => v.id === id);
    if (target?.isDefault && vehicles.length > 1) {
      alert('Set another vehicle as default before deleting this one');
      return;
    }
    setVehicles(vehicles.filter(vehicle => vehicle.id !== id));
    if (expandedVehicle === id) setExpandedVehicle(null);
  };

  const getVehicleIcon = (type) => {
    const foundType = vehicleTypes.find(t => t.value === type.toLowerCase());
    return foundType ? foundType.icon : <FaCar />;
  };

  const toggleExpandVehicle = (id) => {
    setExpandedVehicle(expandedVehicle === id ? null : id);
  };

  return (
    <div className="vehicle-settings-container">
      <div className="header">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="header-content"
        >
          <div className="shield-icon">
            <FaShieldAlt />
          </div>
          <h1 className="header-title">Vehicle Protection Settings</h1>
          <p className="header-subtitle">Customize alert sensitivity for each of your vehicles</p>
        </motion.div>
      </div>

      <div className="vehicles-list">
        <AnimatePresence>
          {vehicles.map(vehicle => (
            <motion.div
              key={vehicle.id}
              layout
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3 }}
              className={`vehicle-card ${vehicle.isDefault ? 'default' : ''} ${expandedVehicle === vehicle.id ? 'expanded' : ''}`}
            >
              <div className="vehicle-header" onClick={() => toggleExpandVehicle(vehicle.id)}>
                <div className="vehicle-icon">
                  {getVehicleIcon(vehicle.type)}
                </div>
                <div className="vehicle-info">
                  <h3>{vehicle.make} {vehicle.model} <span>({vehicle.year})</span></h3>
                  <p>{vehicleTypes.find(t => t.value === vehicle.type)?.label}</p>
                </div>
                <div className="vehicle-actions">
                  {vehicle.isDefault && (
                    <div className="default-badge">
                      <FiStar /> Default
                    </div>
                  )}
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={`default-btn ${vehicle.isDefault ? 'active' : ''}`}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleSetDefault(vehicle.id);
                    }}
                  >
                    <FiStar />
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="delete-btn"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDeleteVehicle(vehicle.id);
                    }}
                    title="Delete this vehicle"
                  >
                    <FaTrashAlt />
                    <span className="delete-button-text"><FaTrashAlt /></span>
                  </motion.button>
                  <motion.div
                    animate={{ rotate: expandedVehicle === vehicle.id ? 90 : 0 }}
                    className="expand-icon"
                  >
                    <FiChevronRight />
                  </motion.div>
                </div>
              </div>

              {expandedVehicle === vehicle.id && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                  className="sensitivity-settings"
                >
                  <div className="section-header">
                    <FiAlertTriangle className="section-icon" />
                    <h4>Alert Sensitivity Settings</h4>
                  </div>
                  <div className="sensitivity-grid">
                    {alertTypes.map(alert => (
                      <div key={alert.key} className="sensitivity-item">
                        <div className="alert-type">
                          <div className="alert-icon">{alert.icon}</div>
                          <label>{alert.label}</label>
                        </div>
                        <div className="sensitivity-options">
                          {sensitivityOptions.map(option => (
                            <motion.button
                              key={`${vehicle.id}-${alert.key}-${option.value}`}
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              className={`sensitivity-btn ${vehicle.sensitivity[alert.key] === option.value ? 'active' : ''}`}
                              onClick={() => handleSensitivityChange(vehicle.id, alert.key, option.value)}
                            >
                              <span className="option-icon">{option.icon}</span>
                              {option.label}
                              {vehicle.sensitivity[alert.key] === option.value && <FiCheck className="check-icon" />}
                            </motion.button>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default VehicleSettings;
