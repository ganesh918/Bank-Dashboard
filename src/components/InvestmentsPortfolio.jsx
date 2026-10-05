export default function InvestmentsPortfolio({ items }) {
  return (
    <section className="section investments-portfolio">
      <div className="section-head">
        <h2>My Investment</h2>
      </div>
      <ul className="investments-portfolio__list">
        {items.map((item) => (
          <li key={item.name} className="investments-portfolio__row">
            <span className="investments-portfolio__icon" style={{ backgroundColor: item.iconBg }} aria-hidden>
              <img src={`/assets/${item.icon}`} alt="" />
            </span>
            <div className="investments-portfolio__cell investments-portfolio__cell--name">
              <p className="investments-portfolio__title">{item.name}</p>
              <p className="investments-portfolio__meta">{item.category}</p>
            </div>
            <div className="investments-portfolio__cell investments-portfolio__cell--value">
              <p className="investments-portfolio__title">{item.value}</p>
              <p className="investments-portfolio__meta">Envestment Value</p>
            </div>
            <div className="investments-portfolio__cell investments-portfolio__cell--return">
              <p
                className={`investments-portfolio__title investments-portfolio__change investments-portfolio__change--${item.positive ? 'up' : 'down'}`}
              >
                {item.change}
              </p>
              <p className="investments-portfolio__meta">Return Value</p>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
