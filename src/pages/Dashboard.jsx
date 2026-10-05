import AppShell from '../layout/AppShell';
import BalanceHistory from '../components/BalanceHistory';
import ExpenseStatistics from '../components/ExpenseStatistics';
import MyCards from '../components/MyCards';
import QuickTransfer from '../components/QuickTransfer';
import RecentTransactions from '../components/RecentTransactions';
import WeeklyActivity from '../components/WeeklyActivity';

export default function Dashboard() {
  return (
    <AppShell pageTitle="Overview">
      <div className="dashboard-grid">
        <MyCards />
        <RecentTransactions />
        <WeeklyActivity />
        <ExpenseStatistics />
        <div className="dashboard-row-bottom">
          <QuickTransfer />
          <BalanceHistory />
        </div>
      </div>
    </AppShell>
  );
}
