function CreditCard({ variant }) {
  const isPrimary = variant === 'primary';
  return (
    <article className={`credit-card ${isPrimary ? 'credit-card--primary' : 'credit-card--secondary'}`}>
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

export default function AccountsMyCard() {
  return (
    <section className="section accounts-card">
      <div className="section-head">
        <h2>My Card</h2>
        <button type="button" className="link-btn">
          See All
        </button>
      </div>
      <CreditCard variant="primary" />
    </section>
  );
}
