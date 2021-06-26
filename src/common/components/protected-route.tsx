import { useEffect } from 'react';
import { Redirect, Route, useHistory } from 'react-router-dom';
import { useAuth } from '../../services/auth';
import { ROUTES } from '../constants';

interface ProtectedRouteProps {}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = () => {
  const { isLoggedIn } = useAuth();
  const history = useHistory();

  useEffect(() => {
    //   TODO this needs revert
    // if (!isLoggedIn) navigate('/login');
    if (!isLoggedIn) history.push('/login');
  }, [isLoggedIn]);

  return (
    <>
      {ROUTES.map((route) => (
        <Route exact key={route.path} path={route.path}>
          <route.component />
        </Route>
      ))}

      <Route>
        <Redirect to='/home' />
      </Route>
    </>
  );
};
