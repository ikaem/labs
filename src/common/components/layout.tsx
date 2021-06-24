import { TopBar } from '.';

export const Layout: React.FC = ({ children }) => {
  return (
    <div className='layout'>
      <TopBar />
      {children}
    </div>
  );
};
