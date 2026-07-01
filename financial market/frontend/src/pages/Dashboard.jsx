import React, { useState } from 'react';
import PortfolioSummary from '../components/PortfolioSummary';
import RecentActivity from '../components/RecentActivity';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import './Dashboard.css';

const fullPerformanceData = [
  { name: 'Jul', value: 200000 },
  { name: 'Aug', value: 210000 },
  { name: 'Sep', value: 215000 },
  { name: 'Oct', value: 225000 },
  { name: 'Nov', value: 230000 },
  { name: 'Dec', value: 238000 },
  { name: 'Jan', value: 240000 },
  { name: 'Feb', value: 245000 },
  { name: 'Mar', value: 242000 },
  { name: 'Apr', value: 258000 },
  { name: 'May', value: 265000 },
  { name: 'Jun', value: 285450 },
];

const Dashboard = () => {
  const [timeRange, setTimeRange] = useState('6M');

  const getFilteredData = () => {
    switch(timeRange) {
      case '3M': return fullPerformanceData.slice(-3);
      case '6M': return fullPerformanceData.slice(-6);
      case '1Y': return fullPerformanceData;
      default: return fullPerformanceData.slice(-6);
    }
  };

  return (
    <div className="dashboard-page">
      <div className="dashboard-grid">
        {/* ROW 1: Simplified Overview and Goals */}
        <div className="widget-col-span-2">
          <PortfolioSummary type="overview" />
        </div>
        <div className="widget-col-span-2">
          <PortfolioSummary type="goals" />
        </div>

        {/* ROW 2: Performance and Activity */}
        <div className="widget-col-span-3">
          <div className="card h-100">
            <div className="card-header-light">
              Portfolio Performance
              <select 
                value={timeRange} 
                onChange={(e) => setTimeRange(e.target.value)}
                style={{
                  fontSize: '0.8rem', 
                  color: 'var(--text-secondary)', 
                  background: 'transparent',
                  border: '1px solid var(--border-color)',
                  borderRadius: '4px',
                  padding: '2px 4px',
                  cursor: 'pointer'
                }}
              >
                <option value="3M">Past 3 months</option>
                <option value="6M">Past 6 months</option>
                <option value="1Y">Past 1 year</option>
              </select>
            </div>
            <div style={{padding: '16px', height: '300px'}}>
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={getFilteredData()}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fontSize: 12, fill: '#64748b'}} />
                  <YAxis axisLine={false} tickLine={false} tick={{fontSize: 12, fill: '#64748b'}} tickFormatter={(v) => `$${v/1000}k`} />
                  <Tooltip contentStyle={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: '4px' }} />
                  <Line type="monotone" dataKey="value" stroke="var(--accent-color)" strokeWidth={3} dot={{r: 4, fill: 'var(--accent-color)'}} name="Portfolio Value" />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
        <div className="widget-col-span-1">
          <RecentActivity />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
