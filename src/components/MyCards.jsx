/* variant: 'primary' | 'deep' (darker gradient, same white-on-colour styling) | 'secondary' */
export function CreditCard({ variant }) {
  const isPrimary = variant !== 'secondary';
  const tone = isPrimary ? `credit-card--primary${variant === 'deep' ? ' credit-card--deep' : ''}` : 'credit-card--secondary';
  return (
    <article className={`credit-card ${tone}`}>
      <div className="credit-card__top">
        <div>
          <p className="credit-card__label credit-card__label--balance">Balance</p>
          <p className="credit-card__balance">$5,756</p>
        </div>
        <img
          src={isPrimary ? '/assets/chip-card.png' : '/assets/chip-card-dark.png'}
          alt=""
          className="credit-card__chip"
          width={35}
          height={35}
        />
      </div>
      <div className="credit-card__meta">
        <div>
          <p className="credit-card__label">CARD HOLDER</p>
          <p className="credit-card__value">Eddy Cusuma</p>
        </div>
        <div>
          <p className="credit-card__label">VALID THRU</p>
          <p className="credit-card__value">12/22</p>
        </div>
      </div>
      <div className="credit-card__footer">
        <p className="credit-card__number">3778 **** **** 1234</p>
        <div className="credit-card__brand" aria-hidden="true">
          <span />
          <span />
        </div>
      </div>
    </article>
  );
}

export default function MyCards({ variant = 'dashboard' }) {
  const isTransactions = variant === 'transactions';

  return (
    <section className={`section my-cards${isTransactions ? ' my-cards--transactions' : ''}`}>
      <div className="section-head">
        <h2>My Cards</h2>
        <button type="button" className="link-btn">
          {isTransactions ? '+ Add Card' : 'See All'}
        </button>
      </div>
      <div className="my-cards__row">
        <CreditCard variant="primary" />
        <CreditCard variant="secondary" />
      </div>
    </section>
  );
}
