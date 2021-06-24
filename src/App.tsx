import { navigate, RouteComponentProps, Router } from '@reach/router';
import { useEffect } from 'react';
import { Route, Switch } from 'react-router';
import { ProtectedRoute } from './common/components';
import { Login } from './modules/login';
import { useAuth } from './services/auth';
import './styles/main.scss';

const App: React.FC<RouteComponentProps> = () => {
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
