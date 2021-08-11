import React from 'react';

const ErrorBoundaryContext = React.createContext<{
  triggerErrorState: ({
    error,
    errorInfo,
  }: {
    error: any;
    errorInfo: any;
  }) => void;
}>({
  triggerErrorState: () => {},
});

class ErrorBoundary extends React.Component {
  constructor(props: React.PropsWithChildren<{}>) {
    super(props);
  }

  state = { hasError: false };

  static getDerivedStateFromError(error: any) {
    console.log('this is from getDerivedStateFromError', { error });
    return { hasError: true };
  }

  componentDidCatch(error: any, errorInfo: React.ErrorInfo) {
    console.log({ error, errorInfo });
  }

  resetErrorState = () => {
    this.setState({ hasError: false });
  };

  triggerErrorState = ({
    error,
    errorInfo,
  }: {
    error: any;
    errorInfo: any;
  }) => {
    console.log('Error state triggered', { error, errorInfo });
    this.setState({ hasError: true });
  };

  render() {
    return (
      <ErrorBoundaryContext.Provider
        value={{ triggerErrorState: this.triggerErrorState }}
      >
        {this.state.hasError ? (
          <>
            <h1>There is an error</h1>
            <button onClick={this.resetErrorState}>Retry?</button>{' '}
          </>
        ) : (
          this.props.children
        )}
      </ErrorBoundaryContext.Provider>
    );
  }
}

export default ErrorBoundary;

export const useErrorHandling = () => {
  const { triggerErrorState } = React.useContext(ErrorBoundaryContext);

  return { triggerErrorState };
};
