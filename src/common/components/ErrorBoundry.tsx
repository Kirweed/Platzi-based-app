import { Component, type ErrorInfo, type PropsWithChildren, type ReactNode } from 'react';

export class ErrorBoundry extends Component<PropsWithChildren<{ fallback: ReactNode }>> {
  state = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.log(error, errorInfo);
  }

  render() {
    return this.state.hasError ? this.props.fallback : this.props.children;
  }
}
