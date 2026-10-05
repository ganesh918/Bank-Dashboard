import AppShell from '../layout/AppShell';
import { bankServices, serviceHighlights } from '../data/services';

export default function Services() {
  return (
    <AppShell pageTitle="Services" mainClassName="dashboard-main svc-main">
      <div className="svc-grid">
        <section className="svc-stats" aria-label="Featured services">
          {serviceHighlights.map((item) => (
            <article key={item.id} className="svc-stat">
              <span className="svc-stat__icon" style={{ backgroundColor: item.iconBg }}>
                <img src={item.iconSrc} alt="" width={30} height={30} />
              </span>
              <div className="svc-stat__copy">
                <h3 className="svc-stat__title">{item.title}</h3>
                <p className="svc-stat__subtitle">{item.subtitle}</p>
              </div>
            </article>
          ))}
        </section>

        <section className="section svc-list">
          <div className="section-head">
            <h2>Bank Services List</h2>
          </div>
          <ul className="svc-list__rows">
            {bankServices.map((service) => (
              <li key={service.id} className="svc-row">
                <span className="svc-row__icon" style={{ backgroundColor: service.iconBg }}>
                  <img src={service.iconSrc} alt="" width={25} height={25} />
                </span>
                <div className="svc-row__info">
                  <p className="svc-row__title">{service.title}</p>
                  <p className="svc-row__subtitle">{service.subtitle}</p>
                </div>
                {service.details.map((detail, i) => (
                  <div key={i} className="svc-row__detail">
                    <p className="svc-row__title">{detail.title}</p>
                    <p className="svc-row__subtitle">{detail.subtitle}</p>
                  </div>
                ))}
                <button type="button" className={`svc-row__btn${service.active ? ' is-active' : ''}`}>
                  View Details
                </button>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </AppShell>
  );
}
