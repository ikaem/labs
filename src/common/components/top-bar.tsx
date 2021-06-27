import { Clock, LogoutIcon } from '.';

interface TopBarProps {
  isLoggedIn: boolean;
  username: string | null;
  logout: () => void;
}

export const TopBar: React.FC<TopBarProps> = ({
  isLoggedIn,
  username,
  logout,
}) => {
  return (
    <header className='top-bar'>
      <div className='top-bar_container'>
        {isLoggedIn && (
          <>
            <button className='start-button'>Start</button>
          </>
        )}
        <div className='container_clock-wrapper'>
          <Clock />
        </div>
      </div>

      {username && (
        <div className='lower-bar'>
          <div className='greeting'>
            <span>Welcome {username}</span>

            <button onClick={logout}>
              <LogoutIcon className='logout-icon icon' title='Logout' />
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
