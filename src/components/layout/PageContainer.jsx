import React from 'react';

/**
 * PageContainer Component
 * Constrains the main dashboard content to max-width 1200px centered with responsive padding.
 * @param {Object} props
 * @param {React.ReactNode} props.children
 */
export default function PageContainer({ children }) {
  return (
    <main className="page-container">
      {children}
    </main>
  );
}

