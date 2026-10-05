import AppShell from '../layout/AppShell';
import MyCards from '../components/MyCards';
import MyExpense from '../components/MyExpense';
import TransactionsTable from '../components/TransactionsTable';

export default function Transactions() {
  return (
    <AppShell pageTitle="Transactions" mainClassName="dashboard-main transactions-main">
      <div className="transactions-grid">
        <MyCards variant="transactions" />
        <MyExpense />
        <TransactionsTable />
      </div>
    </AppShell>
  );
}
