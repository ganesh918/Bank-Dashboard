import { useState } from 'react';

function EyeIcon({ open }) {
  if (open) {
    return (
      <svg viewBox="0 0 24 24" width={20} height={20} aria-hidden>
        <path
          fill="currentColor"
          d="M12 5C7 5 2.73 8.11 1 12c1.73 3.89 6 7 11 7s9.27-3.11 11-7c-1.73-3.89-6-7-11-7zm0 12a5 5 0 110-10 5 5 0 010 10zm0-8a3 3 0 100 6 3 3 0 000-6z"
        />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 24 24" width={20} height={20} aria-hidden>
      <path
        fill="currentColor"
        d="M12 6a9.77 9.77 0 018.82 5.5 9.647 9.647 0 01-2.41 3.12l1.41 1.41A11.48 11.48 0 0023 11.5 11.72 11.72 0 0012 4a11.48 11.48 0 00-8.82 5.5l1.41 1.41A9.77 9.77 0 0112 6zM1 3.27l2.28 2.28A11.72 11.72 0 001 11.5C2.73 15.39 7 18.5 12 18.5c1.55 0 3.03-.3 4.38-.84l2.58 2.58L21 20.73 3.27 3 1 3.27zM12 16.5a5 5 0 01-3.54-1.46l7.08-7.08A5 5 0 0112 16.5z"
      />
    </svg>
  );
}

export default function PasswordField({
  id,
  label,
  value,
  onChange,
  placeholder = 'Enter password',
  autoComplete = 'current-password',
  required = true,
}) {
  const [visible, setVisible] = useState(false);

  return (
    <div className="auth-field">
      <label className="auth-field__label" htmlFor={id}>
        {label}
      </label>
      <div className="auth-field__control auth-field__control--password">
        <input
          id={id}
          className="auth-field__input"
          type={visible ? 'text' : 'password'}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          autoComplete={autoComplete}
          required={required}
        />
        <button
          type="button"
          className="auth-field__eye"
          onClick={() => setVisible((v) => !v)}
          aria-label={visible ? 'Hide password' : 'Show password'}
          aria-pressed={visible}
        >
          <EyeIcon open={visible} />
        </button>
      </div>
    </div>
  );
}
