// src/pages/DashboardPage.jsx

import React from 'react';

const DashboardPage = () => {
  return (
    <div>
      <h1>Dashboard</h1>
      <p>
        Welcome to your dashboard! Here’s where you get a bird’s-eye view of all
        the important stuff—stats, updates, and whatever else matters today.
      </p>

      {/* Placeholder stats */}
      <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
        <div>
          <h3>📊 Users</h3>
          <p>1,245</p>
        </div>
        <div>
          <h3>⚙️ Active Processes</h3>
          <p>7</p>
        </div>
        <div>
          <h3>✅ Uptime</h3>
          <p>99.97%</p>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
