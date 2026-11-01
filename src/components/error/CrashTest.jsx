import React, { useState } from 'react';
import { logWarn } from '../../utils/logger';

// Pin 3: Crash Test Button Component
// Intentionally throws a synchronous render error when clicked so that the
// nearest enclosing ErrorBoundary catches it and presents the FallbackUI.
export default function CrashTest({ label = 'Crash Test' }) {
  const [shouldCrash, setShouldCrash] = useState(false);

  const handleTriggerCrash = () => {
    logWarn('CrashTest', 'User clicked Crash Test button. Throwing synchronous render error...');
    setShouldCrash(true);
  };

  if (shouldCrash) {
    // Synchronously throw error during React render phase
    throw new Error('Simulated render crash triggered via Crash Test button to demonstrate ErrorBoundary functionality.');
  }

  return (
    <button
      type="button"
      onClick={handleTriggerCrash}
      className="btn-crash-test"
      title="Trigger an intentional render error to test the Error Boundary"
    >
      <span aria-hidden="true">⚠️</span>
      {label}
    </button>
  );
}

