import AppShell from '../layout/AppShell';
import { CreditCard } from '../components/MyCards';
import CardExpenseStatistics from '../components/CardExpenseStatistics';
import CardList from '../components/CardList';
import AddCardForm from '../components/AddCardForm';
import CardSettings from '../components/CardSettings';
import { creditCardVariants } from '../data/creditCards';

export default function CreditCards() {
  return (
    <AppShell pageTitle="Credit Cards" mainClassName="dashboard-main cc-main">
      <div className="cc-grid">
        <section className="section cc-cards">
          <div className="section-head">
            <h2>My Cards</h2>
          </div>
          <div className="cc-cards__row">
            {creditCardVariants.map((variant) => (
              <CreditCard key={variant} variant={variant} />
            ))}
          </div>
        </section>
        <CardExpenseStatistics />
        <CardList />
        <AddCardForm />
        <CardSettings />
      </div>
    </AppShell>
  );
}
