import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Filter, Download } from 'lucide-react';
import GlossaryTooltip from '../components/GlossaryTooltip';
import './Markets.css';

const renderTicker = (ticker) => {
  if (typeof ticker === 'string' && ticker.endsWith('.zw')) {
    return (
      <>
        {ticker.replace('.zw', '')}
        <GlossaryTooltip term=".zw Suffix" explanation="Indicates the asset is listed on the Zimbabwe Stock Exchange (ZSE).">.zw</GlossaryTooltip>
      </>
    );
  }
  return ticker;
};

const Markets = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedAsset, setSelectedAsset] = useState('TIG.zw');
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    let basePrice = 150;
    if (selectedAsset === 'REV.zw') basePrice = 220;
    if (selectedAsset === 'Innscor') basePrice = 300;
    
    const mock = [];
    const now = new Date();
    for (let i = 10; i >= 0; i--) {
      const d = new Date(now);
      d.setDate(d.getDate() - i);
      mock.push({
        date: d.toISOString().split('T')[0],
        price: (basePrice + Math.random() * 20 - 10).toFixed(2)
      });
    }
    setChartData(mock);
  }, [selectedAsset]);

  useEffect(() => {
    // For demo purposes, we fetch REITs and act like it's historical data for a specific asset
    axios.get('http://localhost:8000/api/market/reits')
      .then(res => {
        setData(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  return (
    <div className="markets-page animate-fade-in">
      <header className="page-header">
        <div className="header-content">
          <div>
            <h1>Market Analysis</h1>
            <p>Comprehensive historical data and trends for <GlossaryTooltip term="ZSE" explanation="Zimbabwe Stock Exchange. The primary stock exchange in Zimbabwe.">ZSE</GlossaryTooltip> assets.</p>
          </div>
          <div className="header-actions">
            <button className="btn-outline"><Filter size={16} /> Filter</button>
            <button className="btn-primary"><Download size={16} /> Export Report</button>
          </div>
        </div>
      </header>

      <div className="markets-content">
        <div className="chart-section glass-panel">
          <div className="section-header">
            <h3>Historical Asset Trend ({selectedAsset})</h3>
            <select className="asset-selector" value={selectedAsset} onChange={(e) => setSelectedAsset(e.target.value)}>
              <option value="TIG.zw">TIG.zw</option>
              <option value="REV.zw">REV.zw</option>
              <option value="Innscor">Innscor</option>
            </select>
          </div>
          
          <div className="historical-chart">
            {loading ? (
              <div className="loading">Loading chart data...</div>
            ) : (
              <ResponsiveContainer width="100%" height={350}>
                <LineChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                  <XAxis 
                    dataKey="date" 
                    stroke="#94a3b8" 
                    tickFormatter={(val) => val.split(' ')[0]} 
                    tick={{fontSize: 12}}
                    tickMargin={10}
                  />
                  <YAxis stroke="#94a3b8" tick={{fontSize: 12}} tickMargin={10} />
                  <Tooltip 
                    contentStyle={{ background: 'rgba(20, 25, 35, 0.9)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px' }}
                    itemStyle={{ color: '#fff' }}
                  />
                  <Line type="monotone" dataKey="price" stroke="#3b82f6" strokeWidth={3} dot={{r: 4, fill: '#3b82f6'}} activeDot={{r: 6}} />
                </LineChart>
              </ResponsiveContainer>
            )}
          </div>
        </div>

        <div className="grid-section glass-panel">
          <div className="section-header">
            <h3>Asset Data Grid</h3>
            <div className="search-mini">
              <input type="text" placeholder="Search entries..." className="input-field" style={{padding: '8px 12px', width: '200px'}} />
            </div>
          </div>
          
          <div className="asset-data-grid table-responsive">
            <table>
              <thead>
                <tr>
                  <th>Timestamp</th>
                  <th>Ticker</th>
                  <th>Category</th>
                  <th>Price ($)</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr><td colSpan="5" className="text-center py-4">Loading grid data...</td></tr>
                ) : (
                  data.map((item, i) => (
                    <tr key={i}>
                      <td>{item.date}</td>
                      <td className="font-bold">{renderTicker(item.ticker)}</td>
                      <td><GlossaryTooltip term="REIT" explanation="Real Estate Investment Trust. A company that owns or finances income-producing real estate.">REIT</GlossaryTooltip></td>
                      <td>${(item.price / 100).toFixed(2)}</td>
                      <td><span className="status-badge success">Verified</span></td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Markets;
