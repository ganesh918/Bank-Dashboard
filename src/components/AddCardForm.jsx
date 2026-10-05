const FIELDS = [
  { id: 'cc-type', label: 'Card Type', placeholder: 'Classic' },
  { id: 'cc-name', label: 'Name On Card', placeholder: 'My Cards' },
  { id: 'cc-number', label: 'Card Number', placeholder: '**** **** **** ****', inputMode: 'numeric' },
  { id: 'cc-expiry', label: 'Expiration Date', placeholder: '25 January 2025', chevron: true },
];

export default function AddCardForm() {
  return (
    <section className="section cc-add">
      <div className="section-head">
        <h2>Add New Card</h2>
      </div>
      <form className="section-card cc-add__card" onSubmit={(e) => e.preventDefault()}>
        <p className="cc-add__intro">
          Credit Card generally means a plastic card issued by Scheduled Commercial Banks assigned to a
          Cardholder, with a credit limit, that can be used to purchase goods and services on credit or
          obtain cash advances.
        </p>
        <div className="cc-add__fields">
          {FIELDS.map((f) => (
            <label key={f.id} className="cc-add__field" htmlFor={f.id}>
              <span className="cc-add__label">{f.label}</span>
              <span className={`cc-add__control${f.chevron ? ' cc-add__control--chevron' : ''}`}>
                <input id={f.id} type="text" placeholder={f.placeholder} inputMode={f.inputMode} />
                {f.chevron && (
                  <svg className="cc-add__chevron" viewBox="0 0 12 7" aria-hidden="true">
                    <path d="M1 1l5 5 5-5" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                )}
              </span>
            </label>
          ))}
        </div>
        <button type="submit" className="cc-add__submit">
          Add Card
        </button>
      </form>
    </section>
  );
}
