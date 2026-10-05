import { expenseByMonth } from '../data/transactions';

const MAX = 142;

export default function MyExpense() {
  return (
    <section className="section my-expense">
      <div className="section-head">
        <h2>My Expense</h2>
      </div>
      <div className="section-card my-expense__card">
        <div className="my-expense__chart" role="img" aria-label="Monthly expense bars">
          {expenseByMonth.map(({ month, value, highlight }) => (
            <div key={month} className="my-expense__col">
              <div className="my-expense__bar-stack">
                {highlight ? <p className="my-expense__total">$12,500</p> : null}
                <div
                  className={`my-expense__bar${highlight ? ' my-expense__bar--peak' : ''}`}
                  style={{ height: `${(value / MAX) * 100}%` }}
                />
              </div>
              <span className="my-expense__month">{month}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
