import { Clock } from '.';

interface TopBarProps {
  isLoggedIn: boolean;
  username: string | null;
}

export const TopBar: React.FC<TopBarProps> = ({ isLoggedIn, username }) => {
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
          <div className='greeting'>Welcome {username}</div>
        </div>
      )}
    </header>
  );
};
