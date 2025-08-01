// src/pages/UserProfilePage.jsx

import React from 'react';

const UserProfilePage = () => {
  return (
    <div>
      <h1>User Profile</h1>
      <p>
        Welcome to your profile page 👤 Here’s where you can view and manage your
        personal details, preferences, and more.
      </p>

      {/* Placeholder profile info */}
      <div style={{ marginTop: '1rem', border: '1px solid #ccc', padding: '1rem' }}>
        <p>🧑 Name: John Doe</p>
        <p>📧 Email: john.doe@example.com</p>
        <p>📆 Joined: January 1, 2024</p>
      </div>
    </div>
  );
};

export default UserProfilePage;
