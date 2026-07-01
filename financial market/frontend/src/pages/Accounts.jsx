import React from 'react';

const Accounts = () => {
  return (
    <div className="page-container">
      <div className="card h-100 p-4">
        <h2 className="text-xl font-bold mb-4" style={{ color: 'var(--accent-color)' }}>Connected Funding Sources</h2>
        <p className="text-secondary">Link your bank accounts to seamlessly fund your investment goals.</p>
        
        <div style={{ marginTop: '24px', maxWidth: '600px' }}>
          <div className="card" style={{ marginBottom: '16px', display: 'flex', alignItems: 'center', padding: '16px', justifyContent: 'space-between' }}>
            <div>
              <div style={{ fontWeight: 'bold' }}>My Personal Checking</div>
              <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>**** **** **** 4821</div>
            </div>
            <div style={{ color: 'var(--success-color)', fontWeight: 'bold' }}>Active</div>
          </div>
          
          <div className="card" style={{ marginBottom: '16px', display: 'flex', alignItems: 'center', padding: '16px', justifyContent: 'space-between' }}>
            <div>
              <div style={{ fontWeight: 'bold' }}>My Savings Account</div>
              <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>**** **** **** 9932</div>
            </div>
            <div style={{ color: 'var(--success-color)', fontWeight: 'bold' }}>Active</div>
          </div>
          
          <button style={{ padding: '10px 16px', background: 'var(--accent-color)', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer' }}>
            + Link New Account
          </button>
        </div>
      </div>
    </div>
  );
};

export default Accounts;
