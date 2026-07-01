import React from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, LineChart, Briefcase, CreditCard, FileText, Settings, Leaf, Target, ArrowRightLeft, TrendingUp, Users, LifeBuoy } from 'lucide-react';
import './Sidebar.css';

const Sidebar = () => {
  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <Leaf className="brand-icon" size={28} color="#10b981" />
        <h2 className="brand-title">
          WEALTH<br/>SPROUT
        </h2>
      </div>
      
      <nav className="sidebar-nav">
        <NavLink to="/dashboard" className={({ isActive }) => isActive ? 'nav-item active' : 'nav-item'}>
          <LayoutDashboard size={18} />
          <span>DASHBOARD</span>
        </NavLink>
        <NavLink to="/markets" className={({ isActive }) => isActive ? 'nav-item active' : 'nav-item'}>
          <LineChart size={18} />
          <span>MARKETS</span>
        </NavLink>
        <NavLink to="/portfolio" className={({ isActive }) => isActive ? 'nav-item active' : 'nav-item'}>
          <Briefcase size={18} />
          <span>PORTFOLIO</span>
        </NavLink>
        <NavLink to="/packages" className={({ isActive }) => isActive ? 'nav-item active' : 'nav-item'}>
          <TrendingUp size={18} />
          <span>PACKAGES</span>
        </NavLink>
        <NavLink to="/referrals" className={({ isActive }) => isActive ? 'nav-item active' : 'nav-item'}>
          <Users size={18} />
          <span>REFERRALS</span>
        </NavLink>
        <NavLink to="/goals" className={({ isActive }) => isActive ? 'nav-item active' : 'nav-item'}>
          <Target size={18} />
          <span>MY GOALS</span>
        </NavLink>
        <NavLink to="/funding" className={({ isActive }) => isActive ? 'nav-item active' : 'nav-item'}>
          <ArrowRightLeft size={18} />
          <span>FUNDING</span>
        </NavLink>
        <NavLink to="/accounts" className={({ isActive }) => isActive ? 'nav-item active' : 'nav-item'}>
          <CreditCard size={18} />
          <span>ACCOUNTS</span>
        </NavLink>
        <NavLink to="/statements" className={({ isActive }) => isActive ? 'nav-item active' : 'nav-item'}>
          <FileText size={18} />
          <span>STATEMENTS</span>
        </NavLink>
        <NavLink to="/support" className={({ isActive }) => isActive ? 'nav-item active' : 'nav-item'}>
          <LifeBuoy size={18} />
          <span>SUPPORT</span>
        </NavLink>
        <NavLink to="/settings" className={({ isActive }) => isActive ? 'nav-item active mt-auto' : 'nav-item mt-auto'}>
          <Settings size={18} />
          <span>SETTINGS</span>
        </NavLink>
      </nav>
    </aside>
  );
};

export default Sidebar;
