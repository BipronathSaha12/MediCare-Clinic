import React, { useState, useEffect, useRef } from 'react';
import Card from '../ui/Card';
import Button from '../ui/Button';
import { validateAppointmentForm } from '../../utils/validators';
import { logInfo, logError } from '../../utils/logger';

// [REQ-7] Controlled component:
// Form inputs for patientName, phone, doctorId, date, time, and note
// are bound to local component state via useState, providing immediate validation and feedback.
export default function AppointmentForm({
  doctors = [],
  selectedDoctorId = null,
  onAddAppointment,
  onResetDoctor
}) {
  // Controlled form state
  const [formData, setFormData] = useState({
    patientName: '',
    phone: '',
    doctorId: selectedDoctorId ? String(selectedDoctorId) : '',
    date: '',
    time: '',
    note: ''
  });

  const [errors, setErrors] = useState({});
  const [successBanner, setSuccessBanner] = useState(null);
  const [submissionError, setSubmissionError] = useState(null);

  // [REQ-8] Uncontrolled component with useRef:
  // Direct DOM reference to the optional report attachment file input.
  // Its value is read imperatively on submit and reset upon completion without triggering re-renders.
  const fileInputRef = useRef(null);

  // Synchronize form's doctor select dropdown when selectedDoctorId changes from DoctorCard click
  useEffect(() => {
    if (selectedDoctorId) {
      setFormData((prev) => ({
        ...prev,
        doctorId: String(selectedDoctorId)
      }));
      // Clear any prior doctor selection error
      setErrors((prev) => {
        const next = { ...prev };
        delete next.doctorId;
        return next;
      });
    }
  }, [selectedDoctorId]);

  // Handle controlled input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));

    // Clear individual field error as user types
    if (errors[name]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[name];
        return next;
      });
    }
  };

  // Reset form helper
  const handleResetForm = () => {
    setFormData({
      patientName: '',
      phone: '',
      doctorId: '',
      date: '',
      time: '',
      note: ''
    });
    setErrors({});
    setSubmissionError(null);

    // [REQ-8] Clear uncontrolled file input imperatively
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }

    if (typeof onResetDoctor === 'function') {
      onResetDoctor();
    }
  };

  // // [REQ-10] Click event + form submit event handling
  const handleSubmit = (e) => {
    e.preventDefault();

    try {
      // Validate all form fields using utils/validators.js
      const validationErrors = validateAppointmentForm(formData);
      if (Object.keys(validationErrors).length > 0) {
        setErrors(validationErrors);
        return;
      }

      // [REQ-8] Read uncontrolled file attachment name
      const attachedFile = fileInputRef.current?.files?.[0];
      const attachedFileName = attachedFile ? attachedFile.name : null;

      if (attachedFileName) {
        logInfo('AppointmentForm', `File attached to appointment: ${attachedFileName}`, {
          size: attachedFile.size,
          type: attachedFile.type
        });
      }

      // Construct new appointment record with unique ID and 'Pending' status
      const newAppointment = {
        id: Date.now(),
        patientName: formData.patientName.trim(),
        phone: formData.phone.trim(),
        doctorId: parseInt(formData.doctorId, 10),
        date: formData.date,
        time: formData.time,
        status: 'Pending',
        note: formData.note.trim(),
        attachmentName: attachedFileName
      };

      // Call parent callback to lift newly created appointment into App state
      onAddAppointment(newAppointment);

      logInfo('AppointmentForm', `Appointment booked successfully for ${newAppointment.patientName}`, newAppointment);

      // Show auto-hiding green success message
      setSuccessBanner(`✓ Appointment booked successfully for ${newAppointment.patientName}.`);
      setTimeout(() => {
        setSuccessBanner(null);
      }, 4000);

      // Reset form and file input
      handleResetForm();
    } catch (err) {
      // [REQ-10] Comprehensive error catch block with UI feedback and logging
      logError('AppointmentForm:handleSubmit', err);
      setSubmissionError('An unexpected error occurred while saving the appointment. Please check your inputs and try again.');
    }
  };

  // Determine if submit button should be disabled (Pin 21)
  const isSubmitDisabled =
    !formData.patientName.trim() ||
    !formData.phone.trim() ||
    !formData.doctorId ||
    !formData.date ||
    !formData.time;

  // Format today's date for date picker min attribute
  const todayStr = new Date().toISOString().split('T')[0];

  return (
    // [REQ-5] Component composition using the children prop:
    // Wraps the booking form in the reusable Card component
    <Card title="Book New Appointment">
      <form onSubmit={handleSubmit} className="booking-form" noValidate>
        {/* // [REQ-2] [REQ-2b] Logical && operator:
            Conditionally renders the auto-hiding green booking success banner */}
        {successBanner && (
          <div className="form-success-banner" role="status">
            <span>{successBanner}</span>
          </div>
        )}

        {/* // [REQ-2] [REQ-2b] Logical && operator:
            Conditionally renders top-level submission error banner if catch block triggers */}
        {submissionError && (
          <div className="form-error-banner" role="alert">
            <span>⚠️ {submissionError}</span>
          </div>
        )}

        {/* Patient Name Field */}
        <div className="form-group">
          <label htmlFor="patientName" className="form-label">
            Patient Name <span className="required-star">*</span>
          </label>
          <input
            id="patientName"
            name="patientName"
            type="text"
            value={formData.patientName}
            onChange={handleChange}
            placeholder="e.g. Rakib Hasan"
            className={`form-input ${errors.patientName ? 'has-error' : ''}`}
          />
          {/* // [REQ-2b] Logical && operator: Render field validation error */}
          {errors.patientName && (
            <span className="field-error-msg">{errors.patientName}</span>
          )}
        </div>

        {/* Phone Number Field */}
        <div className="form-group">
          <label htmlFor="phone" className="form-label">
            Phone Number <span className="required-star">*</span>
          </label>
          <input
            id="phone"
            name="phone"
            type="tel"
            value={formData.phone}
            onChange={handleChange}
            placeholder="01711000000"
            className={`form-input ${errors.phone ? 'has-error' : ''}`}
          />
          {errors.phone && (
            <span className="field-error-msg">{errors.phone}</span>
          )}
        </div>

        {/* Doctor Select Field */}
        <div className="form-group">
          <label htmlFor="doctorId" className="form-label">
            Select Doctor <span className="required-star">*</span>
          </label>
          <select
            id="doctorId"
            name="doctorId"
            value={formData.doctorId}
            onChange={handleChange}
            className={`form-select ${errors.doctorId ? 'has-error' : ''}`}
          >
            <option value="">-- Choose an available doctor --</option>
            {/* // [REQ-1] Render a list using .map() with a correct, stable key */}
            {doctors.map((doc) => (
              <option
                key={doc.id}
                value={doc.id}
                disabled={!doc.available}
              >
                {doc.name} — {doc.department} ({doc.specialization}) {!doc.available ? '(Unavailable)' : ''}
              </option>
            ))}
          </select>
          {errors.doctorId && (
            <span className="field-error-msg">{errors.doctorId}</span>
          )}
        </div>

        {/* Pin 19: Date + Time Row (2 equal columns) */}
        <div className="form-row-2col">
          <div className="form-group">
            <label htmlFor="date" className="form-label">
              Appointment Date <span className="required-star">*</span>
            </label>
            <input
              id="date"
              name="date"
              type="date"
              min={todayStr}
              value={formData.date}
              onChange={handleChange}
              className={`form-input ${errors.date ? 'has-error' : ''}`}
            />
            {errors.date && (
              <span className="field-error-msg">{errors.date}</span>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="time" className="form-label">
              Appointment Time <span className="required-star">*</span>
            </label>
            <input
              id="time"
              name="time"
              type="time"
              value={formData.time}
              onChange={handleChange}
              className={`form-input ${errors.time ? 'has-error' : ''}`}
            />
            {errors.time && (
              <span className="field-error-msg">{errors.time}</span>
            )}
          </div>
        </div>

        {/* Pin 20: Uncontrolled File Input ([REQ-8]) */}
        <div className="form-group">
          <label htmlFor="reportFile" className="form-label">
            Report file (optional) — uncontrolled, read with useRef
          </label>
          <div className="uncontrolled-file-box">
            <input
              id="reportFile"
              ref={fileInputRef}
              type="file"
              className="file-input"
              accept=".pdf,.png,.jpg,.jpeg,.doc,.docx"
            />
            <span className="file-input-help">
              Attach medical reports, prescriptions, or imaging (optional).
            </span>
          </div>
        </div>

        {/* Note Field (Optional) */}
        <div className="form-group">
          <label htmlFor="note" className="form-label">
            Medical Note / Chief Complaint (optional)
          </label>
          <textarea
            id="note"
            name="note"
            rows="2"
            value={formData.note}
            onChange={handleChange}
            placeholder="e.g. Patient experiencing recurring headaches..."
            className={`form-textarea ${errors.note ? 'has-error' : ''}`}
          />
          {errors.note && (
            <span className="field-error-msg">{errors.note}</span>
          )}
        </div>

        {/* Pin 21: Form Action Buttons */}
        <div className="form-actions-row">
          <Button
            type="submit"
            variant="primary"
            disabled={isSubmitDisabled}
          >
            Confirm & Book Appointment
          </Button>

          <Button
            type="button"
            variant="secondary"
            onClick={handleResetForm}
          >
            Reset Form
          </Button>
        </div>
      </form>
    </Card>
  );
}
