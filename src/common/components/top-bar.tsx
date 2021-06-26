interface TopBarProps {
  isLoggedIn: boolean;
}

export const TopBar: React.FC<TopBarProps> = ({ isLoggedIn }) => {
  return (
    <header className='top-bar'>
      <div className='top-bar_container'>
        {isLoggedIn && (
          <>
            <button className='start-button'>Start</button>
            <div className='greeting'>Welcome username</div>
          </>
        )}
        <div className='container_clock-wrapper'>
          22 <br /> 16:32
        </div>
      </div>
    </header>
  );
};
