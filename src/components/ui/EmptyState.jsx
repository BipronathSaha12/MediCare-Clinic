import React from 'react';

/**
 * Reusable EmptyState Component
 * Displays a styled empty message when lists or search results yield no items.
 * @param {Object} props
 * @param {string} [props.icon='📋']
 * @param {string} [props.title='No items found']
 * @param {string} [props.subtitle='']
 */
export default function EmptyState({
  icon = '📋',
  title = 'No items found',
  subtitle = 'There are no records to display at this time.'
}) {
  return (
    <div className="empty-state-card">
      <div className="empty-state-icon" aria-hidden="true">
        {icon}
      </div>
      <h3 className="empty-state-title">{title}</h3>
      {subtitle && <p className="empty-state-subtitle">{subtitle}</p>}
    </div>
  );
}
