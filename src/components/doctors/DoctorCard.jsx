import React from 'react';
import { formatCurrency, getInitials } from '../../utils/format';

/**
 * DoctorCard Component (Pins 12, 13, 14, 15)
 * Displays physician information, availability badge, visiting fee, and selection toggle.
 *
 * @param {Object} props
 * @param {Object} props.doctor
 * @param {boolean} props.isSelected
 * @param {Function} props.onSelectDoctor
 */
export default function DoctorCard({ doctor, isSelected, onSelectDoctor }) {
  // // [REQ-10] Click event handling:
  // Handles doctor selection, respecting the doctor's availability constraint
  const handleSelect = (e) => {
    e.stopPropagation();
    if (doctor.available && typeof onSelectDoctor === 'function') {
      onSelectDoctor(doctor);
    }
  };

  const cardClasses = [
    'doctor-card',
    isSelected ? 'selected' : '',
    !doctor.available ? 'is-unavailable' : ''
  ].filter(Boolean).join(' ');

  const initials = getInitials(doctor.name);

  return (
    <article
      className={cardClasses}
      onClick={handleSelect}
      role="button"
      tabIndex={doctor.available ? 0 : -1}
      aria-pressed={isSelected}
      style={{ cursor: doctor.available ? 'pointer' : 'default' }}
    >
      <div className="doctor-card-main">
        {/* Pin 14: Doctor Avatar Tile */}
        <div className="doctor-avatar" aria-hidden="true">
          {initials}
        </div>

        <div className="doctor-info">
          <h3 className="doctor-name">{doctor.name}</h3>

          <div className="doctor-specialization">
            <span>{doctor.specialization}</span>

            {/* // [REQ-2] [REQ-2b] Logical && operator:
                Conditionally renders the "Not available" badge if the doctor's available flag is false */}
            {!doctor.available && (
              <span className="badge-unavailable">
                Not available
              </span>
            )}
          </div>

          <div className="doctor-meta-row">
            <span className="doctor-fee">{formatCurrency(doctor.visitingFee)}</span>
            <span className="doctor-dept-pill">{doctor.department}</span>
          </div>
        </div>
      </div>

      <div>
        <button
          type="button"
          disabled={!doctor.available}
          onClick={handleSelect}
          className={`btn-doctor-select ${isSelected ? 'is-selected' : ''}`}
        >
          {/* // [REQ-2] [REQ-2a] Ternary operator:
              Renders "Selected" when this doctor is active in state, otherwise "Select" */}
          {isSelected ? 'Selected' : 'Select'}
        </button>
      </div>
    </article>
  );
}
