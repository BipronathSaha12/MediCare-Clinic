import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import ErrorBoundary from './components/error/ErrorBoundary';
import { logError } from './utils/logger';
import './index.css';

// [REQ-12] Global error handling + logger:
// Catch unhandled runtime JavaScript errors that occur outside the React component tree
window.onerror = (message, source, lineno, colno, error) => {
  logError('Global:window.onerror', error || message, {
    source,
    lineno,
    colno
  });
  // Return false so default browser logging continues
  return false;
};

// Catch unhandled asynchronous promise rejections (e.g., failed async timers or network tasks)
window.addEventListener('unhandledrejection', (event) => {
  logError('Global:unhandledrejection', event.reason || 'Unhandled Promise Rejection');
});

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* // [REQ-11] Top-level ErrorBoundary:
        Protects the entire dashboard against uncaught rendering exceptions */}
    <ErrorBoundary name="Application Root">
      <App />
    </ErrorBoundary>
  </React.StrictMode>
);
