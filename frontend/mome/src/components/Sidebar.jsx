import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import {
  FiHome, FiUser, FiKey, FiSettings, FiHeadphones, FiLogOut, FiGift, FiInfo, FiNavigation, FiAlertTriangle,
  FiMap
} from 'react-icons/fi';
import './Sidebar.css';

const Sidebar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <aside className="mome-sidebar">
      <div className="sidebar-top">
        <div className="sidebar-logo">🌍MoMe</div>
        <nav className="sidebar-nav">
          <NavLink to="/dashboard"><FiHome /> Dashboard</NavLink>
          <NavLink to="/alerts"><FiAlertTriangle /> Alerts</NavLink>
          <NavLink to="/simulate"><FiNavigation /> Simulation</NavLink>
          <NavLink to="/live-route"><FiMap /> Live Routes</NavLink>
          <NavLink to="/rewards"><FiGift /> Rewards</NavLink>
          <NavLink to="/profile"><FiUser /> Profile</NavLink>
          <NavLink to="/settings"><FiSettings /> Vehicle Settings</NavLink>
          <NavLink to="/about"><FiInfo /> About</NavLink>
        </nav>
      </div>

      <div className="sidebar-bottom">
        <button className="sidebar-support">
          <FiHeadphones />
          <NavLink to="/support"> Support</NavLink>
        </button>
        <button className="sidebar-logout" onClick={handleLogout}>
          <FiLogOut />
          Logout
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
