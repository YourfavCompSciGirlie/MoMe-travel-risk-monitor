// src/pages/VehicleSettingsPage.jsx

import React from 'react';

const VehicleSettingsPage = () => {
  return (
    <div>
      <h1>Vehicle Settings</h1>
      <p>
        Customize and manage your vehicle's settings here 🚗💨 Whether it’s
        performance tweaks, maintenance logs, or system updates, this is your pit stop.
      </p>

      {/* Placeholder settings */}
      <div style={{ marginTop: '1rem', border: '1px solid #ccc', padding: '1rem' }}>
        <p>🚘 Vehicle ID: VEH-00123</p>
        <p>⚙️ Mode: Eco</p>
        <p>🧭 Navigation: Enabled</p>
        <p>🔋 Battery Status: 87%</p>
      </div>
    </div>
  );
};

export default VehicleSettingsPage;
