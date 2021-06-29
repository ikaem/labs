import { BrowserRouter as Router } from 'react-router-dom';
import { AuthContextProvider } from '../services/auth';
import { FileSystemProvider } from '../services/filesystem';
import { RSSReaderProvider } from '../services/rss-reader';

export const Providers: React.FC = ({ children }) => {
  return (
    <AuthContextProvider>
      <FileSystemProvider>
        <RSSReaderProvider>
          <Router>{children}</Router>
        </RSSReaderProvider>
      </FileSystemProvider>
    </AuthContextProvider>
  );
};
