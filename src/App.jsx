import React, { useState } from 'react';
import Header from './components/layout/Header';
import PageContainer from './components/layout/PageContainer';
import StatGrid from './components/stats/StatGrid';
import DoctorPanel from './components/doctors/DoctorPanel';
import AppointmentForm from './components/appointments/AppointmentForm';
import AppointmentList from './components/appointments/AppointmentList';
import ErrorBoundary from './components/error/ErrorBoundary';
import { doctors as initialDoctors } from './data/doctors';
import { appointments as initialAppointments } from './data/appointments';
import { logInfo } from './utils/logger';

/*
  // [REQ-9] Prop drilling problem + your solution:
  -----------------------------------------------------------------------------
  WHAT WAS THE PROBLEM?
  In an application where appointments depend on physician selection, passing
  `selectedDoctorId` and `onSelectDoctor` across:
      App -> DoctorPanel -> DoctorList -> DoctorCard
  constitutes classic "prop drilling". Neither DoctorPanel nor DoctorList
  requires `selectedDoctorId` for their own logic; they merely forward it down.

  HOW DID WE SOLVE IT?
  1. Component Composition (children prop - [REQ-5]):
     Panels use the reusable <Card>{children}</Card> component.
  2. Render Props ([REQ-6]):
     DoctorList and AppointmentList use <FilterableList renderItem={(item) => ...} />,
     allowing DoctorCard to be bound cleanly at the render site.
  3. Alternative / React Context Bonus:
     In larger architectures, a `<ClinicContext.Provider>` would make state and
     dispatch methods available anywhere in the tree without touching intermediary props.
  -----------------------------------------------------------------------------
*/

export default function App() {
  // // [REQ-3] Lifting state up:
  // selectedDoctorId and appointments live at the top-level App component
  // so that both DoctorPanel (browse/select) and AppointmentForm (booking)
  // stay perfectly synchronized without local fragmentation.
  const [doctors] = useState(initialDoctors);
  const [appointments, setAppointments] = useState(initialAppointments);
  const [selectedDoctorId, setSelectedDoctorId] = useState(null);

  // Derive summary metrics dynamically on render (zero redundant state)
  const totalDoctors = doctors.length;
  const totalAppointments = appointments.length;
  const pendingCount = appointments.filter((apt) => apt.status === 'Pending').length;
  const completedCount = appointments.filter((apt) => apt.status === 'Completed').length;

  // // [REQ-4] Passing props parent -> child (callback functions)
  // [REQ-10] Click event handlers

  // Handle doctor selection / toggle
  const handleSelectDoctor = (doctor) => {
    setSelectedDoctorId((prevId) => {
      const nextId = prevId === doctor.id ? null : doctor.id;
      logInfo('App', `Doctor selection changed: ID=${nextId} (${doctor.name})`);
      return nextId;
    });
  };

  // Handle adding new appointment (adds to start so newest appears first)
  const handleAddAppointment = (newAppointment) => {
    setAppointments((prev) => [newAppointment, ...prev]);
    logInfo('App', `New appointment added: ID=${newAppointment.id}`);
  };

  // Handle updating appointment status in state
  const handleStatusChange = (appointmentId, newStatus) => {
    setAppointments((prev) =>
      prev.map((apt) =>
        apt.id === appointmentId ? { ...apt, status: newStatus } : apt
      )
    );
    logInfo('App', `Appointment ${appointmentId} status changed to "${newStatus}"`);
  };

  // Handle deleting an appointment from state
  const handleDeleteAppointment = (appointmentId) => {
    setAppointments((prev) => prev.filter((apt) => apt.id !== appointmentId));
    logInfo('App', `Appointment ${appointmentId} deleted`);
  };

  // Reset selected doctor when form is reset
  const handleResetDoctor = () => {
    setSelectedDoctorId(null);
    logInfo('App', 'Doctor selection reset to null');
  };

  return (
    <div className="medicare-app-root">
      {/* Tier 1: Sticky Top Navigation Bar */}
      <Header pendingCount={pendingCount} />

      {/* Main Container */}
      <PageContainer>
        {/* Tier 2: Summary Metric KPI Counters (StatGrid) */}
        <StatGrid
          totalDoctors={totalDoctors}
          totalAppointments={totalAppointments}
          pendingCount={pendingCount}
          completedCount={completedCount}
        />

        {/* Tier 3: Main Split Workspace Grid */}
        <div className="workspace-grid">
          {/* Left Column (40%): Doctor Catalog Panel */}
          <div className="workspace-left-col">
            <DoctorPanel
              doctors={doctors}
              selectedDoctorId={selectedDoctorId}
              onSelectDoctor={handleSelectDoctor}
            />
          </div>

          {/* Right Column (60%): Booking Form + Appointments List */}
          <div className="workspace-right-col">
            {/* Booking Form (Controlled + Uncontrolled File Attachment) */}
            <AppointmentForm
              doctors={doctors}
              selectedDoctorId={selectedDoctorId}
              onAddAppointment={handleAddAppointment}
              onResetDoctor={handleResetDoctor}
            />

            {/* // [REQ-11] Isolated ErrorBoundary:
                Wrapping the Appointments panel in its own isolated ErrorBoundary
                ensures that any unexpected failure in tabular display or parsing
                does not crash the rest of the clinic dashboard. */}
            <ErrorBoundary name="Appointments Panel">
              <AppointmentList
                appointments={appointments}
                doctors={doctors}
                onStatusChange={handleStatusChange}
                onDeleteAppointment={handleDeleteAppointment}
              />
            </ErrorBoundary>
          </div>
        </div>

        {/* Pin 30: Centered Footer */}
        <footer className="app-footer">
          MediCare Clinic © 2026 · Built with React
        </footer>
      </PageContainer>
    </div>
  );
}

