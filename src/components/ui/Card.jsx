import React from 'react';

// [REQ-5] Component composition using the children prop:
// A reusable Card container that nests panel content seamlessly via props.children
// while standardizing header title, counter pill (Pin 16), and optional action slots.
export default function Card({ title, count, action, className = '', children }) {
  return (
    <section className={`ui-card ${className}`.trim()}>
      {(title || count !== undefined || action) && (
        <header className="ui-card-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            {title && <h2 className="ui-card-title">{title}</h2>}
            {count !== undefined && count !== null && (
              <span className="ui-count-pill">
                {count}
              </span>
            )}
          </div>
          {action && <div className="ui-card-action">{action}</div>}
        </header>
      )}
      <div className="ui-card-body">
        {children}
      </div>
    </section>
  );
}
