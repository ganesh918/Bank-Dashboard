import AppShell from '../layout/AppShell';
import { loyaltySummary, privilegePrograms } from '../data/privileges';
import { useToast } from '../context/ToastContext';

export default function Privileges() {
  const { showToast } = useToast();
  const { points, tier, pointsToNext, nextTier, tierMin, tierMid, tierMax } = loyaltySummary;
  const progress = ((points - tierMin) / (tierMax - tierMin)) * 100;

  const onActivate = (title) => {
    showToast('success', `${title} benefits activation request submitted.`);
  };

  const onRedeem = () => {
    showToast('info', 'Rewards catalog opening soon.');
  };

  const onHistory = () => {
    showToast('info', 'Points history will appear here.');
  };

  return (
    <AppShell pageTitle="My Privileges" mainClassName="dashboard-main prv-main">
      <div className="prv-grid">
        <section className="section-card prv-loyalty" aria-label="Loyalty points">
          <div className="prv-loyalty__head">
            <div>
              <h2 className="prv-loyalty__title">Loyalty Points</h2>
              <p className="prv-loyalty__subtitle">
                Track and redeem your loyalty points for exclusive rewards
              </p>
            </div>
            <p className="prv-loyalty__points">
              {points.toLocaleString()}
              <span>points</span>
            </p>
          </div>
          <div className="prv-loyalty__tier">
            <h3>Current Tier: {tier}</h3>
            <p>
              {pointsToNext.toLocaleString()} points until {nextTier} tier
            </p>
          </div>
          <div className="prv-loyalty__track" aria-hidden="true">
            <span>{tierMin.toLocaleString()}</span>
            <div className="prv-loyalty__bar">
              <div className="prv-loyalty__fill" style={{ width: `${Math.min(100, Math.max(0, progress))}%` }} />
            </div>
            <span>{tierMid.toLocaleString()}</span>
            <span>{tierMax.toLocaleString()}</span>
          </div>
          <div className="prv-loyalty__actions">
            <button type="button" className="prv-btn prv-btn--primary" onClick={onRedeem}>
              Redeem Points
            </button>
            <button type="button" className="prv-btn prv-btn--ghost" onClick={onHistory}>
              View History
            </button>
          </div>
        </section>

        <section className="section prv-programs">
          <div className="section-head">
            <h2>Exclusive Benefits</h2>
          </div>
          <p className="prv-intro">
            Enjoy exclusive benefits and rewards as a valued BankDash customer. Explore special offers,
            discounts, and premium services tailored just for you.
          </p>
          <ul className="prv-cards">
            {privilegePrograms.map((program) => (
              <li key={program.id} className="section-card prv-card">
                <div className="prv-card__top">
                  <span className="prv-card__icon" style={{ backgroundColor: program.iconBg }}>
                    <img src={`/assets/${program.icon}`} alt="" width={25} height={25} />
                  </span>
                  <div className="prv-card__copy">
                    <h3>{program.title}</h3>
                    <p>{program.subtitle}</p>
                  </div>
                  <span className="prv-card__tier">{program.tier}</span>
                </div>
                <ul className="prv-card__perks">
                  {program.perks.map((perk) => (
                    <li key={perk}>{perk}</li>
                  ))}
                </ul>
                <button
                  type="button"
                  className="prv-btn prv-btn--primary prv-card__cta"
                  onClick={() => onActivate(program.title)}
                >
                  Activate Benefits
                </button>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </AppShell>
  );
}
