import React, { useState } from 'react';
import { Users, Link as LinkIcon, Copy, CheckCircle, Award } from 'lucide-react';

const Referrals = () => {
  const [copied, setCopied] = useState(false);
  const refLink = "https://wealthsprout.com/register?ref=demo_12345";

  const handleCopy = () => {
    navigator.clipboard.writeText(refLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const referralsList = [
    { id: 1, user: 'alex_t***', date: '2026-06-25', status: 'Active', commission: 250 },
    { id: 2, user: 'sarah_m***', date: '2026-06-20', status: 'Registered', commission: 0 },
    { id: 3, user: 'investor***', date: '2026-06-15', status: 'Active', commission: 1250 },
    { id: 4, user: 'cryptob***', date: '2026-06-02', status: 'Active', commission: 50 },
  ];

  return (
    <div className="page-container animate-fade-in">
      <div style={{ marginBottom: '24px' }}>
        <h2 className="text-xl font-bold" style={{ color: 'var(--accent-color)' }}>Affiliate Program</h2>
        <p className="text-secondary">Invite friends and earn a commission on their investments.</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px', marginBottom: '24px' }}>
        <div className="card p-4" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
          <div style={{ background: '#e0e7ff', color: '#4f46e5', width: '48px', height: '48px', borderRadius: '24px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '12px' }}>
            <Users size={24} />
          </div>
          <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Total Referrals</div>
          <div style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>12</div>
        </div>
        <div className="card p-4" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
          <div style={{ background: '#dcfce7', color: '#16a34a', width: '48px', height: '48px', borderRadius: '24px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '12px' }}>
            <Award size={24} />
          </div>
          <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Active Investors</div>
          <div style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>3</div>
        </div>
        <div className="card p-4" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
          <div style={{ background: '#fef3c7', color: '#d97706', width: '48px', height: '48px', borderRadius: '24px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '12px' }}>
            <span style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>$</span>
          </div>
          <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Total Commission</div>
          <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: 'var(--success-color)' }}>$1,550.00</div>
        </div>
      </div>

      <div className="card p-4" style={{ marginBottom: '24px' }}>
        <h3 className="font-bold mb-4" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><LinkIcon size={18} /> Your Referral Link</h3>
        <div style={{ display: 'flex', gap: '12px' }}>
          <input 
            type="text" 
            value={refLink} 
            readOnly 
            style={{ flex: 1, padding: '12px', borderRadius: '6px', border: '1px solid var(--border-color)', background: '#f8fafc', color: 'var(--text-secondary)', fontSize: '0.9rem' }} 
          />
          <button 
            onClick={handleCopy}
            className="btn-primary" 
            style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '0 24px', whiteSpace: 'nowrap' }}
          >
            {copied ? <><CheckCircle size={16} /> Copied!</> : <><Copy size={16} /> Copy Link</>}
          </button>
        </div>
        <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginTop: '12px' }}>Share this link to earn 5% of your Level 1 referrals' deposits, 2% from Level 2, and 1% from Level 3.</p>
      </div>

      <div className="card p-4">
        <h3 className="font-bold mb-4">Recent Referrals</h3>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.9rem' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid var(--border-color)', textAlign: 'left', color: 'var(--text-secondary)' }}>
                <th style={{ padding: '12px 0' }}>Username</th>
                <th style={{ padding: '12px 0' }}>Date Joined</th>
                <th style={{ padding: '12px 0' }}>Status</th>
                <th style={{ padding: '12px 0', textAlign: 'right' }}>Commission Earned</th>
              </tr>
            </thead>
            <tbody>
              {referralsList.map(ref => (
                <tr key={ref.id} style={{ borderBottom: '1px solid var(--border-color)' }}>
                  <td style={{ padding: '16px 0', fontWeight: 'bold' }}>{ref.user}</td>
                  <td style={{ padding: '16px 0', color: 'var(--text-secondary)' }}>{ref.date}</td>
                  <td style={{ padding: '16px 0' }}>
                    <span style={{ background: ref.status === 'Active' ? '#dcfce7' : '#f1f5f9', color: ref.status === 'Active' ? '#166534' : '#475569', padding: '4px 8px', borderRadius: '4px', fontSize: '0.8rem', fontWeight: 'bold' }}>
                      {ref.status}
                    </span>
                  </td>
                  <td style={{ padding: '16px 0', textAlign: 'right', fontWeight: 'bold', color: ref.commission > 0 ? 'var(--success-color)' : 'var(--text-secondary)' }}>
                    ${ref.commission.toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Referrals;
