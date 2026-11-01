/**
 * Seed data for MediCare Clinic Appointments
 * 12 appointments matching screenshot counts:
 * - Total: 12
 * - Pending: 5
 * - Confirmed: 2
 * - Completed: 4
 * - Cancelled: 1
 */
export const appointments = [
  {
    id: 101,
    patientName: 'Rakib Hasan',
    phone: '01711000000',
    doctorId: 1,
    date: '2026-08-02',
    time: '10:30',
    status: 'Pending',
    note: 'Follow-up chest checkup'
  },
  {
    id: 102,
    patientName: 'Nusrat Jahan',
    phone: '01822000000',
    doctorId: 2,
    date: '2026-08-03',
    time: '17:00',
    status: 'Confirmed',
    note: 'Migraine consultation'
  },
  {
    id: 103,
    patientName: 'Imran Hossain',
    phone: '01933000000',
    doctorId: 3,
    date: '2026-07-28',
    time: '11:15',
    status: 'Completed',
    note: 'Routine fever check'
  },
  {
    id: 104,
    patientName: 'Farhana Akter',
    phone: '01644000000',
    doctorId: 4,
    date: '2026-07-26',
    time: '09:00',
    status: 'Cancelled',
    note: 'Knee pain evaluation'
  },
  {
    id: 105,
    patientName: 'Shahidul Alam',
    phone: '01715000001',
    doctorId: 5,
    date: '2026-08-05',
    time: '11:00',
    status: 'Pending',
    note: 'Hypertension monitoring'
  },
  {
    id: 106,
    patientName: 'Mehnaz Parveen',
    phone: '01819000002',
    doctorId: 6,
    date: '2026-08-06',
    time: '15:30',
    status: 'Pending',
    note: 'Chronic nerve tingling'
  },
  {
    id: 107,
    patientName: 'Kamal Uddin',
    phone: '01912000003',
    doctorId: 7,
    date: '2026-08-07',
    time: '10:00',
    status: 'Pending',
    note: 'General wellness check'
  },
  {
    id: 108,
    patientName: 'Rina Begum',
    phone: '01552000004',
    doctorId: 1,
    date: '2026-08-08',
    time: '12:00',
    status: 'Pending',
    note: 'ECG report review'
  },
  {
    id: 109,
    patientName: 'Arifur Rahman',
    phone: '01718000005',
    doctorId: 2,
    date: '2026-08-04',
    time: '16:00',
    status: 'Confirmed',
    note: 'Post-MRI consultation'
  },
  {
    id: 110,
    patientName: 'Taslima Nasrin',
    phone: '01611000006',
    doctorId: 3,
    date: '2026-07-29',
    time: '14:30',
    status: 'Completed',
    note: 'Prescription refill'
  },
  {
    id: 111,
    patientName: 'Zubair Hossain',
    phone: '01713000007',
    doctorId: 5,
    date: '2026-07-27',
    time: '16:30',
    status: 'Completed',
    note: 'Echo cardiogram completed'
  },
  {
    id: 112,
    patientName: 'Salma Khatun',
    phone: '01814000008',
    doctorId: 7,
    date: '2026-07-25',
    time: '10:45',
    status: 'Completed',
    note: 'Blood test follow-up'
  }
];

