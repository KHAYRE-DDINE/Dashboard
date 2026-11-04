import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { AuthProvider } from './Components/authentication/AuthContext';
import { BrowserRouter } from 'react-router-dom';

// Suppress the benign ResizeObserver loop error (charts, calendars, animated elements)
const suppressResizeObserver = () => {
  const handler = (e) => {
    const msg = e?.message || e?.error?.message;
    if (
      typeof msg === 'string' &&
      (msg.includes('ResizeObserver') || msg.includes('undelivered notifications'))
    ) {
      e.stopImmediatePropagation?.();
      e.preventDefault?.();
      return true;
    }
  };

  window.addEventListener('error', handler, true);
  window.addEventListener('unhandledrejection', (e) => {
    const msg = e?.reason?.message || (typeof e?.reason === 'string' ? e.reason : '');
    if (typeof msg === 'string' && (msg.includes('ResizeObserver') || msg.includes('undelivered notifications'))) {
      e.stopImmediatePropagation?.();
      e.preventDefault?.();
    }
  }, true);

  const origOnError = window.onerror;
  window.onerror = (msg, url, lineNo, columnNo, error) => {
    if (typeof msg === 'string' && (msg.includes('ResizeObserver') || msg.includes('undelivered notifications'))) {
      return true;
    }
    if (origOnError) return origOnError(msg, url, lineNo, columnNo, error);
  };
};

suppressResizeObserver();

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <App />
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);
