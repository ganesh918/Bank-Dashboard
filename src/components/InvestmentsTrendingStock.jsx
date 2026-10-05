import { investmentsTrending } from '../data/investments';

export default function InvestmentsTrendingStock() {
  return (
    <section className="section investments-trending">
      <div className="section-head">
        <h2>Trending Stock</h2>
      </div>
      <div className="section-card investments-trending__card">
        <div className="investments-trending__head">
          <span>SL No</span>
          <span>Name</span>
          <span>Price</span>
          <span>Return</span>
        </div>
        <ul className="investments-trending__list">
          {investmentsTrending.map((row) => (
            <li key={row.sl} className="investments-trending__row">
              <span>{row.sl}</span>
              <span>{row.name}</span>
              <span>{row.price}</span>
              <span className={row.positive ? 'is-up' : 'is-down'}>{row.change}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
