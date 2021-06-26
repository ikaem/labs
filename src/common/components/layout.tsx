import { TopBar } from '.';
import { useAuth } from '../../services/auth';

export const Layout: React.FC = ({ children }) => {
  const { isLoggedIn } = useAuth();

  return (
    <div className='layout'>
      <TopBar isLoggedIn={isLoggedIn} />
      <main>{children}</main>
    </div>
  );
};
