export default function ActivityList({ items, variant = 'invoices', className = '' }) {
  const withColumns = variant === 'transactions';

  return (
    <ul className={`activity-list activity-list--${variant} ${className}`.trim()}>
      {items.map((item) => (
        <li key={`${item.title}-${item.date}`} className="activity-list__row">
          <span
            className={`activity-list__icon${item.iconLarge ? ' activity-list__icon--lg' : ''}`}
            style={{ backgroundColor: item.iconBg }}
            aria-hidden
          >
            <img src={`/assets/${item.icon}`} alt="" />
          </span>
          <div className="activity-list__copy">
            <p className="activity-list__title">{item.title}</p>
            <p className="activity-list__meta">{item.date}</p>
          </div>
          {withColumns && (
            <>
              <p className="activity-list__col">{item.type}</p>
              <p className="activity-list__col">{item.card}</p>
              <p className="activity-list__col">{item.status}</p>
            </>
          )}
          <p
            className={`activity-list__amount${
              item.positive === undefined
                ? ''
                : item.positive
                  ? ' activity-list__amount--in'
                  : ' activity-list__amount--out'
            }`}
          >
            {item.amount}
          </p>
        </li>
      ))}
    </ul>
  );
}
