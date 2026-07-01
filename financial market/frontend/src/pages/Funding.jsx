import React, { useState } from 'react';
import { ArrowDownLeft, ArrowUpRight, CheckCircle, Clock } from 'lucide-react';

const Funding = () => {
  const [activeTab, setActiveTab] = useState('deposit');
  const [amount, setAmount] = useState('');
  const [method, setMethod] = useState('bank');
  const [status, setStatus] = useState(null); // 'success', 'pending'

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!amount || isNaN(amount) || amount <= 0) return;
    setStatus('success');
    setTimeout(() => {
      setStatus(null);
      setAmount('');
    }, 3000);
  };

  const history = [
    { date: '2026-06-28', type: 'Deposit', amount: 5000, method: 'Bank Transfer', status: 'Completed' },
    { date: '2026-06-15', type: 'Withdrawal', amount: 1200, method: 'Crypto (BTC)', status: 'Completed' },
    { date: '2026-06-02', type: 'Deposit', amount: 10000, method: 'Wire Transfer', status: 'Completed' },
  ];

  return (
    <div className="page-container animate-fade-in">
      <div className="funding-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
        
        {/* ACTION PANEL */}
        <div className="card p-4 h-100">
          <div style={{ display: 'flex', gap: '16px', borderBottom: '1px solid var(--border-color)', paddingBottom: '16px', marginBottom: '24px' }}>
            <button 
              onClick={() => setActiveTab('deposit')}
              style={{ background: activeTab === 'deposit' ? 'var(--accent-color)' : 'transparent', color: activeTab === 'deposit' ? '#fff' : 'var(--text-secondary)', padding: '8px 16px', border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '8px' }}
            >
              <ArrowDownLeft size={18} /> Deposit Funds
            </button>
            <button 
              onClick={() => setActiveTab('withdraw')}
              style={{ background: activeTab === 'withdraw' ? 'var(--accent-color)' : 'transparent', color: activeTab === 'withdraw' ? '#fff' : 'var(--text-secondary)', padding: '8px 16px', border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '8px' }}
            >
              <ArrowUpRight size={18} /> Withdraw Funds
            </button>
          </div>

          {status === 'success' ? (
            <div style={{ textAlign: 'center', padding: '40px 20px' }}>
              <CheckCircle size={48} color="var(--success-color)" style={{ margin: '0 auto 16px' }} />
              <h3 style={{ fontSize: '1.2rem', fontWeight: 'bold', marginBottom: '8px' }}>Transaction Initiated</h3>
              <p style={{ color: 'var(--text-secondary)' }}>Your {activeTab} of ${Number(amount).toLocaleString()} is being processed. It may take 1-3 business days to reflect.</p>
              <button onClick={() => setStatus(null)} className="btn-outline" style={{ marginTop: '24px' }}>Make Another Transaction</button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '8px', fontWeight: 'bold' }}>Amount (USD)</label>
                <input 
                  type="number" 
                  value={amount} 
                  onChange={(e) => setAmount(e.target.value)} 
                  placeholder="0.00" 
                  required 
                  style={{ width: '100%', padding: '12px', fontSize: '1.5rem', border: '1px solid var(--border-color)', borderRadius: '8px', background: '#f8fafc' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '8px', fontWeight: 'bold' }}>Payment Method</label>
                <div style={{ display: 'flex', gap: '12px', flexDirection: 'column' }}>
                  <label style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '16px', border: '1px solid var(--border-color)', borderRadius: '8px', cursor: 'pointer', background: method === 'bank' ? '#f0f9ff' : 'transparent', borderColor: method === 'bank' ? 'var(--accent-color)' : 'var(--border-color)' }}>
                    <input type="radio" name="method" value="bank" checked={method === 'bank'} onChange={() => setMethod('bank')} />
                    <div>
                      <div style={{ fontWeight: 'bold' }}>Bank Transfer (ACH)</div>
                      <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>1-3 Business Days • No Fee</div>
                    </div>
                  </label>
                  <label style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '16px', border: '1px solid var(--border-color)', borderRadius: '8px', cursor: 'pointer', background: method === 'card' ? '#f0f9ff' : 'transparent', borderColor: method === 'card' ? 'var(--accent-color)' : 'var(--border-color)' }}>
                    <input type="radio" name="method" value="card" checked={method === 'card'} onChange={() => setMethod('card')} />
                    <div>
                      <div style={{ fontWeight: 'bold' }}>Credit / Debit Card</div>
                      <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Instant • 2.9% Fee</div>
                    </div>
                  </label>
                  <label style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '16px', border: '1px solid var(--border-color)', borderRadius: '8px', cursor: 'pointer', background: method === 'crypto' ? '#f0f9ff' : 'transparent', borderColor: method === 'crypto' ? 'var(--accent-color)' : 'var(--border-color)' }}>
                    <input type="radio" name="method" value="crypto" checked={method === 'crypto'} onChange={() => setMethod('crypto')} />
                    <div>
                      <div style={{ fontWeight: 'bold' }}>Cryptocurrency</div>
                      <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>~10 Minutes • Network Fee Applies</div>
                    </div>
                  </label>
                </div>
              </div>

              <div style={{ background: '#f8fafc', padding: '16px', borderRadius: '8px', marginTop: '8px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', fontSize: '0.9rem' }}>
                  <span style={{ color: 'var(--text-secondary)' }}>Estimated Fee:</span>
                  <span style={{ fontWeight: 'bold' }}>{method === 'card' ? `$${(amount * 0.029).toFixed(2)}` : '$0.00'}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '1.1rem', fontWeight: 'bold' }}>
                  <span>Total {activeTab === 'deposit' ? 'to Credit' : 'to Debit'}:</span>
                  <span>{amount ? `$${(activeTab === 'deposit' ? Number(amount) - (method === 'card' ? amount * 0.029 : 0) : Number(amount) + (method === 'card' ? amount * 0.029 : 0)).toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}` : '$0.00'}</span>
                </div>
              </div>

              <button type="submit" className="btn-primary" style={{ width: '100%', padding: '14px', fontSize: '1rem', marginTop: '8px' }}>
                Confirm {activeTab === 'deposit' ? 'Deposit' : 'Withdrawal'}
              </button>
            </form>
          )}
        </div>

        {/* HISTORY PANEL */}
        <div className="card p-4 h-100">
          <h2 className="text-xl font-bold mb-4" style={{ color: 'var(--accent-color)', display: 'flex', alignItems: 'center', gap: '8px' }}><Clock size={20} /> Transaction History</h2>
          
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.9rem' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid var(--border-color)', textAlign: 'left', color: 'var(--text-secondary)' }}>
                  <th style={{ padding: '12px 0' }}>Date</th>
                  <th style={{ padding: '12px 0' }}>Type</th>
                  <th style={{ padding: '12px 0' }}>Amount</th>
                  <th style={{ padding: '12px 0', textAlign: 'right' }}>Status</th>
                </tr>
              </thead>
              <tbody>
                {history.map((tx, i) => (
                  <tr key={i} style={{ borderBottom: '1px solid var(--border-color)' }}>
                    <td style={{ padding: '16px 0', color: 'var(--text-secondary)' }}>{tx.date}</td>
                    <td style={{ padding: '16px 0', fontWeight: 'bold' }}>
                      <span style={{ color: tx.type === 'Deposit' ? 'var(--success-color)' : 'var(--text-primary)' }}>{tx.type}</span>
                      <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', fontWeight: 'normal' }}>{tx.method}</div>
                    </td>
                    <td style={{ padding: '16px 0', fontWeight: 'bold' }}>${tx.amount.toLocaleString()}</td>
                    <td style={{ padding: '16px 0', textAlign: 'right' }}>
                      <span style={{ background: '#dcfce7', color: '#166534', padding: '4px 8px', borderRadius: '4px', fontSize: '0.8rem', fontWeight: 'bold' }}>{tx.status}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Funding;
