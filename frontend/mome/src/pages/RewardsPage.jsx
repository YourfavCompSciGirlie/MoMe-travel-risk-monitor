// src/pages/RewardsPage.jsx

import React from 'react';

const RewardsPage = () => {
  return (
    <div>
      <h1>Rewards</h1>
      <p>
        You’ve been grinding, and it shows! 💪 This is your rewards center. Check
        out your points, redeemables, and any milestones you've hit.
      </p>

      {/* Placeholder rewards list */}
      <ul style={{ marginTop: '1rem' }}>
        <li>🏆 500 Points - $10 Gift Card</li>
        <li>🎟️ 750 Points - Raffle Entry</li>
        <li>🔥 1000 Points - Premium Badge</li>
      </ul>
    </div>
  );
};

export default RewardsPage;
