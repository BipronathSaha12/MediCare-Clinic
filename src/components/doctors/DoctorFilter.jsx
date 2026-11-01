import React from 'react';

/**
 * DoctorFilter Component (Pins 9, 10, 11)
 * Houses doctor name search input and dynamically generated department filter chips.
 *
 * @param {Object} props
 * @param {string} props.searchQuery
 * @param {Function} props.onSearchChange
 * @param {string[]} props.departments - Dynamic list of departments
 * @param {string} props.selectedDept
 * @param {Function} props.onSelectDept
 */
export default function DoctorFilter({
  searchQuery,
  onSearchChange,
  departments = [],
  selectedDept = 'All',
  onSelectDept
}) {
  const handleSearchInput = (e) => {
    onSearchChange(e.target.value);
  };

  return (
    <div className="doctor-filter-container">
      {/* Pin 9: Doctor Search Input */}
      <div className="search-input-wrapper">
        <input
          type="text"
          value={searchQuery}
          onChange={handleSearchInput}
          placeholder="🔍 Search doctor by name..."
          className="search-input"
          aria-label="Search doctor by name"
        />
      </div>

      {/* Pins 10, 11: Department Filter Chips */}
      <div className="chip-group" role="tablist" aria-label="Department filters">
        {/* // [REQ-1] Render a list using .map() with a correct, stable key */}
        {departments.map((dept) => {
          const isActive = selectedDept === dept;
          return (
            <button
              key={dept}
              type="button"
              role="tab"
              aria-selected={isActive}
              onClick={() => onSelectDept(dept)}
              className={`filter-chip ${isActive ? 'active' : ''}`}
            >
              {dept}
            </button>
          );
        })}
      </div>
    </div>
  );
}
