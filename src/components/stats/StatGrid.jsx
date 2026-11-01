import React from 'react';
import StatCard from './StatCard';

/**
 * StatGrid Component (Pin 4)
 * Displays the 4 primary KPI cards in a responsive CSS Grid.
 * All metrics are derived from active React state in App.jsx.
 *
 * @param {Object} props
 * @param {number} props.totalDoctors
 * @param {number} props.totalAppointments
 * @param {number} props.pendingCount
 * @param {number} props.completedCount
 */
export default function StatGrid({
  totalDoctors = 0,
  totalAppointments = 0,
  pendingCount = 0,
  completedCount = 0
}) {
  return (
    <section className="stat-grid" aria-label="Clinic Overview Statistics">
      <StatCard
        label="Total Doctors"
        value={totalDoctors}
        icon="🩺"
      />
      <StatCard
        label="Total Appointments"
        value={totalAppointments}
        icon="📅"
      />
      <StatCard
        label="Pending Appointments"
        value={pendingCount}
        icon="⏳"
      />
      <StatCard
        label="Completed Appointments"
        value={completedCount}
        icon="✅"
      />
    </section>
  );
}

