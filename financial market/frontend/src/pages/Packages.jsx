import React, { useState } from 'react';
import { TrendingUp, Shield, Zap, Star, CheckCircle } from 'lucide-react';

const Packages = () => {
  const [balance, setBalance] = useState(285450.00);
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [investAmount, setInvestAmount] = useState('');
  const [activeInvestments, setActiveInvestments] = useState([
    { id: 1, plan: 'Professional Plan', amount: 15000, dailyReturn: 2.5, daysLeft: 4, totalDays: 14, earned: 3750, status: 'Active' },
    { id: 2, plan: 'Starter Plan', amount: 2000, dailyReturn: 1.5, daysLeft: 0, totalDays: 7, earned: 210, status: 'Completed' }
  ]);
  const [successMsg, setSuccessMsg] = useState('');

  const plans = [
    { id: 'starter', name: 'Starter Plan', icon: Shield, min: 500, max: 4999, returnPct: 1.5, days: 7, color: '#3b82f6' },
    { id: 'pro', name: 'Professional Plan', icon: Zap, min: 5000, max: 19999, returnPct: 2.5, days: 14, color: '#f59e0b' },
    { id: 'elite', name: 'Elite Portfolio', icon: Star, min: 20000, max: 1000000, returnPct: 4.0, days: 30, color: '#8b5cf6' }
  ];

  const handleInvest = (e) => {
    e.preventDefault();
    const amount = Number(investAmount);
    if (!amount || amount < selectedPlan.min || amount > selectedPlan.max || amount > balance) return;
    
    setBalance(prev => prev - amount);
    setActiveInvestments(prev => [
      { id: Date.now(), plan: selectedPlan.name, amount: amount, dailyReturn: selectedPlan.returnPct, daysLeft: selectedPlan.days, totalDays: selectedPlan.days, earned: 0, status: 'Active' },
      ...prev
    ]);
    
    setSuccessMsg(`Successfully invested $${amount.toLocaleString()} in the ${selectedPlan.name}!`);
    setTimeout(() => {
      setSuccessMsg('');
      setSelectedPlan(null);
      setInvestAmount('');
    }, 3000);
  };

  return (
    <div className="page-container animate-fade-in">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '24px' }}>
        <div>
          <h2 className="text-xl font-bold" style={{ color: 'var(--accent-color)' }}>Investment Packages</h2>
          <p className="text-secondary">Select an auto-pilot trading plan and earn daily passive returns.</p>
        </div>
        <div style={{ textAlign: 'right' }}>
          <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Available Balance</div>
          <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: 'var(--success-color)' }}>${balance.toLocaleString(undefined, {minimumFractionDigits: 2})}</div>
        </div>
      </div>

      {successMsg && (
        <div style={{ background: '#dcfce7', border: '1px solid #22c55e', color: '#166534', padding: '16px', borderRadius: '8px', marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '8px', fontWeight: 'bold' }}>
          <CheckCircle size={20} /> {successMsg}
        </div>
      )}

      {/* PLAN SELECTION */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px', marginBottom: '32px' }}>
        {plans.map(plan => {
          const Icon = plan.icon;
          const isSelected = selectedPlan?.id === plan.id;
          return (
            <div 
              key={plan.id} 
              className="card p-4" 
              style={{ border: isSelected ? `2px solid ${plan.color}` : '2px solid transparent', cursor: 'pointer', transition: 'all 0.2s', transform: isSelected ? 'scale(1.02)' : 'none' }}
              onClick={() => setSelectedPlan(plan)}
            >
              <div style={{ background: `${plan.color}20`, color: plan.color, width: '48px', height: '48px', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '16px' }}>
                <Icon size={24} />
              </div>
              <h3 style={{ fontSize: '1.2rem', fontWeight: 'bold', marginBottom: '8px' }}>{plan.name}</h3>
              <div style={{ fontSize: '2rem', fontWeight: 'bold', color: plan.color, marginBottom: '16px' }}>{plan.returnPct}% <span style={{ fontSize: '1rem', color: 'var(--text-secondary)' }}>/ Daily</span></div>
              
              <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 24px 0', display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                <li style={{ display: 'flex', justifyContent: 'space-between' }}><span>Minimum:</span> <span style={{ fontWeight: 'bold', color: 'var(--text-primary)' }}>${plan.min.toLocaleString()}</span></li>
                <li style={{ display: 'flex', justifyContent: 'space-between' }}><span>Maximum:</span> <span style={{ fontWeight: 'bold', color: 'var(--text-primary)' }}>${plan.max.toLocaleString()}</span></li>
                <li style={{ display: 'flex', justifyContent: 'space-between' }}><span>Duration:</span> <span style={{ fontWeight: 'bold', color: 'var(--text-primary)' }}>{plan.days} Days</span></li>
                <li style={{ display: 'flex', justifyContent: 'space-between' }}><span>Capital Return:</span> <span style={{ fontWeight: 'bold', color: 'var(--text-primary)' }}>Yes</span></li>
              </ul>

              {isSelected ? (
                <form onSubmit={handleInvest} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }} onClick={e => e.stopPropagation()}>
                  <input 
                    type="number" 
                    value={investAmount} 
                    onChange={e => setInvestAmount(e.target.value)} 
                    placeholder={`Enter amount ($${plan.min}+)`} 
                    style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid var(--border-color)' }}
                    autoFocus
                  />
                  <button type="submit" style={{ width: '100%', padding: '10px', borderRadius: '6px', border: 'none', background: plan.color, color: 'white', fontWeight: 'bold', cursor: 'pointer' }}>Confirm Investment</button>
                </form>
              ) : (
                <button style={{ width: '100%', padding: '10px', borderRadius: '6px', border: `1px solid ${plan.color}`, background: 'transparent', color: plan.color, fontWeight: 'bold', cursor: 'pointer' }}>Select Plan</button>
              )}
            </div>
          )
        })}
      </div>

      {/* ACTIVE INVESTMENTS */}
      <div className="card p-4">
        <h2 className="text-xl font-bold mb-4" style={{ color: 'var(--accent-color)', display: 'flex', alignItems: 'center', gap: '8px' }}><TrendingUp size={20} /> My Active Investments</h2>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.9rem' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid var(--border-color)', textAlign: 'left', color: 'var(--text-secondary)' }}>
                <th style={{ padding: '12px 0' }}>Plan</th>
                <th style={{ padding: '12px 0' }}>Invested Amount</th>
                <th style={{ padding: '12px 0' }}>Daily Return</th>
                <th style={{ padding: '12px 0' }}>Progress</th>
                <th style={{ padding: '12px 0' }}>Total Earned</th>
                <th style={{ padding: '12px 0', textAlign: 'right' }}>Status</th>
              </tr>
            </thead>
            <tbody>
              {activeInvestments.map(inv => (
                <tr key={inv.id} style={{ borderBottom: '1px solid var(--border-color)' }}>
                  <td style={{ padding: '16px 0', fontWeight: 'bold' }}>{inv.plan}</td>
                  <td style={{ padding: '16px 0' }}>${inv.amount.toLocaleString()}</td>
                  <td style={{ padding: '16px 0', color: 'var(--success-color)', fontWeight: 'bold' }}>{inv.dailyReturn}%</td>
                  <td style={{ padding: '16px 0' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <div style={{ flex: 1, background: '#e2e8f0', height: '6px', borderRadius: '3px', width: '80px' }}>
                        <div style={{ background: 'var(--accent-color)', width: `${((inv.totalDays - inv.daysLeft) / inv.totalDays) * 100}%`, height: '100%', borderRadius: '3px' }}></div>
                      </div>
                      <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>{inv.totalDays - inv.daysLeft}/{inv.totalDays}d</span>
                    </div>
                  </td>
                  <td style={{ padding: '16px 0', fontWeight: 'bold', color: 'var(--success-color)' }}>+${inv.earned.toLocaleString()}</td>
                  <td style={{ padding: '16px 0', textAlign: 'right' }}>
                    <span style={{ background: inv.status === 'Active' ? '#fef08a' : '#dcfce7', color: inv.status === 'Active' ? '#854d0e' : '#166534', padding: '4px 8px', borderRadius: '4px', fontSize: '0.8rem', fontWeight: 'bold' }}>
                      {inv.status}
                    </span>
                  </td>
                </tr>
              ))}
              {activeInvestments.length === 0 && (
                <tr>
                  <td colSpan="6" style={{ padding: '24px 0', textAlign: 'center', color: 'var(--text-secondary)' }}>No active investments found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Packages;
