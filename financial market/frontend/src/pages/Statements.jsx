import React from 'react';
import { Download } from 'lucide-react';

const Statements = () => {
  const statements = [
    { month: 'May 2026', type: 'Monthly Summary', size: '2.4 MB' },
    { month: 'April 2026', type: 'Monthly Summary', size: '2.1 MB' },
    { month: 'March 2026', type: 'Monthly Summary', size: '2.5 MB' },
    { month: 'Q1 2026', type: 'Tax Form (1099)', size: '1.8 MB' },
  ];

  return (
    <div className="page-container">
      <div className="card h-100 p-4">
        <h2 className="text-xl font-bold mb-4" style={{ color: 'var(--accent-color)' }}>Tax Forms & Summaries</h2>
        <p className="text-secondary">Easily access your monthly summaries and annual tax documents here.</p>
        
        <div style={{ marginTop: '24px' }}>
          <table style={{ width: '100%', maxWidth: '800px', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid var(--border-color)', textAlign: 'left' }}>
                <th style={{ padding: '12px' }}>Document Period</th>
                <th style={{ padding: '12px' }}>Document Type</th>
                <th style={{ padding: '12px' }}>Size</th>
                <th style={{ padding: '12px', textAlign: 'right' }}>Action</th>
              </tr>
            </thead>
            <tbody>
              {statements.map((doc, i) => (
                <tr key={i} style={{ borderBottom: '1px solid var(--border-color)' }}>
                  <td style={{ padding: '16px 12px', fontWeight: 'bold' }}>{doc.month}</td>
                  <td style={{ padding: '16px 12px', color: 'var(--text-secondary)' }}>{doc.type}</td>
                  <td style={{ padding: '16px 12px', color: 'var(--text-secondary)' }}>{doc.size}</td>
                  <td style={{ padding: '16px 12px', textAlign: 'right' }}>
                    <button style={{ background: 'transparent', border: '1px solid var(--border-color)', borderRadius: '4px', padding: '6px 12px', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
                      <Download size={14} /> Download
                    </button>
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

export default Statements;
