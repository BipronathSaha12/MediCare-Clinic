/**
 * Validators for the MediCare Clinic Appointment Form
 * All functions return an error string if invalid, or null if valid.
 */

export const validatePatientName = (name) => {
  if (!name || !name.trim()) {
    return 'Patient name is required.';
  }
  if (name.trim().length < 3) {
    return 'Patient name must be at least 3 characters.';
  }
  return null;
};

export const validatePhone = (phone) => {
  if (!phone || !phone.trim()) {
    return 'Phone number is required.';
  }
  const cleanPhone = phone.trim();
  // Must be exactly 11 digits starting with 01 (e.g., 01711000000)
  const phoneRegex = /^01\d{9}$/;
  if (!phoneRegex.test(cleanPhone)) {
    return 'Enter a valid 11-digit phone number.';
  }
  return null;
};

export const validateDoctorId = (doctorId) => {
  if (!doctorId || String(doctorId).trim() === '') {
    return 'Please select a doctor.';
  }
  return null;
};

export const validateAppointmentDate = (dateStr) => {
  if (!dateStr || !dateStr.trim()) {
    return 'Appointment date is required.';
  }
  // Compare YYYY-MM-DD strings directly (lexicographical comparison is safe for ISO dates)
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, '0');
  const day = String(today.getDate()).padStart(2, '0');
  const todayStr = `${year}-${month}-${day}`;

  if (dateStr < todayStr) {
    return 'Appointment date cannot be in the past.';
  }
  return null;
};

export const validateAppointmentTime = (timeStr) => {
  if (!timeStr || !timeStr.trim()) {
    return 'Please select a time.';
  }
  return null;
};

export const validateNote = (note) => {
  if (note && note.length > 200) {
    return 'Note cannot exceed 200 characters.';
  }
  return null;
};

/**
 * Validates the entire appointment form data object.
 * @param {Object} formData
 * @returns {Object} errors - Map of field names to error messages (empty if valid)
 */
export const validateAppointmentForm = (formData) => {
  const errors = {};

  const nameError = validatePatientName(formData.patientName);
  if (nameError) errors.patientName = nameError;

  const phoneError = validatePhone(formData.phone);
  if (phoneError) errors.phone = phoneError;

  const doctorError = validateDoctorId(formData.doctorId);
  if (doctorError) errors.doctorId = doctorError;

  const dateError = validateAppointmentDate(formData.date);
  if (dateError) errors.date = dateError;

  const timeError = validateAppointmentTime(formData.time);
  if (timeError) errors.time = timeError;

  const noteError = validateNote(formData.note);
  if (noteError) errors.note = noteError;

  return errors;
};
