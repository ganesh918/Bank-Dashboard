import { useMemo, useState } from 'react';
import AppShell from '../layout/AppShell';
import {
  activityFeed,
  benefitPrograms,
  conciergeActions,
  loyaltyWallet,
  marketplaceCategories,
  marketplaceItems,
  membershipOverview,
  monthlyEarnTrend,
  smartOffers,
  tierComparison,
} from '../data/privileges';
import { useToast } from '../context/ToastContext';

const TREND_MAX = Math.max(...monthlyEarnTrend.map((m) => m.points));

export default function Privileges() {
  const { showToast } = useToast();
  const [marketTab, setMarketTab] = useState('All');
  const [expandedBenefit, setExpandedBenefit] = useState(benefitPrograms[0]?.id ?? null);

  const filteredMarket = useMemo(
    () =>
      marketTab === 'All' ? marketplaceItems : marketplaceItems.filter((item) => item.cat === marketTab),
    [marketTab],
  );

  const notify = (msg, type = 'success') => showToast(type, msg);

  const redeem = (title, cost) => {
    if (loyaltyWallet.points < cost) {
      notify('Insufficient points for this reward.', 'error');
      return;
    }
    notify(`Redeemed: ${title}. Confirmation sent to your email.`);
  };

  return (
    <AppShell pageTitle="My Privileges" mainClassName="dashboard-main prv-main">
      <div className="prv-hub">
        <section className="section-card prv-command" aria-label="Membership overview">
          <div className="prv-command__main">
            <p className="prv-command__eyebrow">Privilege command center</p>
            <h2 className="prv-command__title">
              {membershipOverview.tier} member · {membershipOverview.scoreLabel}
            </h2>
            <p className="prv-command__sub">
              ID {membershipOverview.memberId} · Since {membershipOverview.memberSince} ·{' '}
              {membershipOverview.conciergeAvailable ? 'Concierge online' : 'Concierge offline'}
            </p>
            <div className="prv-command__score">
              <div
                className="prv-command__ring"
                style={{ '--score': membershipOverview.privilegeScore }}
                aria-hidden
              >
                <span>{membershipOverview.privilegeScore}</span>
              </div>
              <div>
                <p className="prv-command__score-label">Privilege score</p>
                <p className="prv-command__score-hint">
                  Based on activity, tenure, and benefit utilization across your accounts.
                </p>
              </div>
            </div>
          </div>
          <ul className="prv-command__stats">
            <li>
              <span>Active benefits</span>
              <strong>{membershipOverview.activeBenefits}</strong>
            </li>
            <li>
              <span>Savings YTD</span>
              <strong>${membershipOverview.savingsYtd.toLocaleString()}</strong>
            </li>
            <li>
              <span>Live offers</span>
              <strong>{membershipOverview.partnerOffers}</strong>
            </li>
            <li>
              <span>Points balance</span>
              <strong>{loyaltyWallet.points.toLocaleString()}</strong>
            </li>
          </ul>
        </section>

        <div className="prv-row prv-row--split">
          <section className="section-card prv-wallet" aria-label="Rewards wallet">
            <h3 className="prv-section-title">Rewards wallet</h3>
            <p className="prv-wallet__points">{loyaltyWallet.points.toLocaleString()}</p>
            <p className="prv-wallet__eq">≈ ${loyaltyWallet.cashEquivalent.toFixed(2)} redeemable value</p>
            <div className="prv-wallet__chips">
              <span>+{loyaltyWallet.pendingPoints} pending</span>
              <span className="prv-wallet__chip-warn">
                {loyaltyWallet.expiringPoints} exp. {loyaltyWallet.expiryDate}
              </span>
            </div>
            <div className="prv-wallet__progress">
              <div className="prv-wallet__progress-head">
                <span>Progress to {loyaltyWallet.nextTier}</span>
                <span>{loyaltyWallet.tierProgress}%</span>
              </div>
              <div className="prv-wallet__bar">
                <div className="prv-wallet__fill" style={{ width: `${loyaltyWallet.tierProgress}%` }} />
              </div>
              <p>{loyaltyWallet.pointsToNext.toLocaleString()} points remaining</p>
            </div>
          </section>

          <section className="section-card prv-trend" aria-label="Points earned">
            <h3 className="prv-section-title">6-month earn trend</h3>
            <ul className="prv-trend__bars">
              {monthlyEarnTrend.map((item) => (
                <li key={item.month}>
                  <div
                    className="prv-trend__bar"
                    style={{ height: `${Math.round((item.points / TREND_MAX) * 100)}%` }}
                    title={`${item.points} pts`}
                  />
                  <span>{item.month}</span>
                </li>
              ))}
            </ul>
          </section>
        </div>

        <section className="section prv-tiers">
          <div className="section-head">
            <h2>Tier roadmap</h2>
          </div>
          <ul className="prv-tiers__grid">
            {tierComparison.map((tier) => (
              <li
                key={tier.id}
                className={`section-card prv-tier${tier.highlight ? ' prv-tier--current' : ''}`}
              >
                <div className="prv-tier__head">
                  <h3>{tier.name}</h3>
                  <span>{tier.minPoints.toLocaleString()}+ pts</span>
                </div>
                <ul>
                  {tier.features.map((f) => (
                    <li key={f}>{f}</li>
                  ))}
                </ul>
                {tier.highlight && <span className="prv-tier__badge">Your tier</span>}
              </li>
            ))}
          </ul>
        </section>

        <section className="section prv-programs">
          <div className="section-head">
            <h2>Benefit programs</h2>
          </div>
          <ul className="prv-programs__list">
            {benefitPrograms.map((program) => {
              const open = expandedBenefit === program.id;
              const usagePct =
                program.usage.total > 0
                  ? Math.round((program.usage.used / program.usage.total) * 100)
                  : 0;
              return (
                <li key={program.id} className={`section-card prv-program${open ? ' is-open' : ''}`}>
                  <button
                    type="button"
                    className="prv-program__toggle"
                    aria-expanded={open}
                    onClick={() => setExpandedBenefit(open ? null : program.id)}
                  >
                    <span className="prv-program__icon" style={{ backgroundColor: program.iconBg }}>
                      <img src={`/assets/${program.icon}`} alt="" width={22} height={22} />
                    </span>
                    <span className="prv-program__meta">
                      <span className="prv-program__cat">{program.category}</span>
                      <strong>{program.title}</strong>
                      <span className="prv-program__desc">{program.description}</span>
                    </span>
                    <span className={`prv-program__status prv-program__status--${program.status.toLowerCase()}`}>
                      {program.status}
                    </span>
                  </button>
                  {open && (
                    <div className="prv-program__body">
                      {program.usage.display ? (
                        <p className="prv-program__metric">{program.usage.label}: {program.usage.display}</p>
                      ) : (
                        <>
                          <p className="prv-program__metric">
                            {program.usage.label}: {program.usage.used}
                            {program.usage.unit ?? ''} / {program.usage.total}
                            {program.usage.unit ?? ''}
                          </p>
                          <div className="prv-program__usage">
                            <div style={{ width: `${usagePct}%` }} />
                          </div>
                        </>
                      )}
                      <p className="prv-program__savings">{program.savings}</p>
                      <button
                        type="button"
                        className="prv-btn prv-btn--primary"
                        onClick={() => notify(`${program.title} settings updated.`)}
                      >
                        Manage program
                      </button>
                    </div>
                  )}
                </li>
              );
            })}
          </ul>
        </section>

        <section className="section prv-offers">
          <div className="section-head">
            <h2>Smart offers</h2>
          </div>
          <ul className="prv-offers__grid">
            {smartOffers.map((offer) => (
              <li key={offer.id} className="section-card prv-offer">
                <span className="prv-offer__badge">{offer.badge}</span>
                <h3>{offer.title}</h3>
                <p>{offer.detail}</p>
                <span className="prv-offer__reward">{offer.reward}</span>
                <button
                  type="button"
                  className="prv-btn prv-btn--primary"
                  onClick={() => notify(`${offer.title} activated.`)}
                >
                  Activate
                </button>
              </li>
            ))}
          </ul>
        </section>

        <section className="section prv-market">
          <div className="section-head">
            <h2>Rewards marketplace</h2>
          </div>
          <div className="prv-tabs" role="tablist" aria-label="Marketplace categories">
            {marketplaceCategories.map((cat) => (
              <button
                key={cat}
                type="button"
                role="tab"
                aria-selected={marketTab === cat}
                className={`prv-tabs__item${marketTab === cat ? ' prv-tabs__item--active' : ''}`}
                onClick={() => setMarketTab(cat)}
              >
                {cat}
              </button>
            ))}
          </div>
          <ul className="prv-market__grid">
            {filteredMarket.map((item) => (
              <li key={item.id} className="section-card prv-market__card">
                {item.hot && <span className="prv-market__hot">Trending</span>}
                <span className="prv-market__cat">{item.cat}</span>
                <h3>{item.title}</h3>
                <p className="prv-market__value">Value {item.value}</p>
                <p className="prv-market__cost">{item.cost.toLocaleString()} pts</p>
                <button
                  type="button"
                  className="prv-btn prv-btn--primary"
                  onClick={() => redeem(item.title, item.cost)}
                >
                  Redeem
                </button>
              </li>
            ))}
          </ul>
        </section>

        <section className="section prv-concierge">
            <div className="section-head">
              <h2>Concierge shortcuts</h2>
            </div>
            <ul className="prv-concierge__grid">
              {conciergeActions.map((action) => (
                <li key={action.id}>
                  <button
                    type="button"
                    className="section-card prv-concierge__btn"
                    onClick={() => notify(`${action.label} request queued.`, 'info')}
                  >
                    <img src={`/assets/${action.icon}`} alt="" width={22} height={22} />
                    <span>{action.label}</span>
                  </button>
                </li>
              ))}
            </ul>
        </section>

        <section className="section prv-activity">
          <div className="section-head">
            <h2>Privilege activity</h2>
          </div>
          <ul className="section-card prv-activity__list">
            {activityFeed.map((row) => (
              <li key={row.id} className="prv-activity__row">
                <div>
                  <p>{row.title}</p>
                  <span>{row.date}</span>
                </div>
                {row.delta && (
                  <strong
                    className={
                      row.delta.startsWith('+') && !row.delta.includes('$')
                        ? 'prv-activity__pos'
                        : row.delta.startsWith('-')
                          ? 'prv-activity__neg'
                          : ''
                    }
                  >
                    {row.delta}
                  </strong>
                )}
              </li>
            ))}
          </ul>
        </section>
      </div>
    </AppShell>
  );
}
