import { BrowserRouter as Router } from 'react-router-dom';
import { AuthContextProvider } from '../services/auth';
import { FileSystemProvider } from '../services/filesystem';

export const Providers: React.FC = ({ children }) => {
  return (
    <AuthContextProvider>
      <FileSystemProvider>
        <Router>{children}</Router>
      </FileSystemProvider>
    </AuthContextProvider>
  );
};
