import React from 'react';
import Badge from '../ui/Badge';
import { formatDate, formatTime } from '../../utils/format';

/**
 * AppointmentRow Component (Pins 23-29)
 * Renders a single tabular record representing a scheduled patient consultation.
 *
 * @param {Object} props
 * @param {Object} props.appointment
 * @param {Object} props.doctor
 * @param {Function} props.onStatusChange
 * @param {Function} props.onDeleteAppointment
 */
export default function AppointmentRow({
  appointment,
  doctor,
  onStatusChange,
  onDeleteAppointment
}) {
  // Handle status update from row dropdown (Pin 28)
  const handleStatusSelect = (e) => {
    const newStatus = e.target.value;
    if (typeof onStatusChange === 'function') {
      onStatusChange(appointment.id, newStatus);
    }
  };

  // // [REQ-10] Click event handling:
  // Prompt user for explicit confirmation before removing appointment record
  const handleDelete = () => {
    const confirmed = window.confirm(
      `Are you sure you want to delete the appointment for "${appointment.patientName}"?`
    );
    if (confirmed && typeof onDeleteAppointment === 'function') {
      onDeleteAppointment(appointment.id);
    }
  };

  const doctorName = doctor ? doctor.name : `Doctor #${appointment.doctorId}`;
  const doctorDept = doctor ? doctor.department : 'General';

  return (
    <tr>
      {/* Patient Cell */}
      <td>
        <div className="patient-cell-name">{appointment.patientName}</div>
        <div className="patient-cell-phone">{appointment.phone}</div>
        {appointment.note && (
          <div style={{ fontSize: 11, color: 'var(--text-muted)', marginTop: 2, fontStyle: 'italic' }}>
            Note: {appointment.note}
          </div>
        )}
      </td>

      {/* Doctor Cell */}
      <td>
        <div className="doctor-cell-name">{doctorName}</div>
        <div className="doctor-cell-dept">{doctorDept}</div>
      </td>

      {/* Date & Time Cell */}
      <td>
        <div className="datetime-cell-date">{formatDate(appointment.date)}</div>
        <div className="datetime-cell-time">{formatTime(appointment.time)}</div>
      </td>

      {/* Status Cell (Pins 24-27 & Pin 28) */}
      <td>
        <div className="status-cell-wrapper">
          {/* Badge uses switch statement internally via [REQ-2c] */}
          <Badge status={appointment.status} />

          {/* Pin 28: Per-Row Status Dropdown */}
          <select
            value={appointment.status}
            onChange={handleStatusSelect}
            className="status-row-select"
            aria-label={`Update status for ${appointment.patientName}`}
          >
            <option value="Pending">Pending</option>
            <option value="Confirmed">Confirmed</option>
            <option value="Completed">Completed</option>
            <option value="Cancelled">Cancelled</option>
          </select>
        </div>
      </td>

      {/* Action Cell (Pin 29) */}
      <td style={{ textAlign: 'right' }}>
        {/* // [REQ-10] Delete button triggering window.confirm */}
        <button
          type="button"
          onClick={handleDelete}
          className="btn-delete-row"
          title={`Delete appointment for ${appointment.patientName}`}
        >
          Delete
        </button>
      </td>
    </tr>
  );
}

