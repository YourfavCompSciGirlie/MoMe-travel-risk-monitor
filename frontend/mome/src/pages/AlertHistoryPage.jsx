// src/pages/AlertHistoryPage.jsx

import React from 'react';

const AlertHistoryPage = () => {
  return (
    <div>
      <h1>Alert History</h1>
      <p>
        Here's a list of all past alerts. Whether they were system warnings,
        notifications, or full-on panic buttons—if it happened, it’s logged here.
      </p>

      {/* Placeholder for future alert list */}
      <ul>
        <li>🚨 [08/01/2025] - System rebooted at 3:45 PM</li>
        <li>⚠️ [07/30/2025] - High memory usage detected</li>
        <li>✅ [07/28/2025] - Backup completed successfully</li>
      </ul>
    </div>
  );
};

export default AlertHistoryPage;
