import { accountsSummary } from '../data/accounts';
import StatCard from './StatCard';

export default function AccountsSummary() {
  return (
    <section className="accounts-stats" aria-label="Account summary">
      {accountsSummary.map((item) => (
        <StatCard key={item.id} {...item} />
      ))}
    </section>
  );
}
