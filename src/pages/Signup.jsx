import { useEffect, useState } from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import BrandWordmark from '../components/BrandWordmark';
import PasswordField from '../components/PasswordField';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';

export default function Signup() {
  const { isAuthenticated, signup } = useAuth();
  const { showToast } = useToast();
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    document.title = 'Sign up — BankDash';
  }, []);

  if (isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      showToast('error', 'Passwords do not match.');
      return;
    }

    setSubmitting(true);
    const result = signup({ name, email, password });
    setSubmitting(false);

    if (result.ok) {
      showToast('success', result.message);
      navigate('/', { replace: true });
    } else {
      showToast('error', result.message);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-page__glow auth-page__glow--a" aria-hidden />
      <div className="auth-page__glow auth-page__glow--b" aria-hidden />
      <div className="auth-card">
        <div className="auth-card__brand">
          <BrandWordmark />
        </div>
        <h1 className="auth-card__title">Create account</h1>
        <p className="auth-card__subtitle">Sign up to start using BankDash</p>

        <form className="auth-form" onSubmit={handleSubmit} noValidate>
          <div className="auth-field">
            <label className="auth-field__label" htmlFor="signup-name">
              Full name
            </label>
            <div className="auth-field__control">
              <input
                id="signup-name"
                className="auth-field__input"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Your name"
                autoComplete="name"
                required
              />
            </div>
          </div>

          <div className="auth-field">
            <label className="auth-field__label" htmlFor="signup-email">
              Email
            </label>
            <div className="auth-field__control">
              <input
                id="signup-email"
                className="auth-field__input"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@bankdash.com"
                autoComplete="email"
                required
              />
            </div>
          </div>

          <PasswordField
            id="signup-password"
            label="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="At least 8 characters"
            autoComplete="new-password"
          />

          <PasswordField
            id="signup-confirm-password"
            label="Confirm password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Re-enter password"
            autoComplete="new-password"
          />

          <button type="submit" className="auth-form__submit" disabled={submitting}>
            {submitting ? 'Creating account…' : 'Sign up'}
          </button>
        </form>

        <p className="auth-card__switch">
          Already have an account? <Link to="/login">Sign in</Link>
        </p>
      </div>
    </div>
  );
}
