import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import './styles/fonts.css';
import './styles/tokens.css';
import './styles/dashboard.css';
import './styles/responsive-guard.css';
import './styles/transactions.css';
import './styles/accounts-investments.css';
import './styles/credit-cards.css';
import './styles/loans.css';
import './styles/services.css';
import './styles/settings.css';
import './styles/animations.css';
import './styles/mobile-original.css';
import './styles/auth.css';
import './styles/toast.css';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
