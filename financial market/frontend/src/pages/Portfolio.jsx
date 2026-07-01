import React from 'react';

const Portfolio = () => {
  return (
    <div className="page-container">
      <div className="card h-100 p-4">
        <h2 className="text-xl font-bold mb-4" style={{ color: 'var(--accent-color)' }}>My Portfolio</h2>
        <p className="text-secondary">See how your money is broken down across different investment types.</p>
        
        <div style={{ marginTop: '24px', display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px' }}>
          <div className="card p-4" style={{ background: '#f8fafc' }}>
            <h3 style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Stocks</h3>
            <div style={{ fontSize: '1.5rem', fontWeight: 'bold', marginTop: '8px' }}>$185,200.00</div>
          </div>
          <div className="card p-4" style={{ background: '#f8fafc' }}>
            <h3 style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Real Estate</h3>
            <div style={{ fontSize: '1.5rem', fontWeight: 'bold', marginTop: '8px' }}>$75,000.00</div>
          </div>
          <div className="card p-4" style={{ background: '#f8fafc' }}>
            <h3 style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Cash Reserves</h3>
            <div style={{ fontSize: '1.5rem', fontWeight: 'bold', marginTop: '8px' }}>$25,250.00</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Portfolio;
