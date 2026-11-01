import React from 'react';
import FilterableList from '../ui/FilterableList';
import DoctorCard from './DoctorCard';
import EmptyState from '../ui/EmptyState';

/**
 * DoctorList Component
 * Displays the list of doctors utilizing the FilterableList render-prop component.
 *
 * @param {Object} props
 * @param {Array} props.doctors - Filtered doctors array
 * @param {number|null} props.selectedDoctorId
 * @param {Function} props.onSelectDoctor
 */
export default function DoctorList({
  doctors = [],
  selectedDoctorId,
  onSelectDoctor
}) {
  return (
    <div className="doctor-scroll-list">
      {/* // [REQ-6] Render prop:
          FilterableList accepts a `renderItem` function that transforms each doctor
          record into a DoctorCard component, achieving full separation of data from UI. */}
      <FilterableList
        items={doctors}
        keyExtractor={(doc) => doc.id}
        emptyState={
          <EmptyState
            icon="🩺"
            title="No doctors found"
            subtitle="No doctors match your active search query or department filter."
          />
        }
        renderItem={(doctor) => (
          <DoctorCard
            doctor={doctor}
            isSelected={selectedDoctorId === doctor.id}
            onSelectDoctor={onSelectDoctor}
          />
        )}
      />
    </div>
  );
}

