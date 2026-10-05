import AppShell from '../layout/AppShell';
import InvestmentsSummary from '../components/InvestmentsSummary';
import InvestmentsLineChart from '../components/InvestmentsLineChart';
import InvestmentsPortfolio from '../components/InvestmentsPortfolio';
import InvestmentsTrendingStock from '../components/InvestmentsTrendingStock';
import { investmentsPortfolio, investmentsYearly } from '../data/investments';

export default function Investments() {
  return (
    <AppShell pageTitle="Investments" mainClassName="dashboard-main investments-main">
      <div className="investments-grid">
        <InvestmentsSummary />

        <div className="investments-row investments-row--charts">
          <InvestmentsLineChart title="Yearly Total Investment" variant="points" values={investmentsYearly} />
          <InvestmentsLineChart title="Monthly Revenue" variant="curve" />
        </div>

        <div className="investments-row investments-row--lists">
          <InvestmentsPortfolio items={investmentsPortfolio} />
          <InvestmentsTrendingStock />
        </div>
      </div>
    </AppShell>
  );
}
