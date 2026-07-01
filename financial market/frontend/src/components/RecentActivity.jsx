import React from 'react';
import { Briefcase, CreditCard } from 'lucide-react';
import './RecentActivity.css';

const activities = [
  { id: 1, type: 'Dividend payment', date: 'April 11, 2022', amount: '+$31,000 USD', isPositive: true },
  { id: 2, type: 'Dividend payment', date: 'Aug 11, 2022', amount: '+$1,000 USD', isPositive: true },
  { id: 3, type: 'Equity purchase', date: 'Aug 11, 2022', amount: '-$300 USD', isPositive: false },
  { id: 4, type: 'Dividend payment', date: 'Aug 11, 2022', amount: '+$1,000 USD', isPositive: true },
  { id: 5, type: 'Dividend payment', date: 'Aug 11, 2022', amount: '+$500 USD', isPositive: true },
  { id: 6, type: 'Equity purchase', date: '17 Aug, 2022', amount: '-$300 USD', isPositive: false },
];

const RecentActivity = () => {
  return (
    <div className="card h-100">
      <div className="card-header-light" style={{borderBottom: 'none'}}>Recent Transaction Feed</div>
      <div className="activity-list-light">
        {activities.map((item, index) => (
          <div key={item.id} className="activity-item-light">
            <div className="activity-icon-light">
              {item.isPositive ? <Briefcase size={16} /> : <CreditCard size={16} />}
            </div>
            <div className="activity-details-light">
              <div className="activity-title-light">{item.type}</div>
              <div className="activity-date-light">{item.date}</div>
            </div>
            <div className={`activity-amount-light ${item.isPositive ? 'text-success' : 'text-danger'}`}>
              {item.amount}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentActivity;
