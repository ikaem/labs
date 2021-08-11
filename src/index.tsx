import React from 'react';
import ReactDOM from 'react-dom';

import App from './App';
import ErrorBoundary from './common/components/error-boundary';
import { Providers } from './providers';

ReactDOM.render(
  <React.StrictMode>
    <ErrorBoundary>
      <Providers>
        <App />
      </Providers>
    </ErrorBoundary>
  </React.StrictMode>,
  document.getElementById('root')
);
