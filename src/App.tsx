import { RouteComponentProps } from '@reach/router';
import './App.css';
import { Login } from './modules/login';
import { OS } from './modules/os/';

const App: React.FC<RouteComponentProps> = () => {
  return (
    <div className='app'>
      {/* TODO make protected route here  */}
      <OS />
      <Login path='*' />
    </div>
  );
};

export default App;
