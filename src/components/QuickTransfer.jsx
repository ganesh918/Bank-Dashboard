import { quickTransferContacts } from '../data/dashboard';

export default function QuickTransfer() {
  return (
    <section className="section quick-transfer">
      <div className="section-head">
        <h2>Quick Transfer</h2>
      </div>
      <div className="section-card section-card--transfer">
        <div className="transfer-contacts">
          {quickTransferContacts.map((person) => (
            <div
              key={person.name}
              className="transfer-contact"
              data-contact={person.name.replace(/\s+/g, '-').toLowerCase()}
            >
              <div className="transfer-avatar">
                <img
                  src={`/assets/${person.photo}`}
                  alt={person.name}
                  style={person.photoPosition ? { objectPosition: person.photoPosition } : undefined}
                />
              </div>
              <div className="transfer-labels">
                <p className="transfer-name">{person.name}</p>
                <p className="transfer-role">{person.role}</p>
              </div>
            </div>
          ))}
          <button type="button" className="transfer-next" aria-label="Next contacts">
            <img src="/assets/transfer-chevron.svg" alt="" width={7} height={13} />
          </button>
        </div>
        <div className="transfer-form">
          <span className="transfer-form-label">Write Amount</span>
          <div className="amount-composite">
            <input type="text" defaultValue="525.50" readOnly aria-label="Amount" />
            <button type="button" className="send-btn">
              <span>Send</span>
              <img src="/assets/send-plane.svg" alt="" width={16} height={14} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
