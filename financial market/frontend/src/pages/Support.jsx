import React, { useState } from 'react';
import { LifeBuoy, MessageSquare, Plus, Search, CheckCircle, Clock } from 'lucide-react';

const Support = () => {
  const [activeTab, setActiveTab] = useState('tickets'); // 'tickets', 'new'
  const [subject, setSubject] = useState('');
  const [category, setCategory] = useState('Deposit Issue');
  const [message, setMessage] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  const [tickets, setTickets] = useState([
    { id: '#TKT-9921', subject: 'Crypto deposit not showing', category: 'Deposit Issue', status: 'Resolved', date: '2026-06-25' },
    { id: '#TKT-9945', subject: 'How do I upgrade to Elite Portfolio?', category: 'General Inquiry', status: 'Open', date: '2026-06-29' }
  ]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!subject || !message) return;
    
    setTickets([
      { id: `#TKT-${Math.floor(Math.random() * 10000)}`, subject, category, status: 'Open', date: new Date().toISOString().split('T')[0] },
      ...tickets
    ]);
    
    setSuccessMsg('Your support ticket has been submitted successfully. A representative will respond shortly.');
    setTimeout(() => {
      setSuccessMsg('');
      setActiveTab('tickets');
      setSubject('');
      setMessage('');
    }, 3000);
  };

  const faqs = [
    { q: 'How long do withdrawals take?', a: 'Bank transfers take 1-3 business days. Crypto withdrawals are usually processed within 1 hour.' },
    { q: 'Can I cancel an active investment package?', a: 'Active investment packages cannot be cancelled until the term duration is completed.' },
    { q: 'Why is my account unverified?', a: 'You must upload your government ID and proof of address in the Settings page to lift account limits.' }
  ];

  return (
    <div className="page-container animate-fade-in">
      <div style={{ marginBottom: '24px' }}>
        <h2 className="text-xl font-bold" style={{ color: 'var(--accent-color)', display: 'flex', alignItems: 'center', gap: '8px' }}><LifeBuoy size={24} /> Help Center & Support</h2>
        <p className="text-secondary">Get help with your account, view your support tickets, or browse FAQs.</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 300px', gap: '24px' }}>
        
        {/* MAIN SUPPORT PANEL */}
        <div className="card p-4 h-100">
          <div style={{ display: 'flex', gap: '16px', borderBottom: '1px solid var(--border-color)', paddingBottom: '16px', marginBottom: '24px' }}>
            <button 
              onClick={() => setActiveTab('tickets')}
              style={{ background: activeTab === 'tickets' ? 'var(--accent-color)' : 'transparent', color: activeTab === 'tickets' ? '#fff' : 'var(--text-secondary)', padding: '8px 16px', border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '8px' }}
            >
              <MessageSquare size={18} /> My Tickets
            </button>
            <button 
              onClick={() => setActiveTab('new')}
              style={{ background: activeTab === 'new' ? 'var(--accent-color)' : 'transparent', color: activeTab === 'new' ? '#fff' : 'var(--text-secondary)', padding: '8px 16px', border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '8px' }}
            >
              <Plus size={18} /> Open New Ticket
            </button>
          </div>

          {successMsg && (
            <div style={{ background: '#dcfce7', border: '1px solid #22c55e', color: '#166534', padding: '16px', borderRadius: '8px', marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '8px', fontWeight: 'bold' }}>
              <CheckCircle size={20} /> {successMsg}
            </div>
          )}

          {activeTab === 'tickets' ? (
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.9rem' }}>
                <thead>
                  <tr style={{ borderBottom: '1px solid var(--border-color)', textAlign: 'left', color: 'var(--text-secondary)' }}>
                    <th style={{ padding: '12px 0' }}>Ticket ID</th>
                    <th style={{ padding: '12px 0' }}>Subject</th>
                    <th style={{ padding: '12px 0' }}>Category</th>
                    <th style={{ padding: '12px 0' }}>Last Updated</th>
                    <th style={{ padding: '12px 0', textAlign: 'right' }}>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {tickets.map((ticket, i) => (
                    <tr key={i} style={{ borderBottom: '1px solid var(--border-color)' }}>
                      <td style={{ padding: '16px 0', fontWeight: 'bold' }}>{ticket.id}</td>
                      <td style={{ padding: '16px 0', fontWeight: 'bold' }}>{ticket.subject}</td>
                      <td style={{ padding: '16px 0', color: 'var(--text-secondary)' }}>{ticket.category}</td>
                      <td style={{ padding: '16px 0', color: 'var(--text-secondary)' }}>{ticket.date}</td>
                      <td style={{ padding: '16px 0', textAlign: 'right' }}>
                        <span style={{ background: ticket.status === 'Open' ? '#fef08a' : '#dcfce7', color: ticket.status === 'Open' ? '#854d0e' : '#166534', padding: '4px 8px', borderRadius: '4px', fontSize: '0.8rem', fontWeight: 'bold', display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                          {ticket.status === 'Open' ? <Clock size={12}/> : <CheckCircle size={12}/>} {ticket.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                  {tickets.length === 0 && (
                    <tr>
                      <td colSpan="5" style={{ padding: '24px 0', textAlign: 'center', color: 'var(--text-secondary)' }}>No support tickets found.</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          ) : (
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px', maxWidth: '600px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '8px', fontWeight: 'bold' }}>Category</label>
                <select 
                  value={category} 
                  onChange={(e) => setCategory(e.target.value)}
                  style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid var(--border-color)', background: '#f8fafc' }}
                >
                  <option value="Deposit Issue">Deposit Issue</option>
                  <option value="Withdrawal Issue">Withdrawal Issue</option>
                  <option value="Account Verification">Account Verification</option>
                  <option value="Investment Plans">Investment Plans</option>
                  <option value="General Inquiry">General Inquiry</option>
                </select>
              </div>
              
              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '8px', fontWeight: 'bold' }}>Subject</label>
                <input 
                  type="text" 
                  value={subject} 
                  onChange={(e) => setSubject(e.target.value)} 
                  placeholder="Brief description of the issue" 
                  required 
                  style={{ width: '100%', padding: '12px', border: '1px solid var(--border-color)', borderRadius: '8px', background: '#f8fafc' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '8px', fontWeight: 'bold' }}>Message</label>
                <textarea 
                  value={message} 
                  onChange={(e) => setMessage(e.target.value)} 
                  placeholder="Please provide as much detail as possible..." 
                  required 
                  rows="5"
                  style={{ width: '100%', padding: '12px', border: '1px solid var(--border-color)', borderRadius: '8px', background: '#f8fafc', resize: 'vertical' }}
                />
              </div>

              <button type="submit" className="btn-primary" style={{ padding: '14px', fontSize: '1rem', marginTop: '8px' }}>
                Submit Ticket
              </button>
            </form>
          )}
        </div>

        {/* SIDEBAR FAQS */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          <div className="card p-4">
            <h3 className="font-bold mb-4" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><Search size={18} /> Frequently Asked</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {faqs.map((faq, i) => (
                <div key={i} style={{ borderBottom: i < faqs.length - 1 ? '1px solid var(--border-color)' : 'none', paddingBottom: i < faqs.length - 1 ? '16px' : '0' }}>
                  <div style={{ fontWeight: 'bold', fontSize: '0.9rem', marginBottom: '8px', color: 'var(--accent-color)' }}>{faq.q}</div>
                  <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: '1.4' }}>{faq.a}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Support;
