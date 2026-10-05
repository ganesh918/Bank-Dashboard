import AppShell from '../layout/AppShell';
import AccountsSummary from '../components/AccountsSummary';
import AccountsMyCard from '../components/AccountsMyCard';
import AccountsDebitCreditChart from '../components/AccountsDebitCreditChart';
import ActivityList from '../components/ActivityList';
import { accountsLastTransactions, accountsInvoicesSent } from '../data/accounts';

export default function Accounts() {
  return (
    <AppShell pageTitle="Accounts" mainClassName="dashboard-main accounts-main">
      <div className="accounts-grid">
        <AccountsSummary />

        <section className="section accounts-last">
          <div className="section-head">
            <h2>Last Transaction</h2>
          </div>
          <div className="section-card accounts-last__card">
            <ActivityList items={accountsLastTransactions} variant="transactions" />
          </div>
        </section>

        <AccountsMyCard />

        <AccountsDebitCreditChart />

        <section className="section accounts-invoices">
          <div className="section-head">
            <h2>Invoices Sent</h2>
          </div>
          <div className="section-card accounts-invoices__card">
            <ActivityList items={accountsInvoicesSent} />
          </div>
        </section>
      </div>
    </AppShell>
  );
}
