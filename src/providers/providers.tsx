import { Router } from '@reach/router';
import { AuthContextProvider } from '../services/auth';

export const Providers: React.FC = ({ children }) => {
  return (
    <AuthContextProvider>
      <Router>{children}</Router>
    </AuthContextProvider>
  );
};
