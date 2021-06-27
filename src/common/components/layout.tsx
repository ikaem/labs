import { TopBar } from '.';
import { useAuth } from '../../services/auth';

export const Layout: React.FC = ({ children }) => {
  const { isLoggedIn, username, logout } = useAuth();

  return (
    <div className='layout'>
      <TopBar isLoggedIn={isLoggedIn} username={username} logout={logout} />
      <main>{children}</main>
    </div>
  );
};
