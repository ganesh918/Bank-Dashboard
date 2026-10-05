import { investmentsSummary } from '../data/investments';
import StatCard from './StatCard';

export default function InvestmentsSummary() {
  return (
    <section className="investments-stats" aria-label="Investment summary">
      {investmentsSummary.map((item) => (
        <StatCard key={item.id} {...item} />
      ))}
    </section>
  );
}
