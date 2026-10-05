import { recentTransactions } from '../data/dashboard';

export default function RecentTransactions() {
  return (
    <section className="section recent-transactions">
      <div className="section-head">
        <h2>Recent Transaction</h2>
      </div>
      <div className="section-card section-card--transactions">
        <ul className="transaction-list">
          {recentTransactions.map((tx) => (
            <li key={tx.title} className="transaction-item">
              <div className="transaction-icon" style={{ background: tx.iconBg }}>
                <img src={`/assets/${tx.icon}`} alt="" width={28} height={28} />
              </div>
              <div className="transaction-copy">
                <p className="transaction-title">{tx.title}</p>
                <p className="transaction-date">{tx.date}</p>
              </div>
              <p className={`transaction-amount ${tx.positive ? 'positive' : 'negative'}`}>
                {tx.amount}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
