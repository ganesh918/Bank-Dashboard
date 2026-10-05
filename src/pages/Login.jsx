import { useEffect, useState } from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import BrandWordmark from '../components/BrandWordmark';
import PasswordField from '../components/PasswordField';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';

export default function Login() {
  const { isAuthenticated, login } = useAuth();
  const { showToast } = useToast();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    document.title = 'Sign in — BankDash';
  }, []);

  if (isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitting(true);
    const result = login({ email, password });
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
        <h1 className="auth-card__title">Welcome back</h1>
        <p className="auth-card__subtitle">Sign in to continue to your BankDash account</p>

        <form className="auth-form" onSubmit={handleSubmit} noValidate>
          <div className="auth-field">
            <label className="auth-field__label" htmlFor="login-email">
              Email
            </label>
            <div className="auth-field__control">
              <input
                id="login-email"
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
            id="login-password"
            label="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
          />

          <button type="submit" className="auth-form__submit" disabled={submitting}>
            {submitting ? 'Signing in…' : 'Sign in'}
          </button>
        </form>

        <p className="auth-card__switch">
          Don&apos;t have an account? <Link to="/signup">Create one</Link>
        </p>
      </div>
    </div>
  );
}
