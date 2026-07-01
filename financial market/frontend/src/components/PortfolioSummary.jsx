import React, { useState } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip } from 'recharts';
import { useNavigate } from 'react-router-dom';
import './PortfolioSummary.css';

const data = [
  { name: 'Equities', value: 18, color: '#1e3a5f' },
  { name: 'Bonds', value: 3, color: '#94a3b8' },
  { name: 'REITs', value: 3, color: '#10b981' },
];

const trendData = [
  { name: 'Mon', value: 4000 },
  { name: 'Tue', value: 3000 },
  { name: 'Wed', value: 5000 },
  { name: 'Thu', value: 4500 },
  { name: 'Fri', value: 6000 },
  { name: 'Sat', value: 5500 },
  { name: 'Sun', value: 7000 },
];

const PortfolioSummary = ({ type }) => {
  const navigate = useNavigate();
  const [selectedAsset, setSelectedAsset] = useState('All');

  if (type === 'goals') {
    return (
      <div className="card h-100" style={{cursor: 'pointer', transition: 'transform 0.2s'}} onClick={() => navigate('/goals')}>
        <div className="card-header-light">My Goals <span style={{fontSize: '0.75rem', fontWeight: 'normal', color: 'var(--text-secondary)'}}>(Click to manage)</span></div>
        <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '20px', height: 'calc(100% - 50px)', justifyContent: 'center' }}>
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
              <span className="font-bold">Target Annual Return</span>
              <span className="text-secondary" style={{fontSize: '0.9rem'}}><span className="text-success font-bold">12%</span> / 15%</span>
            </div>
            <div style={{ background: '#e2e8f0', height: '10px', borderRadius: '5px', overflow: 'hidden' }}>
              <div style={{ background: 'var(--accent-color)', width: '80%', height: '100%', borderRadius: '5px' }}></div>
            </div>
            <div style={{ fontSize: '0.8rem', color: '#64748b', marginTop: '6px' }}>80% of target achieved</div>
          </div>

          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
              <span className="font-bold">Total Profit Target</span>
              <span className="text-secondary" style={{fontSize: '0.9rem'}}><span className="text-success font-bold">$3,200</span> / $5,000</span>
            </div>
            <div style={{ background: '#e2e8f0', height: '10px', borderRadius: '5px', overflow: 'hidden' }}>
              <div style={{ background: 'var(--accent-color)', width: '64%', height: '100%', borderRadius: '5px' }}></div>
            </div>
            <div style={{ fontSize: '0.8rem', color: '#64748b', marginTop: '6px' }}>64.0% of target achieved</div>
          </div>
        </div>
      </div>
    );
  }

  if (type === 'allocation') {
    return (
      <div className="card h-100">
        <div className="card-header-light">Asset Allocation</div>
        <div className="allocation-content">
          <ResponsiveContainer width="50%" height={150}>
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={30}
                outerRadius={60}
                paddingAngle={5}
                dataKey="value"
                stroke="none"
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
          <div className="legend">
            {data.map((item, i) => (
              <div key={i} className="legend-item">
                <span className="dot" style={{backgroundColor: item.color}}></span>
                <span className="name">{item.name} ({item.value})</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (type === 'overview') {
    const assetData = {
      'All': { balance: '$285,450.00', perf: '+1.25%', gl: '+0.55% (-0.20%)', trend: trendData },
      'Stocks': { balance: '$185,200.00', perf: '+2.10%', gl: '+1.05% (-0.10%)', trend: trendData.map(t => ({...t, value: t.value * 0.65})) },
      'Real Estate': { balance: '$75,000.00', perf: '+0.50%', gl: '+0.25% (-0.05%)', trend: trendData.map(t => ({...t, value: t.value * 0.25})) },
      'Bonds': { balance: '$25,250.00', perf: '+0.10%', gl: '+0.05% (0.00%)', trend: trendData.map(t => ({...t, value: t.value * 0.10})) }
    };
    const currentAsset = assetData[selectedAsset] || assetData['All'];

    return (
      <div className="card h-100 summary-overview">
        <div className="card-header-light" style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
          <span>Total Portfolio Value</span>
          <select 
            value={selectedAsset} 
            onChange={(e) => { e.stopPropagation(); setSelectedAsset(e.target.value); }}
            style={{
              fontSize: '0.8rem', 
              color: 'var(--text-secondary)', 
              background: 'transparent',
              border: '1px solid var(--border-color)',
              borderRadius: '4px',
              padding: '2px 4px',
              cursor: 'pointer',
              fontWeight: 'normal'
            }}
          >
            <option value="All">All Assets</option>
            <option value="Stocks">Stocks</option>
            <option value="Real Estate">Real Estate</option>
            <option value="Bonds">Bonds</option>
          </select>
        </div>
        <div className="overview-content" style={{cursor: 'pointer'}} onClick={() => navigate('/portfolio')}>
          <div className="overview-stats">
            <div className="balance-label">Currency Balance</div>
            <div className="balance-amount">{currentAsset.balance}</div>
            <div className="perf-stats">
              <div>
                <div className="perf-label">Performance</div>
                <div className="text-success font-bold">{currentAsset.perf} Daily</div>
              </div>
              <div>
                <div className="perf-label">Gain/Loss</div>
                <div className="text-success font-bold">{currentAsset.gl}</div>
              </div>
            </div>
          </div>
          <div className="overview-chart">
            <ResponsiveContainer width="100%" height={120}>
              <LineChart data={currentAsset.trend} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <XAxis dataKey="name" stroke="#94a3b8" tick={{fontSize: 10}} tickLine={false} axisLine={false} />
                <YAxis stroke="#94a3b8" tick={{fontSize: 10}} tickLine={false} axisLine={false} tickFormatter={(v) => `$${v}`} width={60} />
                <Tooltip contentStyle={{ background: 'rgba(255,255,255,0.9)', border: '1px solid #e2e8f0', borderRadius: '4px', color: '#0f172a' }} />
                <Line type="monotone" dataKey="value" stroke="#10b981" strokeWidth={2} dot={{r: 4, fill: '#10b981'}} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    );
  }
};

export default PortfolioSummary;
