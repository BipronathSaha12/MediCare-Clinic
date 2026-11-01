import React from 'react';
import FallbackUI from './FallbackUI';
import { logError } from '../../utils/logger';

// [REQ-11] Error Boundary + Fallback UI
// Class component that intercepts JavaScript errors anywhere in its child component tree,
// logs those errors, and renders a fallback UI instead of crashing the entire application.
export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hasError: false,
      error: null
    };
    this.handleReset = this.handleReset.bind(this);
  }

  // Update state so the next render will show the fallback UI.
  static getDerivedStateFromError(error) {
    return {
      hasError: true,
      error: error
    };
  }

  // Lifecycle hook for error reporting and telemetry
  componentDidCatch(error, errorInfo) {
    logError(
      `ErrorBoundary [${this.props.name || 'Root'}]`,
      error,
      errorInfo?.componentStack
    );
  }

  handleReset() {
    this.setState({
      hasError: false,
      error: null
    });
    if (typeof this.props.onReset === 'function') {
      this.props.onReset();
    }
  }

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return typeof this.props.fallback === 'function'
          ? this.props.fallback({ error: this.state.error, reset: this.handleReset })
          : this.props.fallback;
      }

      return (
        <FallbackUI
          error={this.state.error}
          onReset={this.handleReset}
          componentName={this.props.name || 'section'}
        />
      );
    }

    return this.props.children;
  }
}
