import React, { useState, useMemo } from 'react';
import Card from '../ui/Card';
import DoctorFilter from './DoctorFilter';
import DoctorList from './DoctorList';

/*
  // [REQ-9] Prop drilling problem + your solution:
  -----------------------------------------------------------------------------
  PROBLEM:
  In traditional React component trees, passing state and callbacks such as:
    App -> DoctorPanel -> DoctorList -> DoctorCard
  forces `DoctorPanel` and `DoctorList` to serve as passive relays ("prop drilling").
  Neither DoctorPanel nor DoctorList consumes `selectedDoctorId` or `onSelectDoctor`
  for its own internal logic—they merely pass them down.

  SOLUTION:
  1. Component Composition (children): The outer panel is composed with a reusable
     <Card title="Our Doctors" count={...}> container.
  2. Render Prop Pattern (renderItem): In DoctorList, FilterableList is used with
     a render prop (`renderItem={(doctor) => <DoctorCard ... />}`). This decouples
     rendering mechanics and lets item components receive direct bindings.
  3. Alternative (React Context): For enterprise scale with deep sub-trees, a
     ClinicContext could provide selectedDoctorId and dispatch actions globally,
     avoiding props altogether (detailed in README.md).
  -----------------------------------------------------------------------------
*/

/**
 * DoctorPanel Component
 * Coordinates doctor search filtering, department tabs, and rendering within Card.
 *
 * @param {Object} props
 * @param {Array} props.doctors - All doctors seed list
 * @param {number|null} props.selectedDoctorId - Lifted state from App.jsx
 * @param {Function} props.onSelectDoctor - Lifted callback from App.jsx
 */
export default function DoctorPanel({
  doctors = [],
  selectedDoctorId,
  onSelectDoctor
}) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDept, setSelectedDept] = useState('All');

  // Derive unique department list dynamically from doctors data
  const departments = useMemo(() => {
    const depts = Array.from(new Set(doctors.map((d) => d.department)));
    return ['All', ...depts];
  }, [doctors]);

  // Combined filtering: search by doctor name (case-insensitive) + department
  const filteredDoctors = useMemo(() => {
    return doctors.filter((doctor) => {
      const matchesSearch = doctor.name
        .toLowerCase()
        .includes(searchQuery.trim().toLowerCase());
      const matchesDept =
        selectedDept === 'All' || doctor.department === selectedDept;
      return matchesSearch && matchesDept;
    });
  }, [doctors, searchQuery, selectedDept]);

  return (
    // [REQ-5] Component composition using the children prop:
    // Wraps the entire doctor section in the reusable Card component
    <Card title="Our Doctors" count={doctors.length}>
      <DoctorFilter
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        departments={departments}
        selectedDept={selectedDept}
        onSelectDept={setSelectedDept}
      />

      <DoctorList
        doctors={filteredDoctors}
        selectedDoctorId={selectedDoctorId}
        onSelectDoctor={onSelectDoctor}
      />
    </Card>
  );
}

