import { useEffect } from 'react';
import { Route, Switch } from 'react-router';
import { time } from 'uniqid';
import { ProtectedRoute } from './common/components';
import { Login } from './modules/login';
import { useAuth } from './services/auth';
import './styles/main.scss';

const App: React.FC = () => {
  const { loadStoredAuth, useStoredAuth } = useAuth();
  const [storedAuth] = useStoredAuth();

  useEffect(() => {
    if (storedAuth) loadStoredAuth(storedAuth);

    const timeoutId = setTimeout(() => {
      // throw new Error('Hello');
    }, 2000);

    return () => clearTimeout(timeoutId);
  }, []);

  return (
    <Switch>
      <Route exact path='/login'>
        <Login />
      </Route>
      <Route path='*'>
        <ProtectedRoute />
      </Route>
    </Switch>
  );
};

export default App;
