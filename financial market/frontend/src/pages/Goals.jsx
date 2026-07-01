import React, { useState } from 'react';
import { Check, Edit2 } from 'lucide-react';

const Goals = () => {
  const [goals, setGoals] = useState([
    { id: 1, name: 'Target Annual Return', current: 12, target: 15, unit: '%', type: 'percentage' },
    { id: 2, name: 'Total Profit Target', current: 3200, target: 5000, unit: '$', type: 'currency' }
  ]);
  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState({ name: '', current: 0, target: 0 });

  const startEdit = (goal) => {
    setEditingId(goal.id);
    setEditForm({ name: goal.name, current: goal.current, target: goal.target });
  };

  const saveEdit = (id) => {
    setGoals(goals.map(g => g.id === id ? { ...g, ...editForm } : g));
    setEditingId(null);
  };

  const formatValue = (val, type, unit) => {
    if (type === 'currency') return `${unit}${val.toLocaleString()}`;
    return `${val}${unit}`;
  };

  return (
    <div className="page-container">
      <div className="card h-100 p-4">
        <h2 className="text-xl font-bold mb-4" style={{ color: 'var(--accent-color)' }}>My Investment Goals</h2>
        <p className="text-secondary">Set and track your performance targets and profit goals.</p>
        
        <div style={{ marginTop: '24px', display: 'grid', gap: '20px', maxWidth: '600px' }}>
          {goals.map(goal => (
            <div key={goal.id} className="card p-4" style={{ background: '#f8fafc' }}>
              {editingId === goal.id ? (
                <div style={{display: 'flex', flexDirection: 'column', gap: '8px'}}>
                  <input value={editForm.name} onChange={e => setEditForm({...editForm, name: e.target.value})} placeholder="Goal Name" className="input-field"/>
                  <div style={{display: 'flex', gap: '8px'}}>
                    <input type="number" value={editForm.current} onChange={e => setEditForm({...editForm, current: Number(e.target.value)})} placeholder="Current" className="input-field" style={{width: '50%'}}/>
                    <input type="number" value={editForm.target} onChange={e => setEditForm({...editForm, target: Number(e.target.value)})} placeholder="Target" className="input-field" style={{width: '50%'}}/>
                  </div>
                  <button onClick={() => saveEdit(goal.id)} className="btn-primary" style={{width: '100px', padding: '6px', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '4px'}}><Check size={14}/> Save</button>
                </div>
              ) : (
                <>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px', alignItems: 'center' }}>
                    <span className="font-bold" style={{display: 'flex', alignItems: 'center', gap: '8px', fontSize: '1.1rem'}}>
                      {goal.name}
                      <button onClick={() => startEdit(goal)} style={{background: 'none', border: 'none', cursor: 'pointer', color: '#94a3b8'}}><Edit2 size={14}/></button>
                    </span>
                    <span className="text-secondary" style={{fontSize: '1.1rem'}}>
                      <span style={{color: 'var(--success-color)', fontWeight: 'bold'}}>{formatValue(goal.current, goal.type, goal.unit)}</span> / {formatValue(goal.target, goal.type, goal.unit)}
                    </span>
                  </div>
                  <div style={{ background: '#e2e8f0', height: '12px', borderRadius: '6px', overflow: 'hidden' }}>
                    <div style={{ background: 'var(--accent-color)', width: `${Math.min(100, (goal.current / goal.target) * 100)}%`, height: '100%', borderRadius: '6px', transition: 'width 0.3s ease' }}></div>
                  </div>
                  <div style={{ fontSize: '0.85rem', color: '#64748b', marginTop: '8px' }}>
                    {((goal.current / goal.target) * 100).toFixed(1)}% of target achieved
                  </div>
                </>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Goals;
