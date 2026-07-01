import React, { useState } from 'react';
import { UploadCloud, AlertCircle, Clock } from 'lucide-react';

const Settings = () => {
  const [kycStatus, setKycStatus] = useState('unverified');

  const handleUpload = () => {
    setKycStatus('pending');
  };

  return (
    <div className="page-container">
      <div className="card h-100 p-4">
        <h2 className="text-xl font-bold mb-4" style={{ color: 'var(--accent-color)' }}>Account Settings</h2>
        <p className="text-secondary">Manage your profile, security preferences, and notification settings.</p>
        
        <div style={{ marginTop: '32px', display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '32px', maxWidth: '800px' }}>
          <div>
            <h3 style={{ fontSize: '1rem', marginBottom: '16px', borderBottom: '2px solid var(--accent-color)', paddingBottom: '8px', display: 'inline-block' }}>Profile Details</h3>
            
            <div style={{ marginBottom: '16px' }}>
              <label style={{ display: 'block', fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '4px' }}>Full Name</label>
              <input type="text" value="Demo User" readOnly style={{ width: '100%', padding: '8px 12px', border: '1px solid var(--border-color)', borderRadius: '4px', background: '#f8fafc' }} />
            </div>
            
            <div style={{ marginBottom: '16px' }}>
              <label style={{ display: 'block', fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '4px' }}>Email Address</label>
              <input type="email" value="demo@example.com" readOnly style={{ width: '100%', padding: '8px 12px', border: '1px solid var(--border-color)', borderRadius: '4px', background: '#f8fafc' }} />
            </div>
            
            <div style={{ marginBottom: '16px' }}>
              <label style={{ display: 'block', fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '4px' }}>Phone Number</label>
              <input type="tel" value="+263 77 123 4567" readOnly style={{ width: '100%', padding: '8px 12px', border: '1px solid var(--border-color)', borderRadius: '4px', background: '#f8fafc' }} />
            </div>
          </div>
          
          <div>
            <h3 style={{ fontSize: '1rem', marginBottom: '16px', borderBottom: '2px solid var(--accent-color)', paddingBottom: '8px', display: 'inline-block' }}>Identity Verification (KYC)</h3>
            
            <div className="card" style={{ padding: '16px', marginBottom: '24px', borderLeft: kycStatus === 'unverified' ? '4px solid #ef4444' : '4px solid #f59e0b' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div>
                  <div style={{ fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    {kycStatus === 'unverified' ? <><AlertCircle size={18} color="#ef4444" /> Unverified Account</> : <><Clock size={18} color="#f59e0b" /> Verification Pending</>}
                  </div>
                  <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginTop: '8px', maxWidth: '400px' }}>
                    {kycStatus === 'unverified' 
                      ? 'You must verify your identity before you can withdraw funds or deposit more than $2,000.'
                      : 'Your documents are currently under review. This usually takes 1-2 business days.'}
                  </div>
                </div>
                {kycStatus === 'unverified' && (
                  <button onClick={handleUpload} className="btn-primary" style={{ padding: '6px 12px', display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.85rem' }}>
                    <UploadCloud size={16} /> Upload ID
                  </button>
                )}
              </div>
            </div>

            <h3 style={{ fontSize: '1rem', marginBottom: '16px', borderBottom: '2px solid var(--accent-color)', paddingBottom: '8px', display: 'inline-block' }}>Security & Preferences</h3>
            
            <div className="card" style={{ padding: '16px', marginBottom: '16px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <div style={{ fontWeight: 'bold' }}>Two-Factor Authentication (2FA)</div>
                  <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Currently enabled via Authenticator App</div>
                </div>
                <button style={{ padding: '6px 12px', border: '1px solid var(--border-color)', background: 'transparent', borderRadius: '4px', cursor: 'pointer' }}>Manage</button>
              </div>
            </div>
            
            <div className="card" style={{ padding: '16px', marginBottom: '16px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <div style={{ fontWeight: 'bold' }}>Email Notifications</div>
                  <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Receive alerts for trades and transfers</div>
                </div>
                <div style={{ background: 'var(--success-color)', width: '40px', height: '20px', borderRadius: '10px', position: 'relative' }}>
                  <div style={{ width: '16px', height: '16px', background: 'white', borderRadius: '50%', position: 'absolute', right: '2px', top: '2px' }}></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
