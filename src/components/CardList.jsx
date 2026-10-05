import { cardList } from '../data/creditCards';

export default function CardList() {
  return (
    <section className="section cc-list">
      <div className="section-head">
        <h2>Card List</h2>
      </div>
      <ul className="cc-list__rows">
        {cardList.map((card) => (
          <li key={card.id} className="cc-list__row">
            <span className="cc-tile" style={{ backgroundColor: card.iconBg }} aria-hidden="true">
              <img src={`/assets/${card.icon}`} alt="" />
            </span>
            <div className="cc-list__cell">
              <p className="cc-list__title">Card Type</p>
              <p className="cc-list__value">{card.type}</p>
            </div>
            <div className="cc-list__cell">
              <p className="cc-list__title">Bank</p>
              <p className="cc-list__value">{card.bank}</p>
            </div>
            <div className="cc-list__cell cc-list__cell--extra">
              <p className="cc-list__title">Card Number</p>
              <p className="cc-list__value">{card.number}</p>
            </div>
            <div className="cc-list__cell cc-list__cell--extra">
              <p className="cc-list__title">Namain Card</p>
              <p className="cc-list__value">{card.holder}</p>
            </div>
            <button type="button" className="cc-list__details">
              View Details
            </button>
          </li>
        ))}
      </ul>
    </section>
  );
}
