import { useState } from 'react';
import { allTransactions, formatAmount } from '../data/transactions';
import { useBreakpoint } from '../hooks/useBreakpoint';
import TxFlowIcon from './TxFlowIcon';
import TxPaginationChevron from './TxPaginationChevron';

const TABS = ['All Transactions', 'Income', 'Expense'];

export default function TransactionsTable() {
  const breakpoint = useBreakpoint();
  const [tab, setTab] = useState(0);
  const [page, setPage] = useState(1);

  const rows = allTransactions.filter((row) => {
    if (tab === 1) return row.amount > 0;
    if (tab === 2) return row.amount < 0;
    return true;
  });

  return (
    <section className={`section tx-table-section tx-table-section--${breakpoint}`}>
      <header className="tx-section-top">
        <h2 className="tx-section-title">Recent Transactions</h2>
        <div className="tx-tabs" role="tablist" aria-label="Transaction filters">
          {TABS.map((label, i) => (
            <button
              key={label}
              type="button"
              role="tab"
              aria-selected={tab === i}
              className={`tx-tabs__item${tab === i ? ' tx-tabs__item--active' : ''}`}
              onClick={() => setTab(i)}
            >
              {label}
            </button>
          ))}
        </div>
      </header>

      <div className="section-card tx-table-card">
        <div className="tx-table-wrap">
          <table className="tx-table">
            <thead>
              <tr>
                <th scope="col">Description</th>
                <th scope="col">Transaction ID</th>
                <th scope="col">Type</th>
                <th scope="col">Card</th>
                <th scope="col">Date</th>
                <th scope="col">Amount</th>
                <th scope="col">Receipt</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row, i) => (
                <tr key={`${row.id}-${i}`}>
                  <td data-label="Description">
                    <div className="tx-table__desc">
                      <TxFlowIcon flow={row.flow} />
                      <span className="tx-table__name">{row.description}</span>
                    </div>
                  </td>
                  <td data-label="Transaction ID">{row.id}</td>
                  <td data-label="Type">{row.type}</td>
                  <td data-label="Card">{row.card}</td>
                  <td data-label="Date">{row.date}</td>
                  <td
                    data-label="Amount"
                    className={row.flow === 'in' ? 'tx-table__amount--in' : 'tx-table__amount--out'}
                  >
                    {formatAmount(row.amount)}
                  </td>
                  <td data-label="Receipt">
                    <button type="button" className="tx-download">
                      Download
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <ul className="tx-mobile-list">
          {rows.map((row, i) => (
            <li key={`m-${row.id}-${i}`} className="tx-mobile-row">
              <TxFlowIcon flow={row.flow} />
              <div className="tx-mobile-row__copy">
                <p className="tx-mobile-row__title">{row.description}</p>
                <p className="tx-mobile-row__meta">{row.date}</p>
              </div>
              <span
                className={
                  row.flow === 'in' ? 'tx-table__amount--in' : 'tx-table__amount--out'
                }
              >
                {formatAmount(row.amount)}
              </span>
            </li>
          ))}
        </ul>
      </div>

      <nav className="tx-pagination" aria-label="Transaction pages">
        <div className="tx-pagination__bar">
          <button
            type="button"
            className="tx-pagination__nav tx-pagination__nav--prev"
            disabled={page <= 1}
            onClick={() => setPage((p) => Math.max(1, p - 1))}
          >
            <TxPaginationChevron direction="prev" />
            Previous
          </button>
          <div className="tx-pagination__pages">
            {[1, 2, 3, 4].map((n) => (
              <button
                key={n}
                type="button"
                className={`tx-pagination__page${page === n ? ' tx-pagination__page--active' : ''}`}
                onClick={() => setPage(n)}
                aria-current={page === n ? 'page' : undefined}
              >
                {n}
              </button>
            ))}
          </div>
          <button
            type="button"
            className="tx-pagination__nav tx-pagination__nav--next"
            onClick={() => setPage((p) => Math.min(4, p + 1))}
          >
            Next
            <TxPaginationChevron direction="next" />
          </button>
        </div>
      </nav>
    </section>
  );
}
