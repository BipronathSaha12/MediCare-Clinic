/**
 * Format utilities for the MediCare Clinic Front Desk Dashboard
 */

/**
 * Formats a stat number to always display at least two digits with a leading zero.
 * e.g., 8 -> "08", 12 -> "12", 4 -> "04"
 * @param {number|string} num
 * @returns {string}
 */
export const formatStatNumber = (num) => {
  const parsed = Number(num);
  if (isNaN(parsed)) return '00';
  return parsed < 10 && parsed >= 0 ? `0${parsed}` : String(parsed);
};

/**
 * Formats a numeric currency amount in BDT (Bangladeshi Taka).
 * e.g., 1200 -> "৳ 1,200"
 * @param {number|string} amount
 * @returns {string}
 */
export const formatCurrency = (amount) => {
  const parsed = Number(amount);
  if (isNaN(parsed)) return '৳ 0';
  return `৳ ${parsed.toLocaleString('en-US')}`;
};

/**
 * Converts ISO date string 'YYYY-MM-DD' into readable 'DD Mon YYYY'.
 * e.g., '2026-08-02' -> '02 Aug 2026'
 * @param {string} dateStr
 * @returns {string}
 */
export const formatDate = (dateStr) => {
  if (!dateStr) return '';
  const parts = dateStr.split('-');
  if (parts.length !== 3) return dateStr;

  const year = parts[0];
  const monthIdx = parseInt(parts[1], 10) - 1;
  const day = parts[2].padStart(2, '0');

  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const monthName = months[monthIdx] || parts[1];

  return `${day} ${monthName} ${year}`;
};

/**
 * Converts 24-hour time string 'HH:mm' to 12-hour AM/PM format.
 * e.g., '17:00' -> '05:00 PM', '10:30' -> '10:30 AM'
 * @param {string} timeStr
 * @returns {string}
 */
export const formatTime = (timeStr) => {
  if (!timeStr) return '';
  const parts = timeStr.split(':');
  if (parts.length < 2) return timeStr;

  let hours = parseInt(parts[0], 10);
  const minutes = parts[1].padStart(2, '0');
  if (isNaN(hours)) return timeStr;

  const period = hours >= 12 ? 'PM' : 'AM';
  hours = hours % 12;
  if (hours === 0) hours = 12;

  const paddedHours = String(hours).padStart(2, '0');
  return `${paddedHours}:${minutes} ${period}`;
};

/**
 * Extracts 2-letter doctor initials, stripping prefixes like 'Dr. ' or 'Dr '
 * e.g., 'Dr. Ayesha Rahman' -> 'AR', 'Dr. Mahmud Karim' -> 'MK'
 * @param {string} name
 * @returns {string}
 */
export const getInitials = (name) => {
  if (!name) return 'MD';
  // Strip common titles (Dr., Prof., etc.)
  const clean = name.replace(/^(Dr\.|Dr|Prof\.|Prof)\s+/i, '').trim();
  const words = clean.split(/\s+/).filter(Boolean);

  if (words.length >= 2) {
    return (words[0][0] + words[words.length - 1][0]).toUpperCase();
  }
  if (words.length === 1 && words[0].length >= 2) {
    return words[0].substring(0, 2).toUpperCase();
  }
  return clean.substring(0, 2).toUpperCase();
};

