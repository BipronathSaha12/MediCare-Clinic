import React from 'react';
import { formatStatNumber } from '../../utils/format';

/**
 * StatCard Component (Pins 5, 6, 7)
 * Renders an individual KPI card with icon tile, uppercase label, and formatted 2-digit value.
 *
 * @param {Object} props
 * @param {string} props.label - Metric label (e.g., 'Total Doctors')
 * @param {number} props.value - Metric numeric value
 * @param {string} props.icon - Emoji or icon string (e.g., '🩺', '📅')
 */
export default function StatCard({ label, value, icon }) {
  return (
    <div className="stat-card">
      {/* Pin 7: Stat Icon Tile */}
      <div className="stat-icon-tile" aria-hidden="true">
        {icon}
      </div>

      {/* Pin 6: Stat Label & Value */}
      <span className="stat-label">{label}</span>
      <span className="stat-value">{formatStatNumber(value)}</span>
    </div>
  );
}
