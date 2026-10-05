import { useState } from 'react';
import AppShell from '../layout/AppShell';
import {
  notificationToggles,
  passwordFields,
  preferenceFields,
  profileFields,
  securityToggles,
  settingsTabs,
} from '../data/settings';

function Field({ id, label, value, type = 'text', select }) {
  const inputId = `set-${id}`;
  return (
    <div className="set-field">
      <label className="set-field__label" htmlFor={inputId}>
        {label}
      </label>
      <div className="set-field__control">
        <input id={inputId} className="set-field__input" type={type} defaultValue={value} />
        {select && (
          <svg className="set-field__chevron" viewBox="0 0 12 6" aria-hidden>
            <path d="M1 1l5 4 5-4" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        )}
      </div>
    </div>
  );
}

function Toggles({ items }) {
  const [state, setState] = useState(() => Object.fromEntries(items.map((t) => [t.id, t.on])));
  return (
    <ul className="set-toggles">
      {items.map((item) => (
        <li key={item.id} className="set-toggle">
          <button
            type="button"
            role="switch"
            aria-checked={state[item.id]}
            aria-label={item.label}
            className={`set-switch${state[item.id] ? ' is-on' : ''}`}
            onClick={() => setState((s) => ({ ...s, [item.id]: !s[item.id] }))}
          >
            <span className="set-switch__knob" />
          </button>
          <span className="set-toggle__label">{item.label}</span>
        </li>
      ))}
    </ul>
  );
}

export default function Settings() {
  const [tab, setTab] = useState('profile');

  return (
    <AppShell pageTitle="Setting" mainClassName="dashboard-main set-main">
      <section className="set-card">
        <div className="set-tabs" role="tablist" aria-label="Settings sections">
          {settingsTabs.map((t) => (
            <button
              key={t.id}
              type="button"
              role="tab"
              aria-selected={tab === t.id}
              className={`set-tab set-tab--${t.id}${tab === t.id ? ' is-active' : ''}`}
              onClick={() => setTab(t.id)}
            >
              <span className="set-tab__full">{t.label}</span>
              <span className="set-tab__short">{t.shortLabel}</span>
            </button>
          ))}
        </div>

        <div className={`set-panel set-panel--${tab}`} role="tabpanel">
          {tab === 'profile' && (
            <div className="set-profile">
              <div className="set-avatar">
                <img
                  className="set-avatar__img"
                  src="/assets/pexels-christina-morillo-1181690-1.png"
                  alt="Charlene Reed"
                />
                <button type="button" className="set-avatar__edit" aria-label="Change profile photo">
                  <img src="/assets/settings-pencil.svg" alt="" />
                </button>
              </div>
              <div className="set-fields set-fields--profile">
                {profileFields.map((f) => (
                  <Field key={f.id} {...f} />
                ))}
              </div>
            </div>
          )}

          {tab === 'preferences' && (
            <>
              <div className="set-fields set-fields--prefs">
                {preferenceFields.map((f) => (
                  <Field key={f.id} {...f} />
                ))}
              </div>
              <h3 className="set-heading set-heading--notify">Notification</h3>
              <Toggles items={notificationToggles} />
            </>
          )}

          {tab === 'security' && (
            <>
              <h3 className="set-heading">Two-factor Authentication</h3>
              <Toggles items={securityToggles} />
              <h3 className="set-heading set-heading--password">Change Password</h3>
              <div className="set-fields set-fields--security">
                {passwordFields.map((f) => (
                  <Field key={f.id} {...f} />
                ))}
              </div>
            </>
          )}

          <div className="set-actions">
            <button type="button" className="set-save">
              Save
            </button>
          </div>
        </div>
      </section>
    </AppShell>
  );
}
