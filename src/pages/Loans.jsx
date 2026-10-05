import AppShell from '../layout/AppShell';
import StatCard from '../components/StatCard';
import { activeLoans, activeLoansTotal, loanStats } from '../data/loans';

const COLUMNS = [
  { key: 'id', label: 'SL No' },
  { key: 'money', label: 'Loan Money' },
  { key: 'left', label: 'Left to repay' },
  { key: 'duration', label: 'Duration' },
  { key: 'rate', label: 'Interest rate' },
  { key: 'installment', label: 'Installment' },
];

export default function Loans() {
  return (
    <AppShell pageTitle="Loans" mainClassName="dashboard-main loans-main">
      <div className="loans-grid">
        <section className="loans-stats" aria-label="Loan types">
          {loanStats.map(({ id, ...stat }) => (
            <StatCard key={id} {...stat} />
          ))}
        </section>

        <section className="section loans-overview">
          <div className="section-head">
            <h2>Active Loans Overview</h2>
          </div>
          <div className="section-card loans-table" role="table" aria-label="Active loans">
            <div className="loans-table__row loans-table__row--head" role="row">
              {COLUMNS.map((col) => (
                <span key={col.key} className={`loans-table__cell loans-table__cell--${col.key}`} role="columnheader">
                  {col.label}
                </span>
              ))}
              <span className="loans-table__cell loans-table__cell--repay" role="columnheader">
                Repay
              </span>
            </div>

            {activeLoans.map((loan, i) => (
              <div key={loan.id} className="loans-table__row" role="row">
                {COLUMNS.map((col) => (
                  <span key={col.key} className={`loans-table__cell loans-table__cell--${col.key}`} role="cell">
                    {col.key === 'id' ? `${loan.id}.` : loan[col.key]}
                  </span>
                ))}
                <span className="loans-table__cell loans-table__cell--repay" role="cell">
                  <button type="button" className={`loans-table__repay${i === 0 ? ' is-active' : ''}`}>
                    Repay
                  </button>
                </span>
              </div>
            ))}

            <div className="loans-table__row loans-table__row--total" role="row">
              <span className="loans-table__cell loans-table__cell--id loans-table__total-label" role="rowheader">
                Total
              </span>
              <span className="loans-table__cell loans-table__cell--money" role="cell">
                {activeLoansTotal.money}
              </span>
              <span className="loans-table__cell loans-table__cell--left" role="cell">
                {activeLoansTotal.left}
              </span>
              <span className="loans-table__cell loans-table__cell--duration" role="cell" />
              <span className="loans-table__cell loans-table__cell--rate" role="cell" />
              <span className="loans-table__cell loans-table__cell--installment" role="cell">
                {activeLoansTotal.installment}
              </span>
              <span className="loans-table__cell loans-table__cell--repay" role="cell" />
            </div>
          </div>
        </section>
      </div>
    </AppShell>
  );
}
