import React, { useState } from 'react';
import { 
  FiAward, FiShield, FiCalendar, FiTrendingUp, 
  FiCheckCircle, FiLock, FiStar 
} from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';
import './RewardsScreen.css';

const RewardsScreen = () => {
  const [activeTab, setActiveTab] = useState('badges');
  const [selectedBadge, setSelectedBadge] = useState(null);

  // Badge data
  const badges = [
    {
      id: 1,
      name: "Safe Driver",
      description: "Complete 30 days without risky routes",
      icon: <FiShield size={24} />,
      color: "#4cc9f0",
      earned: true,
      dateEarned: "May 15, 2023"
    },
    {
      id: 2,
      name: "Hail Hero",
      description: "Avoid 5 hail storm alerts",
      icon: <FiAward size={24} />,
      color: "#4361ee",
      earned: true,
      dateEarned: "Jun 2, 2023"
    },
    {
      id: 3,
      name: "Wind Warrior",
      description: "Navigate around 3 high wind alerts",
      icon: <FiTrendingUp size={24} />,
      color: "#3a0ca3",
      earned: false,
      unlocksAt: "Avoid 2 more wind alerts"
    },
    {
      id: 4,
      name: "Flood Defender",
      description: "Reroute from 3 flood risk areas",
      icon: <FiCheckCircle size={24} />,
      color: "#7209b7",
      earned: false,
      unlocksAt: "Reroute from 1 more flood risk"
    },
    {
      id: 5,
      name: "Perfect Month",
      description: "Complete a month with no weather incidents",
      icon: <FiCalendar size={24} />,
      color: "#f72585",
      earned: false,
      unlocksAt: "15 days remaining"
    },
    {
      id: 6,
      name: "Early Adopter",
      description: "Join within the first month of launch",
      icon: <FiStar size={24} />,
      color: "#4895ef",
      earned: true,
      dateEarned: "Apr 10, 2023"
    }
  ];

  // Stats data
  const stats = {
    currentStreak: 14,
    longestStreak: 21,
    riskReduction: 68, // percentage
    totalBadges: badges.filter(b => b.earned).length,
    totalPossibleBadges: badges.length,
    hailAvoided: 3,
    floodAvoided: 2
  };

  return (
    <div className="rewards-container">
      <div className="rewards-header">
        <h1><FiAward className="header-icon" /> Your Rewards</h1>
        <p>Celebrate your safe driving achievements</p>
      </div>

      {/* Stats Overview - Cleaner Cards */}
      <div className="stats-overview">
        <div className="stat-card">
          <div className="stat-icon">
            <FiCalendar />
          </div>
          <div className="stat-content">
            <h3>{stats.currentStreak} Days</h3>
            <p>Current Safe Streak</p>
            <div className="progress-container">
              <div className="progress-bar">
                <div 
                  className="progress-fill"
                  style={{ width: `${(stats.currentStreak / 30) * 100}%` }}
                ></div>
              </div>
              <span>Record: {stats.longestStreak} days</span>
            </div>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">
            <FiTrendingUp />
          </div>
          <div className="stat-content">
            <h3>{stats.riskReduction}%</h3>
            <p>Risk Reduction</p>
            <div className="progress-container">
              <div className="progress-bar">
                <div 
                  className="progress-fill"
                  style={{ width: `${stats.riskReduction}%` }}
                ></div>
              </div>
              <span>Goal: 80% reduction</span>
            </div>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">
            <FiAward />
          </div>
          <div className="stat-content">
            <h3>{stats.totalBadges}/{stats.totalPossibleBadges}</h3>
            <p>Badges Earned</p>
            <div className="badges-preview">
              {badges.slice(0, 3).map(badge => (
                <div 
                  key={`preview-${badge.id}`}
                  className={`badge-preview ${badge.earned ? 'earned' : ''}`}
                  style={{ backgroundColor: badge.earned ? badge.color : '#e0e0e0' }}
                >
                  {badge.earned ? badge.icon : <FiLock size={12} />}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Tabs - Simplified */}
      <div className="rewards-tabs">
        <button
          className={`tab-btn ${activeTab === 'badges' ? 'active' : ''}`}
          onClick={() => setActiveTab('badges')}
        >
          <FiAward /> Badges
        </button>
        <button
          className={`tab-btn ${activeTab === 'achievements' ? 'active' : ''}`}
          onClick={() => setActiveTab('achievements')}
        >
          <FiTrendingUp /> Progress
        </button>
      </div>

      {/* Content Area */}
      <div className="rewards-content">
        {activeTab === 'badges' && (
          <div className="badges-grid">
            {badges.map(badge => (
              <div 
                key={badge.id}
                className={`badge-card ${badge.earned ? 'earned' : 'locked'}`}
                onClick={() => setSelectedBadge(badge)}
              >
                <div 
                  className="badge-icon"
                  style={{ 
                    backgroundColor: badge.earned ? badge.color : '#f5f5f5',
                    color: badge.earned ? 'white' : '#999'
                  }}
                >
                  {badge.earned ? badge.icon : <FiLock size={20} />}
                </div>
                <h3>{badge.name}</h3>
                <p>{badge.earned ? 'Earned' : 'Locked'}</p>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'achievements' && (
          <div className="achievements-list">
            <div className="achievement-card">
              <div className="achievement-icon">
                <FiCalendar />
              </div>
              <div className="achievement-details">
                <h3>Safe Driving Streak</h3>
                <div className="progress-container">
                  <div className="progress-bar">
                    <div 
                      className="progress-fill"
                      style={{ width: `${(stats.currentStreak / 30) * 100}%` }}
                    ></div>
                  </div>
                  <div className="progress-labels">
                    <span>{stats.currentStreak} days</span>
                    <span>30 day goal</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="achievement-card">
              <div className="achievement-icon">
                <FiShield />
              </div>
              <div className="achievement-details">
                <h3>Hail Avoidance</h3>
                <div className="progress-container">
                  <div className="progress-bar">
                    <div 
                      className="progress-fill"
                      style={{ width: `${(stats.hailAvoided / 5) * 100}%` }}
                    ></div>
                  </div>
                  <div className="progress-labels">
                    <span>{stats.hailAvoided} avoided</span>
                    <span>5 needed</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="achievement-card">
              <div className="achievement-icon">
                <FiCheckCircle />
              </div>
              <div className="achievement-details">
                <h3>Flood Protection</h3>
                <div className="progress-container">
                  <div className="progress-bar">
                    <div 
                      className="progress-fill"
                      style={{ width: `${(stats.floodAvoided / 3) * 100}%` }}
                    ></div>
                  </div>
                  <div className="progress-labels">
                    <span>{stats.floodAvoided} avoided</span>
                    <span>3 needed</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Badge Modal */}
      <AnimatePresence>
        {selectedBadge && (
          <div className="modal-overlay" onClick={() => setSelectedBadge(null)}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
              <div 
                className="modal-badge"
                style={{ backgroundColor: selectedBadge.color }}
              >
                {selectedBadge.earned ? selectedBadge.icon : <FiLock size={32} />}
              </div>
              <h2>{selectedBadge.name}</h2>
              <p className="badge-description">{selectedBadge.description}</p>
              
              {selectedBadge.earned ? (
                <div className="earned-info">
                  <FiCheckCircle />
                  <span>Earned on {selectedBadge.dateEarned}</span>
                </div>
              ) : (
                <div className="locked-info">
                  <FiLock />
                  <span>Unlock by: {selectedBadge.unlocksAt}</span>
                </div>
              )}

              <button 
                className="modal-close-btn"
                onClick={() => setSelectedBadge(null)}
              >
                Close
              </button>
            </div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default RewardsScreen;