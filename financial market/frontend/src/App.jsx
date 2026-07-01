import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { MessageCircle, X } from 'lucide-react';
import { AuthProvider, useAuth } from './context/AuthContext';
import Sidebar from './components/Sidebar';
import TopNavbar from './components/TopNavbar';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Markets from './pages/Markets';
import Portfolio from './pages/Portfolio';
import Accounts from './pages/Accounts';
import Statements from './pages/Statements';
import Settings from './pages/Settings';
import Goals from './pages/Goals';
import Funding from './pages/Funding';
import Packages from './pages/Packages';
import Referrals from './pages/Referrals';
import Support from './pages/Support';

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();
  const [chatOpen, setChatOpen] = useState(false);
  
  if (loading) return <div>Loading securely...</div>;
  if (!isAuthenticated) return <Navigate to="/login" replace />;
  
  return (
    <div className="app-container">
      <Sidebar />
      <main className="main-content" style={{ position: 'relative' }}>
        <TopNavbar />
        {children}
        
        {/* Floating Chat Button */}
        <div style={{ position: 'fixed', bottom: '24px', right: '24px', zIndex: 1000 }}>
          {chatOpen ? (
            <div style={{ width: '320px', height: '420px', background: '#fff', borderRadius: '12px', boxShadow: '0 10px 25px rgba(0,0,0,0.1)', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
              <div style={{ background: 'var(--accent-color)', color: '#fff', padding: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontWeight: 'bold' }}>Live Support</span>
                <button onClick={() => setChatOpen(false)} style={{ background: 'transparent', border: 'none', color: '#fff', cursor: 'pointer' }}><X size={18} /></button>
              </div>
              <div style={{ flex: 1, padding: '16px', display: 'flex', flexDirection: 'column', gap: '12px', overflowY: 'auto', background: '#f8fafc' }}>
                <div style={{ background: '#e2e8f0', padding: '10px 14px', borderRadius: '12px', borderBottomLeftRadius: '2px', alignSelf: 'flex-start', maxWidth: '85%', fontSize: '0.9rem', color: '#333' }}>
                  Hello! How can we help you today?
                </div>
              </div>
              <div style={{ padding: '12px', borderTop: '1px solid var(--border-color)', background: '#fff' }}>
                <input type="text" placeholder="Type a message..." style={{ width: '100%', padding: '10px 12px', border: '1px solid var(--border-color)', borderRadius: '20px', fontSize: '0.9rem' }} />
              </div>
            </div>
          ) : (
            <button 
              onClick={() => setChatOpen(true)}
              style={{ width: '60px', height: '60px', borderRadius: '30px', background: 'var(--accent-color)', color: '#fff', border: 'none', cursor: 'pointer', boxShadow: '0 4px 12px rgba(0,0,0,0.15)', display: 'flex', justifyContent: 'center', alignItems: 'center', transition: 'transform 0.2s' }}
            >
              <MessageCircle size={30} />
            </button>
          )}
        </div>
      </main>
    </div>
  );
};

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route 
            path="/dashboard" 
            element={<ProtectedRoute><Dashboard /></ProtectedRoute>} 
          />
          <Route 
            path="/markets" 
            element={<ProtectedRoute><Markets /></ProtectedRoute>} 
          />
          <Route 
            path="/portfolio" 
            element={<ProtectedRoute><Portfolio /></ProtectedRoute>} 
          />
          <Route 
            path="/accounts" 
            element={<ProtectedRoute><Accounts /></ProtectedRoute>} 
          />
          <Route 
            path="/statements" 
            element={<ProtectedRoute><Statements /></ProtectedRoute>} 
          />
          <Route 
            path="/settings" 
            element={<ProtectedRoute><Settings /></ProtectedRoute>} 
          />
          <Route 
            path="/goals" 
            element={<ProtectedRoute><Goals /></ProtectedRoute>} 
          />
          <Route 
            path="/funding" 
            element={<ProtectedRoute><Funding /></ProtectedRoute>} 
          />
          <Route 
            path="/packages" 
            element={<ProtectedRoute><Packages /></ProtectedRoute>} 
          />
          <Route 
            path="/referrals" 
            element={<ProtectedRoute><Referrals /></ProtectedRoute>} 
          />
          <Route 
            path="/support" 
            element={<ProtectedRoute><Support /></ProtectedRoute>} 
          />
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;
