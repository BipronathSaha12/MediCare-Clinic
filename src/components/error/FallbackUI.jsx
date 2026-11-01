import React from 'react';

/**
 * FallbackUI Component
 * Displayed by ErrorBoundary whenever an unhandled rendering error occurs.
 * Matches Image 04 specifications:
 * - Friendly warning title
 * - Contextual message informing that the rest of the page is working
 * - Collapsible <details> block containing error.message and stack
 * - "Try Again" recovery button
 */
export default function FallbackUI({ error, onReset, componentName = 'section' }) {
  return (
    <div className="fallback-container" role="alert">
      <div className="fallback-header">
        <span style={{ fontSize: '20px' }}>⚠️</span>
        <h3 className="fallback-title">Something went wrong in this {componentName}</h3>
      </div>
      <p className="fallback-message">
        This section could not be displayed. The rest of the page is still working.
      </p>

      {error && (
        <details className="fallback-details">
          <summary>Show error details</summary>
          <div className="fallback-error-text">
            <strong>{error.name || 'Error'}:</strong> {error.message || 'An unexpected error occurred.'}
            {error.stack && (
              <pre style={{ marginTop: 8, fontSize: 11, opacity: 0.85, whiteSpace: 'pre-wrap' }}>
                {error.stack}
              </pre>
            )}
          </div>
        </details>
      )}

      {onReset && (
        <button type="button" onClick={onReset} className="btn-try-again">
          ↻ Try Again
        </button>
      )}
    </div>
  );
}
