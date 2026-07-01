import React from 'react';
import { Bell, Search, User } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './TopNavbar.css';

const TopNavbar = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  return (
    <header className="top-navbar">
      <div className="search-container">
        <Search size={16} className="search-icon" />
        <input type="text" placeholder="Search" className="search-input" />
      </div>
      
      <div className="nav-actions">
        <div 
          onClick={() => navigate('/settings')}
          style={{ background: '#fef2f2', color: '#ef4444', padding: '4px 8px', borderRadius: '4px', fontSize: '0.75rem', fontWeight: 'bold', cursor: 'pointer', border: '1px solid #fca5a5', display: 'flex', alignItems: 'center' }}
        >
          Unverified Level 1
        </div>
        <button className="icon-btn">
          <Bell size={20} />
        </button>
        <div className="user-profile" onClick={logout} style={{cursor: 'pointer'}} title="Click to logout">
          <div className="avatar">
            <User size={16} />
          </div>
          <span className="user-name">Sign Out</span>
        </div>
      </div>
    </header>
  );
};

export default TopNavbar;
