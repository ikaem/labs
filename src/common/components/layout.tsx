import Clock from 'react-live-clock';

export const Layout: React.FC = ({ children }) => {
  return (
    <div className='layout'>
      {/* TODO move top bar to their own component */}
      <header className='top-bar'>
        <div>
          <button>Start</button>
          <div>
            <p>Welcome username</p>
          </div>
          <div>
            <Clock />
          </div>
        </div>
      </header>
      {children}
    </div>
  );
};
