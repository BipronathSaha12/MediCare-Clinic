import React, { useState, useMemo } from 'react';
import Card from '../ui/Card';
import FilterableList from '../ui/FilterableList';
import AppointmentRow from './AppointmentRow';
import EmptyState from '../ui/EmptyState';

/**
 * AppointmentList Component (Pins 22-29)
 * Displays scheduled clinic appointments with live status chip counters,
 * status mutation dropdowns, and appointment deletion.
 *
 * @param {Object} props
 * @param {Array} props.appointments - Active appointments state
 * @param {Array} props.doctors - Doctors list for doctorId resolution
 * @param {Function} props.onStatusChange - Status change handler
 * @param {Function} props.onDeleteAppointment - Deletion handler
 */
export default function AppointmentList({
  appointments = [],
  doctors = [],
  onStatusChange,
  onDeleteAppointment
}) {
  const [selectedStatus, setSelectedStatus] = useState('All');

  // Fast doctor lookup map by ID
  const doctorsMap = useMemo(() => {
    const map = new Map();
    doctors.forEach((doc) => map.set(doc.id, doc));
    return map;
  }, [doctors]);

  // Compute live dynamic status counts for chips (Pin 22)
  const statusCounts = useMemo(() => {
    const counts = {
      All: appointments.length,
      Pending: 0,
      Confirmed: 0,
      Completed: 0,
      Cancelled: 0
    };

    appointments.forEach((apt) => {
      if (counts[apt.status] !== undefined) {
        counts[apt.status] += 1;
      }
    });

    return counts;
  }, [appointments]);

  // Filter and sort appointments (newest first by ID descending)
  const filteredAppointments = useMemo(() => {
    return appointments
      .filter((apt) => {
        if (selectedStatus === 'All') return true;
        return apt.status === selectedStatus;
      })
      .sort((a, b) => b.id - a.id);
  }, [appointments, selectedStatus]);

  // Status tabs configuration matching Pin 22
  const statusTabs = [
    { label: 'All', value: 'All' },
    { label: 'Pending', value: 'Pending' },
    { label: 'Confirmed', value: 'Confirmed' },
    { label: 'Completed', value: 'Completed' },
    { label: 'Cancelled', value: 'Cancelled' }
  ];

  return (
    // [REQ-5] Component composition using the children prop:
    // Wraps the appointment management module within the reusable Card
    <Card title="Appointments" count={appointments.length}>
      {/* Pin 22: Appointment Status Filter Chips with live calculated counts */}
      <div className="chip-group" role="tablist" aria-label="Appointment status filter">
        {/* // [REQ-1] Render a list using .map() with a correct, stable key */}
        {statusTabs.map((tab) => {
          const isActive = selectedStatus === tab.value;
          const count = statusCounts[tab.value] ?? 0;
          return (
            <button
              key={tab.value}
              type="button"
              role="tab"
              aria-selected={isActive}
              onClick={() => setSelectedStatus(tab.value)}
              className={`filter-chip ${isActive ? 'active' : ''}`}
            >
              <span>{tab.label}</span>
              <span className="chip-count-badge">{count}</span>
            </button>
          );
        })}
      </div>

      {/* Responsive table wrapper (Pin 23) */}
      <div className="table-responsive-wrapper">
        {/* // [REQ-2a] Ternary operator:
            Conditionally renders EmptyState when filtered appointments array is empty */}
        {filteredAppointments.length === 0 ? (
          <EmptyState
            icon="📋"
            title="No appointments yet"
            subtitle="No appointments found matching this status. Book the first one from the form."
          />
        ) : (
          <table className="appointments-table">
            <thead>
              {/* Pin 23: Header Columns */}
              <tr>
                <th>Patient</th>
                <th>Doctor</th>
                <th>Date & Time</th>
                <th>Status</th>
                <th style={{ textAlign: 'right' }}>Action</th>
              </tr>
            </thead>

            {/* // [REQ-6] Render prop:
                Reusing FilterableList with wrapper="tbody" and renderItem function prop */}
            <FilterableList
              items={filteredAppointments}
              wrapper="tbody"
              keyExtractor={(apt) => apt.id}
              renderItem={(apt) => (
                <AppointmentRow
                  appointment={apt}
                  doctor={doctorsMap.get(apt.doctorId)}
                  onStatusChange={onStatusChange}
                  onDeleteAppointment={onDeleteAppointment}
                />
              )}
            />
          </table>
        )}
      </div>
    </Card>
  );
}
