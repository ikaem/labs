import { TopBar } from '.';
import { useAuth } from '../../services/auth';

export const Layout: React.FC = ({ children }) => {
  const { isLoggedIn, username } = useAuth();

  return (
    <div className='layout'>
      <TopBar isLoggedIn={isLoggedIn} username={username} />
      <main>{children}</main>
    </div>
  );
};
