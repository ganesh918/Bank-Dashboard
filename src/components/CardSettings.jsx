import { cardSettings } from '../data/creditCards';

export default function CardSettings() {
  return (
    <section className="section cc-settings">
      <div className="section-head">
        <h2>Card Setting</h2>
      </div>
      <div className="section-card cc-settings__card">
        <ul className="cc-settings__list">
          {cardSettings.map((item) => (
            <li key={item.id}>
              <button type="button" className="cc-settings__item">
                <span className="cc-tile" style={{ backgroundColor: item.iconBg }} aria-hidden="true">
                  <img src={`/assets/${item.icon}`} alt="" />
                </span>
                <span className="cc-settings__copy">
                  <span className="cc-settings__title">{item.title}</span>
                  <span className="cc-settings__sub">{item.subtitle}</span>
                </span>
              </button>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
