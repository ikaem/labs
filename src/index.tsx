import React from 'react';
import ReactDOM from 'react-dom';

import App from './App';
import { Providers } from './providers';

ReactDOM.render(
  <React.StrictMode>
    <Providers>
      <App default />
    </Providers>
  </React.StrictMode>,
  document.getElementById('root')
);
