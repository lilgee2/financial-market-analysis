import React, { useState, useEffect } from 'react';
import axios from 'axios';
import GlossaryTooltip from './GlossaryTooltip';
import './MarketWatchWidget.css';

const MarketWatchWidget = ({ type }) => {
  const [data, setData] = useState([]);
  const [gainers, setGainers] = useState([]);
  const [losers, setLosers] = useState([]);
  const [activeTab, setActiveTab] = useState('gainers');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (type === 'reits-simple' || type === 'watchlist') {
          const res = await axios.get('http://localhost:8000/api/market/reits');
          setData(res.data);
        } else if (type === 'movers') {
          const [gRes, lRes] = await Promise.all([
            axios.get('http://localhost:8000/api/market/equities/Top Gainers'),
            axios.get('http://localhost:8000/api/market/equities/Top Losers')
          ]);
          setGainers(gRes.data);
          setLosers(lRes.data);
        }
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [type]);

  const enrichData = (items, trendType = 'random') => {
    return items.map(item => {
      const change = (Math.random() * 5).toFixed(2);
      let isPositive = true;
      if (trendType === 'gainer') isPositive = true;
      else if (trendType === 'loser') isPositive = false;
      else isPositive = Math.random() > 0.5;
      
      return {
        ...item,
        changeStr: `${isPositive ? '+' : '-'}${change}%`,
        isPositive
      };
    });
  };

  const renderTrendLine = (isPositive) => {
    return (
      <svg width="40" height="15" viewBox="0 0 40 15">
        <path 
          d="M0,10 Q5,5 10,12 T20,8 T30,12 T40,2" 
          fill="none" 
          stroke={isPositive ? "var(--success-color)" : "var(--danger-color)"} 
          strokeWidth="1.5" 
        />
      </svg>
    );
  };

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

  if (loading) return <div className="card h-100 p-4 text-center text-secondary">Loading...</div>;

  if (type === 'reits-simple') {
    const enriched = enrichData(data, 'random').slice(0, 4);
    return (
      <div className="card h-100">
        <div className="card-header-light">
          <GlossaryTooltip term="REIT" explanation="Real Estate Investment Trust. A company that owns or finances income-producing real estate. It's a way to invest in property without buying it directly.">REITs</GlossaryTooltip> Performance
        </div>
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>Ticker</th>
                <th>Last Price</th>
                <th>Change</th>
                <th>Trend</th>
              </tr>
            </thead>
            <tbody>
              {enriched.map((item, i) => (
                <tr key={i}>
                  <td className="font-bold">{renderTicker(item.ticker)}</td>
                  <td>
                    <div>${(item.price / 100).toFixed(2)}</div>
                  </td>
                  <td className={item.isPositive ? 'text-success' : 'text-danger'}>
                    {item.changeStr}
                  </td>
                  <td>{renderTrendLine(item.isPositive)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }

  if (type === 'movers') {
    const list = activeTab === 'gainers' ? enrichData(gainers, 'gainer') : enrichData(losers, 'loser');
    return (
      <div className="card h-100">
        <div className="card-header-dark">
          <span><GlossaryTooltip term="ZSE" explanation="Zimbabwe Stock Exchange. The primary stock exchange in Zimbabwe.">ZSE</GlossaryTooltip> Market Movers</span>
          <span>^</span>
        </div>
        <div className="tabs-light">
          <button className={activeTab === 'gainers' ? 'active' : ''} onClick={() => setActiveTab('gainers')}>TOP GAINERS</button>
          <button className={activeTab === 'losers' ? 'active' : ''} onClick={() => setActiveTab('losers')}>TOP LOSERS</button>
        </div>
        <div className="table-container" style={{maxHeight: '300px', overflowY: 'auto'}}>
          <table>
            <thead>
              <tr>
                <th>Ticker</th>
                <th>Last Price</th>
                <th>% Change</th>
                <th>Trend</th>
              </tr>
            </thead>
            <tbody>
              {list.map((item, i) => (
                <tr key={i}>
                  <td className="font-bold">{renderTicker(item.ticker)}</td>
                  <td>
                    <div>${(item.price / 100).toFixed(2)}</div>
                  </td>
                  <td className={item.isPositive ? 'text-success' : 'text-danger'}>
                    {item.changeStr}<br/>
                    <span style={{fontSize:'0.7rem', color:'var(--text-secondary)'}}>% +/-</span>
                  </td>
                  <td>{renderTrendLine(item.isPositive)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }

  if (type === 'watchlist') {
    const enriched = enrichData(data, 'random').slice(0, 4);
    return (
      <div className="card h-100">
        <div className="card-header-dark">
          <span><GlossaryTooltip term="REIT" explanation="Real Estate Investment Trust. A company that owns or finances income-producing real estate. It's a way to invest in property without buying it directly.">REITs</GlossaryTooltip> Performance Watchlist</span>
          <span>^</span>
        </div>
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>Ticker</th>
                <th>Price</th>
                <th>% Change</th>
                <th>Trend</th>
              </tr>
            </thead>
            <tbody>
              {enriched.map((item, i) => (
                <tr key={i}>
                  <td className="font-bold">{renderTicker(item.ticker)}</td>
                  <td>${(item.price / 100).toFixed(2)}</td>
                  <td className={item.isPositive ? 'text-success' : 'text-danger'}>{item.changeStr}</td>
                  <td>{renderTrendLine(item.isPositive)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }

  return null;
};

export default MarketWatchWidget;
