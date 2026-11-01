import React from 'react';

// [REQ-2c] Switch statement: Inside Badge.jsx (or helper called by Badge.jsx),
// use a switch (status) statement to return the exact badge color tokens
// for 'Pending', 'Confirmed', 'Completed', and 'Cancelled'.
export const getBadgeStyle = (status) => {
  switch (status) {
    case 'Pending':
      return {
        className: 'badge badge-pending',
        dotColor: '#B45309',
        label: 'Pending'
      };
    case 'Confirmed':
      return {
        className: 'badge badge-confirmed',
        dotColor: '#1D4ED8',
        label: 'Confirmed'
      };
    case 'Completed':
      return {
        className: 'badge badge-completed',
        dotColor: '#15803D',
        label: 'Completed'
      };
    case 'Cancelled':
      return {
        className: 'badge badge-cancelled',
        dotColor: '#B91C1C',
        label: 'Cancelled'
      };
    default:
      return {
        className: 'badge',
        dotColor: '#64748B',
        label: status || 'Unknown'
      };
  }
};

/**
 * Reusable Badge Component
 * @param {Object} props
 * @param {string} props.status - 'Pending' | 'Confirmed' | 'Completed' | 'Cancelled'
 * @param {string} [props.children] - Optional override label
 */
export default function Badge({ status, children }) {
  // Compute style mapping using the switch statement
  const badgeConfig = getBadgeStyle(status);

  return (
    <span className={badgeConfig.className}>
      <span
        style={{
          width: 6,
          height: 6,
          borderRadius: '50%',
          backgroundColor: badgeConfig.dotColor,
          display: 'inline-block'
        }}
      />
      {children || badgeConfig.label}
    </span>
  );
}
