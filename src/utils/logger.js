// [REQ-12] Global error handling + logger
// Structured logger utility producing consistent, timestamped application logs

/**
 * Returns formatted ISO timestamp
 * @returns {string} ISO timestamp string
 */
const getTimestamp = () => new Date().toISOString();

/**
 * Logs informational messages to the console
 * @param {string} context - Source or module identifier (e.g., 'AppointmentForm', 'App')
 * @param {string} message - Human-readable log message
 * @param {*} [data] - Optional payload or state snapshot
 */
export const logInfo = (context, message, data = null) => {
  const timestamp = getTimestamp();
  if (data !== null && data !== undefined) {
    console.info(`[${timestamp}] [INFO] [${context}] ${message}`, data);
  } else {
    console.info(`[${timestamp}] [INFO] [${context}] ${message}`);
  }
};

/**
 * Logs warning messages to the console
 * @param {string} context - Source or module identifier
 * @param {string} message - Warning message description
 * @param {*} [data] - Optional payload or state snapshot
 */
export const logWarn = (context, message, data = null) => {
  const timestamp = getTimestamp();
  if (data !== null && data !== undefined) {
    console.warn(`[${timestamp}] [WARN] [${context}] ${message}`, data);
  } else {
    console.warn(`[${timestamp}] [WARN] [${context}] ${message}`);
  }
};

/**
 * Logs error messages and stack traces to the console
 * @param {string} context - Source or module identifier (e.g., 'ErrorBoundary', 'GlobalError')
 * @param {Error|string} error - The caught error instance or message
 * @param {*} [extra] - Additional context, componentStack, or payload
 */
export const logError = (context, error, extra = null) => {
  const timestamp = getTimestamp();
  const errorMsg = error instanceof Error ? error.message : String(error);
  const errorStack = error instanceof Error ? error.stack : null;

  console.error(`[${timestamp}] [ERROR] [${context}] ${errorMsg}`, {
    stack: errorStack,
    extra: extra
  });
};
