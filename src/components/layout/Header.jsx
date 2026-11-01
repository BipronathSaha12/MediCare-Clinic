import React from 'react';
import CrashTest from '../error/CrashTest';

/**
 * Header Component (Pin 1, Pin 2, Pin 3)
 * Full-width sticky navigation bar with brand mark, clinic title, dynamic status tag,
 * and the ErrorBoundary Crash Test trigger button.
 *
 * @param {Object} props
 * @param {number} props.pendingCount - Current count of pending appointments
 */
export default function Header({ pendingCount = 0 }) {
  return (
    <header className="app-header">
      <div className="header-container">
        {/* Pin 2: Brand Block */}
        <div className="brand-block">
          <div className="brand-logo" aria-hidden="true">
            M
          </div>
          <div className="brand-titles">
            <h1 className="brand-name">MediCare Clinic</h1>
            <span className="brand-subtitle">Front Desk Dashboard</span>

            {/* // [REQ-2d] IIFE (Immediately-Invoked Function Expression) inside JSX:
                Computes dynamic reception operational status directly within JSX markup */}
            {(() => {
              if (pendingCount === 0) {
                return (
                  <span className="brand-status-tag">
                    ● All Caught Up
                  </span>
                );
              }
              if (pendingCount > 5) {
                return (
                  <span
                    className="brand-status-tag"
                    style={{ color: 'var(--danger)', backgroundColor: 'var(--danger-soft)' }}
                  >
                    ● High Queue ({pendingCount} Pending)
                  </span>
                );
              }
              return (
                <span className="brand-status-tag">
                  ● Active ({pendingCount} Pending)
                </span>
              );
            })()}
          </div>
        </div>

        {/* Pin 3: Crash Test Trigger Button */}
        <div>
          <CrashTest label="Crash Test" />
        </div>
      </div>
    </header>
  );
}
